var n20 = document.getElementById('no20');
var n99 = document.getElementById('no99');
var n100000 = document.getElementById('no100000');
var n402 = document.getElementById('no402');
var n432 = document.getElementById('no432');
var n700 = document.getElementById('no700');
var n1400 = document.getElementById('no1400');
var n1999 = document.getElementById('no1999');
var n4000 = document.getElementById('no4000');
var n10000 = document.getElementById('no10000');
var n11163 = document.getElementById('no11163');

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
n20.addEventListener( "click" , cl20);
n99.addEventListener( "click", cl99);
n100000.addEventListener( "click" , cl100000);
n402.addEventListener( "click", cl402);
n432.addEventListener( "click" , cl432);
n700.addEventListener( "click", cl700);
n1400.addEventListener( "click" , cl1400);
n1999.addEventListener( "click", cl1999);
n4000.addEventListener( "click" , cl4000);
n10000.addEventListener( "click", cl10000);
n11163.addEventListener( "click" , cl11163);

function cl20(){
    formds.style.display = "block";
    titnum.textContent='20';
    descnu.textContent='процентов';
    numbwor.textContent='Основная ставка по налогу на прибыть организаций';
}
function cl99(){
    formds.style.display = "block";
    titnum.textContent='99';
    descnu.textContent='счёт';
    numbwor.textContent='Последний балансовый счёт в плане счётов бухгалтерского учёта';
}
function cl100000(){
    formds.style.display = "block";
    titnum.textContent='100 000';
    descnu.textContent='рублей';
    numbwor.textContent='Максимальная сумма наличного расчёта организаций в пределах одного договора';
}
function cl402(){
    titnum.textContent='402';
    formds.style.display = "block";
    descnu.textContent='закон';
    numbwor.textContent='Федеральный закон "О бухгалтерском учете" от 06.12.2011 N 402-ФЗ';
}
function cl432(){
    titnum.textContent='432';
    formds.style.display = "block";
    descnu.textContent='статей';
    numbwor.textContent='Налоговый кодекс Российской Федерации содержит в себе 432 статьи с 11 разделами и 34 главами';
}
function cl700(){
    titnum.textContent='700';
    formds.style.display = "block";
    descnu.textContent='предельный размер';
    numbwor.textContent='Предельный размер суточного вознаграждения за каждый день нахождения в командировке на территории Российской Федерации, установленный Налоговым кодексом Российской Федерации';
}
function cl1400(){
    titnum.textContent='1400';
    formds.style.display = "block";
    descnu.textContent='размер';
    numbwor.textContent='Размер стандартного вычета по налогу на доходы физических лиц на одного ребёнка';
}
function cl4000(){
    titnum.textContent='4000';
    formds.style.display = "block";
    descnu.textContent='сумма';
    numbwor.textContent='Необлагаемая страховыми взносами сумма материальной помощи, оказываемая организацией работникам в расчётном периоде';
}
function cl10000(){
    titnum.textContent='10 000';
    formds.style.display = "block";
    descnu.textContent='размер';
    numbwor.textContent='Минимальный размер уставного капитала для общества с ограниченной ответственностью';
}
function cl11163(){
    titnum.textContent='11163';
    formds.style.display = "block";
    descnu.textContent='размер';
    numbwor.textContent='С 1 мая 2018 года размер МРОТ привязан к прожиточному минимуму и составляет 11163 руб';
}
function cl1999(){
    titnum.textContent='1999';
    formds.style.display = "block";
    descnu.textContent='год';
    numbwor.textContent='Год вступления в силу первой части Налогового кодекса Российской Федерации (01.01.1999)';
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
