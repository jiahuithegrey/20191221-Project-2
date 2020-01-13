var db = require("../models");
const fs = require("fs")
var passport = require("../config/passport");
const base64Img = require("base64-img");
var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-west-2"
});

var s3 = new AWS.S3();

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

    // Takes in the base64 of an image and saves it to a png locally.
    app.post("/saveImgLocally", function(req, res) {
        const img = req.body.imgBase64;
        base64Img.img(img, "./public/img/", "foodToAnalyze", function(err, filepath) {
            if (err) throw err;
        });
    });

    // Takes in the base64 of an image and saves it to a png to AWS.
    app.post("/saveImg", function(req, res) {
        const img = req.body.imgBase64;
        buf = new Buffer.from(img.replace("data:image/png;base64,", ""), 'base64');
        var bucketName = 'mysmartrecipe206';
        var params = {
            Bucket: bucketName, 
            Key: "foodToAnalyze", 
            Body: buf, 
            ContentType: 'image/png', 
            ContentEncoding: 'base64',
            ACL: 'public-read'
        };
        s3.upload(params, function (err, data) {
            if (err) return res.status(500).send(err);
            
            res.json(data);
        });
    });

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