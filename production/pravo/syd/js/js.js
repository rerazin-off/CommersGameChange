var vopros = ["Анна продала Михаилу жилой дом. Когда Михаил вселился в него, то заметил, что во дворе нет ни одной из хозяйственных построек. Из подвала исчезли окна, которые он видел во время осмотра дома, телеантенна и мебель из комнат. Михаил предъявил соответствующие претензии Анне, но оказалось, что в догоовре о продаже этих вещей ничего написано не было.",
              "Гражданин Петров выгуливал свою собаку и вдруг стал свидетелем совершения преступления: неизвестный ограбил девушку, угрожая пистолетом, а потом начал убегать. Петров дал собаке команду на задержание неизвестного, в ходе которого собака очень сильно покусала правонарушителя. Адвокат грабителя требует наказать за это Петрова, ведь лично ему грабитель не причинил никакого вреда. ",
    		"Гражданин Смирнов, находясь в нетрезвом виде, управлял принадлежащим ему автомобилем ВАЗ-2110. Но сотрудин полиции не смог остановить его, а Смирнов был задержан через три часа у себя дома, утверждя, что никакую машину он не водил",
    		"В ходе рейда было выявлено, что продавец торговой фирмы АРС обслуживает клиентов без контрольно-кассового аппарата. К тому же на ряде товаров не было ценников. В ходе проверки выяснилось, что фирма АРС кассовые аппараты в налоговой инспекции не зарегистрировала. Продавец пояснила, что она не знает о том, что закон обязывает все торговые точки работать с помощью контрольно-кассового аппарата.",
    		"Соловьев обратился в суд с заявлением о привлечении к уголовной ответственности за клевету Горюнова, который среди сослуживцев высказывал свое подозрение о том, что в новогоднюю ночь Соловьев стрелял из огнестрельного оружия по окнам его квартиры. Судья установил, что факт стрельбы по окнам квартиры Горюнова имел место, и он высказал сослуживцам свое предположение, что в числе совершивших это мог быть и Соловьев.",
    		"Продавая Петрову автомобиль, Ворожейкин скрыл от него, что машина побывала в трех авариях, требовала капитальный ремонт двигателя. Петров, выяснив все это только после покупки, обратился в суд с требованием признать договор недействительным, т.к. никогда бы не заключил подобной сделки, зная истинную картину.",
    		"В детскую городскую больницу поступил двенадцатилетний ребенок, доставленный после падения с балкона 3 этажа с повреждениями, вызвавшими кровопотерю. Требовалось срочное переливание крови, однако родители, мусульмане по вероисповеданию, не дали согласие врачам на переливание крови. Врачи, после информации о последствиях их отказа не стали делать эту процедуру, пытаясь остановить кровь медикаментозными средствами, но ребенок умер от обильной кровопотери. Ответственен ли медицинский персонал за смерть мальчика?",
			"Проживающая по соседству, гражданка Иванова обратилась к врачу-окулисту Костюниной с просьбой помочь задыхающемуся ребенку, на что та ответила, что нужно вызвать скорую, ибо она не педиатр и брать на себя ответственность не имеет права. Пока женщина нашла телефон и приехала скорая, ребенок умер от асфиксии вследствие закрытия гортани попавшим в нее кедровым орехом.",
    		];


var k = 0;

