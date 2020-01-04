const axios = require("axios");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

function searchByIngredients(ingredients) {
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
      ingredients: "chicken%2Ceggs"
    }
  })
    .then(response => {
      console.log(response.data);

      // Save data to reduce future API calls
      appendFileAsync(
        "ingredientSearch.json",
        "," + JSON.stringify(response.data)
      ).then(err => {
        if (err) throw err;
        console.log("Data appended to file");
      });
    })

    .catch(error => {
      console.log(error);
    });
}
