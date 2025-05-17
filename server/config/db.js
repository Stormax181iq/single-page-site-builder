require("dotenv").config();
const pg = require("pg");

const { Pool } = pg;

const { PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE } = process.env;

const db = new Pool({
  host: PG_HOST,
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
});

module.exports = db;
