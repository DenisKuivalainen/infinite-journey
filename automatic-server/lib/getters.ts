import { DbPlayer, DbTime, DbTown, DbTraveler } from "./types";
import db from "./accessDB";

const getPlayers = async () => db.getPlayers()

const getTime = async () =>db.getTime()

const getTowns = async () => db.getTowns()

const getTravelers = async () => db.getTravelers()

export default {
  getPlayers,
  getTime,
  getTowns,
  getTravelers,
};