function not(){
    var p1 = document.getElementById("people1");
    var n = document.getElementById("q");
    var h = n.textContent;
    var p = document.getElementById("people");
    p.innerHTML = ("Инструкция"); 
    
    p1.innerHTML = ("Определите свои организаторские способности, т.е. умение активно влиять на людей. Для этого ответьте быстро, не задумываясь, на нижеприведенные вопросы. Ответы должны быть только утвердительными (да) или отрицательными (нет). Отвечая, постарайтесь воспроизводить свое реальное поведение в конкретной ситуации.");        
       
    
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
      q5.innerHTML = ("Если при продаже жилого дома был составлен соответствующий договор купле-продажи, необходимо внимательно читать его условия, где должны быть указаны все тонкости передачи дома в хозяйствование другого человека. Если в договоре было сказано о продаже одного дома, без имущества претензии Михаила безосновательны и не имеют никакой юридической силы."); 
obl1.style.visibility = "visible";
      
setTimeout(sos, 10 * 1000);  
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
           q5.innerHTML = ("Крайняя необходимость определяется как состояние, при котором лицо правомерно причиняет ущерб интересам охраняемых государством, чтобы устранить опасность, непосредственно угрожающей личности или охраняемым законом правам этого человека или других лиц, а также общественным интересам или интересам государства, при условии невозможности устранить эту опасность другими средствами, если при этом не было допущено превышения пределов крайней необходимости"); 
   obl1.style.visibility = "visible";
setTimeout(sos, 10 * 1000);  
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
         q5.innerHTML = ("Исходя из статьи 33 Основ законодательства РФ об охране здоровья граждан о праве граждан на отказ от медицинской помощи (в этом случае при отказе родителей несовершеннолетнего ребенка до 15 лет), необходимой для спасения его жизни, медики ответственности не понесут. Однако руководство больницы или отделения должны обратиться в суд для защиты интересов ребенка.");  
     obl1.style.visibility = "visible";
setTimeout(sos, 10 * 1000);  
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
        q5.innerHTML = ("Нет, не несет.. Врач был не на работе, уголовная ответственность исключается.");
     obl1.style.visibility = "visible";
setTimeout(sos, 10 * 1000);  
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
    
    p.innerHTML = ("");
        p1.innerHTML = ("Вы относитесь к типу руководителя-организатора, умеете сконцентрировать силы на наиболее важных проблемах. К ним можно причислить разработку и согласование оптимального (реально выполнимого) плана, проблемы материально-технического снабжения.Ваша сила в том, что Вы никогда не идете на поводу у текущих дел, отделяете главное от второстепенного, умеете во что бы то ни стало добиться решения принципиальных проблем, не останавливаясь перед конфликтами и взысканиями. Дела в возглавляемом Вами подразделении, как правило, идут успешно. Вам можно дать один совет: не запускайте текущие дела, перепоручая их заместителям, время от времени контролируйте исполнение.");        
        show('flex');;
    
    n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/question.jpg';}
    else if(m>=13 && m<15){
         p.innerHTML = ("");
        p1.innerHTML = ("Нельзя сказать, что Вы сильный руководитель, но если в возглавляемом Вами коллективе дела идут неплохо, то лучше не принимать коренных реорганизаций. Не нужно также соглашаться перейти в другой коллектив. Вам следует больше прислушиваться к мнению коллектива, шире использовать коллективные формы принятия решений, стремиться создать и упрочить традиции в коллективе.");        
        show('flex');;
    
    n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/question.jpg';
        
        
    }
       else if(m<13){
         p.innerHTML = ("");
        p1.innerHTML = ("Если у вас оказался низкий уровень, не отчаивайтесь, при желании вы можете развить свои организаторские способности.Вы больше специалист, чем руководитель, и если представится возможность перейти на такую должность, как, например, главный специалист, главный инженер и т. п., не надо колебаться!");        
        show('flex');;
    
    n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/question.jpg';
        
        
    }
    
i=0;
m=0;}
  
    n.className = 'h2';
    function func() {
    n.className = 'h1';}
    setTimeout(func, 100);
}

function jsn() {
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
          q5.innerHTML = ("Статья 12.8 КоАП РФ. Управление транспортным средством водителем, находящимся в состоянии опьянения, передача управления транспортным средством лицу, находящемуся в состоянии опьянения. Если тест на алкогольное опьянение превышает допустимый результат и будет доказано, что обвиняемый был за рулем транспортного средства, то он понесет наказание."); 
 obl1.style.visibility = "visible";
setTimeout(sos, 10 * 1000);  
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
          q5.innerHTML = (" Статья 14.5. Продажа товаров, выполнение работ либо оказание услуг при отсутствии установленной информации либо неприменение в установленных федеральными законами случаях контрольно-кассовой техники.");   
   obl1.style.visibility = "visible";
setTimeout(sos, 10 * 1000);  
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
          q5.innerHTML = ("Клевета посягает на честь и достоинство личности. Согласно ст. 21 Конституции РФ, достоинство личности охраняется государством. В соответствии со ст. 23 Конституции РФ каждый имеет право на защиту своей чести и доброго имени.");   
      obl1.style.visibility = "visible";
setTimeout(sos, 10 * 1000);  
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
         q5.innerHTML = ("Договор действителен, однако в соответствии со статьей 475 ГК РФ: 1. Если недостатки товара не были оговорены продавцом, покупатель, которому передан товар ненадлежащего качества, вправе по своему выбору потребовать от продавца: соразмерного уменьшения покупной цены; безвозмездного устранения недостатков товара в разумный срок; возмещения своих расходов на устранение недостатков товара."); 
      obl1.style.visibility = "visible";
setTimeout(sos, 10 * 1000);  
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
    
     
        if(k == 7){
            
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
            
            
                
              
              var start12 = Date.now(); // сохранить время начала

      var timer12 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed12 = Date.now() - start12;


        if (timePassed12 > 10000){
             location.href = "index_prepodovanie.html";
            
            clearInterval(timer12);}

      }, 20);
              
              
            clearInterval(timer1);
          
          
          
          }

      }, 20); 
             // telh2.style.visibility = "hidden";
         hel8.style.visibility = "hidden";
  
              
              var start12 = Date.now(); // сохранить время начала

      var timer12 = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed12 = Date.now() - start12;


        if (timePassed12 > 10000){
             location.href = "index_prepodovanie.html";
            
            clearInterval(timer12);}

      }, 20);
         //  tem1.style.visibility = "visible";
            clearInterval(timer);}

      }, 20);
     }
    
    
    
 k=k+1;
    
i++;

n.innerHTML = (vopros[i]);


if (i==8){
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
         p.innerHTML = ("");
       
    
    n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/question.jpg';
        
        
    }
i=0;
m=0;}

    n.className = 'h2';
    function func() {
    n.className = 'h1';}
    setTimeout(func, 100);
}