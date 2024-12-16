$(document).ready(function () {
   $('.img').css({
        'background-image': 'url(img/qu.png)'
    })
});

$('.start').click(function () {
    $('.title').css({
        'visibility': 'hidden'
    })
    $('.work').css({
        'visibility': 'visible'
    })
});

$('.plus').click(function () {
   $('.img').css({
        'background-image': 'url(img/plus.png)'
    })
    $(this).closest('.p').css({
        'background-color': 'rgba(0, 128, 0, 0.60)',
        'color': 'white',
        'border-radius': '1.5vw'
    })
});

$('.minus').click(function () {
   $('.img').css({
        'background-image': 'url(img/minus.jpg)'
    })
    $(this).closest('.p').css({
        'background-color': 'rgba(255, 0, 0, 0.60)',
        'color': 'white',
        'border-radius': '1.5vw'
    })
});

$('.info').click(function () {
   $('.info').css({
        'visibility': 'hidden'
    })
    $('.content').css({
        'filter': 'none'
    })
    $('.text').text()
});

$('.one div.minus').click(function () {
   $('.info').css({
        'visibility': 'visible'
    })
    $('.content').css({
        'filter': 'blur(5px)'
    })
    $('.text').text('В соответствии с законом о банках и банковской деятельности №395, банки не имеют права осуществлять деятельность без лицензии')
});

$('.two div.minus').click(function () {
   $('.info').css({
        'visibility': 'visible'
    })
    $('.content').css({
        'filter': 'blur(5px)'
    })
    $('.text').text('В настоящее время в целях улучшения качества обслуживания клиентов, действует электронная очередь')
});

$('.three div.minus').click(function () {
   $('.info').css({
        'visibility': 'visible'
    })
    $('.content').css({
        'filter': 'blur(5px)'
    })
    $('.text').text('Реклама предлагает только выгоды для клиентов, не освещает важной и значимой информации')
});

$('.four div.minus').click(function () {
   $('.info').css({
        'visibility': 'visible'
    })
    $('.content').css({
        'filter': 'blur(5px)'
    })
    $('.text').text('Знакомые могут не владеть финансовой грамотностью и их мнение может быть ошибочным')
});

$('.five div.minus').click(function () {
   $('.info').css({
        'visibility': 'visible'
    })
    $('.content').css({
        'filter': 'blur(5px)'
    })
    $('.text').text('Процентные ставки являются частью депозитного договора, другие условия которого могут быть не привлекательными')
});

$('.six div.minus').click(function () {
   $('.info').css({
        'visibility': 'visible'
    })
    $('.content').css({
        'filter': 'blur(5px)'
    })
    $('.text').text('Офис может быть съемным и не являться банковской собственностью')
});

$('.seven div.minus').click(function () {
   $('.info').css({
        'visibility': 'visible'
    })
    $('.content').css({
        'filter': 'blur(5px)'
    })
    $('.text').text('Офис может переехать')
});

$('.eithg div.minus').click(function () {
   $('.info').css({
        'visibility': 'visible'
    })
    $('.content').css({
        'filter': 'blur(5px)'
    })
    $('.text').text('Многие банковские операции совершаются в режиме онлайн, круглосуточно')
});

$('.nine div.minus').click(function () {
   $('.info').css({
        'visibility': 'visible'
    })
    $('.content').css({
        'filter': 'blur(5px)'
    })
    $('.text').text('В соответствии с ФЗ №177 банки обязаны участвовать в системе страхования вкладов')
});

$('.ten div.minus').click(function () {
   $('.info').css({
        'visibility': 'visible'
    })
    $('.content').css({
        'filter': 'blur(5px)'
    })
    $('.text').text('Современные банковские технологии позволяют обслуживать клиентов быстро и качественно')
});






