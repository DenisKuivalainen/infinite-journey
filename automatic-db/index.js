const express = require("express");
const bodyParser = require("body-parser");
const {
  putDB,
  deleteDB,
  getItem,
  putItem,
  updateItem,
  deleteItem,
  putTable,
} = require("./lib/endpoints");
const { deleteTable } = require("./lib/metods");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post("/:db/:table/get", getItem);
app.put("/:db/:table/put", putItem);
app.post("/:db/:table/update", updateItem);
app.delete("/:db/:table/delete", deleteItem);

app.put("/:db/:table", putTable);
app.delete("/:db/:table", deleteTable);

app.put("/:db", putDB);
app.delete("/:db", deleteDB);

app.use(express.static("build"));

app.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

app.listen(port, () => {
  console.log(`DB listening on port ${port}`);
});
