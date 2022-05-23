const fs = require("./fileSystem");

const createDB = (db) => {
  if (fs.checkDB(db)) throw Error(`DB "${db}" already exists.`);
  if (!fs.createDB(db)) throw Error("Failed to create DB.");
  return "DB successfully created.";
};

const deleteDB = (db) => {
  if (!fs.checkDB(db)) throw Error(`DB "${db}" does not exist.`);
  if (!fs.deleteDB(db)) throw Error("Failed to delete DB.");
  return "DB successfully deleted.";
};

const createTable = (db, table) => {
  if (!fs.checkDB(db)) throw Error(`DB "${db}" does not exist.`);
  if (fs.checkTable(db, table)) throw Error(`Table "${table}" already exists.`);
  if (!fs.createTable(dg, table)) throw Error("Failed to create table.");
  return "Table successfully created.";
};

const deleteTable = (db, table) => {
  if (!fs.checkDB(db)) throw Error(`DB "${db}" does not exist.`);
  if (!fs.checkTable(db, table))
    throw Error(`Table "${table}" does not exist.`);
  if (!fs.deleteTable(db, table)) throw Error("Failed to delete Table.");
  return "Table successfully deleted.";
};

const get = (db, table, searchFields) => {
  if (!fs.checkDB(db)) throw Error(`DB "${db}" does not exist.`);
  if (!fs.checkTable(db, table))
    throw Error(`Table "${table}" does not exist.`);

  const data = fs.readTable(db, table);
  if (!data) throw Error(`Failed to read from table "${table}".`);

  if (searchFields) {
    const fieldsArr = Object.entries(searchFields);
    if (fieldsArr.length) {
      return data.filter((d) => {
        return fieldsArr.every(([k, v]) => {
          return d[k] === v;
        });
      });
    }
  }

  return data;
};

const put = (db, table, data) => {
  if (!fs.checkDB(db)) throw Error(`DB "${db}" does not exist.`);
  if (!fs.checkTable(db, table))
    throw Error(`Table "${table}" does not exist.`);
  if (!data) throw Error(`Data not specified.`);
  if (!data.id) throw Error(`ID not specified.`);

  const dataInDB = fs.readTable(db, table);
  if (!dataInDB) throw Error(`Failed to read from table "${table}".`);

  if (dataInDB.some((d) => d.id === data.id))
    throw Error(`ID already excists in table "${table}".`);

  if (!fs.updateTable(db, table, [...dataInDB, data]))
    throw Error(`Failed to write to table "${table}".`);

  return "Item recorded successfully.";
};

const update = () => {};

const _delete = () => {};

module.exports = {
  createDB,
  deleteDB,
  createTable,
  deleteTable,
  get,
  put,
  update,
  delete: _delete,
};
