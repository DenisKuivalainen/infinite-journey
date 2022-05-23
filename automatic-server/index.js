const express = require("express");
const cors = require("cors");
const { updateGame, getGameData } = require("./lib/updateGame");
const surface = require("./matrix/surface.json");
const { mapData } = require("./lib/map");
const cache = require("memory-cache");

const app = express();

const port = 8080;
app.use(cors());
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const loopUpdateGame = async () => {
  while (true) {
    updateGame();
    await delay(60000);
  }
};

app.get("/surface", (req, res) => {
  res.send(surface);
});

app.get("/map", (req, res) => {
  res.send(mapData);
});

app.get("/", async (req, res) => {
  await delay(1000);

  const gameFromCache = cache.get("game");
  if (gameFromCache) {
    res.send(gameFromCache);
  } else {
    res.send(getGameData());
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

loopUpdateGame();
