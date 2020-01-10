(function () {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.

    var width = 320;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream

    var dataImage = localStorage.getItem("bufferImage");
    var photo = null;

    function startup() {
        photo = document.getElementById('photo-captured');
        photo.src = "data:image/png" + dataImage;

        //fill rest of eventlisteners here

        

    }


    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false);
})();