"use strict";

const express = require("express");
const db = require("../db");
const fs = require("fs");

const router = new express.Router();

router.get("/", async function (req, res, next) {
  try {
    console.log("Running database migration...");

    const sqlFilePath = __dirname + "/../jobly.sql";
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error("Migration file not found!");
    }

    const sql = fs.readFileSync(sqlFilePath, "utf8");
    await db.query(sql);

    return res.json({ message: "Database migrated successfully!" });
  } catch (err) {
    console.error("Migration Error:", err);
    return next(err);
  }
});

module.exports = router;
