var i=0;
var j=0;
var pr=8;
function start1(){
    document.getElementById("pol").style.visibility="visible";
     document.getElementById("start").style.visibility="hidden";
    
}

var ank=["../img/anketa.png","../img/no2.png"];
function yes5(){
    i++;
    
    if(i==1){
        
        document.getElementById("oblll").style.visibility="visible";
        document.getElementById("text1").innerHTML="Причины отказа:<br>1) Низкий уровень дохода<br>2) Источник дохода не постоянный<br>3) Кредит наличными выдается только гражданам достигшим 21 года";
       document.getElementById("btn").style.visibility="hidden";
    document.getElementById("btn1").style.visibility="hidden";}
    if(i==2){document.getElementById("ank1").style.backgroundImage='url("../img/y3.png")';
            j++;}
    if(i==3){document.getElementById("ank1").style.backgroundImage='url("../img/n4.png")';
            j++;}
    if(i==4){
        
        
         document.getElementById("oblll").style.visibility="visible";
        document.getElementById("text1").innerHTML="Причина отказа: <br>1) Не может подтвердить доход";
       document.getElementById("btn").style.visibility="hidden";
    document.getElementById("btn1").style.visibility="hidden";
        
        
    }
    if(i==5){document.getElementById("ank1").style.backgroundImage='url("../img/n3.png")';
            j++;}
    if(i==6){
        
        
        document.getElementById("oblll").style.visibility="visible";
        document.getElementById("text1").innerHTML="  Причины отказа: <br>1) Низкий уровень дохода <br>2) Возраст<br>3) Большой срок";
       document.getElementById("btn").style.visibility="hidden";
    document.getElementById("btn1").style.visibility="hidden";
        
      
        
    }
    if(i==7){
        
         document.getElementById("oblll").style.visibility="visible";
        document.getElementById("text1").innerHTML="  Причина отказа: <br>1) Не позволяет доход";
       document.getElementById("btn").style.visibility="hidden";
    document.getElementById("btn1").style.visibility="hidden";
        
    }
   if(i==8){ 
       j++;
           pr=100/pr*j;
       document.getElementById("end11").innerHTML="Вы набрали:"+ pr+"%";
       document.getElementById("end11").style.visibility="visible";
     document.getElementById("pol").style.visibility="hidden";
           }
    
    
}
function no1(){
    i++;
    
   if(i==1){document.getElementById("ank1").style.backgroundImage='url("../img/y2.png")';
           j++;}
    if(i==2){
        
        
        
         document.getElementById("oblll").style.visibility="visible";
        document.getElementById("text1").innerHTML="Причины одобрения:<br>1) Позволяет уровень дохода<br>2) Возраст";
       document.getElementById("btn").style.visibility="hidden";
    document.getElementById("btn1").style.visibility="hidden";
        
        
        
        
    }
    if(i==3){
         document.getElementById("oblll").style.visibility="visible";
        document.getElementById("text1").innerHTML="Причины одобрения: <br>1) Позволяет уровень дохода";
       document.getElementById("btn").style.visibility="hidden";
    document.getElementById("btn1").style.visibility="hidden";
        
        
    }
    if(i==4){document.getElementById("ank1").style.backgroundImage='url("../img/y4.png")';
            j++;}
    if(i==5){
        
         document.getElementById("oblll").style.visibility="visible";
        document.getElementById("text1").innerHTML="Причины одобрения: <br>1) Позволяет уровень дохода <br>2) Возраст<br>3) Зарплатная карта данного банка<br>4) Работает в бюджетной организации";
       document.getElementById("btn").style.visibility="hidden";
    document.getElementById("btn1").style.visibility="hidden";
        
    }
    if(i==6){document.getElementById("ank1").style.backgroundImage='url("../img/n2.png")';
            j++;}
    if(i==7){document.getElementById("ank1").style.backgroundImage='url("../img/y1.png")';
            j++;}
   
    if(i==8){
        
         document.getElementById("oblll").style.visibility="visible";
        document.getElementById("text1").innerHTML="Причины одобрения: <br>1) Позволяет уровень дохода";
       document.getElementById("btn").style.visibility="hidden";
    document.getElementById("btn1").style.visibility="hidden";
        
       }
    
}
function obl(){
     document.getElementById("btn").style.visibility="visible";
    document.getElementById("oblll").style.visibility="hidden";
    document.getElementById("btn1").style.visibility="visible";
    
   if(i==1){document.getElementById("ank1").style.backgroundImage='url("../img/y2.png")';}
    if(i==2){document.getElementById("ank1").style.backgroundImage='url("../img/y3.png")';}
    if(i==3){document.getElementById("ank1").style.backgroundImage='url("../img/n4.png")';}
    if(i==4){document.getElementById("ank1").style.backgroundImage='url("../img/y4.png")';}
    if(i==5){document.getElementById("ank1").style.backgroundImage='url("../img/n3.png")';}
    if(i==6){document.getElementById("ank1").style.backgroundImage='url("../img/n2.png")';}
    if(i==7){document.getElementById("ank1").style.backgroundImage='url("../img/y1.png")';}
   
    if(i==8){pr=100/pr*j;
             document.getElementById("end11").innerHTML="Вы набрали:"+ pr+"%";
        document.getElementById("end11").style.visibility="visible";
     document.getElementById("pol").style.visibility="hidden";}
   
}
function end(){
    location.reload();
}
function end1(){
    location.reload();
}