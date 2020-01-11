//Possibly Change this to sequelize
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
// const myParser = require("body-parser");

var passport = require("./config/passport");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(express.json({ limit: "2mb" }));

// app.use(myParser.json({limit: '200mb'}));
// app.use(myParser.urlencoded({limit: '200mb', extended: true}));
// Static directory
app.use(express.static("public"));

//for login authentication
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//connect with handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes, names are place holders
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/clarifai-routes.js")(app);
require("./routes/recipes-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
});
