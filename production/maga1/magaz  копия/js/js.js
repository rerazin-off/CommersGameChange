var kolvo = 0;

function reload() {
	location.reload();
}

$(function () {

	$(".droptrue").sortable({
		connectWith: ".droptrue"
	});
	$('.info').hide();

$(".prod, .polk").sortable();
	

$('.polk').sortable({
		receive: function (event, ui) {
			
//			if($(this).attr('item') == ""){
//				$(this).attr('item',ui.item.attr('name'));
//			}
//			else{
//				if($(this).attr('item') != ui.item.attr('name'))
//					{
//					$('.info').show();
//					$('.info').text("Нельзя "+ ui.item.attr('name') + "  и "+$(this).attr('item')+ " рядом ложить?!");
//					setTimeout(lol, 5000);
//					}
//			}
           
            if($(this).attr('polk') == "" || $(this).attr('polk') == ui.item.attr('polk')){
                
                
                
                if ($(this).find('[polk = '+ $(this).attr('polk')+ ']').length == $(document).find('[polk = '+ $(this).attr('polk')+ ']').length -1 ){ 
                    
                    $(this).sortable({
                    disabled: true
                })
                    
                    kolvo++;
                    if(kolvo == 8){alert("Этап завершен");}
                }
            }
            else{
                $('.info').show();
					$('.info').text("Нарушены правила расстановки");
					setTimeout(lol, 3000);
            }
            
		}
	});
	
	$('.polk').sortable({
		 out: function (event, ui) {
            var gg = $(this).sortable('toArray', {attribute: 'name'});
			 
			var k =0;
			if(gg.length == 0){
				$(this).attr('item',"");
			}
			 
			for(var i =0 ; i<=$(this).sortable('toArray').length; i++){
				if(gg[i]==$(this).attr('item')){k++;}
			}
			 
			 if(k==0){$(this).attr('item',gg[0]);}
		}
	});

	
});

function lol(){
	$('.info').hide()
}