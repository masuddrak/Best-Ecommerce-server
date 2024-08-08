const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require('xss-clean')
const  rateLimit=require('express-rate-limit')
const app = express();

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})
// middelware
app.use(limiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware

const isLogdin = (req, res, next) => {
  console.log("user is Authorize");
  const login = true;
  if (login) {
    req.body.id = 101;
    next();
  } else {
    return res.status(401).send({ message: "please login" });
  }
};

app.get("/", async (req, res) => {
  res.json({ message: "hello word" });
});
app.get("/users", isLogdin, async (req, res) => {
  console.log(req.body.id);
  console.log("Get hg All Users");
  res.status(200).send({ message: "Get hg All Users" });
});

// clent error handel
app.use((req, res, next) => {
  next(createError(404, "!!!sorry not found route"));
});
// server error handel
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = app;
