const fs = require("fs");
const getPath = require("./getPath");
const log = require("./log");
const { getNewDestination } = require("./map");
const surface = require("../matrix/surface.json");
const cache = require("memory-cache");

const gameFile = `${__dirname}/../game.json`;

const getGameJson = () => {
  const gameBuffer = fs.readFileSync(gameFile);
  return JSON.parse(gameBuffer.toString());
};

const writeGame = (obj) => {
  fs.writeFileSync(gameFile, JSON.stringify(obj));
};

const isResting = (time, from, to, [x, y]) =>
  (time < from || time > to) && surface[y][x] === 0;

const updateGame = () => {
  let game = getGameJson();
  
  game.time = game.time || 0
  game.day = game.day || 0
  game.year = game.year || 0

  if (game.time >= 119) {
    game.time = 0;
    if (game.day >= 365) {
      game.day = 0;
      game.year++;
    } else {
      game.day++;
    }
  } else {
    game.time++;
  }

  game.timestamp = Date.now();

  const players = Object.fromEntries(
    Object.entries(game.players).map(([name, data]) => {
      const { active, actions, position } = data;
      const { from, to } = active;
      const km = data.km || 0

      if (!actions.length) {
        log("New path");
        const path = getPath(position, getNewDestination(position).location);
        return [
          name,
          {
            ...data,
            actions: [...Array(10).fill(path[0]), ...path],
            destination: path[path.length - 1],
          },
        ];
      } else if (isResting(game.time, from, to, data.position)) {
        log("Rest");
        return [name, data];
      } else {
        log("Travel");
        const distance = surface[position[1]][position[0]] === 0 ? 1 : 5
        const newActions = actions.slice(
          distance
        );

        return [name, { ...data, actions: newActions, position: actions[0], km: km + distance }];
      }
    })
  );
  game.players = players;

  cache.put("game", parseGameJson(game));
  writeGame(game);
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

const parseGameJson = (gameJson) => {
  const { players, time, timestamp } = gameJson;
  const now = Date.now();

  return {
    time: getTime(time, timestamp, now),
    timestamp: now,
    players: Object.entries(players).map(([name, data]) => {
      const position = data.position;
      const action = isResting(
        time,
        data.active.from,
        data.active.to,
        data.position
      )
        ? actions.REST
        : surface[data.position[1]][data.position[0]] === 0
        ? actions.WALK
        : actions.SWIM;

      return {
        position,
        action,
        name,
        destination: data.destination,
        color: data.color,
      };
    }),
  };
};

const getGameData = () => parseGameJson(getGameJson());

const getCurrentTime = () => {
  const { time, timestamp } = getGameJson();

  return getTime(time, timestamp);
};

module.exports = {
  updateGame,
  getGameData,
  getTime,
  getCurrentTime,
  actions,
};
