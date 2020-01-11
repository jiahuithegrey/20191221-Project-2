$(document).ready(function() {
  $("#ingredient-button").on("click", function(event) {
    const imgBase64 = $("#photo").attr("src");
    const imgObj = {
      imgBase64: imgBase64
    };
    
    $.ajax({
      method: "POST",
      url: "/saveImg",
      data: imgObj
    }).then(function(resp) {
      console.log("Image Saved");
    })
  });
});
