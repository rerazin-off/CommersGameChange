$(document).ready(function () {
    $('.zayavka').hide();
    $('.krit').hide();
    $('.otkaz').hide();
    $('.odobr').hide();
    $('#voz').val();
    $('#citizenship').val();
    $('#addres').val();
    $('#work').val();
    $('#prof').val();
    $('#name').val();
});

// btnBack.addEventListener('click', backHandler)
// function backHandler(e) {
//     console.log('шаг назад')
//     e.preventDefault();

//     history.go(-1);
// }

$('.start').click(function () {
    $('.message').hide();
    $('.start').hide();
    $('.otkaz').hide();
    $('.odobr').hide();
    $('.display').css({
        'background-image': 'url(img/screen.png)',
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

// function random(min, max) {
//     var rand = min - 0.5 + Math.random() * (max - min + 1)
//     rand = Math.round(rand);
//     return rand;
// }
// var text = $('.zayavka').find('p');
// text.css({
//     'white-space': 'pre'
// })
// var nomer = random(1, 8);
// var br = $('br')
// if (nomer == 1) {
//     text.text(' Я, Смирнова Ирина Олеговна \n\n гражданка РФ \n\n 25.07.1959 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир');
// }

// if (nomer == 2) {
//     var text = $('.zayavka').find('p');
//     text.text(' Я, Смирнова Ирина Олеговна \n\n гражданка РФ \n\n 25.07.1959 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир');
// }

// if (nomer == 3) {
//     var text = $('.zayavka').find('p');
//     text.text(' Я, Смирнова Ирина Олеговна \n\n гражданка РФ \n\n 25.07.1959 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир');
// }

// if (nomer == 4) {
//     var text = $('.zayavka').find('p');
//     text.text(' Я, Смирнова Ирина Олеговна \n\n гражданка РФ \n\n 25.07.1959 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир');
// }

// if (nomer == 5) {
//     var text = $('.zayavka').find('p');
//     text.text(' Я, Смирнова Ирина Олеговна \n\n гражданка РФ \n\n 25.07.1959 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир');
// }

// if (nomer == 6) {
//     var text = $('.zayavka').find('p');
//     text.text('Я, Петров Дмитрий СЕергеевич \n\n гражданин РФ \n\n 29.08.1960 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир');
// }

// if (nomer == 7) {
//     var text = $('.zayavka').find('p');
//     text.text('Я, Дебров Сергей Евгеньевич \n\n гражданин РФ \n\n 29.08.1960 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир');
// }

// if (nomer == 8) {
//     var text = $('.zayavka').find('p');
//     text.text('Я, Петров Дмитрий СЕергеевич \n\n гражданин РФ \n\n 29.08.1960 года рождения\n\n проживающая по адресу: г. Н. Новгород,\n\n ул. Советская, д. 15, кв. 29\n\n Имею опыт работы\n\n 18 лет по профессии продавец-кассир');
// }


// $(document).keypress(function (e) {
//     if (e.which == 13) {
//         var voz = $('#voz').val() * 12;
//         var doxod = $('#doxod').val();
//         var summa = $('#summa').val();
//         var srok = $('#srok').val();
//         if (voz <= (18 * 12)) {
//             $('.otkaz').show();
//             $('.krit').hide();
//             $('.zayavka').hide();
//         } else if ((summa / srok) > (doxod / 2)) {
//             $('.otkaz').show();
//             $('.krit').hide();
//             $('.zayavka').hide();
//         } else if (summa > (srok * doxod)) {
//             $('.otkaz').show();
//             $('.krit').hide();
//             $('.zayavka').hide();
//         } else if (srok > (1200 - voz)) {
//             $('.otkaz').show();
//             $('.krit').hide();
//             $('.zayavka').hide();
//         } else {
//            '.odobr').show(); $(
//             $('#var1').text('Заявка оформлена верно');
//             $('#var2').text('Заявка оформлена неверно)');


//             $('.krit').hide();
//             $('.zayavka').hide();
//         }
//     }
// });

// $('#var1').click(function () {
//     $('#var1').css({
//         'text-align': 'center'
//     })
//     $('#var2').css({
//         'display': 'none'
//     })
//     $('#var1').text('Вы   кредитования');
//     $('#var2').text(' ')
//     setTimeout(function () {
//         location.reload();
//     }, 2000);


// });

// $('#var2').click(function () {
//     $('#var2').css({
//         'text-align': 'center'
//     })
//     $('#var1').css({
//         'display': 'none'
//     })
//     $('#var2').text('Вы подобрали хорошие условия кредитования');
//     $('#var1').text(' ');

//     setTimeout(function () {
//         location.reload();
//     }, 2000);
// });

// $('.otkaz').click(function () {
//     location.reload();
// });

const startGame = document.querySelector('#startGame');
const application = document.querySelector('#application');
const form = document.querySelector('#form');
const form2 = document.querySelector('#form2');
const form3 = document.querySelector('#form3');
const odobr = document.querySelector('#odobr');

const version = [
    {
        fullname: 'Васнецова Екатерина Олеговна',
        gender: 'female',
        citizenship: 'СССР',
        addres: 'пл. Максима Горького, Россия, 606123, кв. 3, д. 12, г. Нижний Новгород',
        work_start: '13.05.1979',
        work_end: '27.06.2004',
        snils: '148-234-340 65',
        telephone: '89067854321',
        pasport: '2278 564897',
        date_pasport: '23.04.2006',
        prof: 'инженер',
        day: '01',
        mounth: '04',
        year: '1961',
        birthday: "1961-04-01",
        work_start_1: '1979-05-13',
        work_end_2: '2004-06-27',
    },
    {
        fullname: 'Смирнова Ирина Олеговна',
        gender: 'female',
        citizenship: 'РФ',
        addres: 'д.15, ул. Советская, г. Н. Новгород, кв. 29, 607760 Россия',
        work_start: '15.12.1980',
        work_end: '17.03.2012',
        snils: '165-786-890 65',
        telephone: '88075649834',
        pasport: '2318 784563',
        date_pasport: '25.08.2004',
        prof: 'продавец-кассир',
        day: '25',
        mounth: '07',
        year: '1959',
        birthday: "1959-07-25",
        work_start_1: '1980-12-15',
        work_end_2: '2012-03-17',
    },
    {
        fullname: 'Малышев Игорь Сергеевич',
        gender: 'male',
        citizenship: 'РФ',
        addres: 'ул. Должанская, кв. 5, д. 15, г. Санкт-Петербург, 786435 Россия',
        work_start: '12.09.1985',
        work_end: '28.06.2015',
        snils: '176-564-435 56',
        telephone: '88087634635',
        pasport: '2217 908765',
        date_pasport: '18.04.2010',
        prof: 'бухгалтер',
        day: '18',
        mounth: '03',
        year: '1965',
        birthday: "1965-03-18",
        work_start_1: '1985-09-12',
        work_end_2: '2015-09-28',
    }
]
let versionNumber = 0;
let formNumber = 0;
let index = 0;
// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }
// let s = shuffle(Array.from({ length: 10 }, (v, k) => k + 1))
// for (let i = 0; i < 5; i++) document.getElementById("form").style.display = '';

function myStartGame() {
    let container = document.getElementById("all_form");
    let children = container.children;

    index = Math.floor(Math.random() * children.length);

    for(let i = 0; i < children.length; i++) {
        if(index != i) {
            children[i].style.display= "none";
        }
    }

    versionNumber = Math.floor(Math.random() * version.length);
    formNumber = Math.floor(Math.random() * form.length);
    console.log(index);
    const { fullname, gender, citizenship, work_start, prof, day, mounth, year, addres, work_end, snils, telephone, date_pasport, pasport } = version[versionNumber];
    const template = `Я, ${fullname} ${gender === 'female' ? 'гражданка' : 'гражданин'} 
    ${citizenship} ${day}.${mounth}.${year}г. рождения, ${gender === 'female' ? 'проживающая' : 'проживающий'} 
    по адресу: ${addres}. Имею опыт работы с ${work_start}г. по ${work_end}г. по профессии ${prof}. Прошу назначить мне страховую пенсию по старости. \n
    СНИЛС:${snils}\n Номер телефона:${telephone} \n Документ,удостоверяющий личность:паспорт:${pasport}\n Выдан:ГУ МВД Росии по Нижегородской области,${date_pasport} г. `;
    application.innerText = template;
}





function checkDate(e) {
    e.preventDefault();
    const fullname = document.querySelector('#fullname');
    const citizenship = document.querySelector('#citizenship');
    const voz = document.querySelector('#voz');
    const addres = document.querySelector('#addres');
    const work = document.querySelector('#work');

    var start = version[versionNumber]['work_start_1'];
    var end = version[versionNumber]['work_end_2'];
    var birthday = version[versionNumber]['birthday'];


    const fullname_two = document.querySelector('#fullname_two');
    const citizenship_two = document.querySelector('#citizenship_two');
    const expirience_work = document.querySelector('#expirience_work');
    const telephone = document.querySelector('#telephone');
    const snils = document.querySelector('#snils');

    const fullname_three = document.querySelector('#fullname_three');
    const passport = document.querySelector('#passport');
    const date_passport = document.querySelector('#date_passport');
    const citizenship_three = document.querySelector('#citizenship_three');
    const prof_three = document.querySelector('#prof_three');
    const work_three = document.querySelector('#work_three');


    // парсим их с помощью moment-а
    var a = moment(start, "YYYY-MM-DD");
    var b = moment(end, "YYYY-MM-DD");
    // получаем количество дней между датами
    var days = b.diff(a, 'year');
    console.log('стаж работы: ', days)

    var today = new Date();
    // парсим их с помощью moment-а
    var ag = moment(birthday, "YYYY-MM-DD");
    var bg = moment(today, "YYYY-MM-DD");
    // получаем количество дней между датами
    var age = bg.diff(ag, 'year');

    //валидация полей, кейсы - номер формы
    switch(index) {
        case 0:
            if ((version[versionNumber]['fullname'] !== fullname.value)) {
                fullname.style.borderColor='red'
            } else if (version[versionNumber]['fullname'] == fullname.value) {
                fullname.style.borderColor='green'
            }

            if (version[versionNumber]['citizenship'] !== citizenship.value) {
                citizenship.style.borderColor='red'
            } else {
                citizenship.style.borderColor='green'
            }

            if (parseInt(voz.value) !== age ) {
                voz.style.borderColor='red'
            } else {
                voz.style.borderColor='green'
            }

            if (parseInt(work.value) !== days) {
                work.style.borderColor='red'
            } else {
                work.style.borderColor='green'
            }
            
            if (version[versionNumber]['addres'] !== addres.value) {
                addres.style.borderColor='red'
            } else {
                addres.style.borderColor='green'
            }

            if (version[versionNumber]['prof'] !== prof.value) {
                prof.style.borderColor='red'
            } else {
                prof.style.borderColor='green'
            }

            break
        case 1:
            if ((version[versionNumber]['fullname'] !== fullname_two.value)) {
                fullname_two.style.borderColor='red'
            } else {
                fullname_two.style.borderColor='green'
            }

            if (version[versionNumber]['citizenship'] !== citizenship_two.value) {
                citizenship_two.style.borderColor='red'
            } else {
                citizenship_two.style.borderColor='green'
            }

            if (parseInt(expirience_work.value) !== days) {
                expirience_work.style.borderColor='red'
            } else {
                expirience_work.style.borderColor='green'
            }

            if (version[versionNumber]['telephone'] !== telephone.value) {
                telephone.style.borderColor='red'
            } else {
                telephone.style.borderColor='green'
            }

            if (version[versionNumber]['snils'] !== snils.value) {
                snils.style.borderColor='red'
            } else {
                snils.style.borderColor='green'
            }
            break
        case 2:
            if ((version[versionNumber]['fullname'] !== fullname_three.value)) {
                fullname_three.style.borderColor='red'
            } else if (version[versionNumber]['fullname'] == fullname_three.value) {
                fullname_three.style.borderColor='green'
            }

            if (version[versionNumber]['citizenship'] !== citizenship_three.value) {
                citizenship_three.style.borderColor='red'
            } else {
                citizenship_three.style.borderColor='green'
            }
            
            if (parseInt(work_three.value) !== days) {
                work_three.style.borderColor='red'
            } else {
                work_three.style.borderColor='green'
            }

            if (version[versionNumber]['prof'] !== prof_three.value) {
                prof_three.style.borderColor='red'
            } else {
                prof_three.style.borderColor='green'
            }

            if (version[versionNumber]['pasport'] !== passport.value) {
                passport.style.borderColor='red'
            } else {
                passport.style.borderColor='green'
            }

            if (version[versionNumber]['date_pasport'] !== date_passport.value) {
                date_passport.style.borderColor='red'

            } else {
                date_passport.style.borderColor='green'
            }
            break
    }

    // сообщение о правильном заполнении формы
    if ((
        version[versionNumber]['fullname'] === fullname.value
        && version[versionNumber]['citizenship'] === citizenship.value 
        && parseInt(voz.value) === age 
        && parseInt(work.value) === days 
        && version[versionNumber]['addres'] === addres.value 
        && version[versionNumber]['prof'] === prof.value) 
        ||
        (version[versionNumber]['fullname'] === fullname_two.value &&
        version[versionNumber]['citizenship'] === citizenship_two.value &&
        parseInt(expirience_work.value) === days &&
        version[versionNumber]['telephone'] === telephone.value &&
        version[versionNumber]['snils'] === snils.value)
        ||
        (version[versionNumber]['fullname'] === fullname_three.value &&
        version[versionNumber]['citizenship'] === citizenship_three.value &&
        version[versionNumber]['prof'] === prof_three.value &&
        version[versionNumber]['pasport'] === passport.value &&
        version[versionNumber]['date_pasport'] === date_passport.value &&
        parseInt(work_three.value) === days)) {
        $('#odobr').show();
        $('#form').hide();
        $('#form2').hide();
        $('#form3').hide();
        $('#zayavka').hide();
        odobr.innerHTML = `Заявка оформлена верно`;
    }
    // else {
    //     $('#odobr').show();
    //     $('#form').hide();
    //     $('#form2').hide();
    //     $('#form3').hide();
    //     $('#zayavka').hide();
    //     odobr.innerHTML = `Заявка оформлена неверно`;


    // }

}

form.addEventListener('submit', checkDate)
form2.addEventListener('submit', checkDate)
form3.addEventListener('submit', checkDate)

startGame.addEventListener('click', myStartGame)