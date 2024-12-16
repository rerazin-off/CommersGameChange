var vopros = ["Охотно ли ты знакомишься с новыми людьми?",
              "Умеешь ли ты находить общий язык с разными людьми?",
    		"Нравиться ли тебе организовывать праздник с друзьями или турпоход?",
    		"Волнуют ли тебя вопросы экологии?",
    		"Любишь ли ты ухаживать за животными?",
    		"Нравится ли тебе следить за развитием растений, выводить их новые сорта?",
    		"Хорошо ли ты ориентируешься в пространстве?",
    		"Интересуешься ли ты появлением новых гаджетов и принципом их работы?",
    		"Нравится ли тебе конструировать, проектировать новую одежду или приборы?",
    		"Нравится ли тебе работать на компьютере?",
    		"Увлекают ли тебя научно-популярные книги?",
    		"Нравится ли тебе работать с картами, схемами, таблицами?",
    		"Увлекаешься ли ты чем-либо из этого: пение, игра на музыкальных инструментах, рисование, сочинение стихов и рассказов?",
    		"Нравится ли тебе фотографировать?",
    		"Можешь ли ты выступать публично?",
    		"Умеешь ли ты выслушивать людей?",
    		"Понравилось бы тебе рекламировать или продавать товары?",
    		"Интересно ли тебе выращивать овощи и фрукты?",
    		"Нравится ли тебе следить за развитием растений, выводить их новые сорта?",
    		"Хотелось бы тебе водить машину?",
    		"Умеешь ли ты мастерить своими руками?",
    		"Интересно ли было тебе изобрести робота?",
    		"Хорошо ли ты считаешь в уме?	",
    		"Разбираешься ли ты в чертежах, умеешь ли ты чертить?",
    		"Смог бы ты выступать на сцене?	",
    		"Хотел бы ты хорошо разбираться в литературе и искусстве?"];


 

function not(){
    
 var elem = document.getElementById('title1');
elem.style.visibility = 'hidden';
}

function show(state) {

    document.getElementById('window').style.display = state;
    document.getElementById('wrap').style.display = state;
}


