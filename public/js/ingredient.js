$(document).ready(function() {
    $("#photo-captured").attr("src", "/img/foodToAnalyze.png");
    
    $.ajax({
        method: "GET",
        url: "/clarifai/food"
    }).then(function(ingredients) {
        for(let ingredient of ingredients) {
            let tr = $("<tr>");
            let name = $(`<td>${ingredient.name}</td>`)
            let prob = $(`<td>${ingredient.prob}</td>`)
            let checkbox = $(`<td><input class="checkbox" type="checkbox" aria-label="Checkbox" value=${ingredient.name}></td>`)
            tr.append(name).append(prob).append(checkbox);
            $("#predicted-ingredients").append(tr);
        }
    });
})