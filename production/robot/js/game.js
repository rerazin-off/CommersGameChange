var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var konus = new Image();
var konus1 = new Image();
var konus2 = new Image();
bird.src = "img/smile.png";
bg.src = "img/bg1.png";
konus.src = "img/yama.png"
pipeUp.src = "img/chest.png";
konus1.src = "img/yama.png"
konus2.src = "img/yama.png"

//var p=Math.random([1,2,3,4]);


var xod = [];
var x11 = [];
var kom = "";

var o = 0;
var o1 = 0;
var gap = 90;

function vikl() {
    document.getElementById('vkl1').style.visibility = "visible";
    document.getElementById('vikl1').style.visibility = "hidden";
    document.getElementById('str').style.visibility = "hidden";
}

function end() {
    location.reload()
}









// При нажатии на какую-либо кнопку



var ENTER =13;
var yPos = 400;









function proverka1() {

    if (xod[1] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;

        }

    } else if (xod[1] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;

        }

    } else if ((xod[1] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;

        }

    } else if (xod[1] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;

        }
    }


    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";

    }



if(o==1){fulproverka();}else{  setTimeout(proverka2, 500);}



 



  
}









function proverka2() {

    if (xod[2] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;

        }

    } else if (xod[2] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;

        }

    } else if ((xod[2] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;

        }

    } else if (xod[2] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;

        }
    }



    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }




if(o==2){fulproverka();}else{  setTimeout(proverka3, 500);}
















    


}

function proverka3() {

    if (xod[3] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;

        }

    } else if (xod[3] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;

        }

    } else if ((xod[3] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;

        }

    } else if (xod[3] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;

        }
    }






    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }



 
if(o==3){fulproverka();}else{  setTimeout(proverka4, 500);}








 




   

}


function proverka4() {

    if (xod[4] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[4] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[4] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[4] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }







    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }


    





if(o==4){fulproverka();}else{  setTimeout(proverka5, 500);}


    




    

}

function proverka5() {

    if (xod[5] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[5] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[5] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[5] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }





    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }








if(o==5){fulproverka();}else{  setTimeout(proverka6, 500);}



   




    

}

function proverka6() {

    if (xod[6] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[6] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[6] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[6] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }



    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }






    




if(o==6){fulproverka();}else{  setTimeout(proverka7, 500);}


    




    

}

function proverka7() {

    if (xod[7] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[7] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[7] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[7] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }








    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }



   



if(o==7){fulproverka();}else{  setTimeout(proverka8, 500);}




   




    

}

function proverka8() {

    if (xod[8] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[8] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[8] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[8] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }






    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }



   








if(o==8){fulproverka();}else{  setTimeout(proverka9, 500);}
    




    

}

function proverka9() {

    if (xod[9] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[9] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[9] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[9] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }






    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }



    






if(o==9){fulproverka();}else{  setTimeout(proverka10, 500);}
   

    

}

function proverka10() {

    if (xod[10] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[10] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[10] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[10] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }





    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }




   




if(o==10){fulproverka();}else{  setTimeout(proverka11, 500);}



   




   

}

function proverka11() {

    if (xod[11] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[11] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[11] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[11] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }





    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }




   


if(o==11){fulproverka();}else{  setTimeout(proverka12, 500);}





    


    

}

function proverka12() {

    if (xod[12] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[12] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[12] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[12] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }






    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }








if(o==12){fulproverka();}else{  setTimeout(proverka13, 500);}


   



     

}


function proverka13() {

    if (xod[13] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[13] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[13] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[13] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }




    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }





   




if(o==13){fulproverka();}else{  setTimeout(proverka14, 500);}

  



    

}

function proverka14() {

    if (xod[14] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[14] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[14] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[14] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }





    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }









if(o==14){fulproverka();}else{  setTimeout(proverka15, 500);}

    



     

}

function proverka15() {

    if (xod[15] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[15] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[15] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[15] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }






    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }



   





    
