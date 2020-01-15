$(document).ready(function() {
    $("#photo-captured").attr("src", "https://mysmartrecipe206.s3.us-west-2.amazonaws.com/foodToAnalyze");
    
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

    $("#recipe-button").on("click", function(event) {
        let checkedIngreds = [];
        let checkboxes = $("input[type=checkbox]");
        for (let checkbox of checkboxes) {
            if (checkbox.checked) {
                checkedIngreds.push(checkbox.value)
            }
        }
        let ingredStr = checkedIngreds.join(",")
        localStorage.setItem("ingredients", ingredStr)
    })
})