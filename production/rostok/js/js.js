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

    var item1 = $('.item1');
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


    var Answer1 = $('[blocks-drag = item1]').length;
    var Answer2 = $('[blocks-drag = item2]').length;
    var Answer3 = $('[blocks-drag = item3]').length;
    var Answer4 = $('[blocks-drag = item4]').length;

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
                        ui.draggable.attr('blocks-drag-true', 'true');
                        console.log(correctAnswer1);
                        break;
                    case 'item2':
                        correctAnswer2++;
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item3':
                        correctAnswer3++;
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item4':
                        correctAnswer4++;
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    default:
                        break;
                };
            }
            var n = document.getElementById("q");
            if (correctAnswer1 == Answer1) {
                document.getElementById('item1').style.visibility = "hidden";
                document.getElementById('fl1').style.visibility = "hidden";
                n.innerHTML = ("Добавьте освещения!");
               
                document.getElementById('fl2').style.display = "block";
            }
            if (correctAnswer2 == Answer2) {
                document.getElementById('item2').style.visibility = "hidden";
                n.innerHTML = ("Добавьте удобрений!");
                document.getElementById('fl2').style.display = "none";
                document.getElementById('fl3').style.display = "block";
            }
            if (correctAnswer3 == Answer3) {
                document.getElementById('item3').style.visibility = "hidden";
                n.innerHTML = ("Поработайте граблями!");
                document.getElementById('fl2').style.display = "none";
                document.getElementById('fl3').style.display = "none";
                document.getElementById('fl4').style.display = "block";
            }

            if (correctAnswer4 == Answer4) {
                document.getElementById('item4').style.visibility = "hidden";
                n.innerHTML = ("Цветок вырос!");
                document.getElementById('fl2').style.display = "none";
                document.getElementById('fl3').style.display = "none";
                document.getElementById('fl4').style.display = "none";
                document.getElementById('fl5').style.display = "block";
                document.getElementById('restart').style.visibility = "visible";
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

function restart() {
    location.reload()
}
