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

        }
    });


    var correctAnswer1 = 0;
    var correctAnswer2 = 0;
    var correctAnswer3 = 0;
    var correctAnswer4 = 0;
    var correctAnswer5 = 0;
    var correctAnswer6 = 0;
    var correctAnswer7 = 0;
    var correctAnswer8 = 0;
    var correctAnswer9 = 0;

    var Answer1 = $('[blocks-drag = item1]').length;
    var Answer2 = $('[blocks-drag = item2]').length;
    var Answer3 = $('[blocks-drag = item3]').length;
    var Answer4 = $('[blocks-drag = item4]').length;
    var Answer5 = $('[blocks-drag = item5]').length;
    var Answer6 = $('[blocks-drag = item6]').length;
    var Answer7 = $('[blocks-drag = item7]').length;
    var Answer8 = $('[blocks-drag = item8]').length;
    var Answer9 = $('[blocks-drag = item9]').length;

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
                        correctAnswer1++;
                        ui.draggable.css({
                            "background": 'green'
                        });
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item2':
                        correctAnswer2++;
                        ui.draggable.css({
                            "background": 'red'
                        });
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item3':
                        correctAnswer3++;
                        ui.draggable.css({
                            "background": 'green',
                            "color": 'white'
                        });
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item4':
                        correctAnswer4++;
                        ui.draggable.css({
                            "background": 'green',
                            "color": 'white'
                        });
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item5':
                        correctAnswer5++;
                        ui.draggable.css({
                            "background": 'green',
                            "color": 'white'
                        });
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item6':
                        correctAnswer6++;
                        ui.draggable.css({
                            "background": 'green',
                            "color": 'white'
                        });
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item7':
                        correctAnswer7++;
                        ui.draggable.css({
                            "background": 'green',
                            "color": 'white'
                        });
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item8':
                        correctAnswer8++;
                        ui.draggable.css({
                            "background": 'green',
                            "color": 'white'
                        });
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item9':
                        correctAnswer9++;
                        ui.draggable.css({
                            "background": 'green',
                            "color": 'white'
                        });
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    default:
                        break;
                };
            }
            if (correctAnswer1 == Answer1 && correctAnswer2 == Answer2) {
                var elem = document.getElementById('restart');
                elem.style.visibility = 'visible';
            }

            if (correctAnswer3 == Answer3 && correctAnswer4 == Answer4 && correctAnswer5 == Answer5 && correctAnswer6 == Answer6 && correctAnswer7 == Answer7 && correctAnswer8 == Answer8 && correctAnswer9 == Answer9) {
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

function test() {
    var item = $('.item');
    item.each(function (i, elem) {
        $(this).css({
            "background": 'red'
        });

    });
}



function end() {
    var elem = document.getElementById('ended');
    elem.style.visibility = 'visible';
}

function tend() {
    var elem = document.getElementById('title');
    elem.style.visibility = 'hidden';
}

function restart() {
    var elem2 = document.getElementById('too');
    elem2.style.visibility = 'visible';
}

function help() {
    document.getElementById('svitok').style.visibility = 'visible';
    document.getElementById('svitok1').style.visibility = 'visible';
    document.getElementById('izda').style.visibility = 'hidden';
    document.getElementById('help').style.visibility = 'hidden';
    document.getElementById("time").style.visibility = 'hidden';
    document.getElementById("time2").style.visibility = 'hidden';
    document.getElementById("fl1").style.visibility = 'hidden';
    document.getElementById("fl2").style.visibility = 'hidden';
}

function helpex() {
    document.getElementById('izda').style.visibility = 'visible';
    document.getElementById('help').style.visibility = 'visible';
    document.getElementById('svitok1').style.visibility = 'hidden';
    document.getElementById('svitok').style.visibility = 'hidden';
    document.getElementById("time").style.visibility = 'visible';
    document.getElementById("time2").style.visibility = 'visible';
    document.getElementById("fl1").style.visibility = 'visible';
    document.getElementById("fl2").style.visibility = 'visible';
}
