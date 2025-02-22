"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");

const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const usersRoutes = require("./routes/users");
const jobsRoutes = require("./routes/jobs");
const migrateRoutes = require("./routes/migrate");

const morgan = require("morgan");

const app = express();

// Allow frontend requests
app.use(cors({
  origin: "https://react-jobly-frontend-r0jc.onrender.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));

app.use(express.json());
app.use(morgan("tiny"));

// Root route to verify the server is running
app.get("/", (req, res) => {
  res.json({ message: "Jobly API is running!" });
});

// Apply JWT authentication middleware to protected routes
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/companies", companiesRoutes);
app.use("/users", usersRoutes);
app.use("/jobs", jobsRoutes);
app.use("/migrate", migrateRoutes);

/** Handle 404 errors */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
