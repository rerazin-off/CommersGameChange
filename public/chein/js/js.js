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
    var correctAnswer10 = 0;


    var Answer1 = $('[data-drag = item1]').length;
    var Answer2 = $('[data-drag = item2]').length;
    var Answer3 = $('[data-drag = item3]').length;
    var Answer4 = $('[data-drag = item4]').length;
    var Answer5 = $('[data-drag = item5]').length;
    var Answer6 = $('[data-drag = item6]').length;
    var Answer7 = $('[data-drag = item7]').length;
    var Answer8 = $('[data-drag = item8]').length;
    var Answer9 = $('[data-drag = item9]').length;
    var Answer10 = $('[data-drag = item10]').length;

    $(".drop").droppable({
        classes: {
            "ui-droppable": "active",
            "ui-droppable-hover": "hover"
        },
        accept: function (el) {
            var test = el.attr("data-drag");
            var test1 = $(this).attr("data-drop");
            if (test == test1) {
                return true;
            } else {
                return false;
            }
        },
        over: function (event, ui) {
            $(this).addClass("truedrop");

        },
        out: function (event, ui) {
            
            if (ui.draggable.attr('data-drag-true') == 'true') {
                switch ($(this).attr('data-drop')) {
                    case 'item1':
                        ui.draggable.attr('data-drag-true', 'false');

                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.0)'
                        });
                        break;
                    case 'item2':
                        ui.draggable.attr('data-drag-true', 'false');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.0)'
                        });
                        break;
                    case 'item3':
                        ui.draggable.attr('data-drag-true', 'false');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.0)'
                        });
                        break;
                    case 'item4':
                        correctAnswer4++;
                        ui.draggable.attr('data-drag-true', 'false');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.0)'
                        });
                        break;
                    case 'item5':
                        ui.draggable.attr('data-drag-true', 'false');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.0)'
                        });
                        break;
                    case 'item6':
                        ui.draggable.attr('data-drag-true', 'false');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.0)'
                        });
                        break;
                    case 'item7':
                        ui.draggable.attr('data-drag-true', 'false');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.0)'
                        });
                        break;
                    default:
                        break;
                };
            }
        },
        drop: function (event, ui) {
            if (ui.draggable.attr('data-drag-true') == 'false') {
                switch ($(this).attr('data-drop')) {
                    case 'item1':
                        ui.draggable.attr('data-drag-true', 'true');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.63)'
                        });
                        break;
                    case 'item2':
                        ui.draggable.attr('data-drag-true', 'true');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.63)'
                        });
                        break;
                    case 'item3':
                        ui.draggable.attr('data-drag-true', 'true');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.63)'
                        });
                        break;
                    case 'item4':
                        ui.draggable.attr('data-drag-true', 'true');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.63)'
                        });
                        break;
                    case 'item5':
                        ui.draggable.attr('data-drag-true', 'true');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.63)'
                        });
                        break;
                    case 'item6':
                        ui.draggable.attr('data-drag-true', 'true');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.63)'
                        });
                        break;
                    case 'item7':
                        ui.draggable.attr('data-drag-true', 'true');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.63)'
                        });
                        break;
                    default:
                        break;
                };
            }
            if ($('[data-drag-true = true]').length == 7) {
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

function tend() {
    var elem = document.getElementById('title');
    elem.style.visibility = 'hidden';
}
