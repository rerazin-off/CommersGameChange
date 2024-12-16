function none() {
    document.getElementById('title').style.visibility = "hidden";
}
 function reload(){
     location.href=location.href;
}

yo1=0;
yo=0;
function fun(){
    yo++
    if (yo>15){
      var img0322 = document.getElementById("xdd").src = 'img/alla.svg';
       document.getElementById("its-a-prank").innerHTML="Алла"; 
      setTimeout(reload, 5000);
        }  
}

$(document).ready(function () {
    
   
    var img3 = document.getElementById("test3");
    var img4 = document.getElementById("test4");
    var img5 = document.getElementById("test5");
    var img6 = document.getElementById("test6");
    var img7 = document.getElementById("test7");
  var qq=0;
    var qq2=0;
     var qq3=0;
     var qq4=0;
     var qq5=0;
     var qq6=0;
    var qq7=0;
    var     q=0,w=0,e,r,t,y,u,i,o;
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
            if (ui.draggable.attr('data-drag-true') == 'false') {
                switch ($(this).attr('data-drop')) {
                    case 'item1':
                        correctAnswer1++;
                        ui.draggable.attr('data-drag-true', 'true');
                        console.log(correctAnswer1);
                        break;
                    case 'item2':
                        correctAnswer2++;
                        ui.draggable.attr('data-drag-true', 'true');
                        break;
                    case 'item3':
                        correctAnswer3++;
                        ui.draggable.attr('data-drag-true', 'true');
                        break;
                        case 'item4':
                        correctAnswer4++;
                        ui.draggable.attr('data-drag-true', 'true');
                        break;
                        case 'item5':
                        correctAnswer5++;
                        ui.draggable.attr('data-drag-true', 'true');
                        break;
                        case 'item6':
                        correctAnswer6++;
                        ui.draggable.attr('data-drag-true', 'true');
                        break;
                        case 'item7':
                        correctAnswer7++;
                        ui.draggable.attr('data-drag-true', 'true');
                        break;

                    default:
                        break;
                };
            }
      
        
          if (correctAnswer1 == Answer1)  {
              var img1 = document.getElementById("test1").src = 'img/green.png';    
qq=1; 
              Answer1=999;
              q=1; 
              yo=0;
       }
          
             if (correctAnswer2 == Answer2)  {
                     var img2 = document.getElementById("test2").src = 'img/green.png';
qq2=1; 
                 w=1;
                 yo=0;
 }   
            
          if (correctAnswer3 == Answer3)  {
img3.src = 'img/green.png';
                e=1;
              yo=0;
qq3=1;
        }
               if (correctAnswer4 == Answer4)  {
img4.src = 'img/green.png';
       qq4=1;              r=1;
                   yo=0;
        }
                   if (correctAnswer5 == Answer5)  {
img5.src = 'img/green.png';
       qq5=1;                 t=1;
                       yo=0;
        }
                   if (correctAnswer6 == Answer6)  {
img6.src = 'img/green.png';
        qq6=1;                 y=1;
                       yo=0;
        }
                   if (correctAnswer7 == Answer7)  {
img7.src = 'img/green.png';
        qq7=1;                  u=1;
        yo=0;
                   }
            o=q+w+e+r+t+y+u;
            if(o==7)
                {
                         end();
                }
             if (qq==1){
                 img1.dataTransfer.dropEffect="none";
                 qq=999;
             }
            if (qq2==1){
                 img2.dataTransfer.dropEffect="none";
                qq2=999;
             }
             if (qq3==1){
                 img3.dataTransfer.dropEffect="none";
                qq3=999;
             }
             if (qq4==1){
                 img4.dataTransfer.dropEffect="none";
                qq4=999;
             }
             if (qq5==1){
                 img2.dataTransfer.dropEffect="none";
                qq5=999;
             }
             if (qq6==1){
                 img6.dataTransfer.dropEffect="none";
                qq6=999;
             }
            if (qq7==1){
                 img6.dataTransfer.dropEffect="none";
                qq7=999;
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
