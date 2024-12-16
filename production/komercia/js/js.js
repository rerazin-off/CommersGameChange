$(document).ready(function () {

});

$('.start').click(function () {

});


$(".block, .obr").sortable({
    connectWith: ".block, .obr",
    items: 'img',
    receive: function (event, ui) {
        var huj = Number($(this).attr('col'));
        if (ui.item.attr('data-type') == $(this).attr('data-type')) {
            ui.item.attr('alt', 'true');
            ui.item.css({
                'background-color':'rgba(255, 0, 0, 0)'
            })
        } else {
            ui.item.attr('alt', 'false')
            ui.item.css({
                'background-color':'rgba(255, 0, 0, 0.66)'
            })
        }
        if ($('[alt = true]').length == 12) {
            $('.back').css({
                'filter': 'none'
            })
            $('.block').css({
                'display': 'none'
            })
            $('.obr').css({
                'display': 'none'
            })
            $('.next').css({
                'visibility': 'visible'
            })
        }
        $(this).each(function () {
            var chislo = $(this).find('img').length;

            var kol = $(this).find('[alt = true]').length;
            var text = $(this).find('p');
            var img = $(this).find('img');
            if (kol == 3 && chislo == 3) {
                $(this).sortable({
                    disabled: true
                })
                text.css({
                    'visibility': 'visible'
                })
                img.css({
                    'visibility': 'hidden'
                })
                $(this).css({
                    'background-color': 'rgba(255, 255, 255, 0)',
                    'background-image': 'url()'

                })
            }
        })
    },
    remove: function (event, ui) {
        $(this).each(function () {
            var chislo = $(this).find('img').length;
            var kol = $(this).find('[alt = true]').length;
            var text = $(this).find('p');
            var img = $(this).find('img');
            if (kol == 3 && chislo == 3) {
                $(this).sortable({
                    disabled: true
                })
                text.css({
                    'visibility': 'visible'
                })
                img.css({
                    'visibility': 'hidden'
                })
                $(this).css({
                    'background-color': 'rgba(255, 255, 255, 0)',
                    'background-image': 'url()'

                })
            }
        })
    }

});

var kolg = 0;

$('.block2, .right').sortable({
    connectWith: ".block2, .right",
    items: '.sort',
    receive: function (event, ui) {

        if ($(this).attr('polk') == ui.item.attr('polk') || $(this).find('img').length == 2) {
          
            if ($(this).attr('alt') == "" || $(this).find('img').length == 2) {
                $(this).attr('alt', ui.item.attr('alt'))
            } else {
                if ($(this).attr('alt') != ui.item.attr('alt')) {
                    alert("Нарушено товарное соседство");
                } else {

                    if (4 == $(this).find('[alt =' + $(this).attr('alt') + ' ]').length) {
                        kolg++;
                        $(this).find('.logo').attr('src', 'img/true.png');
                        $(this).sortable({
                            disabled: true
                        })
                        if(kolg==4){
                            location.reload();
                        }
                    }

                }

            }
        } else {
            if($(this).attr('polk') != 'none'){
            alert("Нарушен темпертаурный режим");}
        }

    }
})

$('.next').click(function () {
    $('.th2').css({
        'display': 'flex'
    })
})

$('.title').click(function () {
    $('.title').css({
        'display': 'none'
    })
})