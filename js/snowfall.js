
// snowfall.js is an animation of falling blocks :3
// it uses canvaser.js
$(document).ready(function(){

    var Canvas = getCanvas("snowcanvas");

    // set up the frame
    var w = window.innerWidth; // fill the window
    var h = window.innerHeight;
    setCanvasSize(w, h, Canvas);

    // some constants
    var FPS = 12;
    var MAX_BLOBS = 500;
    var COLOR = "blue";
    var MIN_SIZE = 1;
    var MAX_SIZE = 25;

    // some variables
    var blobs;

    setup();

    /**
    * All the important stuff is here.
    */
    var renderLoop = setInterval(function() {
        drawBlobs(blobs);
        setup();
    }, 1000 / FPS);


    // initial setup stuff
    function setup() {
        blobs = [];
        for(var i = 0; i < MAX_BLOBS; i++) {
            blobs.push(makeBlob(w, h, MIN_SIZE, MAX_SIZE, COLOR));
        }
        console.log(blobs);
    }

    function drawBlobs(blobs) {
        drawBackground("LightGray", "LightSlateGray", w, h, Canvas);
        for (var i = 0; i < blobs.length; i++) {
            drawRect(
                blobs[i].color,
                blobs[i].color,
                {x : blobs[i].x, y : blobs[i].y},
                blobs[i].size,
                blobs[i].size,
                Canvas
            );
        }
    }

    /**
    * a blob is an object.
    * It has a position (x, y), a size, a color. Yeah lawwwl.
    * The position is bounded above by xBound and yBound. Use the frame's dimensions.
    * Given a range of sizes and a color this function will
    * generate a blob's size and position and return it.
    */
    function makeBlob(xBound, yBound, minSize, maxSize, color) {
        var c = color;
        return {
            x: Math.floor(Math.random() * xBound + 0),
            y: Math.floor(Math.random() * yBound + 0),
            color: c,
            size: Math.floor(Math.random() * maxSize + minSize)
        };
    }

    function log(e) {
        console.log(e);
    }

});
