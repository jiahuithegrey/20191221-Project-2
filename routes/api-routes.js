var db = require("../models");

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

    //app.post for creating new user

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

};