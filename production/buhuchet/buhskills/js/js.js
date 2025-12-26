$(document).ready(function () {
    var timeho = document.getElementById('timeho');
    var timemun = document.getElementById('timemun');
    setInterval(timeOut, 100);

    function timeOut() {
        var ho = new Date().getHours();
        var mun = new Date().getMinutes();
        timeho.textContent = ho;
        if (mun <= 9) {
            mun = "0" + mun;
        }
        timemun.textContent = mun;
    }
    
    var spriteWidth = 13337;
    var spriteHeight = 1548;
    var rows = 1;
    var cols = 10;
    var trackRight = 0;
    var trackLeft = 1;
    var width = spriteWidth / cols;
    var height = spriteHeight / rows;
    var curFrame = 0;
    var frameCount = 10;
    var x = 0;
    var y = 0;
    var srcX = 0;
    var srcY = 0;
    var left = false;
    var right = true;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    var character = new Image();
    character.src = "буханка1.png";

    function updateFrame() {
        curFrame = ++curFrame % frameCount;
        srcX = curFrame * width;
        ctx.clearRect(x, y, width, height);
    }

    function draw() {
        updateFrame();
        ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
    }
    setInterval(draw, 130);

    $('.sl').slick({
        autoplay: true,
        arrows: false,
        slidesToShow: 3
    });

    $('.sl_slide a').click(function(e){
        e.preventDefault;
        $('.block-text').addClass('active');
        $('.exe').addClass('act-ex');
        var header = $(this).attr('blocks-header');
        var img = $(this).attr('blocks-img');
        var text = $(this).attr('blocks-text');
        $('#modal-header').html(header);
        $('.modal-text').html(text);
        $('#modal-img').attr("src",img);
        sec=0;
    })
    

    var sec = 0;
    setInterval(tick, 1000);
    function tick(){
        sec++;
        if(sec==60){
            location.reload();
            sec = 0;
        }
    }
    
    $('body').click(function(e){
        sec=0;

    })
});
