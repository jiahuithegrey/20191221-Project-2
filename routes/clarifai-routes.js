const Clarifai = require("clarifai");

const clarifaiAPI = "b23c4e19e7774cb09f6d05960744da61";
const clariApp = new Clarifai.App({ apiKey: clarifaiAPI });

module.exports = function(app) {
  // Predict the contents of an image by passing in a URL.
  app.get("/clarifai/food", function(req, res) {
    const imgUrl = "https://mysmartrecipe206.s3.us-west-2.amazonaws.com/foodToAnalyze";

    clariApp.models
      .predict("bd367be194cf45149e75f01d59f77ba7", imgUrl, { minValue: 0.6 })
      .then(response => {
        let predictions = [];
        response.outputs[0].data.concepts.forEach(pred => {
          let entry = {};
          entry.name = pred.name;
          entry.prob = Math.round(pred.value * 1000) / 10; // Converted to percentage.
          predictions.push(entry);
        });
        res.json(predictions);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
