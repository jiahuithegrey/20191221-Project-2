const axios = require("axios");

module.exports = function(app) {
  // Get a list of recipes based off ingredients
  app.get("/recipes/search/ingredients", function(req, res) {
    const ingredients = req.body.ingredients.join(",");
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
  app.get("/recipes/search/id/bulk", function(req, res) {
    const ids = req.body.ids.join(",");

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
            preparationMinutes: response.data[i].preparationMinutes,
            cookingMinutes: response.data[i].cookingMinutes,
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

/*
EVERYTHING BELOW IS FOR TESTING PURPOSES. TO DELETE LATER.

const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

const recipes = JSON.parse(fs.readFileSync("./ingredientSearch.json")) || null;
const recipeIds = [];

recipes.forEach(recipe => recipeIds.push(recipe.id));
console.log(recipeIds);

const recipesByIds = JSON.parse(fs.readFileSync("./recipesByIds.json")) || null;
console.log(recipesByIds);

// ingredients is an array of strings
function searchRecipeByIngredients(ingredients) {
  let ingreds = ingredients.join(",");
  axios({
    method: "GET",
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "afca85a264msh64fcd45e8b5a4c0p107db0jsn24f53663be22"
    },
    params: {
      number: "5",
      ranking: "1",
      ignorePantry: "false",
      ingredients: ingreds
    }
  })
    .then(response => {
      console.log(response.data);

      // Save data to reduce future API calls
      writeFileAsync(
        "ingredientSearch.json",
        JSON.stringify(response.data)
      ).then(err => {
        if (err) throw err;
        console.log("Data appended to file");
      });
    })

    .catch(error => {
      console.log(error);
    });
}

// ids is an array of numbers
function bulkRecipeSearchById(ids) {
  let idStr = ids.join(",");
  axios({
    method: "GET",
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "afca85a264msh64fcd45e8b5a4c0p107db0jsn24f53663be22"
    },
    params: {
      ids: idStr
    }
  })
    .then(response => {
      // console.log(response.data);
      let data = [];
      for (let i = 0; i < response.data.length; i++) {
        const parsedData = {
          id: response.data[i].id,
          title: response.data[i].title,
          sourceUrl: response.data[i].sourceUrl,
          image: response.data[i].image,
          preparationMinutes: response.data[i].preparationMinutes,
          cookingMinutes: response.data[i].cookingMinutes,
          servings: response.data[i].servings,
          extendedIngredients: response.data[i].extendedIngredients,
          analyzedInstructions: response.data[i].analyzedInstructions
        };
        data.push(parsedData);
      }

      writeFileAsync("recipesByIds.json", JSON.stringify(data)).then(err => {
        if (err) throw err;
        console.log("Data written to file");
      });
    })
    .catch(error => {
      console.log(error);
    });
}

*/
