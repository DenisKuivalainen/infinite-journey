const axios = require("axios");

const db = "automatic",
  url = "http://localhost:4000";

const getPlayers = () =>
  axios({
    method: "post",
    url: `${url}/${db}/players/get`,
  }).then((res) => res?.data?.data);

const updatePlayer = async (data) => {
  await axios({
    method: "post",
    url: `${url}/${db}/players/update`,
    data,
  });
};

const getTime = () =>
  axios({
    method: "post",
    url: `${url}/${db}/map/get`,
    data: { id: "time" },
  }).then((res) => res?.data?.data?.[0]);

const updateTime = async (data) => {
  await axios({
    method: "post",
    url: `${url}/${db}/map/update`,
    data: { ...data, id: "time" },
  });
};

const getTowns = () =>
  axios({
    method: "post",
    url: `${url}/${db}/towns/get`,
  }).then((res) => res?.data?.data);

const updateTown = async (data) => {
  await axios({
    method: "post",
    url: `${url}/${db}/towns/update`,
    data,
  });
};

module.exports = {
  getPlayers,
  updatePlayer,
  getTowns,
  updateTown,
  getTime,
  updateTime,
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
