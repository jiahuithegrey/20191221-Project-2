const ingredients = [];
const recipes = [];

$("#recipe-button").on("click", function(event){
    event.preventDefault();
    var newFood = $("#food-input").val().trim();
    foodBtnEl.push(newIngredient);
    getRecipe(newIngredient);
});

function arrayButtons() {
    $("#button-view").empty();
    for (var i= 0; i < foodBtnEl.length; i++) {
        var buttonEl = $("<button>");

        buttonEl.addClass("food-btn");
        buttonEl.attr("data-name", foodBtnEl[i]);      
        buttonEl.attr("data-year", beerYear[i]);            
        buttonEl.text(foodBtnEl[i]);

        $("#button-view").prepend(buttonEl);
    }
}   

function getRecipe(ingredientsPicked) { 
    var userInput = newFood;
    var queryURL = "https://api.punkapi.com/v2/beers/?food=" + userInput;
    $.ajax({
        url: queryURL,
        method: "GET"         
    }).then(function(response) {
        var random = Math.floor(Math.random()*response.length);

        if (response[random].first_brewed.length === 7){
            var year = response[random].first_brewed.slice(3);
        } else{
            var year = response[random].first_brewed;
        }

        
        beerYear.push(year);

        arrayButtons(); 
        updateBeer(response, random);
        getMovie(year);            
    });
}        

function updateRecipe(){
    
}