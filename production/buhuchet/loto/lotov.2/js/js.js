var question;
var otvet;
var i;
var s =0;

function var1() {
document.getElementById('menu').style.visibility = 'hidden';
var n = document.getElementById("q");
n.innerHTML = ("Эмиссионная ценная бумага, доля владения компанией,закрепляющая права ее владельца (акционера) на получение части прибыли акционерного общества в виде дивидендов.");
var h = n.textContent;
question = ["Эмиссионная ценная бумага, доля владения компанией,закрепляющая права ее владельца (акционера) на получение части прибыли акционерного общества в виде дивидендов.",
"В какой стране начался процесс автоматизации операция хозяйственной деятельности.",
"Функция налогов, которая предполагает систему управления рыночной экономикой через методы и средства налогообложения.",
"Базовый законодательный документ, главная задача которого заключается в обеспечении бюджета государства финансовыми ресурсами.",
"Из какой страны родом определение - Бухгалтер.",
"Нормативный документ предприятия по персоналу.",
"Одна из возможных ставок налогообложения при упрощенной системе налогообложения.",
"Стандарты бухгалтерского учёта содержаться в ...",
"Законодательный документ, включающий в себя общие понятия бухучета, требования касательно его ведения и регулирование основных положений.",
"Кодифицированный законодательный акт, источник трудового права.",
"Свод правил, регулирующих организацию и порядок деятельности в какой-либо определённой сфере отношений",
"Процесс переноса по частям стоимости основных средств и нематериальных активов по мере их физического или морального износа на себестоимость производимой продукции (работ, услуг).",
"Ставка налога на прибыль при общей системе налогообложения.",
"Средства труда для производства.",
"Проверка наличия имущества организации и состояния её финансовых обязательств на определённую дату путём сличения фактических данных с данными бухгалтерского учёта.",
"Что определеяет взаимные права и обязанности сторон трудовых отношений.",
"Какая функция налогов проявляется в обеспечении государства финансовыми ресурсами.",
"Независимая проверка деятельности отдельно взятой организации с целью изучения достоверности финансовой отчётности компании.",
"Средства, выдаваемые заранее в счет покрытия предстоящих расходов или платежей.",
"Эмиссионная долговая ценная бумага, владелец которой имеет право получить от лица, её выпустившего, в оговорённый срок её номинальную стоимость деньгами или в виде иного имущественного эквивалента.",""
];
    
    otvet = [
     "Акции",
     "США",
     "Регулирующая",
     "Налоговый Кодекс",
     "Германия",
     "Штатное расписание",
     "6%",
     "ПБУ",
     "402ФЗ",
     "Трудовой кодекс",
     "Устав",
     "Амортизация",
     "20%",
     "Основные средства",
     "Инвентаризация",
     "Трудовой договор",
     "Фискальная",
     "Аудит",
     "Аванс",
     "Облигации", ""     
 ];

    i = 0;
    s=0;
    document.getElementById('button1').style.visibility = "visible";
    document.getElementById('button2').style.visibility = "visible";
    document.getElementById('button3').style.visibility = "visible";
    document.getElementById('button4').style.visibility = "visible";
    document.getElementById('button5').style.visibility = "visible";
    document.getElementById('button6').style.visibility = "visible";
    document.getElementById('button7').style.visibility = "visible";
    document.getElementById('button8').style.visibility = "visible";
    document.getElementById('button9').style.visibility = "visible";
    document.getElementById('button10').style.visibility = "visible";
    document.getElementById('button11').style.visibility = "visible";
    document.getElementById('button12').style.visibility = "visible";
    document.getElementById('button13').style.visibility = "visible";
    document.getElementById('button14').style.visibility = "visible";
    document.getElementById('button15').style.visibility = "visible";
    document.getElementById('button16').style.visibility = "visible";
    document.getElementById('button17').style.visibility = "visible";
    document.getElementById('button18').style.visibility = "visible";
    document.getElementById('button19').style.visibility = "visible";
    document.getElementById('button20').style.visibility = "visible";
}
function otv() {
    document.images["img"].style.visibility = 'visible';
    var n = document.getElementById("q");
    for (var j = 0; j < 20; j++) {
        if (document.activeElement.value == otvet[j])
            if (j == (i)) {
                document.images["img"].src = 'img/yes.gif';
                hide();
                i++;
                s++;
                n.innerHTML = (question[i]);
                document.activeElement.style.visibility = 'hidden';
            }
        else {
            document.images["img"].src = 'img/no.gif';
            hide();
            i++;
            n.innerHTML = (question[i]);
            document.activeElement.style.visibility = 'hidden';
        }    
    }
    if(i==20){
        document.getElementById('exit').style.visibility = "visible"
            var elem =document.getElementById('menu-e');
            elem.innerHTML = ("Процент правильных ответов равен:</br>" +(s / 20) * 100+"%");
        if (s <= 2) elem.style.backgroundColor = 'red';
        else if ((s > 2) && (s <= 4)) elem.style.backgroundColor = 'orange';
             else if ((s > 4) && (s <= 7)) elem.style.backgroundColor = 'yellow';
                  else if ((s > 7) && (s <= 20))
                        elem.style.backgroundColor = 'green';
        }
}
function hide(){
    document.getElementById('img').style.visibility = "visible";
    document.getElementById("q").style.opacity = '0';
    setTimeout(show, 2000);
}
function show(){
    document.getElementById('img').style.visibility = "hidden";
    document.getElementById("q").style.opacity = '1';
}
function exit() {
    document.getElementById('exit').style.visibility = "hidden"
    document.getElementById('menu').style.visibility = 'visible';
}