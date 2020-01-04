//Possibly Change this to sequelize

var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 4040;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/login.html"));
});

app.get("/display", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/results.html"));
});

app.get("/AR", function (req, res) {
  res.sendFile(path.join(__dirname, "./arTest/arExample.html"));
});

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});