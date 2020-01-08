var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });    

    app.get("/camera", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/camera.html"));
    });   
    
    app.get("/intro", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/intro.html"));
    }); 

    app.get("/output", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/output.html"));
    }); 

    app.get("/profile", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    }); 

    app.get("/upload", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/upload.html"));
    });

    app.get("/recipe", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/recipe.html"));
    });

    app.get("/ingredient", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/ingredient.html"));
    });
}