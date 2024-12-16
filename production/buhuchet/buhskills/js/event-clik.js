var n1 = document.getElementById('no1');
var n2 = document.getElementById('no2');
var n3 = document.getElementById('no3');
var n4 = document.getElementById('no4');
var n5 = document.getElementById('no5');
var n6 = document.getElementById('no6');
var n7 = document.getElementById('no7');
var n8 = document.getElementById('no8');
var n9 = document.getElementById('no9');
var n10 = document.getElementById('no10');

var imgwi = document.getElementById('imgwin');
var descnu = document.getElementById('h1win');
var numbwor = document.getElementById('deskwin');

var formds = document.getElementById('widow');

n1.addEventListener( "click" , cl1);
n2.addEventListener( "click", cl2);
n3.addEventListener( "click" , cl3);
n4.addEventListener( "click", cl4);
n5.addEventListener( "click" , cl5);
n6.addEventListener( "click", cl6);
n7.addEventListener( "click" , cl7);
n8.addEventListener( "click", cl8);
n9.addEventListener( "click" , cl9);
n10.addEventListener( "click", cl10);

function cl1(){
    formds.style.display = "block";
    imgwi.src="img/peopl.svg";
    descnu.textContent='Профессия 1';
    numbwor.textContent='На столько сокращается продолжительность работы (смены) при работе в ночное время (с 22 до 6 часов)';
}
function cl2(){
    formds.style.display = "block";
    imgwi.src="img/peopl.svg";
    descnu.textContent='лет';
    numbwor.textContent='Возраст, с которого можно заключать трудовой договор, если вы получили основное общее образование или оставили общеобразовательное учреждение в соотвествии с федеральным законом';
}
function cl3(){
    formds.style.display = "block";
    imgwi.src="img/peopl.svg";
    descnu.textContent='часа';
    numbwor.textContent='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio earum nulla voluptatum vel, nam quis aspernatur aperiam dolor quidem odit beatae maiores vero, quo, molestiae voluptas placeat suscipit nesciunt dolorum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio earum nulla voluptatum vel, nam quis aspernatur aperiam dolor quidem odit beatae maiores vero, quo, molestiae voluptas placeat suscipit nesciunt dolorum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio earum nulla voluptatum vel, nam quis aspernatur aperiam dolor quidem odit beatae maiores vero, quo';
}
function cl4(){
    imgwi.src="img/peopl.svg";
    formds.style.display = "block";
    descnu.textContent='часов';
    numbwor.textContent='Максимальная продолжительность ежедневной работы (смены) для тех, кому от 15 до 16 лет';
}
function cl5(){
    imgwi.src="img/peopl.svg";
    formds.style.display = "block";
    descnu.textContent='часа в неделю';
    numbwor.textContent='Продолжительность рабочего времени для работников в возрасте до 16 лет';
}
function cl6(){
    imgwi.src="img/peopl.svg";
    formds.style.display = "block";
    descnu.textContent='часа';
    numbwor.textContent='Максимальная продолжительность ежедневной работы (смены) для учащихся общеобразовательных учреждений начального и среднего профессионального образования в возрасте от 14 до 16 лет, совмещающих учебу с работой';
}
function cl7(){
    imgwi.src="img/peopl.svg";
    formds.style.display = "block";
    descnu.textContent='часов в год';
    numbwor.textContent='Не более этого времени может длиться работа за пределами нормальной продолжительности рабочего времени по инициативе работодателя (сверхурочная работа)';
}
function cl8(){
    imgwi.src="img/peopl.svg";
    formds.style.display = "block";
    descnu.textContent='часа в течение двух дней';
    numbwor.textContent='Не более этого времени может длиться работа за пределами нормальной продолжительности рабочего времени по инициативе работодателя (сверхурочная работа)';
}
function cl9(){
    imgwi.src="img/peopl.svg";
    formds.style.display = "block";
    descnu.textContent='календарный день';
    numbwor.textContent='Продолжительноть ежегодного основного оплачеваемого отпуска работникам в возрасте до 18 лет';
}
function cl10(){
    imgwi.src="img/peopl.svg";
    formds.style.display = "block";
    descnu.textContent='часов в неделю';
    numbwor.textContent='Сокращенная продолжительность рабочего времени для работников в возрасте от 16 до 18 лет, а также для инвалидов I и II группы';
}