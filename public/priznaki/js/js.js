function none() {
    document.getElementById('title').style.visibility = "hidden";
}

$(document).ready(function () {

    var item = $('.item');
    item.each(function (i, elem) {
        var winWidth = $(".items").width();
        var winHeight = $(".items").height();
        var left = Math.floor(Math.random() * (winWidth - 300)) + 'px';
        var top = Math.floor(Math.random() * (winHeight + 50)) + 'px';
        $(this).css({
            "top": top,
            "left": left
        });

    });


    $(".item").draggable({
        cursor: "pointer",
        drag: function (event, ui) {
            $(this).addClass("dragElem");

        },
        stop: function (event, ui) {
            $(this).removeClass("dragElem");
            testj();

        }
    });

    var correctAnswer1 = 0;

    var Answer1 = $('[blocks-drag = item1]').length;

    $(".drop").droppable({
        classes: {
            "ui-droppable": "active",
            "ui-droppable-hover": "hover"
        },
        accept: function (el) {
            var test = el.attr("blocks-drag");
            var test1 = $(this).attr("blocks-drop");
            if (test == test1) {
                return true;
            } else {
                return false;
            }
        },
        over: function (event, ui) {
            $(this).addClass("truedrop");

        },
        out: function (event, ui) {},
        drop: function (event, ui) {
            if (ui.draggable.attr('blocks-drag-true') == 'false') {
                switch ($(this).attr('blocks-drop')) {
                    case 'item1':
                        pisec();
                        correctAnswer1++;
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;

                    default:
                        break;
                };
            }
            if (correctAnswer1 == Answer1) {
                end();
            }

        }

    });



    //Перезагрузка страницы при клике
    $('.end').click(function () {
        location.reload();

    });
    end = function () {
        $(".end").addClass("finish");
        $(".drop").addClass("win");
    }

});

function testj() {
    var item = $('.nodrag');
    item.each(function (i, elem) {
        var winWidth = $(".items").width();
        var winHeight = $(".items").height();
        var left = 0 + 'px';
        var top = 0 + 'px';
        $(this).css({
            "top": top,
            "left": left
        });

    });
}

function tend() {
    var elem = document.getElementById('title');
    elem.style.visibility = 'hidden';
}
function pisec(){
    var elem = document.getElementById('title');
    elem.style.visibility = 'hidden';
}