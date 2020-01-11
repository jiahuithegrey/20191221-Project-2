var db = require("../models");
const fs = require("fs")
var passport = require("../config/passport");

module.exports = function (app) {
    app.get("/api/users/:id", function (req, res) {
        // pulls up data for user based on user id
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Favorites]
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/api/recipes", function(req, res) {
        //adds recipe to user
        db.Recipe.create(req.body).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.post("/api/users", function(req, res) {
        //adds new user
        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/api/recipes", function (req, res) {
        //pulls all saved recipes from one user
        var query = {};
        if (req.query.user_id) {
            query.UserId = req.query.user_id;
        }
        db.Recipe.findAll({
            where: query,
            include: [db.User]
        }).then(function (dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.get("/api/recipes/:id", function (req, res) {
        //find one recipe by recipe id
        db.Recipe.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function (dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.delete("/api/recipes/:id", function (req, res) {
        //deletes saved recipe
        db.Recipe.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.put("/api/recipes", function (req, res) {
        //updates saved recipes
        db.Recipe.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbRecipe) {
                res.json(dbRecipe);
            });
    });

    app.post("/saveImg", function(req, res) {
        const img = req.body.img;
        let buff = new Buffer(img, 'base64');
        let text = buff.toString('ascii');
        console.log(text.slice(0, 50))
        // fs.writeFile("./public/img/analyzeImg.png", img, function(err) {
        //     if (err) throw err;
        //     console.log("Image saved.")
        // })
    })

    //for signup/login

    app.post("/api/createprofile", function(req, res) {
        db.User.create({
            userName: req.body.userName,
            emailAddress: req.body.emailAddress,
            password: req.body.password
        })
        .then(function() {
            res.redirect(307, "/api/signin");
        })
        .catch(function(err) {
            res.status(401).json(err);
        });
    });

    app.post("/api/signin", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });
};