$(document).ready(function() {
    $("#photo-captured").attr("src", "/img/foodToAnalyze.png");
    
    $.ajax({
        method: "GET",
        url: "/clarifai/food"
    }).then(function(resp) {
        console.log("saved");
    });
})