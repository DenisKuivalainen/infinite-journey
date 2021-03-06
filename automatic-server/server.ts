import express, { Express, Request, Response } from "express";
import cors from "cors";
import game from "./lib/updateGame";
import map from "./lib/map";
import matrix from "./lib/getMatrix";
import bodyParser from "body-parser";
import db from "./lib/accessDB";

const {  getGameData } = game;
const { getMapData } = map;
const { getSurface } = matrix;
const { putPlayer } = db;

const app: Express = express();

const port = 3000;
app.use(cors());
app.use(bodyParser.json());

require("./server/schedule")

app.put("/user", async (req: Request, res: Response) => {
  const isHexColor = (hex: string) =>
    typeof hex === "string" && hex.length === 6 && !isNaN(Number("0x" + hex));

  const body = req.body;
  if (
    req.headers["x-api-key"] !== process.env.SERVER_KEY! ||
    !body.name ||
    !body.color ||
    !isHexColor(body.color)
  ) {
    res.send({ ok: true });
    return;
  }

  await putPlayer({
    name: body.name,
    color: body.color,
  });

  res.send({ ok: true });
});

app.get("/surface", async (req: Request, res: Response) => {
  res.send(await getSurface());
});

app.get("/map", async (req: Request, res: Response) => {
  const map = await getMapData();
  res.send(map);
});

app.get("/data", async (req: Request, res: Response) => {
  res.send(await getGameData());
});

app.use(express.static(`${process.env.ROOT_DIR}/../automatic-web/build`));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});