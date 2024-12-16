var i=0;
var j=0;
var j1=9;
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
            
            if (ui.draggable.attr('data-drag-true') == 'true') {
               
                  
                if($(this).attr('data-drop') == ui.draggable.attr('data-drag')){
                   
					ui.draggable.attr('data-drag-true', 'false');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0)'
                        });
				}
            }
        },
        drop: function (event, ui) {
           
            
            if (ui.draggable.attr('data-drag-true') == 'false') {
                j=j+1;
                  
                j1=j1-1;
                document.getElementById("p1").innerHTML="Осталось перетаскиваний: "+j1;
				if($(this).attr('data-drop') == ui.draggable.attr('data-drag')){
                  
                     
            i=i+1;
                 
                   
					ui.draggable.attr('data-drag-true', 'true');
                        ui.draggable.css({
                            "background": 'rgba(16, 193, 30, 0.63)'
                        });
				}else
                    {
                         if(i<=0){}else{
                i=i-1;
                }
                    }
            }
            
            
            if (j==9) {if(i==9){ends()} else{ends1()}}
            
          
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
