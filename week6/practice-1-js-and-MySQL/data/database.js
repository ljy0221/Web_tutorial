const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  database: "blogs",
  user: "root",
  password: "computer9544",
});

module.exports = pool;
