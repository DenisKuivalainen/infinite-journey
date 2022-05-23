const express = require("express");
const bodyParser = require("body-parser");
const methods = require("./lib/metods");

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.get("/:db/:table/items", (req, res) => {
  res.send(methods.get(req.params.db, req.params.table, req.body));
});
app.put("/:db/:table/items", (req, res) => {
  res.send(methods.put(req.params.db, req.params.table, req.body));
});
app.post("/:db/:table/items", (req, res) => {
  res.send("update table");
});
app.delete("/:db/:table/items", (req, res) => {
  res.send("delete table");
});

app.put("/:db/:table", (req, res) => {
  res.send(methods.createTable(req.params.db, req.params.table));
});
app.delete("/:db/:table", (req, res) => {
  res.send(methods.deleteTable(req.params.db, req.params.table));
});

app.put("/:db", (req, res) => {
  res.send(methods.createDB(req.params.db));
});
app.delete("/:db", (req, res) => {
  res.send(methods.deleteDB(req.params.db));
});

app.get("/", (req, res) => {
  res.send("Welcome to Automatic DB");
});

app.listen(port, () => {
  console.log(`DB listening on port ${port}`);
});
