"use strict";
/** Database setup for jobly. */

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

try {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });

  db.connect()
    .then(() => console.log("Connected to PostgreSQL Database"))
    .catch(err => console.error("Database Connection Error:", err));
} catch (error) {
  console.error("Critical Database Error:", error);
}

module.exports = db;
