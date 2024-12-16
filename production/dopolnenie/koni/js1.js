$(document).ready(function () {
    var spriteWidth = 875;
    var spriteHeight = 165;
    var rows = 1;
    var cols = 6;
    var trackRight = 0;
    var trackLeft = 1;
    var width = spriteWidth / cols;
    var height = spriteHeight / rows;
    var curFrame = 0;
    var frameCount = 6;
    var x = 0;
    var y = 0;
    var srcX = 0;
    var srcY = 0;
    var left = false;
    var right = true;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    var character = new Image();
    character.src = "ric2.png";

    function updateFrame() {
        curFrame = ++curFrame % frameCount;
        srcX = curFrame * width;
        ctx.clearRect(x, y, width, height);
    }

    function draw() {
        updateFrame();
        ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
    }
    setInterval(draw, 80);

});