function jsy() {
    var n = document.getElementById("q");
    var h = n.textContent;
    var p = document.getElementById("people");
    var p1 = document.getElementById("people1");
   if (h == vopros[0]) n.innerHTML = (vopros[1]);
    if (h == vopros[1]) n.innerHTML = (vopros[2]);
    if (h == vopros[2]) n.innerHTML = (vopros[14]);
    if (h == vopros[14]) n.innerHTML = (vopros[16]);
    if (h == vopros[16]) n.innerHTML = (vopros[15]);
    if (h == vopros[15]){
        p.innerHTML = ("Человек-Человек");
         p1.innerHTML = ("Вам подходят все профессии, связанные с воспитанием, обслуживанием, обучением людей, общением с ними.</br> </br>К этой профессии относятся все педагогические и медицинские профессии, профессии сферы услуг и другие.");
        show('flex');
        n.innerHTML = (vopros[0]);
        var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/man.png';
    }
     if (h == vopros[3]) n.innerHTML = (vopros[4]);
    if (h == vopros[4]) n.innerHTML = (vopros[5]);
    if (h == vopros[5]) n.innerHTML = (vopros[18]);
    if (h == vopros[18]) n.innerHTML = (vopros[17]);
    if (h == vopros[17]) {
        p.innerHTML = ("Человек-Природа");
        p1.innerHTML = ("Вам подходят все профессии, связанные с изучением, охраной и преобразованием природы.</br> </br>К этой группе относятся такие профессии как:ветеринар, садовник, агроном, эколог и другие.");
        show('flex');
        n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/nature.png';
    }
     if (h == vopros[6]) n.innerHTML = (vopros[7]);
    if (h == vopros[7]) n.innerHTML = (vopros[8]);
    if (h == vopros[8]) n.innerHTML = (vopros[21]);
    if (h == vopros[21]) n.innerHTML = (vopros[20]);
    if (h == vopros[20]) n.innerHTML = (vopros[19]);
    if (h == vopros[19]) {
        p.innerHTML = ("Человек-Техника");
        p1.innerHTML = ("Вам подходят все профессии, связанные с созданием, обслуживанием и эксплуатацией техники.</br> </br>Это такие профессии как: инженер-конструктор, автослесарь, системный администратори другие.");
        show('flex');
        n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/mind.png';
    }
 if (h == vopros[9]) n.innerHTML = (vopros[10]);
    if (h == vopros[10]) n.innerHTML = (vopros[11]);
    if (h == vopros[11]) n.innerHTML = (vopros[22]);
    if (h == vopros[22]) n.innerHTML = (vopros[23]);
    if (h == vopros[23]) {
        p.innerHTML = ("Человек-Знаковая система");
        p1.innerHTML = ("Вам подходят все профессии, связанные с созданием и использованием знаковых систем(цифровых, буквенных, нотных).</br> </br>К этой группе относятся переводчики художественных и технических текстов, аналитики, финансисты и другие.");
        show('flex');
        n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/system.png';
    }
    if (h == vopros[12]) n.innerHTML = (vopros[13]);
    if (h == vopros[13]) n.innerHTML = (vopros[24]);
    if (h == vopros[24]) n.innerHTML = (vopros[25]);
    if (h == vopros[25]) {
        p.innerHTML = ("Человек-Художественный образ");
        p1.innerHTML = ("Вам подходят все профессии, связанные с созданием, копированием, воспроизведением и изучением художественных образов.</br> </br>К этой группе относятся такие профессии как: художник, актёр, певец, реставратор, искусствовед и другие.");
        show('flex');
        n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/color.jpg';
    }
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
    if (h == vopros[0]) n.innerHTML = (vopros[3]);
    if (h == vopros[3]) n.innerHTML = (vopros[6]);
    if (h == vopros[6]) n.innerHTML = (vopros[9]);
    if (h == vopros[9] || h == vopros[10]) n.innerHTML = (vopros[12]);
    if (h == vopros[12] || h == vopros[13] || h == vopros[24] || h == vopros[25]) {
        p.innerHTML = ("Человек-Вопрос");
        p1.innerHTML = ("У вас нет явных увлечений и пристрастий. Обратите на это внимание и постарайтесь найти дело по своим интересамм.</br> </br> Если вы совершенно не представляете, какую можно выбрать профессию, остановитесь на специальности, которая всегда будет востребованной  и доходной.");        
        show('flex');;
        n.innerHTML = (vopros[0]);
         var elem = document.getElementById('title1');
elem.style.visibility = 'visible';
        document.images["img"].src = 'img/question.jpg';
    }
   if (h == vopros[1] || h == vopros[2]) n.innerHTML = (vopros[5]);
    if (h == vopros[5]) n.innerHTML = (vopros[8]);
    if (h == vopros[8]) n.innerHTML = (vopros[11]);
    if (h == vopros[11]) n.innerHTML = (vopros[13]);
    if (h == vopros[4]) n.innerHTML = (vopros[7]);
    if (h == vopros[7]) n.innerHTML = (vopros[10]);
    if (h == vopros[14] || h == vopros[16]) n.innerHTML = (vopros[17]);
    if (h == vopros[17] || h == vopros[19]) n.innerHTML = (vopros[20]);
    if (h == vopros[20]) n.innerHTML = (vopros[23]);
    if (h == vopros[15]) n.innerHTML = (vopros[19]);
    if (h == vopros[19]) n.innerHTML = (vopros[20]);
    if (h == vopros[23]) n.innerHTML = (vopros[25]);
    if (h == vopros[18]) n.innerHTML = (vopros[21]);
    if (h == vopros[21]) n.innerHTML = (vopros[24]);
    if (h == vopros[22]) n.innerHTML = (vopros[24]);
    n.className = 'h2';
    function func() {
    n.className = 'h1';
    }
    setTimeout(func, 100);
}
