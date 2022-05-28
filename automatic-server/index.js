const express = require("express");
const cors = require("cors");
const { updateGame, getGameData } = require("./lib/updateGame");
const { getMapData } = require("./lib/map");
const { getSurface } = require("./lib/getMatrix");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const loopUpdateGame = async () => {
  while (true) {
    updateGame();
    await delay(60000);
  }
};

const app = express();

const port = 8080;
app.use(cors());

app.get("/surface", async (req, res) => {
  res.send(await getSurface());
});

app.get("/map", async (req, res) => {
  const map = await getMapData();
  res.send(map);
});

app.get("/", async (req, res) => {
  await delay(1000);

  res.send(await getGameData());
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

loopUpdateGame();
