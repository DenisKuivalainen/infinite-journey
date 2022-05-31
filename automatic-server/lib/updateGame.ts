import getPath from "./getPath";
import map from "./map";
import cache from "memory-cache";
import db from "./accessDB";
import moment from "moment";
import season from "./season";
import matrix from "./getMatrix";
import getters from "./getters";
import { PLAYER_ACTIONS } from "./enums";
import { DbPlayer, DbTown, DbTraveler, KeysOf, SEX } from "./types";
import { v4 as uuid } from "uuid";
import { weightedRand } from "./random";
import getName from "./getName";
import { shuffleArray } from "./helpers";

const { getNewDestination } = map;
const { getSeason, getDeathRatio, getBirthRatio } = season;
const { getSurface, getPathfinding } = matrix;

const isResting = async (
  time: number,
  from: number,
  to: number,
  [x, y]: [number, number]
) => {
  const surface = await getSurface();
  return (time < from || time > to) && surface[y][x] === 0;
};

const updatePathsOnSeasonChange = async () => {
  const pathfinding = await getPathfinding();
  const players = await getters.getPlayers();
  let newPlayers: DbPlayer[] = [];

  for (const i in players) {
    const p = players[i];
    const { position, destination, actions } = p;

    if (pathfinding[position[1]][position[0]] === 1) {
      newPlayers.push(p);
    } else if (actions.length) {
      newPlayers.push(p);
    } else {
      const path = await getPath(position, destination);
      newPlayers.push({ ...p, actions: path });
    }
  }

  for (const j in newPlayers) {
    await db.updatePlayer(newPlayers[j]);
  }

  cache.put("players", newPlayers);
};

const putTravelers = async () => {
  const { time, season } = await getters.getTime();

  if (
    time < 51 ||
    time > 71 ||
    (await getters.getTravelers().then((ts) => ts.length >= 100))
  )
    return;

  const towns = await getters
    .getTowns()
    .then((t) => t.filter((_t) => !_t.is_tower)).then(ts => shuffleArray<DbTown>(ts));

  const putTown = async (town: DbTown) => {
    const r = Math.random();
    const p = town.population / (30000 * (20 - season));
    if (r >= p) return;

    const townsToGo = Object.fromEntries(
      towns
        .filter((_t) => _t.id !== town.id)
        .map((_t) => {
          const sameCountry = town.country === _t.country ? 2000 : 500;

          const d = Math.round(
            Math.sqrt(
              (town.location[0] - _t.location[0]) *
                (town.location[0] - _t.location[0]) +
                (town.location[1] - _t.location[1]) *
                  (town.location[1] - _t.location[1])
            )
          );

          const distance = (d > 200 ? 200 : d) * 2.5;

          const area = town.area !== _t.area ? 250 : 0;

          return [
            _t.id,
            Math.floor((_t.population + sameCountry + area - distance) / 500),
          ];
        })
    );

    const destination = towns.find(
      (_t) => _t.id === weightedRand(townsToGo)
    )?.location;
    if (!destination) return;

    const activeStart = Math.floor(Math.random() * (119 - 105) + 105);
    const restLength = Math.floor(Math.random() * (50 - 30) + 30);
    const sex = Math.random() < 0.5 ? SEX.MALE : SEX.FEMALE;

    const data: DbTraveler = {
      sex,
      name: getName(sex, town.country),
      id: uuid(),
      origin: town.location,
      destination,
      active: [activeStart + restLength - 120, activeStart],
      actions: await getPath(town.location, destination),
      position: town.location,
    };

    await db.updateTown({
      id: town.id,
      population: town.population - 1,
    } as KeysOf<DbTown>);
    await db.putTraveler(data);
  };

  for (const t in towns) {
    const town = towns[t];
    await putTown(town);
  }

  cache.put("travelers", JSON.stringify(await db.getTravelers()));
  cache.put("towns", JSON.stringify(await db.getTowns()));
};

const updateTravelers = async () => {
  const { time } = await getters.getTime();
  const travelers = await getters.getTravelers();

  let updatedTravelers: DbTraveler[] = [];
  for (const i in travelers) {
    const traveler = travelers[i];

    if (!traveler.actions.length) {
      // Reached the destination

      const town = await db.getTowns().then(
        (ts) =>
          ts.filter((t) => {
            return (
              t.location[0] === traveler.destination[0] &&
              t.location[1] === traveler.destination[1]
            );
          })[0]
      );

      await db.updateTown({
        id: town.id,
        population: town.population + 1,
      } as KeysOf<DbTown>);
      await db.deleteTraveler(traveler.id);
    } else if (
      await isResting(
        time,
        traveler.active[0],
        traveler.active[1],
        traveler.position
      )
    ) {
      // Rest
      updatedTravelers.push(traveler);
    } else {
      // Travel
      const surface = await getSurface();
      const distance =
        surface[traveler.position[1]][traveler.position[0]] === 0 ? 1 : 5;
      const newActions = traveler.actions.slice(distance);

      updatedTravelers.push({
        ...traveler,
        actions: newActions,
        position: traveler.actions[0],
      });
    }
  }

  for (const j in updatedTravelers) {
    await db.updateTraveler(updatedTravelers[j]);
  }
  if (travelers.length - updatedTravelers.length !== 0) {
    cache.put("travelers", JSON.stringify(await db.getTravelers()));
    cache.put("towns", JSON.stringify(await db.getTowns()));
  }
};

