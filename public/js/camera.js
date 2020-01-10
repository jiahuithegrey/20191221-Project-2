$(document).ready(function() {
  $("#ingredient-button").on("click", function(event) {
    event.preventDefault();
    const imgBase64 = $("#photo")
      .attr("src")
      .replace("data:image/png;base64,", "")
      .replace(" ", "+");
    const imgObj = {
      img: imgBase64
    };

    $.ajax({
      method: "POST",
      url: "/saveImg",
      data: imgObj
    }).then(function(resp) {
      console.log("saved");
    });

    // window.location.href = "/output"
  });
});
