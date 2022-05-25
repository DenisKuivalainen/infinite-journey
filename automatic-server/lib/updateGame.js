const getPath = require("./getPath");
const log = require("./log");
const { getNewDestination } = require("./map");
const surface = require("../matrix/surface.json");
const cache = require("memory-cache");
const db = require("./accessDB");
const moment = require("moment");

const isResting = (time, from, to, [x, y]) =>
  (time < from || time > to) && surface[y][x] === 0;

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

  _now.timestamp = Date.now();

  await db.updateTime(_now);

  cache.put("time", JSON.stringify(_now));
};

const updatePlayes = async () => {
  const { time } = await db.getTime();
  const players = await db.getPlayers();

  let updatedPlayers = [];
  for (const i in players) {
    const data = players[i];
    const { active, actions, position } = data;
    const [from, to] = active;
    const km = data.km || 0;

    if (!actions.length) {
      // Create new path
      const path = getPath(
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
    } else if (isResting(time, from, to, position)) {
      // Rest
      updatedPlayers.push(data);
    } else {
      // Travel
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
  const _getPlayers = async () => {
    const _p = cache.get("players");

    if (_p) {
      return typeof _p === "string" ? JSON.parse(_p) : _p;
    } else {
      return await db.getPlayers();
    }
  };

  const _getTime = async () => {
    const _t = cache.get("time");

    if (_t) {
      return typeof _t === "string" ? JSON.parse(_t) : _t;
    } else {
      return await db.getTime();
    }
  };

  const players = await _getPlayers();
  const { time, timestamp, year, day } = await _getTime();
  const now = Date.now();

  const { date, month } = getDate(day);

  return {
    time: getTime(time, timestamp, now),
    date,
    month,
    year,
    timestamp: now,
    players: players.map((data) => {
      const position = data.position;
      const action = isResting(
        time,
        data.active[0],
        data.active[1],
        data.position
      )
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
  const { time, timestamp } = db.getTime();

  return getTime(time, timestamp);
};

module.exports = {
  updateGame,
  getGameData,
  getTime,
  getCurrentTime,
  actions,
};