if(o==15){fulproverka();}else{  setTimeout(proverka16, 500);}




}

function proverka16() {

    if (xod[16] == 1) {






        for (var m = 0; m < 50; m++) {
            xPos -= 5;



        }
    } else if (xod[16] == 2) {
        for (var m = 0; m < 50; m++) {
            yPos += 5;


        }
    } else if ((xod[16] == 3)) {
        for (var m = 0; m < 50; m++) {
            xPos += 5;


        }
    } else if (xod[16] == 4) {
        for (var m = 0; m < 50; m++) {
            yPos -= 5;


        }
    }




    if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }






fulproverka();
    





    





}




function fulproverka(){
    
    
       if (xPos > pipe[1].x1 - 100 && xPos < pipe[1].x1 + 100

        &&
        (yPos > pipe[1].y1 - 100 && yPos < pipe[1].y1 + 100) || xPos > pipe[2].x2 - 100 && xPos < pipe[2].x2 + 100

        &&
        (yPos > pipe[2].y2 - 100 && yPos < pipe[2].y2 + 100) || xPos > pipe[3].x3 - 100 && xPos < pipe[3].x3 + 100

        &&
        (yPos > pipe[3].y3 - 100 && yPos < pipe[3].y3 + 100)) {
        // Перезагрузка страницы
           
            document.getElementById('b1').innerHTML = "";

    document.getElementById('b2').innerHTML = "";

    document.getElementById('b3').innerHTML = "";

    document.getElementById('b4').innerHTML = "";

    document.getElementById('b5').innerHTML = "";


    document.getElementById('b6').innerHTML = "";


    document.getElementById('b7').innerHTML = "";


    document.getElementById('b8').innerHTML = "";

    document.getElementById('b9').innerHTML = "";


    document.getElementById('b10').innerHTML = "";


    document.getElementById('b11').innerHTML = "";

    document.getElementById('b12').innerHTML = "";

    document.getElementById('b13').innerHTML = "";

    document.getElementById('b14').innerHTML = "";

    document.getElementById('b15').innerHTML = "";

    document.getElementById('b16').innerHTML = "";
           
           
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
            
           
           
          
           
           
    }







    if (o == 1) {


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
    
 
    
    if (o == 2) {


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }

        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
    
       if (o == 3) {


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
    
    if (o == 4) {


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
     if (o == 5) {


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
    if (o == 6) {



        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }



        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
     if (o == 7) {


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }



        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
    if (o == 8) {


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
     if (o == 9) {


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }



        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
 if (o == 10) {


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }



        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
if (o == 11) {


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }



        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }

 if (o == 12) {



        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }



        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
      if (o == 13) {

        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }



        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }

    if (o == 14) {

        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
    if (o == 15) {



        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
             document.getElementById('str').style.visibility = "hidden";
        }




        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
    }
    
    if (o == 16){
    if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

        &&
        (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
        // Перезагрузка страницы
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq').style.visibility = "visible";
        document.getElementById('rob').style.visibility = "hidden";
         document.getElementById('str').style.visibility = "hidden";
    }



    if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

        &&
        (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {} else {
        document.getElementById('men1').style.visibility = "hidden";
        document.getElementById('vikl1').style.visibility = "hidden";
        document.getElementById('vkl1').style.visibility = "hidden";
        document.getElementById('okn').style.visibility = "hidden";
        document.getElementById('canvas').style.visibility = "hidden";
        document.getElementById('ewq1').style.visibility = "visible";
        document.getElementById('str').style.visibility = "hidden";
        document.getElementById('rob').style.visibility = "hidden";
    }

    }
    
    
}

function vkl() {

    document.getElementById('str').style.visibility = "visible";

    document.getElementById('vikl1').style.visibility = "visible";
    document.getElementById('vkl1').style.visibility = "hidden";
}









document.onkeydown = function (e) {
    if (e.keyCode == ENTER){off();}
    
    if (e.keyCode == KEY_right) {



        xPos += 250;

        if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
            document.getElementById('str').style.visibility = "hidden";
        }





    }


    if (e.keyCode == KEY_left) {
        xPos -= 250;
        if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }


        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
            document.getElementById('str').style.visibility = "hidden";
        }


    }
    if (e.keyCode == KEY_Up) {
        yPos -= 250;

        if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
            document.getElementById('str').style.visibility = "hidden";
        }

    }
    if (e.keyCode == KEY_Down) {
        yPos += 250;

        if (xPos < 0 || xPos > 1000 || yPos > 1000 || yPos < 0) {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }
        if (xPos > pipe[0].x - 100 && xPos < pipe[0].x + 100

            &&
            (yPos > pipe[0].y - 100 && yPos < pipe[0].y + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq').style.visibility = "visible";
            document.getElementById('rob').style.visibility = "hidden";
            document.getElementById('str').style.visibility = "hidden";
        }

    }


}

// Создание блоков
var pipe = [];


pipe[0] = {
    x: 780,
    y: 0
}
pipe[1] = {
    x1: 0,
    y1: 0
}
pipe[2] = {
    x2: 0,
    y2: 0
}
pipe[3] = {
    x3: 0,
    y3: 0
}
// Позиция птички
var xPos = 20;
var yPos = 30;
var grav = 1.5;







function draw() {

    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);









        // Отслеживание прикосновений






    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);



    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";


    requestAnimationFrame(draw);
}
pipeUp.onload = draw;



