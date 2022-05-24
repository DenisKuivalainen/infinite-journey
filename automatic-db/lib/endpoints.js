const methods = require("./metods");

const putDB = (req, res) => {
  /**
   * @api {put} /:db Create new DB
   * @apiVersion 1.0.0
   * @apiGroup DB
   * @apiName putDB
   *
   * @apiParam {String} db DB name (should be unique)
   *
   * @apiHeader {String} access-key Acess key value
   *
   * @apiSuccess {String} data  Success message
   * @apiSuccessExample Success response:
   *     HTTP/1.1 200 OK
   *     {
   *       "data": "DB successfully created."
   *     }
   */
  if (req.headers["access-key"] !== process.env.ACCESS_KEY) {
    res.send("Operation not permited");
    return;
  }
  res.send({ data: methods.createDB(req.params.db) });
};

const deleteDB = (req, res) => {
  /**
   * @api {delete} /:db Delete DB
   * @apiVersion 1.0.0
   * @apiGroup DB
   *  @apiName deleteDB
   *
   * @apiParam {String} db DB name (should exist)
   *
   * @apiSuccess {String} data  Success message
   * @apiSuccessExample Success response:
   *     HTTP/1.1 200 OK
   *     {
   *       "data": "DB successfully deleted."
   *     }
   */
  if (req.headers["access-key"] !== process.env.ACCESS_KEY) {
    res.send("Operation not permited");
    return;
  }
  res.send({ data: methods.deleteDB(req.params.db) });
};

const putTable = (req, res) => {
  /**
   * @api {put} /:db/:table Create new table
   * @apiVersion 1.0.0
   * @apiGroup Table
   *  @apiName putTable
   *
   * @apiParam {String} db DB name (should exist)
   * @apiParam {String} table Table name (should be unique)
   *
   * @apiSuccess {String} data  Success message
   * @apiSuccessExample Success response:
   *     HTTP/1.1 200 OK
   *     {
   *       "data": "Table successfully created."
   *     }
   */
  if (req.headers["access-key"] !== process.env.ACCESS_KEY) {
    res.send("Operation not permited");
    return;
  }
  res.send({ data: methods.createTable(req.params.db, req.params.table) });
};

const deleteTable = (req, res) => {
  /**
   * @api {delete} /:db/:table Delete table
   * @apiVersion 1.0.0
   * @apiGroup Table
   *  @apiName deleteTable
   *
   * @apiParam {String} db DB name (should exist)
   * @apiParam {String} table Table name (should exist)
   *
   * @apiSuccess {String} data  Success message
   * @apiSuccessExample Success response:
   *     HTTP/1.1 200 OK
   *     {
   *       "data": "Table successfully deleted."
   *     }
   */
  if (req.headers["access-key"] !== process.env.ACCESS_KEY) {
    res.send("Operation not permited");
    return;
  }
  res.send({ data: methods.deleteTable(req.params.db, req.params.table) });
};

const getItem = (req, res) => {
  /**
   * @api {post} /:db/:table/get Get items
   * @apiVersion 1.0.0
   * @apiGroup Items
   *  @apiName getItem
   *
   * @apiParam {String} db DB name (should exist)
   * @apiParam {String} table Table name (should exist)
   *
   * @apiBody ...params Any params that should be present in searched items. If no params specified, endpoint will return all object of table
   *
   * @apiSuccess {Array} data  Array of found objects
   * @apiSuccessExample Success response:
   *     HTTP/1.1 200 OK
   *     {
   *       "data": [
   *         {"id": "uid1", "type": "a"},
   *         {"id": "uid2", "type": "c"}
   *       ]
   *     }
   */
  res.send({ data: methods.get(req.params.db, req.params.table, req.body) });
};

const putItem = (req, res) => {
  res.send({ data: methods.put(req.params.db, req.params.table, req.body) });
};

const updateItem = (req, res) => {
  res.send({ data: methods.update(req.params.db, req.params.table, req.body) });
};

const deleteItem = (req, res) => {
  res.send({ data: methods.delete(req.params.db, req.params.table, req.body) });
};

module.exports = {
  putDB,
  deleteDB,
  putTable,
  deleteTable,
  getItem,
  putItem,
  updateItem,
  deleteItem,
};
