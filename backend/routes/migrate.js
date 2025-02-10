"use strict";

const express = require("express");
const db = require("../db");
const fs = require("fs");

const router = new express.Router();

router.get("/", async function (req, res, next) {
  try {
    const sql = fs.readFileSync("jobly.sql", "utf8");
    await db.query(sql);
    return res.json({ message: "Database migrated successfully!" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