function draw1() {

    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);









        // Отслеживание прикосновений






    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);



    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";


    requestAnimationFrame(draw1);
}



function draw3() {






    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(konus, pipe[i].x1, pipe[i].y1);
        ctx.drawImage(konus1, pipe[i].x2, pipe[i].y2);








        // Отслеживание прикосновений









        if (xPos > pipe[1].x1 - 100 && xPos < pipe[1].x1 + 100

            &&
            (yPos > pipe[1].y1 - 100 && yPos < pipe[1].y1 + 100) || xPos > pipe[2].x2 - 100 && xPos < pipe[2].x2 + 100

            &&
            (yPos > pipe[2].y2 - 100 && yPos < pipe[2].y2 + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";

        }



    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);



    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";


    requestAnimationFrame(draw3);
}


function draw4() {






    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(konus, pipe[i].x1, pipe[i].y1);
        ctx.drawImage(konus1, pipe[i].x2, pipe[i].y2);
        ctx.drawImage(konus2, pipe[i].x3, pipe[i].y3);







        // Отслеживание прикосновений









        if (xPos > pipe[1].x1 - 100 && xPos < pipe[1].x1 + 100

            &&
            (yPos > pipe[1].y1 - 100 && yPos < pipe[1].y1 + 100) || xPos > pipe[2].x2 - 100 && xPos < pipe[2].x2 + 100

            &&
            (yPos > pipe[2].y2 - 100 && yPos < pipe[2].y2 + 100) || xPos > pipe[3].x3 - 100 && xPos < pipe[3].x3 + 100

            &&
            (yPos > pipe[3].y3 - 100 && yPos < pipe[3].y3 + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";

        }



    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);



    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";


    requestAnimationFrame(draw4);
}


function draw2() {






    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(konus, pipe[i].x1, pipe[i].y1);






        if (xPos > pipe[1].x1 - 100 && xPos < pipe[1].x1 + 100

            &&
            (yPos > pipe[1].y1 - 100 && yPos < pipe[1].y1 + 100)) {
            // Перезагрузка страницы
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";

        }



    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);



    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";


    requestAnimationFrame(draw2);
}


