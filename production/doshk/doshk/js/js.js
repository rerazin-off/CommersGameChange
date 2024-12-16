$(".block, .igr, .back").hide();
$(".th2").hide();
$(".knop").click(function () {
    $(".hach").hide();
    $(".block, .igr, .back").show();
});
$(".block, .igr").sortable({
  connectWith: ".block, .igr",
  items: 'img',
  receive: function (event, ui) {
      var huj = Number($(this).attr('col'));
      if (ui.item.attr('data-type') == $(this).attr('data-type')) {
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
      if ($('[alt = true]').length == 6) {
          $('.back').css({
              'filter': 'none'
          })
          $('.block').css({
              'display': 'none'
          })
          $('.igr').css({
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
          if (kol == 2 && chislo == 2) {
              $(this).sortable({
                  disabled: true
              })
              text.css({
                  'visibility': 'hidden'
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
          if (kol == 2 && chislo == 2) {
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
$('.next').click(function () {
    $('.th2').css({
        'display': 'flex'
    })
    $(".block, .igr, .back").hide();
})
