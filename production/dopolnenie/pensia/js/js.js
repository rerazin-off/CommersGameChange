var qsnake = 0;
var vopros = ["За назначением пенсии обратился Федоров, проработавший на различных должностях федеральной государственной службы 20 лет. Возраст Федорова 60 лет. Может ли Федеров претендовать на пенсию по государственному пенсионному обеспечению за выслугу лет?",
              "В результате производственной травмы скончался рабочий Фомин. За получением страхового обеспечения обратилась его жена в возрасте 40 лет, которая не работает, поскольку занята уходом за двумя несовершеннолетними детьми, и теща в возрасте 50 лет — инвалид II степени, проживавшая в семье зятя. Может ли теща претендовать на страховые выплаты?",
            "Работница коммерческой фирмы Соловьева, имеющая двух детей в возрасте 3 и 7 лет, готовится стать матерью в третий раз. В связи с уходом в декретный отпуск фирма оказала Соловьевой материальную помощь в сумме 10 тыс. руб.. Может ли Соловьева претендовать на выплаты в связи с беременностью и родами? ",
            "Гражданка Прокофьева, являющаяся одинокой матерью в отношении новорожденного сына, решила выйти на работу. Бабушка мальчика решила взять уход за ребенком на себя, но предоставить ей отпуск по уходу за внуком до исполнения ему 1,5 лет с выплатой пособия в организации, где она работает, отказались, заявив, что такой отпуск может взять только мать. Может ли бабушка на самом деле взять такой отпуск?",
            "Доцент Сорокин пришел в свой выходной день на кафедру, где он работал, для того, чтобы взять литературу, необходимую ему для подготовки к чтению лекции. Когда он выходил из здания института во внутренний двор, на него обрушился карниз. В результате Сорокин получил многочисленные травмы и находился в больнице 85 дней. Является ли данный несчастный случай несчастным случаем на производстве?",
            "У одинокой матери Русановой сын был курсантом учебного подразделения военной кафедры образовательного учреждения. В июне 2002г. он погиб при прохождении учебных лагерных сборов при войсковой части. Нетрудоспособный отец Русановой, дедушка погибшего мальчка, обратился в пенсионный отдел за назначением пенсии по случаю потери кормильца. Имеет ли отец Русановой право на пенсию?",
            "Узнав о принципе всеобщности социального обеспечения, 66-летний Галанов, не имеющий страхового стажа, обратился в органы социальной защиты с требованием предоставить ему пенсию по старости. Должны ли назначить пенсию по старости Галанову?",
            "Пенсионер по старости Котов, находясь с 1 апреля в отпуске без сохранения заработной платы продолжительностью 14 календарных дней, заболел гриппом на второй день после начала отпуска. В связи с возникшим осложнением болезнь Котова продолжалась месяц. Имеет ли Котов право на пособие по временной нетрудоспособности?",
            "Рабочий день завершен!",
    		];


var k = 0;

function not(){
        q4.innerHTML = ('');
    var p1 = document.getElementById("people1");
    var n = document.getElementById("q");
    var h = n.textContent;
    var p = document.getElementById("people");
       
    
    n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
     document.images["img"].src = 'img/instr.png';
    
   
 var elem = document.getElementById('title1');
elem.style.visibility = 'hidden';
}

function show(state) {

    document.getElementById('window').style.display = state;
    document.getElementById('wrap').style.display = state;
}

var i=0;
var m=0;