function end1() {




    document.getElementById('b1').innerHTML = "";

    document.getElementById('b2').innerHTML = "";

    document.getElementById('b3').innerHTML = "";

    document.getElementById('b4').innerHTML = "";

    document.getElementById('b5').innerHTML = "";


    document.getElementById('b6').innerHTML = "";


    document.getElementById('b7').innerHTML = "";


    document.getElementById('b8').innerHTML = "";

    document.getElementById('b9').innerHTML = "";


    document.getElementById('b10').innerHTML = "";


    document.getElementById('b11').innerHTML = "";

    document.getElementById('b12').innerHTML = "";

    document.getElementById('b13').innerHTML = "";

    document.getElementById('b14').innerHTML = "";

    document.getElementById('b15').innerHTML = "";

    document.getElementById('b16').innerHTML = "";


for (var l=0; l<=16;l++){
    xod[l]="";
}
    

    o1++;
    xPos = 20;
    yPos = 30;
    o = 0;
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    document.getElementById('men1').style.visibility = "visible";
    document.getElementById('vikl1').style.visibility = "visible";
    document.getElementById('vkl1').style.visibility = "visible";
    document.getElementById('okn').style.visibility = "visible";
    document.getElementById('canvas').style.visibility = "visible";
    document.getElementById('ewq1').style.visibility = "hidden";
    document.getElementById('ewq').style.visibility = "hidden";
    document.getElementById('str').style.visibility = "visible";
    document.getElementById('rob').style.visibility = "visible";
    if (o1 == 1) {
        requestAnimationFrame(draw1);
        pipe[0] = {
            x: 260,
            y: 780
        }
    }
    if (o1 == 2) {
        pipe[0] = {
            x: 0,
            y: 780
        }
        pipe[1] = {
            x1: 0,
            y1: 520
        }
        requestAnimationFrame(draw2);
    }
    if (o1 == 3) {
        pipe[0] = {
            x: 780,
            y: 520
        }
        pipe[1] = {
            x1: 780,
            y1: 0
        }
        pipe[2] = {
            x2: 520,
            y2: 520
        }
        requestAnimationFrame(draw3);
    }


    if (o1 == 4) {
        pipe[0] = {
            x: 520,
            y: 0
        }
        pipe[1] = {
            x1: 260,
            y1: 0
        }
        pipe[2] = {
            x2: 260,
            y2: 260
        }
        pipe[3] = {
            x3: 520,
            y3: 520
        }
        requestAnimationFrame(draw4);
    }
     if (o1 == 5) {
   location.reload();
    }

}





