
// snowfall.js is an animation of falling blocks :3
// it uses canvaser.js
$(document).ready(function(){

    var Canvas = getCanvas("snowcanvas");

    // set up the frame
    var w;
    var h;
    setupFrame();

    // some constants
    var FPS = 30;
    var MAX_BLOBS = 500;
    var BLOB_COLOR = "white";
    var BG_COLOR = "black";
    var BORDER_COLOR = "black";
    // var BLOB_COLOR = "blue";
    // var BG_COLOR = "LightGray";
    // var BORDER_COLOR = "LightSlateGray";
    var MIN_SIZE = 1;
    var MAX_SIZE = 3;
    var MIN_SPEED = 10;
    var MAX_SPEED = 50;
    var SPEED_SCALE = 0.2;

    var WOBBLE_SPEED = 0.2;
    var WOBBLE_AMOUNT = 2;

    // some variables
    var blobs;
    var frameTime = 0; // used to keep time

    setup();

    /**
    * All the important stuff is here.
    */
    var renderLoop = setInterval(function() {
        drawBlobs(blobs);
        stepBlobs(blobs);
        cullBlobs(blobs);
        populateBlobs(blobs);
        stepTime();
    }, 1000 / FPS);

    /**
    * Responsible for changing the blobs positions.
    */
    function stepBlobs(blobs) {
        // move blobs down the screen
        for(var i = 0; i < blobs.length; i++) {
            blobs[i].y += blobs[i].vy * SPEED_SCALE;
        }

        // make blobs wobble a little bit
        // modulated by the blobs y position
        for(var i = 0; i < blobs.length; i++) {
            blobs[i].x += WOBBLE_AMOUNT * Math.sin(blobs[i].y * WOBBLE_SPEED);
        }
    }

    function drawBlobs(blobs) {
        drawBackground(BG_COLOR, BORDER_COLOR, w, h, Canvas);
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
    * Responsible for checking when a blob is off the screen
    * and removing it from the array.
    */
    function cullBlobs(blobs) {
        for(var i = 0; i < blobs.length; i++) {
            if(blobs[i].y > h){
                blobs.splice(i, 1);
                i--;
            }
        }
    }

    /**
    * Re-adds blobs after they've been removed.
    * The goal is to keep the blobs array at a size of MAX_BLOBS
    */
    function populateBlobs(blobs) {
        while(blobs.length < MAX_BLOBS){
            blobs.push(makeBlob(w, h, MIN_SIZE, MAX_SIZE, BLOB_COLOR));
        }
    }

    function stepTime() {
        frameTime++;
        if(frameTime == FPS) frameTime = 0;
    }

    // initial setup stuff
    function setup() {
        blobs = [];
        populateBlobs(blobs);
    }

    // resizes the canvas when the window size changes
    $(window).resize(function() {
        setupFrame();
    });

    function setupFrame() {
        w = window.innerWidth; // fill the window
        h = window.innerHeight;
        setCanvasSize(w, h, Canvas);
    }

    /**
    * a blob is an object.
    * It has a position (x, y), a size, a color. Yeah lawwwl.
    * The position is bounded above by xBound. Use the frame's dimensions.
    * Given a range of sizes and a color this function will
    * generate a blob's size and position and return it.
    *
    * I want the smaller (farther) particles to move slower,
    * and the larger (closer) particles
    * to move faster to give the illusion of depth.
    * First a speed is randomly generated. Then, based on that speed and
    * a size is assigned.
    */
    function makeBlob(xBound, yBound, minSize, maxSize, color) {
        var vy = getRandomInt(MIN_SPEED, MAX_SPEED);
        // did some algebra. I want vyPercentOfRange = sizePercentOfRange.
        // Solved for size.
        var vyPercentOfRange = (vy - MIN_SPEED) / (MAX_SPEED - MIN_SPEED);
        var size = vyPercentOfRange * (maxSize - minSize) + minSize;

        return {
            x: getRandomInt(0, xBound),
            y: 0 - size,
            color: color,
            size: size,
            vy: vy
        };
    }

    function getRandomInt(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1) + lower);
    }

    function log(e) {
        console.log(e);
    }

});