function jsy() {
    qsnake+=200;
       q3.innerHTML = (qsnake); 
    var n = document.getElementById("q");
    var h = n.textContent;
    var p = document.getElementById("people");
    var p1 = document.getElementById("people1");

    if(i==0 || i==2 || i==4 || i==6 || i==8 || i==10 || i==12 || i==14 || i==16 || i==18){
        m++; 
    }
 
        if (i==0){
            k=0
        }
   
    var p = 0;
     
    zxc.style.visibility = "hidden";
    


  if(k == 0){  
       qsnake-=400;
       q3.innerHTML = (qsnake); 
      q4.innerHTML = ("Так как Федоров отработал на различных должностях федеральной государственной службы 20 лет, он имеет право на пенсию по государственному пенсионному обеспечению за выслугу лет. На пенсию по старости он претендовать не может, так для ее получения необходимо достичь пенсионного возраста 65 лет."); 
obl1.style.visibility = "visible";
      
setTimeout(sos, 15 * 100);  
      function sos(){       
obl1.style.visibility = "hidden";  
       var start = Date.now(); // сохранить время начала
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel1.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel2.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
        if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel1.style.visibility = "hidden";
           
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
          
          }
     }

    
    
    
    
     if(k == 1){
         qsnake-=400;
       q3.innerHTML = (qsnake); 
           q4.innerHTML = ("В случае смерти застрахованного в результате наступления страхового случая право на получение страховых выплат имеют: нетрудоспособные лица, состоявшие на иждивении умершего или один из родителей, супруг(а), либо другой член семьи, который не работает и занят уходом за состоявшими на иждивении умершего детьми."); 
   obl1.style.visibility = "visible";
setTimeout(sos, 15 * 100);  
      function sos(){       
obl1.style.visibility = "hidden";  
       var start = Date.now(); // сохранить время начала
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel2.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel3.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
        if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel2.style.visibility = "hidden";
           
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
          
          }
     }

    
    
    if(k == 2){
       var start = Date.now(); // сохранить время начала
    q4.innerHTML = ('');
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel3.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel4.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
           if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}
      }, 20); 
             // telh2.style.visibility = "hidden";
         hel3.style.visibility = "hidden";
         
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
     }
    
    
    if(k == 3){
       var start = Date.now(); // сохранить время начала
    q4.innerHTML = ('');
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel4.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel5.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
           if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel4.style.visibility = "hidden";
      
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
     }
    if(k == 4){
       var start = Date.now(); // сохранить время начала
    q4.innerHTML = ('');
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel5.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel6.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
           if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}
      }, 20); 
             // telh2.style.visibility = "hidden";
         hel5.style.visibility = "hidden";
      
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
     }
    
     if(k == 5){
       var start = Date.now(); // сохранить время начала
    q4.innerHTML = ('');
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel6.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel7.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
          if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}
      }, 20); 
             // telh2.style.visibility = "hidden";
         hel6.style.visibility = "hidden";

         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
     }
    
    
    
     if(k == 6){
         qsnake-=400;
       q3.innerHTML = (qsnake); 
         q4.innerHTML = ("Согласно Федеральному закону для получения пенсии по старости необходим минимальный страховой стаж 9 лет. Не имея страхового стажа Галанов может претендовать только на социальную пенсию");  
     obl1.style.visibility = "visible";
setTimeout(sos, 15 * 100);  
      function sos(){       
obl1.style.visibility = "hidden";  
       var start = Date.now(); // сохранить время начала
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel7.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel8.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
        if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel7.style.visibility = "hidden";
           
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
          
          }
     }

    
    if(k == 7){
        qsnake-=400;
       q3.innerHTML = (qsnake); 
        q4.innerHTML = ("В соответствии со ст. 183 Трудового Кодекса РФ Котов имеет право на пособие по временной нетрудоспособности.       "+
        "Рабочий день закончен! Вы набрали " + qsnake + " баллов!");
        setTimeout(function(){
   window.location.reload(1);
}, 5000);
     obl1.style.visibility = "visible";
setTimeout(sos, 15 * 100);  
      function sos(){       
obl1.style.visibility = "hidden";  
       var start = Date.now(); // сохранить время начала
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel8.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        
        if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel8.style.visibility = "hidden";
           
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
          
          }
     }
    
 k=k+1;
    
    
i++;

n.innerHTML = (vopros[i]);
if (i==20){
        if(m>=15){
    
        
        
    
    n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/question.jpg';}
    else if(m>=13 && m<15){
        
      
    
    n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/question.jpg';
        
        
    }
       else if(m<13){
        
    
    n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/question.jpg';
        
        
    }
    
i=0;
m=0;}

}

