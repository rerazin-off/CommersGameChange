var i=0;
var j=0;
var otv=[];
var q=0;
var j1=12;
function none() {
    $('.title')[0].style.visibility = "hidden";
}

$(document).ready(function () {

    $(".item").draggable({
        cursor: "pointer",
        drag: function (event, ui) {
            $(this).addClass("dragElem");
        },
        stop: function (event, ui) {
            $(this).removeClass("dragElem");
        }
    });

    $(".drop").droppable({
        
        out: function (event, ui) {
            
            if (ui.draggable.attr('blocks-drag-true') == 'true') {
               
                  
                if($(this).attr('blocks-drop') == ui.draggable.attr('blocks-drag')){
                   
					ui.draggable.attr('blocks-drag-true', 'false');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0)'
                        });
                              
                    
                    
				}
            }
        },
        drop: function (event, ui) {
           
            
            if (ui.draggable.attr('blocks-drag-true') == 'false') {
                j=j+1;
                
                  
                j1=j1-1;
                document.getElementById("p1").innerHTML="Осталось перетаскиваний: "+j1;
				if($(this).attr('blocks-drop') == ui.draggable.attr('blocks-drag')){
                  
                     
            i=i+1;
                     
                 
                   
					ui.draggable.attr('blocks-drag-true', 'true');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.63)'
                        });
                    
                    
                    q=q+1;
                    
				}else
                    {
                         if(i<=0){}else{
                i=i-1;
                             
                }
                    }
            }
            
            
            if ((j==12)||(i>=9)||(q==9)) {if((i==9)||(q==9)){ends()} else{ends1()}}
            
          
        }
    });

    $('.end').click(function () {
        location.reload();

    });
     $('.end1').click(function () {
        location.reload();

    });


});

function ends() {
     $(".end").css({
         "display": 'flex'
    });
}
function ends1() {
     $(".end1").css({
         "display": 'flex'
    });
}

//      ___           ___           ___     
//     /\  \         /\  \         /\  \    
//    /::\  \       /::\  \       /::\  \   
//   /:/\ \  \     /:/\:\  \     /:/\:\  \  
//  _\:\~\ \  \   /::\~\:\  \   /:/  \:\__\ 
// /\ \:\ \ \__\ /:/\:\ \:\__\ /:/__/ \:|__|
// \:\ \:\ \/__/ \/__\:\/:/  / \:\  \ /:/  /
//  \:\ \:\__\        \::/  /   \:\  /:/  / 
//   \:\/:/  /        /:/  /     \:\/:/  /  
//    \::/  /        /:/  /       \::/__/   
//     \/__/         \/__/         ~~       
//       http://alfataks.cloudapp.net/
