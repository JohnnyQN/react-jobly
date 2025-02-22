"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");
const User = require("../models/user");
const express = require("express");
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");

const router = new express.Router();

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */
router.post("/token", async function (req, res, next) {
  try {
    console.log("Login attempt:", req.body);

    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      console.error("Validation failed:", errs);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    const user = await User.authenticate(username, password);

    if (!user) {
      console.error("Authentication failed for user:", username);
      throw new BadRequestError("Invalid username/password");
    }

    const token = createToken(user);
    return res.json({ token });

  } catch (err) {
    console.error("Login error:", err);
    return next(err);
  }
});

/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */
router.post("/register", async function (req, res, next) {
  try {
    console.log("Registering user:", req.body);

    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      console.error("Validation error:", errs);
      throw new BadRequestError(errs);
    }

    const newUser = await User.register({ ...req.body, isAdmin: false });
    const token = createToken(newUser);

    return res.status(201).json({ token });

  } catch (err) {
    console.error("Registration error:", err);
    return next(err);
  }
});

module.exports = router;