function jsn() {
     qsnake+=200;
       q3.innerHTML = (qsnake); 
    var p1 = document.getElementById("people1");
       var n = document.getElementById("q");
    var h = n.textContent;
    var p = document.getElementById("people");
        if(i==1 || i==3 || i==5 || i==7 || i==9 || i==11 || i==13 || i==15 || i==17 || i==19){
        m++; }
         if (i==0){
            k=0
        }
   
    var p = 0;
     
    zxc.style.visibility = "hidden";
    
  if(k == 0){
      
       var start = Date.now(); // сохранить время начала

      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel1.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel2.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
        if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel1.style.visibility = "hidden";
           
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
     }

     if(k == 1){
       var start = Date.now(); // сохранить время начала
    q4.innerHTML = ('');
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel2.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel3.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
           if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}
      }, 20); 
             // telh2.style.visibility = "hidden";
         hel2.style.visibility = "hidden";
          
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
     }

    
    
    if(k == 2){
        qsnake-=400;
       q3.innerHTML = (qsnake); 
          q4.innerHTML = ("Cогласно Закону, пособие по беременности и родам выплачивается за период отпуска по беременности и родам, т. е. за ту продолжительность данного отпуска, которая указана в листке нетрудоспособности."); 
 obl1.style.visibility = "visible";
setTimeout(sos, 15 * 100);  
      function sos(){       
obl1.style.visibility = "hidden";  
       var start = Date.now(); // сохранить время начала
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel3.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel4.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
        if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel3.style.visibility = "hidden";
           
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
          
          }
     }
    
    
    if(k == 3){
        qsnake-=400;
       q3.innerHTML = (qsnake); 
          q4.innerHTML = ("Право на ежемесячное пособие по уходу за ребенком имеют: матери либо отцы, другие родственники, опекуны, фактически осуществляющие уход за ребенком.");   
   obl1.style.visibility = "visible";
setTimeout(sos, 15 * 100);  
      function sos(){ 
          
obl1.style.visibility = "hidden";  
       var start = Date.now(); // сохранить время начала
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel4.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel5.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
        if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel4.style.visibility = "hidden";
           
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
          
          }
     }
    if(k == 4){
        qsnake-=400;
       q3.innerHTML = (qsnake); 
          q4.innerHTML = ("Согласно ст. 227 ТК РФ Несчастными случаями на производстве являются те события, которые произошли: в течение рабочего времени на территории работодателя либо в ином месте выполнения работы, в том числе во время установленных перерывов.");   
      obl1.style.visibility = "visible";
setTimeout(sos, 15 * 100);  
      function sos(){       
obl1.style.visibility = "hidden";  
       var start = Date.now(); // сохранить время начала
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel5.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel6.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
        if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel5.style.visibility = "hidden";
           
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
          
          }
     }
    
     if(k == 5){
         qsnake-=400;
       q3.innerHTML = (qsnake); 
         q4.innerHTML = ("Право на страховую пенсию по случаю потери кормильца имеют нетрудоспособные члены семьи умершего кормильца, состоявшие на его иждивении. Одному из родителей, супругу или другим членам семьи, независимо от того, состояли они или нет на иждивении умершего кормильца."); 
      obl1.style.visibility = "visible";
setTimeout(sos, 15 * 100);  
      function sos(){       
obl1.style.visibility = "hidden";  
       var start = Date.now(); // сохранить время начала
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel6.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel7.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
        if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel6.style.visibility = "hidden";
           
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
          
          }
     }
    
    
    
     if(k == 6){
       var start = Date.now(); // сохранить время начала
    q4.innerHTML = ('');
      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

        hel7.style.left = (timePassed / 2) * (-0.01) + 'vw';     
           
        if (timePassed > 4000){ 
               var start1 = Date.now(); // сохранить время начала

      var timer1 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed1 = Date.now() - start1;

        hel8.style.left = (timePassed1 / 2) * (0.01) + 'vw';     
          if (timePassed1 > 3000){ 
             zxc.style.visibility = "visible";
            
            clearInterval(timer1);}

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel7.style.visibility = "hidden";

         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
     }
    
     
        if(k == 7){ q4.innerHTML = ("Вы набрали " + qsnake + " баллов!");
                   setTimeout(function(){
   window.location.reload(1);
}, 5000);
     }
  
    
    
 k=k+1;
    
i++;

n.innerHTML = (vopros[i]);

}