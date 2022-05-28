const getPath = require("./getPath");
const log = require("./log");
const { getNewDestination } = require("./map");
const cache = require("memory-cache");
const db = require("./accessDB");
const moment = require("moment");
const { getSeason, getDeathRatio, getBirthRatio } = require("./season");
const { getSurface, getPathfinding } = require("./getMatrix");
const getters = require("./getters");

const isResting = async (time, from, to, [x, y]) => {
  const surface = await getSurface();
  return (time < from || time > to) && surface[y][x] === 0;
};

const updatePathsOnSeasonChange = async () => {
  const pathfinding = await getPathfinding();
  const players = await getters.getPlayers();
  let newPlayers = [];

  for (i in players) {
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

const changePopulation = async (day) => {
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const towns = await db.getTowns();

  const newTowns = towns.map((t) => {
    const deaths =
      randomIntFromInterval(...getDeathRatio(day)) / (366 * 12 * 1000);
    const births =
      randomIntFromInterval(...getBirthRatio(day)) / (366 * 12 * 1000);

    if (t.tower) {
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
};

const actions = {
  WALK: "WALK",
  SWIM: "SWIM",
  REST: "REST",
};

const getTime = (time, timestamp, now) => {
  const msPassed = now - timestamp;
  log(now, timestamp);
  const minsPassed = msPassed / 60000;
  log(minsPassed);
  const totalMins = Math.floor(((time + minsPassed) * 24 * 60) / 120);
  const hours = Math.floor(totalMins / 60);
  const minutes = Math.floor(totalMins - hours * 60);

  return { hours, minutes };
};

const getDate = (day) => {
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
          ? actions.REST
          : surface[data.position[1]][data.position[0]] === 0
          ? actions.WALK
          : actions.SWIM;

      return {
        position,
        action,
        traveled: data.km,
        name: data.name,
        destination: data.destination,
        color: data.color,
      };
    }),
  };
};

const getCurrentTime = async () => {
  const { time, timestamp } = await getters.getTime();

  return getTime(time, timestamp);
};

module.exports = {
  updateGame,
  getGameData,
  getTime,
  getCurrentTime,
  actions,
};
