const cache = require("memory-cache");
const db = require("./accessDB");

const getPlayers = async () => {
    const _p = cache.get("players");

    if (_p) {
      return typeof _p === "string" ? JSON.parse(_p) : _p;
    } else {
      return await db.getPlayers();
    }
}

const getTime = async () => {
    const _t = cache.get("time");

    if (_t) {
      return typeof _t === "string" ? JSON.parse(_t) : _t;
    } else {
      return await db.getTime();
    }
  };

  const getTowns = async () => {
    const _t = cache.get("towns");

    if (_t) {
      return typeof _t === "string" ? JSON.parse(_t) : _t;
    } else {
      return await getTowns();
    }
  }

  module.exports = {
      getPlayers,
      getTime,
      getTowns
  }