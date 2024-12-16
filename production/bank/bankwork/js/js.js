$(document).ready(function () {
    $('.zayavka').hide();
    $('.krit').hide();
    $('.otkaz').hide();
    $('.odobr').hide();
    $('#voz').val();
    $('#doxod').val();
    $('#summa').val();
    $('#srok').val();
});

$('.start').click(function () {
    $('.message').hide();
    $('.start').hide();
    $('.display').css({
        'background-image': 'url(img/browser.png)',
        'background-color': 'white',
        'height': '100vh',
        'width': '100vw',
        'top': '0',
        'left': '0',
        'transition': '0.5s'
    })
    $('.krit').show();
    $('.zayavka').show();
});

function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
var text = $('.zayavka').find('p');
text.css({
    'white-space': 'pre'
})
var nomer = random(1, 8);
var br = $('br')
if (nomer == 1) {
    text.text(' Я, Смирнова Ирина Олеговна \n\n гражданка РФ \n\n 25.07.1959 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир \n\n Срок кредита: 12 месяцев');
}

if (nomer == 2) {
    var text = $('.zayavka').find('p');
    text.text(' Я, Смирнова Ирина Олеговна \n\n гражданка РФ \n\n 25.07.1959 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир \n\n Срок кредита: 12 месяцев');
}

if (nomer == 3) {
    var text = $('.zayavka').find('p');
    text.text(' Я, Смирнова Ирина Олеговна \n\n гражданка РФ \n\n 25.07.1959 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир \n\n Срок кредита: 12 месяцев');
}

if (nomer == 4) {
    var text = $('.zayavka').find('p');
    text.text(' Я, Смирнова Ирина Олеговна \n\n гражданка РФ \n\n 25.07.1959 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир \n\n Срок кредита: 12 месяцев');
}

if (nomer == 5) {
    var text = $('.zayavka').find('p');
    text.text(' Я, Смирнова Ирина Олеговна \n\n гражданка РФ \n\n 25.07.1959 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир \n\n Срок кредита: 12 месяцев');
}

if (nomer == 6) {
    var text = $('.zayavka').find('p');
    text.text(' Имя: Петр\n\n Возраст: 38 лет\n\n Профессия: военный пенсионер\n\n Финансовое состояние: 70000 рублей\n\n Сумма кредита: 200000 рублей \n\n Срок кредита: 12 месяцев');
}

if (nomer == 7) {
    var text = $('.zayavka').find('p');
    text.text(' Имя: Екатерина\n\n Возраст: 60 лет\n\n Профессия: уборщик/пенсионер\n\n Финансовое состояние: 30000 рублей\n\n Сумма кредита: 100000 рублей \n\n Срок кредита: 12 месяцев');
}

if (nomer == 8) {
    var text = $('.zayavka').find('p');
    text.text(' Имя: Анастасия\n\n Возраст: 22 года\n\n Профессия: медсестра\n\n Финансовое состояние: 35000 рублей\n\n Сумма кредита: 50000 рублей \n\n Срок кредита: 12 месяцев');
}


$(document).keypress(function (e) {
    if (e.which == 13) {
        var voz = $('#voz').val() * 12;
        var doxod = $('#doxod').val();
        var summa = $('#summa').val();
        var srok = $('#srok').val();
        if (voz <= (18 * 12)) {
            $('.otkaz').show();
            $('.krit').hide();
            $('.zayavka').hide();
        } else if ((summa / srok) > (doxod / 2)) {
            $('.otkaz').show();
            $('.krit').hide();
            $('.zayavka').hide();
        } else if (summa > (srok * doxod)) {
            $('.otkaz').show();
            $('.krit').hide();
            $('.zayavka').hide();
        } else if (srok > (1200 - voz)) {
            $('.otkaz').show();
            $('.krit').hide();
            $('.zayavka').hide();
        } else {
            $('.odobr').show();
            $('#var1').text('Одобренная сумма составляет ' + (summa / 2) + ' под 10% годовых, сроком на ' + (srok * 2) + ' месяца(ев)');
            $('#var2').text('Одобренная сумма составляет ' + (summa) + ' под 8% годовых, сроком на ' + (srok * 1.5) + ' месяца(ев)');


            $('.krit').hide();
            $('.zayavka').hide();
        }
    }
});

$('#var1').click(function () {
    $('#var1').css({
        'text-align': 'center'
    })
    $('#var2').css({
        'display': 'none'
    })
    $('#var1').text('Вы   кредитования');
    $('#var2').text(' ')
    setTimeout(function () {
        location.reload();
    }, 2000);


});

$('#var2').click(function () {
    $('#var2').css({
        'text-align': 'center'
    })
    $('#var1').css({
        'display': 'none'
    })
    $('#var2').text('Вы подобрали хорошие условия кредитования');
    $('#var1').text(' ');

    setTimeout(function () {
        location.reload();
    }, 2000);
});

$('.otkaz').click(function () {
    location.reload();
});
