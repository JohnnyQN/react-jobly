"use strict";

const express = require("express");
const db = require("../db");
const fs = require("fs");
const path = require("path");

const router = new express.Router();

router.get("/", async function (req, res, next) {
  try {
    // Get the absolute path of the schema file
    const sql = fs.readFileSync(path.join(__dirname, "../jobly-schema.sql"), "utf8");
    
    // Remove escape characters that cause syntax errors
    const sanitizedSQL = sql.replace(/\\\"/g, "\"");

    await db.query(sanitizedSQL);
    return res.json({ message: "Database migrated successfully!" });

  } catch (err) {
    console.error("Migration Error:", err);
    return next(err);
  }
});

module.exports = router;
