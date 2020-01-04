//Possibly Change this to sequelize

var express = require("express");
var path = require("path");

var app = express();
app.use(express.static("public"));

var app2 = express();
app2.use(express.static("arTest"));

var PORT = process.env.PORT || 4040;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "login.html"));
});

app2.get("/display", function (req, res) {
  res.sendFile(path.join(__dirname, "results.html"));
});

app.get("/AR", function (req, res) {
  res.sendFile(path.join(__dirname, "arExample.html"));
});

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});