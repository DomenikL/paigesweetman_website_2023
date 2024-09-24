const util = require("util");
const mysql = require("mysql");

const createPool = (
  host = "localhost",
  user = "root",
  database = "paige_website_2024"
) => {
  const connectionLimit = 10;
  const db = mysql.createPool({ host, user, database, connectionLimit });
  db.query = util.promisify(db.query);
  return db;
};

module.exports.createPool = createPool;
