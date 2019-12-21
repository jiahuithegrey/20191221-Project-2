var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 4040;  

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./atTest/atTest.html"));
  });

  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });