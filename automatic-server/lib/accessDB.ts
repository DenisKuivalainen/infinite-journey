import { DbPlayer, DbTime, DbTown, DbTraveler, KeysOf } from "./types";
import { v4 as uuid } from "uuid";
import axios from "axios";

const db = "automatic",
  url = "http://localhost:4000";

const headers = {
  "x-api-key": process.env.API_KEY!,
};

const getPlayers = () =>
  axios({
    method: "post",
    url: `${url}/${db}/players/get`,
    headers,
  }).then((res) => res?.data?.data as DbPlayer[]);

const putPlayer = async (data: Pick<DbPlayer, "name" | "color">) => {
  const towns = await getTowns();

  const activeStart = Math.floor(Math.random() * (119 - 105) + 105);
  const restLength = Math.floor(Math.random() * (50 - 30) + 30);

  const playerData: DbPlayer = {
    ...data,
    id: uuid(),
    actions: [],
    position: towns[Math.floor(Math.random() * towns.length)].location,
    destination: [0, 0],
    active: [activeStart + restLength - 120, activeStart],
    km: 0,
  };

  await axios({
    method: "put",
    url: `${url}/${db}/players/put`,
    data: playerData,
    headers,
  });
};

const updatePlayer = async (data: KeysOf<DbPlayer>) => {
  await axios({
    method: "post",
    url: `${url}/${db}/players/update`,
    data,
    headers,
  });
};

const getTime = () =>
  axios({
    method: "post",
    url: `${url}/${db}/map/get`,
    data: { id: "time" },
    headers,
  }).then((res) => res?.data?.data?.[0] as DbTime);

const updateTime = async (data: KeysOf<DbTime>) => {
  await axios({
    method: "post",
    url: `${url}/${db}/map/update`,
    data: { ...data, id: "time" },
    headers,
  });
};

const getTowns = () =>
  axios({
    method: "post",
    url: `${url}/${db}/towns/get`,
    headers,
  }).then((res) => res?.data?.data as DbTown[]);

const updateTown = async (data: KeysOf<DbTown>) => {
  await axios({
    method: "post",
    url: `${url}/${db}/towns/update`,
    data,
    headers,
  });
};

const getTravelers = () =>
  axios({
    method: "post",
    url: `${url}/${db}/travelers/get`,
    headers,
  }).then((res) => res?.data?.data as DbTraveler[]);

const putTraveler = async (data: DbTraveler) => {
  await axios({
    method: "put",
    url: `${url}/${db}/travelers/put`,
    data,
    headers,
  });
};

const updateTraveler = async (data: KeysOf<DbTraveler>) => {
  await axios({
    method: "post",
    url: `${url}/${db}/travelers/update`,
    data,
    headers,
  });
};

const deleteTraveler = async (id: string) => {
  await axios({
    method: "delete",
    url: `${url}/${db}/travelers/delete`,
    data: {
      id,
    },
    headers,
  });
};

export default {
  getPlayers,
  putPlayer,
  updatePlayer,
  getTowns,
  updateTown,
  getTime,
  updateTime,

  getTravelers,
  putTraveler,
  updateTraveler,
  deleteTraveler,
};

// const fill = async () => {
//     function randomIntFromInterval(min, max) {
//         return Math.floor(Math.random() * (max - min) + min)
//       }

//       const pop = {
//           TOWER: [10, 50],
//           SMALL: [100, 500],
//           MEDIUM: [500, 1500],
//           BIG: [1500, 3000]
//       }

//     const ts = towns.map(t => {
//         const {location, area, country, id, name} = t

//         return {
//             location, area, country, id, name,
//             population: randomIntFromInterval(...pop[t.size]),
//             is_tower: t.size === "TOWER"
//         }
//     })

//     for(const t in ts) {
//         await axios({
//             method: "put",
//             url: `${url}/${db}/towns/put`,
//             data: ts[t]
//         })

//     }
// }

// fill()
