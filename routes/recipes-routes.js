const axios = require("axios");

module.exports = function(app) {
  // Get a list of recipes based off ingredients
  app.get("/recipes/search/:ingredients", function(req, res) {
    const ingredients = req.params.ingredients;
    axios({
      method: "GET",
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "afca85a264msh64fcd45e8b5a4c0p107db0jsn24f53663be22"
      },
      params: {
        number: "5",
        ranking: "1",
        ignorePantry: "false",
        ingredients: ingredients
      }
    })
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  });

  // Get recipe information by id in bulk.
  app.get("/recipes/search/bulk/:ids", function(req, res) {
    const ids = req.params.ids;
    axios({
      method: "GET",
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "afca85a264msh64fcd45e8b5a4c0p107db0jsn24f53663be22"
      },
      params: {
        ids: ids
      }
    })
      .then(response => {
        // console.log(response.data);
        let data = [];

        // Parse the response for only relevant data.
        for (let i = 0; i < response.data.length; i++) {
          const parsedData = {
            id: response.data[i].id,
            title: response.data[i].title,
            sourceUrl: response.data[i].sourceUrl,
            image: response.data[i].image,
            cookingMinutes: response.data[i].readyInMinutes,
            servings: response.data[i].servings,
            extendedIngredients: response.data[i].extendedIngredients,
            analyzedInstructions: response.data[i].analyzedInstructions
          };
          data.push(parsedData);
        }
        res.json(data);
      })
      .catch(error => {
        console.log(error);
      });
  });
};
