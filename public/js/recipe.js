$(document).ready(function() {
  const recipeIds = [];
  const recipeInfo = [];
  const ingredients = localStorage.getItem("ingredients")

  $("#selected-ingreds").text(ingredients.split(",").join(", "))
  getRecipeIds(ingredients)

  function getRecipeIds(ingredients) {
    $.get("/recipes/search/" + ingredients, function(recipes) {
      for (let recipe of recipes) {
        recipeIds.push(recipe.id)
      }
      console.log(recipeIds)
      getRecipes(recipeIds)
    })
  }

  function getRecipes(recipeIds) {
    const ids = recipeIds.join(",");
    console.log(ids)
    $.get("/recipes/search/bulk/" + ids, function(recipes) {
      recipeInfo.push(...recipes);
      buildRecipeCards(recipes)
    })
  }

  function buildRecipeCards(recipes) {
    let recipeCount = 0;
    for (let recipe of recipes) {
      let colDiv = $("<div class='col-sm-12 col-md-3'>")
      let cardDiv = $("<div class='card'>");
      let img = $(`<img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">`);
      let cardBody = $('<div class="card-body">')
      let title = $(`<h5 class="card-title">${recipe.title}</h5>`);
      let cardText = $('<div class="card-text">');
      let link = $(`<button id="see-recipe" class="btn btn-block btn-primary" data-toggle="modal" data-target="#recipe-instructions" data-num="${recipeCount}">See Recipe</button>`)
      cardText.append(link);
      cardBody.append(title).append(cardText);
      cardDiv.append(img).append(cardBody);
      colDiv.append(cardDiv);
      $("#recipe-cards").append(colDiv);
      recipeCount++;
    }

    $('#recipe-instructions').on('show.bs.modal', function (event) {
      const button = $(event.relatedTarget);
      const recipeNum = button.data('num');
      const recipe = recipeInfo[recipeNum];
      var modal = $(this);
      modal.find('#recipe-title').text(recipe.title);
      modal.find('#recipe-img').attr("src", recipe.image);
      modal.find('#cooking-time').text(`Cooking Time: ${recipe.cookingMinutes}`)
      modal.find('#servings').text(`Servings: ${recipe.servings}`)
      for (let ingredient of recipe.extendedIngredients) {
        let li = $(`<li>${ingredient.originalString}</li>`);
        modal.find("#ingredients").append(li);
      }
      for (let step of recipe.analyzedInstructions[0].steps) {
        let li = $(`<li>${step.step}</li>`)
        modal.find("#instructions").append(li);
      }
      modal.find("#recipe-source").attr("href", recipe.sourceUrl);
    })
  }
})