function none(){
    document.getElementById('title').style.visibility = "hidden";
}

$(document).ready(function () {

    var item = $('.item');
    item.each(function (i, elem) {
        var winWidth = $(".items").width();
        var winHeight = $(".items").height();
        var left = Math.floor(Math.random() * (winWidth - 300)) + 'px';
        var top = Math.floor(Math.random() * (winHeight+50)) + 'px';
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
    

    var Answer1 = $('[data-drag = item1]').length;
    var Answer2 = $('[data-drag = item2]').length;
    var Answer3 = $('[data-drag = item3]').length;
    var Answer4 = $('[data-drag = item4]').length;
    var Answer5 = $('[data-drag = item5]').length;
    var Answer6 = $('[data-drag = item6]').length;
    var Answer7 = $('[data-drag = item7]').length;

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
        },
        drop: function (event, ui) {
            if (ui.draggable.attr('data-drag-true') == 'false'){
            switch ($(this).attr('data-drop')) {
                case 'item1':
                    correctAnswer1++;
                    ui.draggable.attr('data-drag-true', 'true');
                    console.log(correctAnswer1);
                 $("#Clock1").css({"border":"3px solid green"})
                    break;
                case 'item2':
                    correctAnswer2++;
                    ui.draggable.attr('data-drag-true', 'true');
                    $("#Clock2").css({"border":"3px solid green"})
                    break;
                case 'item3':
                    correctAnswer3++;
                    ui.draggable.attr('data-drag-true', 'true');
                    $("#Clock3").css({"border":"3px solid green"})
                    break;
                      case 'item4':
                    correctAnswer4++;
                    ui.draggable.attr('data-drag-true', 'true');
                    $("#Clock4").css({"border":"3px solid green"})
                    break;
                      case 'item5':
                    correctAnswer5++;
                    ui.draggable.attr('data-drag-true', 'true');
                    $("#Clock5").css({"border":"3px solid green"})
                    break;
                      case 'item6':
                    correctAnswer6++;
                    ui.draggable.attr('data-drag-true', 'true');
                    $("#Clock6").css({"border":"3px solid green"})
                    break;
                      case 'item7':
                    correctAnswer7++;
                    ui.draggable.attr('data-drag-true', 'true');
                    $("#Clock7").css({"border":"3px solid green"})
                    break;
                default:
                    break;
            };
            }
            if (correctAnswer1 == Answer1 && correctAnswer2 == Answer2 && correctAnswer3 == Answer3 && correctAnswer4 == Answer4 && correctAnswer5 == Answer5 && correctAnswer6 == Answer6 && correctAnswer7 == Answer7) {
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

function tend(){
        var elem = document.getElementById('title');
elem.style.visibility = 'hidden';
}
