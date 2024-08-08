const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');

const app = express();
const port = 30001;

// middelware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())


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
  res.status(401).json({ message: "not foud route" });
  next();
});
// server error handel
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!');
})

module.exports=app;