var n1 = document.getElementById('no1');
var n15 = document.getElementById('no15');
var n42 = document.getElementById('no42');
var n5 = document.getElementById('no5');
var n24 = document.getElementById('no24');
var n205 = document.getElementById('no2-5');
var n120 = document.getElementById('no120');
var n4 = document.getElementById('no4');
var n31 = document.getElementById('no31');
var n35 = document.getElementById('no35');
var n7 = document.getElementById('no7');
var n16 = document.getElementById('no16');
var n8 = document.getElementById('no8');
var n36 = document.getElementById('no36');
var n40 = document.getElementById('no40');
var n28 = document.getElementById('no28');
var n6 = document.getElementById('no6');
var n14 = document.getElementById('no14');

var titnum = document.getElementById('nanum');
var descnu = document.getElementById('namnum');
var numbwor = document.getElementById('descnumb');



var formds = document.getElementById('form1');

//var arr = ['n1', 'n15', 'n42', 'n5','n24', 'n205', 'n120', 'n4', 'n31', 'n35', 'n7', 'n16', 'n8', 'n36', 'n40', 'n28', 'n6', 'n14'];
//
//function rotat(){
//    rand = Math.floor(Math.random() * arr.length);
//    arr[rand].style.transform="rotate(45deg)";
//}
n1.addEventListener( "click" , cl1);
n15.addEventListener( "click", cl15);
n42.addEventListener( "click" , cl42);
n5.addEventListener( "click", cl5);
n24.addEventListener( "click" , cl24);
n205.addEventListener( "click", cl205);
n120.addEventListener( "click" , cl120);
n4.addEventListener( "click", cl4);
n31.addEventListener( "click" , cl31);
n35.addEventListener( "click", cl35);
n7.addEventListener( "click" , cl7);
n16.addEventListener( "click", cl16);
n8.addEventListener( "click" , cl8);
n36.addEventListener( "click", cl36);
n40.addEventListener( "click" , cl40);
n28.addEventListener( "click", cl28);
n6.addEventListener( "click", cl6);
n14.addEventListener( "click", cl14);

function cl1(){
    formds.style.display = "block";
    titnum.textContent='1';
    descnu.textContent='час';
    numbwor.textContent='На столько сокращается продолжительность работы (смены) при работе в ночное время (с 22 до 6 часов)';
}
function cl15(){
    formds.style.display = "block";
    titnum.textContent='15';
    descnu.textContent='лет';
    numbwor.textContent='Возраст, с которого можно заключать трудовой договор, если вы получили основное общее образование или оставили общеобразовательное учреждение в соотвествии с федеральным законом';
}
function cl42(){
    formds.style.display = "block";
    titnum.textContent='42';
    descnu.textContent='часа';
    numbwor.textContent='Минимальная продолжительность еженедельного непрерывного отдыха';
}
function cl5(){
    titnum.textContent='5';
    formds.style.display = "block";
    descnu.textContent='часов';
    numbwor.textContent='Максимальная продолжительность ежедневной работы (смены) для тех, кому от 15 до 16 лет';
}
function cl24(){
    titnum.textContent='24';
    formds.style.display = "block";
    descnu.textContent='часа в неделю';
    numbwor.textContent='Продолжительность рабочего времени для работников в возрасте до 16 лет';
}
function cl205(){
    titnum.textContent='2,5';
    formds.style.display = "block";
    descnu.textContent='часа';
    numbwor.textContent='Максимальная продолжительность ежедневной работы (смены) для учащихся общеобразовательных учреждений начального и среднего профессионального образования в возрасте от 14 до 16 лет, совмещающих учебу с работой';
}
function cl120(){
    titnum.textContent='120';
    formds.style.display = "block";
    descnu.textContent='часов в год';
    numbwor.textContent='Не более этого времени может длиться работа за пределами нормальной продолжительности рабочего времени по инициативе работодателя (сверхурочная работа)';
}
function cl4(){
    titnum.textContent='4';
    formds.style.display = "block";
    descnu.textContent='часа в течение двух дней';
    numbwor.textContent='Не более этого времени может длиться работа за пределами нормальной продолжительности рабочего времени по инициативе работодателя (сверхурочная работа)';
}
function cl31(){
    titnum.textContent='31';
    formds.style.display = "block";
    descnu.textContent='календарный день';
    numbwor.textContent='Продолжительность ежегодного основного оплачиваемого отпуска работникам в возрасте до 18 лет';
}
function cl35(){
    titnum.textContent='35';
    formds.style.display = "block";
    descnu.textContent='часов в неделю';
    numbwor.textContent='Сокращенная продолжительность рабочего времени для работников в возрасте от 16 до 18 лет, а также для инвалидов I и II группы';
}
function cl7(){
    titnum.textContent='7';
    formds.style.display = "block";
    descnu.textContent='часов';
    numbwor.textContent='Максимальная продолжительность ежедневной работы (смены) для работы, в возрасте от 16 до 18 лет';
}
function cl16(){
    titnum.textContent='16';
    formds.style.display = "block";
    descnu.textContent='лет';
    numbwor.textContent='Возраст, с которого можно заключать трудовой договор';
}
function cl8(){
    titnum.textContent='8';
    formds.style.display = "block";
    descnu.textContent='часов';
    numbwor.textContent='Максимальная продолжительность ежедневной работы (смены) для тех, кто работает во вредных или опасных условиях труда при 36-часовой рабочей неделе';
}
function cl36(){
    titnum.textContent='36';
    formds.style.display = "block";
    descnu.textContent='и менее часов в неделю';
    numbwor.textContent='Продолжительность рабочего времени для работников, занятых на работах с вредными или опасными условиями труда';
}
function cl40(){
    titnum.textContent='40';
    formds.style.display = "block";
    descnu.textContent='часов в неделю';
    numbwor.textContent='Нормальная продолжительность рабочего времени';
}
function cl28(){
    titnum.textContent='28';
    formds.style.display = "block";
    descnu.textContent='календарных дней';
    numbwor.textContent='Продолжительность ежегодного основного оплачиваемого отпуска';
}
function cl6(){
    titnum.textContent='6';
    formds.style.display = "block";
    descnu.textContent='часов';
    numbwor.textContent='Максимальная продолжительность ежедневной работы (смены) для тех, кто работает во вредных или опасных условиях труда при 30-часовой рабочей неделе';
}
function cl14(){
    titnum.textContent='14';
    formds.style.display = "block";
    descnu.textContent='лет';
    numbwor.textContent='Возраст, с которого можно, с согласия родителя (попечителя), заключать трудовой договор с учащимися для выполнения в свободное от учебы время легкого труда';
}
function hideContainer() {
            document.getElementById("form1").style.display = "none";
            document.getElementById("exe").style.display = "none";
        }
    
$(document).ready(function () {
    var item = $('.item');
    item.each(function (i, elem) {
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var left = Math.floor(Math.random() * (winWidth - 300 + 1)) + 100 + 'px';
        var top = Math.floor(Math.random() * (winHeight - 300 + 1)) + 100 + 'px';
        var dalayPulse = Math.random() * (3) + 's';
        $(this).css({
            "top": top,
            "left": left
        });
        $(this).children('.pulse-1').css({
            "animation-delay": dalayPulse
        });

    });
});
