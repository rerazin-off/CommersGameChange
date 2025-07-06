$(".end").hide();
$(".index, .left").sortable({
    connectWith: ".index, .left",
    items: 'img',
    receive: function (event, ui) {
        var huj = Number($(this).attr('col'));
        var c =0;
        if (ui.item.attr('blocks-type') == $(this).attr('blocks-type')) {
          ui.item.attr('alt','true').css({
              'background-color':'rgba(50, 205, 50,0.66)'
          })
            ui.item.attr('alt', 'true')
        } else {
          ui.item.attr('alt','false').css({
              'background-color':'rgba(255, 0, 0, 0.66)'
          })
            ui.item.attr('alt', 'false')
        }
        if ($('[alt = true]').length == 8){
            $('.end').show()
            $('.back-btn').hide()
    }

    

    } })
    
   