import { DbPlayer, DbTime, DbTown, DbTraveler } from "./types";
import cache from "memory-cache";
import db from "./accessDB";

const getPlayers = async () => {
  const _p = cache.get("players") as DbPlayer[] | string;

  if (_p) {
    return typeof _p === "string" ? (JSON.parse(_p) as DbPlayer[]) : _p;
  } else {
    return await db.getPlayers();
  }
};

const getTime = async () => {
  const _t = cache.get("time") as DbTime | string;

  if (_t) {
    return typeof _t === "string" ? (JSON.parse(_t) as DbTime) : _t;
  } else {
    return await db.getTime();
  }
};

const getTowns = async () => {
  const _t = cache.get("towns") as DbTown[] | string;

  if (_t) {
    return typeof _t === "string" ? (JSON.parse(_t) as DbTown[]) : _t;
  } else {
    return await db.getTowns();
  }
};

const getTravelers = async () => {
  const _t = cache.get("travelers") as DbTraveler[] | string;

  if (_t && _t !== "null") {
    return typeof _t === "string" ? (JSON.parse(_t) as DbTraveler[]) : _t;
  } else {
    return await db.getTravelers();
  }
};

export default {
  getPlayers,
  getTime,
  getTowns,
  getTravelers,
};