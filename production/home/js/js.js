function wall(num) {
    switch(num){
        case 1: document.getElementById("wallhome").style.background = 'url(img/wall1.png)'; break;  
            
        case 2: document.getElementById("wallhome").style.background = 'url(img/wall2.png)'; break;  
            
        case 3: document.getElementById("wallhome").style.background = 'url(img/wall3.png)'; break;
            
        case 4: document.getElementById("wallhome").style.background = 'url(img/wall4.png)'; break;
    }
    document.getElementById("wallhome").style.backgroundRepeat = 'no-repeat'
    document.getElementById("wallhome").style.backgroundSize = 'cover'
    document.getElementsByClassName('stena')[0].style.display = 'none';
    document.getElementsByClassName('krysha')[0].style.display = 'flex';
}

function b(num) {
    switch(num){
        case 1: document.getElementById("fundhome").style.background = 'url(img/b1.png)'; break;  
            
        case 2: document.getElementById("fundhome").style.background = 'url(img/b2.png)'; break;  
            
        case 3: document.getElementById("fundhome").style.background = 'url(img/b3.png)'; break;
            
        case 4: document.getElementById("fundhome").style.background = 'url(img/b4.png)'; break;
    }
     document.getElementById("fundhome").style.backgroundRepeat = 'no-repeat'
    document.getElementById("fundhome").style.backgroundSize = 'cover'
    document.getElementsByClassName('fund')[0].style.display = 'none';
    document.getElementsByClassName('stena')[0].style.display = 'flex';
}

function roof(num) {
    switch(num){
        case 1: document.getElementById("krhome").style.background = 'url(img/roof1.png)'; break;  
            
        case 2: document.getElementById("krhome").style.background = 'url(img/roof2.png)'; break;  
            
        case 3: document.getElementById("krhome").style.background = 'url(img/roof3.png)'; break;
            
        case 4: document.getElementById("krhome").style.background = 'url(img/roof4.png)'; break;
    }
     document.getElementById("krhome").style.backgroundRepeat = 'no-repeat'
    document.getElementById("krhome").style.backgroundSize = 'cover'
    document.getElementsByClassName('krysha')[0].style.display = 'none';
    document.getElementsByClassName('dver')[0].style.display = 'flex';
}

function d(num) {
    switch(num){
        case 1: document.getElementById("dverhome").style.background = 'url(img/d1.png)'; break;  
            
        case 2: document.getElementById("dverhome").style.background = 'url(img/d2.png)'; break;  
            
        case 3: document.getElementById("dverhome").style.background = 'url(img/d3.png)'; break;
            
        case 4: document.getElementById("dverhome").style.background = 'url(img/d4.png)'; break;
    }
     document.getElementById("dverhome").style.backgroundRepeat = 'no-repeat'
    document.getElementById("dverhome").style.backgroundSize = 'cover'
    document.getElementsByClassName('dver')[0].style.display = 'none';
    document.getElementsByClassName('okna')[0].style.display = 'flex';
}

function w(num) {
    switch(num){
        case 1: document.getElementById("oknohome").style.background = 'url(img/w1.png)'; break;  
            
        case 2: document.getElementById("oknohome").style.background = 'url(img/w2.png)'; break;  
            
        case 3: document.getElementById("oknohome").style.background = 'url(img/w3.png)'; break;
            
        case 4: document.getElementById("oknohome").style.background = 'url(img/w4.png)'; break;
    }
     document.getElementById("oknohome").style.backgroundRepeat = 'no-repeat'
    document.getElementById("oknohome").style.backgroundSize = 'cover'
    document.getElementsByClassName('okna')[0].style.display = 'none';
    document.getElementsByClassName('reboot')[0].style.display = 'flex';
}

function none(){
    document.getElementsByClassName('title')[0].style.display = 'none';
}

function hello(){
    document.getElementsByClassName('people')[0].style.visibility = 'visible'
}