const Clarifai = require("clarifai");

const clarifaiAPI = "b23c4e19e7774cb09f6d05960744da61";
const clariApp = new Clarifai.App({ apiKey: clarifaiAPI });

// Picture of a burger for testing.
// const testImg = "https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg";

module.exports = function(app) {
  // Predict the contents of an image by passing in a URL.
  app.get("/clarifai/food", function(req, res) {
    const imgUrl = req.body.img;

    clariApp.models
      .predict("bd367be194cf45149e75f01d59f77ba7", imgUrl, { minValue: 0.6 })
      .then(response => {
        let predictions = [];
        response.outputs[0].data.concepts.forEach(pred =>
          predictions.push(pred.name)
        );
        res.json(predictions);
      })
      .catch(err => {
        console.log(err);
      });
  });
};