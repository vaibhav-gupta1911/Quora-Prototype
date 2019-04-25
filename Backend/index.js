//import the require dependencies
var express = require("express");
var app = express(); //.router();
var bodyParser = require("body-parser");
var session = require("express-session");

var cors = require("cors");
const fs = require("fs");

app.set("view engine", "ejs");
var mysql = require("mysql");
const multer = require("multer");
const path = require("path");
var cors = require("cors");
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });

var login = require("./routes/login");
var signup = require("./routes/signup");
var question = require("./routes/question");
var answer = require("./routes/answer");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require("./config/passport")(passport);

app.use("/users/login", login);
app.use("/users/signup", signup);
app.use("/users/question", question);
app.use("/users/answer", answer);

//Storing documents/Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post("/uploadprofile", upload.array("photos", 5), (req, res) => {
  if (req.session.user) {
    console.log("working on profiles");
    console.log("req.body", req.body);
    res.end();
  }
});

//start your server on posrt 3001
app.listen(3001);
console.log("Server Listening on port 3000");