function off() {
    kom = document.getElementById('komanda').value;

    if (kom == "robot.left()") {

        document.getElementById('rob').style.visibility = "visible";

        o++;
        xod[o] = 1;
        if (o == 1) {
            document.getElementById('b1').innerHTML = "1. robot.left()";
        }
        if (o == 2) {
            document.getElementById('b2').innerHTML = "2. robot.left()";
        }
        if (o == 3) {
            document.getElementById('b3').innerHTML = "3. robot.left()";
        }
        if (o == 4) {
            document.getElementById('b4').innerHTML = "4. robot.left()";
        }
        if (o == 5) {
            document.getElementById('b5').innerHTML = "5. robot.left()";
        }
        if (o == 6) {
            document.getElementById('b6').innerHTML = "6. robot.left()";
        }
        if (o == 7) {
            document.getElementById('b7').innerHTML = "7. robot.left()";
        }
        if (o == 8) {
            document.getElementById('b8').innerHTML = "8. robot.left()";
        }
        if (o == 9) {
            document.getElementById('b9').innerHTML = "9. robot.left()";
        }
        if (o == 10) {
            document.getElementById('b10').innerHTML = "10. robot.left()";
        }
        if (o == 11) {
            document.getElementById('b11').innerHTML = "11. robot.left()";
        }
        if (o == 12) {
            document.getElementById('b12').innerHTML = "12. robot.left()";
        }
        if (o == 13) {
            document.getElementById('b13').innerHTML = "13. robot.left()";
        }
        if (o == 14) {
            document.getElementById('b14').innerHTML = "14. robot.left()";
        }
        if (o == 15) {
            document.getElementById('b15').innerHTML = "15. robot.left()";
        }
        if (o == 16) {
            document.getElementById('b16').innerHTML = "16. robot.left()";
        }
        if (o > 16) {
            document.getElementById('men1').style.visibility = "hidden";
            document.getElementById('vikl1').style.visibility = "hidden";
            document.getElementById('vkl1').style.visibility = "hidden";
            document.getElementById('okn').style.visibility = "hidden";
            document.getElementById('canvas').style.visibility = "hidden";
            document.getElementById('ewq1').style.visibility = "visible";
            document.getElementById('str').style.visibility = "hidden";
            document.getElementById('rob').style.visibility = "hidden";
        }



    } else {

        if (kom == "robot.right()") {

            o++;
            xod[o] = 3;

            document.getElementById('rob').style.visibility = "visible";

            if (o == 1) {
                document.getElementById('b1').innerHTML = "1. robot.right()";
            }
            if (o == 2) {
                document.getElementById('b2').innerHTML = "2. robot.right()";
            }
            if (o == 3) {
                document.getElementById('b3').innerHTML = "3. robot.right()";
            }
            if (o == 4) {
                document.getElementById('b4').innerHTML = "4. robot.right()";
            }
            if (o == 5) {
                document.getElementById('b5').innerHTML = "5. robot.right()";
            }
            if (o == 6) {
                document.getElementById('b6').innerHTML = "6. robot.right()";
            }
            if (o == 7) {
                document.getElementById('b7').innerHTML = "7. robot.right()";
            }
            if (o == 8) {
                document.getElementById('b8').innerHTML = "8. robot.right()";
            }
            if (o == 9) {
                document.getElementById('b9').innerHTML = "9. robot.right()";
            }
            if (o == 10) {
                document.getElementById('b10').innerHTML = "10. robot.right()";
            }
            if (o == 11) {
                document.getElementById('b11').innerHTML = "11. robot.right()";
            }
            if (o == 12) {
                document.getElementById('b12').innerHTML = "12. robot.right()";
            }
            if (o == 13) {
                document.getElementById('b13').innerHTML = "13. robot.right()";
            }
            if (o == 14) {
                document.getElementById('b14').innerHTML = "14. robot.right()";
            }
            if (o == 15) {
                document.getElementById('b15').innerHTML = "15. robot.right()";
            }
            if (o == 16) {
                document.getElementById('b16').innerHTML = "16. robot.right()";
            }


            if (o > 16) {
                document.getElementById('men1').style.visibility = "hidden";
                document.getElementById('vikl1').style.visibility = "hidden";
                document.getElementById('vkl1').style.visibility = "hidden";
                document.getElementById('okn').style.visibility = "hidden";
                document.getElementById('canvas').style.visibility = "hidden";
                document.getElementById('ewq1').style.visibility = "visible";
                document.getElementById('str').style.visibility = "hidden";
                document.getElementById('rob').style.visibility = "hidden";
            }


        } else {

            if (kom == "robot.up()") {
                document.getElementById('rob').style.visibility = "visible";

                o++;
                xod[o] = 4;



                if (o == 1) {
                    document.getElementById('b1').innerHTML = "1. robot.up()";
                }
                if (o == 2) {
                    document.getElementById('b2').innerHTML = "2. robot.up()";
                }
                if (o == 3) {
                    document.getElementById('b3').innerHTML = "3. robot.up()";
                }
                if (o == 4) {
                    document.getElementById('b4').innerHTML = "4. robot.up()";
                }
                if (o == 5) {
                    document.getElementById('b5').innerHTML = "5. robot.up()";
                }
                if (o == 6) {
                    document.getElementById('b6').innerHTML = "6. robot.up()";
                }
                if (o == 7) {
                    document.getElementById('b7').innerHTML = "7. robot.up()";
                }
                if (o == 8) {
                    document.getElementById('b8').innerHTML = "8. robot.up()";
                }
                if (o == 9) {
                    document.getElementById('b9').innerHTML = "9. robot.up()";
                }
                if (o == 10) {
                    document.getElementById('b10').innerHTML = "10. robot.up()";
                }
                if (o == 11) {
                    document.getElementById('b11').innerHTML = "11. robot.up()";
                }
                if (o == 12) {
                    document.getElementById('b12').innerHTML = "12. robot.up()";
                }
                if (o == 13) {
                    document.getElementById('b13').innerHTML = "13. robot.up()";
                }
                if (o == 14) {
                    document.getElementById('b14').innerHTML = "14. robot.up()";
                }
                if (o == 15) {
                    document.getElementById('b15').innerHTML = "15. robot.up()";
                }
                if (o == 16) {
                    document.getElementById('b16').innerHTML = "16. robot.up()";
                }
                if (o > 16) {
                    document.getElementById('men1').style.visibility = "hidden";
                    document.getElementById('vikl1').style.visibility = "hidden";
                    document.getElementById('vkl1').style.visibility = "hidden";
                    document.getElementById('okn').style.visibility = "hidden";
                    document.getElementById('canvas').style.visibility = "hidden";
                    document.getElementById('ewq1').style.visibility = "visible";
                    document.getElementById('str').style.visibility = "hidden";
                    document.getElementById('rob').style.visibility = "hidden";
                }

            } else {

                if (kom == "robot.down()") {
                    o++;
                    xod[o] = 2;

                    document.getElementById('rob').style.visibility = "visible";


                    if (o == 1) {
                        document.getElementById('b1').innerHTML = "1. robot.down()";
                    }
                    if (o == 2) {
                        document.getElementById('b2').innerHTML = "2. robot.down()";
                    }
                    if (o == 3) {
                        document.getElementById('b3').innerHTML = "3. robot.down()";
                    }
                    if (o == 4) {
                        document.getElementById('b4').innerHTML = "4. robot.down()";
                    }
                    if (o == 5) {
                        document.getElementById('b5').innerHTML = "5. robot.down()";
                    }
                    if (o == 6) {
                        document.getElementById('b6').innerHTML = "6. robot.down()";
                    }
                    if (o == 7) {
                        document.getElementById('b7').innerHTML = "7. robot.down()";
                    }
                    if (o == 8) {
                        document.getElementById('b8').innerHTML = "8. robot.down()";
                    }
                    if (o == 9) {
                        document.getElementById('b9').innerHTML = "9. robot.down()";
                    }
                    if (o == 10) {
                        document.getElementById('b10').innerHTML = "10. robot.down()";
                    }
                    if (o == 11) {
                        document.getElementById('b11').innerHTML = "11. robot.down()";
                    }
                    if (o == 12) {
                        document.getElementById('b12').innerHTML = "12. robot.down()";
                    }
                    if (o == 13) {
                        document.getElementById('b13').innerHTML = "13. robot.down()";
                    }
                    if (o == 14) {
                        document.getElementById('b14').innerHTML = "14. robot.down()";
                    }
                    if (o == 15) {
                        document.getElementById('b15').innerHTML = "15. robot.down()";
                    }
                    if (o == 16) {
                        document.getElementById('b16').innerHTML = "16. robot.down()";
                    }


                    if (o > 16) {
                        document.getElementById('men1').style.visibility = "hidden";
                        document.getElementById('vikl1').style.visibility = "hidden";
                        document.getElementById('vkl1').style.visibility = "hidden";
                        document.getElementById('okn').style.visibility = "hidden";
                        document.getElementById('canvas').style.visibility = "hidden";
                        document.getElementById('ewq1').style.visibility = "visible";
                        document.getElementById('str').style.visibility = "hidden";
                        document.getElementById('rob').style.visibility = "hidden";
                    }


                } else {
                    alert("Неправильно введена команда!!!")
                }
            }
        }
    }
    kom = "";
    document.getElementById('komanda').value = "";

}

function vopr() {
    alert("Команды:\nrobot.down() - вниз\nrobot.up() - вверх\nrobot.left() - влево\nrobot.right() - вправо")
}