const updateTime = async () => {
  const now = await db.getTime();
  let _now = Object.assign({}, now);

  _now.time = _now.time || 0;
  _now.day = _now.day || 0;
  _now.year = _now.year || 0;

  if (_now.time >= 119) {
    _now.time = 0;
    if (_now.day >= 365) {
      _now.day = 0;
      _now.year++;
    } else {
      _now.day++;
    }
  } else {
    _now.time++;
  }

  if (_now.time % 10 === 0) {
    await changePopulation(_now.day);
  }

  _now.timestamp = Date.now();

  const oldSeason = _now.season;
  const newSeason = getSeason(_now.day);
  _now.season = newSeason;

  if (oldSeason !== newSeason) {
    await updatePathsOnSeasonChange();
  }

  await db.updateTime(_now);

  cache.put("time", JSON.stringify(_now));
};

const changePopulation = async (day: number) => {
  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const towns = await db.getTowns();

  const newTowns = towns.map((t) => {
    const [dMin, dMax] = getDeathRatio(day);
    const [bMin, bMax] = getBirthRatio(day);
    const deaths = randomIntFromInterval(dMin, dMax) / (366 * 12 * 1000);
    const births = randomIntFromInterval(bMin, bMax) / (366 * 12 * 1000);

    if (t.is_tower) {
      return {
        ...t,
        population:
          Math.round((t.population - deaths) * 1000000000) / 1000000000,
      };
    } else {
      return {
        ...t,
        population:
          Math.round((t.population - deaths + births) * 1000000000) /
          1000000000,
      };
    }
  });

  for (const i in newTowns) {
    await db.updateTown(newTowns[i]);
  }
  cache.put("towns", JSON.stringify(newTowns));
};

const updatePlayes = async () => {
  const { time } = await getters.getTime();
  const players = await getters.getPlayers();

  let updatedPlayers = [];
  for (const i in players) {
    const data = players[i];
    const { active, actions, position } = data;
    const [from, to] = active;
    const km = data.km || 0;

    if (!actions.length) {
      // Create new path
      const path = await getPath(
        position,
        await getNewDestination(position).then((res) => res.location)
      );
      updatedPlayers.push({
        ...data,
        actions: [
          ...Array(Math.floor(Math.random() * (24 - 10) + 10)).fill(path[0]),
          ...path,
        ],
        destination: path[path.length - 1],
      });
    } else if (await isResting(time, from, to, position)) {
      // Rest
      updatedPlayers.push(data);
    } else {
      // Travel
      const surface = await getSurface();
      const distance = surface[position[1]][position[0]] === 0 ? 1 : 5;
      const newActions = actions.slice(distance);

      updatedPlayers.push({
        ...data,
        actions: newActions,
        position: actions[0],
        km: km + distance,
      });
    }
  }

  for (const j in updatedPlayers) {
    await db.updatePlayer(updatedPlayers[j]);
  }

  cache.put("players", updatedPlayers);
};

const updateGame = async () => {
  await updateTime();
  await updatePlayes();
  await putTravelers();
  await updateTravelers();
};

const getTime = (time: number, timestamp: number, now: number) => {
  const msPassed = now - timestamp;
  const minsPassed = msPassed / 60000;
  const totalMins = Math.floor(((time + minsPassed) * 24 * 60) / 120);
  const hours = Math.floor(totalMins / 60);
  const minutes = Math.floor(totalMins - hours * 60);

  return { hours, minutes };
};

const getDate = (day: number) => {
  const [date, month] = moment(`01-01-2020`, "DD-MM-YYYY")
    .add(day, "days")
    .format("DD-MM")
    .split("-");
  return {
    month: parseInt(month, 10),
    date: parseInt(date, 10),
  };
};

const getGameData = async () => {
  const _getPlayers = getters.getPlayers;

  const _getTime = getters.getTime;

  const players = await _getPlayers();
  const travelers = await getters.getTravelers();
  const { time, timestamp, year, day, season } = await _getTime();
  const now = Date.now();

  const { date, month } = getDate(day);

  const surface = await getSurface();

  return {
    time: getTime(time, timestamp, now),
    date,
    month,
    year,
    season,
    timestamp: now,
    players: players.map((data) => {
      const position = data.position;
      const action =
        (time < data.active[0] || time > data.active[1]) &&
        surface[data.position[1]][data.position[0]] === 0
          ? PLAYER_ACTIONS.REST
          : surface[data.position[1]][data.position[0]] === 0
          ? PLAYER_ACTIONS.WALK
          : PLAYER_ACTIONS.SWIM;

      return {
        id: data.id,
        position,
        action,
        traveled: data.km,
        name: data.name,
        destination: data.destination,
        color: data.color,
      };
    }),
    travelers: travelers.map((data) => {
      const position = data.position;
      const action =
        (time < data.active[0] || time > data.active[1]) &&
        surface[data.position[1]][data.position[0]] === 0
          ? PLAYER_ACTIONS.REST
          : surface[data.position[1]][data.position[0]] === 0
          ? PLAYER_ACTIONS.WALK
          : PLAYER_ACTIONS.SWIM;

      return {
        id: data.id,
        position,
        action,
        name: data.name,
        destination: data.destination,
      };
    }),
  };
};

const getCurrentTime = async () => {
  const { time, timestamp } = await getters.getTime();

  return getTime(time, timestamp, Date.now());
};

export default {
  updateGame,
  getGameData,
  getTime,
  getCurrentTime,
  actions: PLAYER_ACTIONS,
};
