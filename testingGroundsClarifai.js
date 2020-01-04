{
  var clarifaiAPI = "b23c4e19e7774cb09f6d05960744da61";
}

const Clarifai = require("clarifai");

// Instantiate a new Clarifai app by passing in your API key.
const app = new Clarifai.App({ apiKey: clarifaiAPI });

// Predict the contents of an image by passing in a URL.
app.models
  .predict(
    "bd367be194cf45149e75f01d59f77ba7",
    "https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg",
    { minValue: 0.6 }
  )
  .then(response => {
    // console.log(response.outputs[0].data.concepts);
    // console.log(response.outputs);
    let predictions = [];
    response.outputs[0].data.concepts.forEach(pred =>
      // console.log(pred.name)
      predictions.push(pred.name)
    );
    console.log(predictions);
  })
  .catch(err => {
    console.log(err);
  });
