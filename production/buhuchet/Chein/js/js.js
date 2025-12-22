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


    var Answer1 = $('[blocks-drag = item1]').length;
    var Answer2 = $('[blocks-drag = item2]').length;
    var Answer3 = $('[blocks-drag = item3]').length;
    var Answer4 = $('[blocks-drag = item4]').length;
    var Answer5 = $('[blocks-drag = item5]').length;
    var Answer6 = $('[blocks-drag = item6]').length;
    var Answer7 = $('[blocks-drag = item7]').length;

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
                    case 'item5':
                        correctAnswer5++;
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item6':
                        correctAnswer6++;
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    case 'item7':
                        correctAnswer7++;
                        ui.draggable.attr('blocks-drag-true', 'true');
                        break;
                    default:
                        break;
                };
            }
            if (correctAnswer1 == Answer1 && correctAnswer2 == Answer2 && correctAnswer3 == Answer3 && correctAnswer4 == Answer4 && correctAnswer5 == Answer5 && correctAnswer6 == Answer6 && correctAnswer7 == Answer7 ) {
                end();
                var elem = document.getElementById('end');
        elem.style.visibility = 'visible';
                document.getElementById("myspan").innerHTML ="Поздравляем все верно!";
               
        $('.end').click(function () {
        location.reload();   });

            }

        }});

    
    end = function () {
        $(".end").addClass("finish");
    }

});


$('.end').click(function () {
    if(  document.getElementById("myspan").value == "Поздравляем все верно!"){
        location.reload();}
    else{
        document.getElementById('end').style.visibility = 'hidden';
    }

    });



function info(){
    end();
    var elem = document.getElementById('end');
        elem.style.visibility = 'visible';
    document.getElementById("myspan").innerHTML ="На основании представленной задачи, отразите хозяйственные операции поставщика в правильном хронологическом порядке с указанием первичных документов, используя кассовый метод.ООО «Вик» заключил договор на приобретение товаров с ООО «Кантек», по условиям договора доставка товара происходит транспортом поставщика. Оплата после предъявления счета-фактуры. 15.09. произведена доставка со всеми сопроводительными документами. Стоимость товара по документам поставщика 456 000 руб. НДС 20%. Себестоимость товаров 400 000 руб. Расходы на доставку включены в счет поставщика 20 000 руб. НДС 20%. По приемке товара расхождений нет. 20.09. товар был оплачен на основании предъявленного счета-фактуры.";
    
    
}
