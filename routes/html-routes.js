var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.render("index");
    });    

    app.get("/camera", function(req, res) {
        res.render("camera");
    }); 
    
    app.get("/ingredient", function(req, res) {
<<<<<<< HEAD
        res.sendFile(path.join(__dirname, "../public/ingredient.html"));
=======
        res.render("ingredient");
>>>>>>> origin/master
    }); 

    app.get("/recipe", function(req, res) {
        res.render("recipe", {recipes: ["waffle", "fish", "bbq"]});
    });  

    app.get("/createprofile", function(req, res) {
        res.render("createprofile");
    }); 

//     app.get("/upload", function(req, res) {
//         res.render("upload");
//     });

}