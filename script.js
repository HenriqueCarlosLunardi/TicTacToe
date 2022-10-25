let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Eventos NC 0 2 4 6 8 10 12 14 16 -> Botoes 0 1 2 3 4 5 6 7 8
// Eventos C  1 3 5 7 9 11 13 15 17 -> Botoes 0 1 2 3 4 5 6 7 8 9
// Evento J 18
// Evento A 20

//Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

//Player 'X' plays first
let xTurn = true;
let count = 0;
var ativa = 1;
var setvalue = 0;

var Evento;
var State_Automato=0;
var Gera_Evento;

var All_C = [1, 3, 5, 7, 9, 11, 13 , 15, 17];


//Disable All Buttons

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
      ativa = 0;
    const myTimeout = setTimeout(() => {
      popupRef.classList.remove("hide");
      ativa = 1;
  }, 2000);};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  estado = 0;
  xTurn = true;
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Venceu";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Venceu";
  }
};

//Function for draw
const drawFunction = () => {
  xTurn = true;
  disableButtons();
  State_Automato=0;
  msgRef.innerHTML = "&#x1F60E; <br> Empatou";
};

//New Game
newgameBtn.addEventListener("click", () => {
  State_Automato=0;
  xTurn = true;
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
    if (ativa == 1){
        State_Automato=0;
        xTurn = true;
        count = 0;
        enableButtons();
    }
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        if (element1=="O"){
            btnRef[i[0]].innerHTML = "<span class='color-green'>O</span>";
            btnRef[i[1]].innerHTML = "<span class='color-green'>O</span>";
            btnRef[i[2]].innerHTML = "<span class='color-green'>O</span>";
        }
        else{
            btnRef[i[0]].innerHTML = "<span class='color-green'>X</span>";
            btnRef[i[1]].innerHTML = "<span class='color-green'>X</span>";
            btnRef[i[2]].innerHTML = "<span class='color-green'>X</span>";
        }
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
btnRef.forEach((element, bot) => {
  element.addEventListener("click", () => {
    // Click 
      element.innerText = "X";
      element.disabled = true;
      winChecker();

      console.log("Old State: " + State_Automato);
      console.log("Ev_nC: " + bot);
      transNC(bot*2);
      console.log("Actual State: " + State_Automato);
    //Increment count on each click

    count += 1;
    if (count == 9) {
      drawFunction();
    }
    // Passa a vez
    console.log("Ev_nC: 20");
    trans20(20);
    console.log("Actual State: " + State_Automato);

    // 
    Gera_Evento = 100;

    shuffleArray(All_C);
    console.log("Vetor Random: " + All_C);

    for(var i = 0; i < All_C.length; i++) { 
        switch(All_C[i]) {
            case 1:
                    trans1();
                break;        
            case 3:
                    trans3();
                break;
            case 5:
                    trans5();
                break;
            case 7:
                    trans7();
                break;        
            case 9:
                    trans9();
                break;
            case 11:
                    trans11();
                break;
            case 13:
                    trans13();
                break;        
            case 15:
                    trans15();
                break;
            case 17:
                    trans17();
                break;
            default:
                console.log("Não entrou.");
          }
      }


 
 //   trans1();
 //   trans3();
 //   trans5();
 //   trans7();
 //   trans9();
 //   trans11();
 //   trans13();
 //   trans15();
 //   trans17();

 //   console.log("Evento gerado: " + Gera_Evento);
 //   console.log("Actual State: " + State_Automato);

    if (Gera_Evento == 1){
      setvalue = 0;
    }
    else if (Gera_Evento == 3){
      setvalue = 1;
    }
    else if (Gera_Evento == 5){
      setvalue = 2;
    }
    else if (Gera_Evento == 7){
      setvalue = 3;
    }
    else if (Gera_Evento == 9){
      setvalue = 4;
    }
    else if (Gera_Evento == 11){
      setvalue = 5;
    }
    else if (Gera_Evento == 13){
      setvalue = 6;
    }
    else if (Gera_Evento == 15){
      setvalue = 7;
    }
    else if (Gera_Evento == 17){
      setvalue = 8;
    }
    else {
      console.log("-----> Não gerei");
    }

    btnRef[setvalue].innerText = "O";
    btnRef[setvalue].disabled = true;
    console.log("Posi gerada: " + setvalue);

    winChecker();
    // Passa a vez
    console.log("Ev_nC: 18");
    trans18(18);
    console.log("Actual State: " + State_Automato);
    count += 1;
  });
});

//Enable Buttons and disable popup on page load
window.onload = enableButtons;

//Function Automato
const Automato = (aut) => {
   console.log("Valor Aut: "+aut);
   if (estado==0 && aut == 1){
    setvalue = 8;
  }
};

// Função random vetor:
function shuffleArray(arr) {
  // Loop em todos os elementos
for (let i = arr.length - 1; i > 0; i--) {
      // Escolhendo elemento aleatório
  const j = Math.floor(Math.random() * (i + 1));
  // Reposicionando elemento
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
// Retornando array com aleatoriedade
return arr;
}


function transNC(Evento) {

if (State_Automato == 0 && Evento == 0) {
    State_Automato =1;
}
if (State_Automato == 0 && Evento == 4) {
    State_Automato =2;
}
if (State_Automato == 0 && Evento == 8) {
    State_Automato =3;
}
if (State_Automato == 0 && Evento == 12) {
    State_Automato =4;
}
if (State_Automato == 0 && Evento == 16) {
    State_Automato =5;
}
if (State_Automato == 0 && Evento == 2) {
    State_Automato =6;
}
if (State_Automato == 0 && Evento == 6) {
    State_Automato =7;
}
if (State_Automato == 0 && Evento == 10) {
    State_Automato =8;
}
if (State_Automato == 0 && Evento == 14) {
    State_Automato =9;
}
if (State_Automato == 27 && Evento == 0) {
    State_Automato =28;
}
if (State_Automato == 27 && Evento == 12) {
    State_Automato =29;
}
if (State_Automato == 27 && Evento == 16) {
    State_Automato =30;
}
if (State_Automato == 76 && Evento == 0) {
    State_Automato =77;
}
if (State_Automato == 76 && Evento == 12) {
    State_Automato =64;
}
if (State_Automato == 76 && Evento == 16) {
    State_Automato =54;
}
if (State_Automato == 84 && Evento == 8) {
    State_Automato =72;
}
if (State_Automato == 84 && Evento == 16) {
    State_Automato =52;
}
if (State_Automato == 84 && Evento == 2) {
    State_Automato =42;
}
if (State_Automato == 85 && Evento == 4) {
    State_Automato =86;
}
if (State_Automato == 85 && Evento == 8) {
    State_Automato =87;
}
if (State_Automato == 85 && Evento == 12) {
    State_Automato =88;
}
if (State_Automato == 85 && Evento == 16) {
    State_Automato =89;
}
if (State_Automato == 85 && Evento == 2) {
    State_Automato =90;
}
if (State_Automato == 99 && Evento == 4) {
    State_Automato =100;
}
if (State_Automato == 99 && Evento == 12) {
    State_Automato =101;
}
if (State_Automato == 99 && Evento == 16) {
    State_Automato =102;
}
if (State_Automato == 105 && Evento == 4) {
    State_Automato =106;
}
if (State_Automato == 111 && Evento == 16) {
    State_Automato =106;
}
if (State_Automato == 121 && Evento == 2) {
    State_Automato =106;
}
if (State_Automato == 122 && Evento == 4) {
    State_Automato =123;
}
if (State_Automato == 122 && Evento == 8) {
    State_Automato =124;
}
if (State_Automato == 122 && Evento == 2) {
    State_Automato =113;
}
if (State_Automato == 127 && Evento == 4) {
    State_Automato =128;
}
if (State_Automato == 132 && Evento == 8) {
    State_Automato =128;
}
if (State_Automato == 137 && Evento == 4) {
    State_Automato =138;
}
if (State_Automato == 137 && Evento == 8) {
    State_Automato =139;
}
if (State_Automato == 137 && Evento == 2) {
    State_Automato =93;
}
if (State_Automato == 153 && Evento == 16) {
    State_Automato =128;
}
if (State_Automato == 154 && Evento == 4) {
    State_Automato =155;
}
if (State_Automato == 154 && Evento == 12) {
    State_Automato =146;
}
if (State_Automato == 154 && Evento == 16) {
    State_Automato =133;
}
if (State_Automato == 160 && Evento == 12) {
    State_Automato =144;
}
if (State_Automato == 160 && Evento == 16) {
    State_Automato =118;
}
if (State_Automato == 160 && Evento == 2) {
    State_Automato =100;
}
if (State_Automato == 161 && Evento == 8) {
    State_Automato =150;
}
if (State_Automato == 161 && Evento == 16) {
    State_Automato =123;
}
if (State_Automato == 161 && Evento == 2) {
    State_Automato =112;
}
if (State_Automato == 165 && Evento == 0) {
    State_Automato =166;
}
if (State_Automato == 165 && Evento == 4) {
    State_Automato =167;
}
if (State_Automato == 165 && Evento == 12) {
    State_Automato =168;
}
if (State_Automato == 185 && Evento == 0) {
    State_Automato =186;
}
if (State_Automato == 190 && Evento == 4) {
    State_Automato =186;
}
if (State_Automato == 191 && Evento == 0) {
    State_Automato =192;
}
if (State_Automato == 191 && Evento == 4) {
    State_Automato =193;
}
if (State_Automato == 191 && Evento == 12) {
    State_Automato =177;
}
if (State_Automato == 199 && Evento == 8) {
    State_Automato =186;
}
if (State_Automato == 201 && Evento == 4) {
    State_Automato =196;
}
if (State_Automato == 201 && Evento == 8) {
    State_Automato =181;
}
if (State_Automato == 201 && Evento == 2) {
    State_Automato =172;
}
if (State_Automato == 207 && Evento == 0) {
    State_Automato =208;
}
if (State_Automato == 207 && Evento == 4) {
    State_Automato =209;
}
if (State_Automato == 207 && Evento == 16) {
    State_Automato =210;
}
if (State_Automato == 215 && Evento == 0) {
    State_Automato =216;
}
if (State_Automato == 215 && Evento == 4) {
    State_Automato =217;
}
if (State_Automato == 215 && Evento == 2) {
    State_Automato =210;
}
if (State_Automato == 220 && Evento == 0) {
    State_Automato =221;
}
if (State_Automato == 225 && Evento == 4) {
    State_Automato =221;
}
if (State_Automato == 230 && Evento == 0) {
    State_Automato =231;
}
if (State_Automato == 230 && Evento == 16) {
    State_Automato =217;
}
if (State_Automato == 230 && Evento == 2) {
    State_Automato =209;
}
if (State_Automato == 234 && Evento == 16) {
    State_Automato =221;
}
if (State_Automato == 239 && Evento == 4) {
    State_Automato =231;
}
if (State_Automato == 239 && Evento == 16) {
    State_Automato =216;
}
if (State_Automato == 239 && Evento == 2) {
    State_Automato =208;
}
if (State_Automato == 240 && Evento == 0) {
    State_Automato =241;
}
if (State_Automato == 240 && Evento == 4) {
    State_Automato =242;
}
if (State_Automato == 240 && Evento == 8) {
    State_Automato =243;
}
if (State_Automato == 240 && Evento == 16) {
    State_Automato =244;
}
if (State_Automato == 240 && Evento == 2) {
    State_Automato =245;
}
if (State_Automato == 249 && Evento == 0) {
    State_Automato =250;
}
if (State_Automato == 249 && Evento == 4) {
    State_Automato =251;
}
if (State_Automato == 249 && Evento == 8) {
    State_Automato =252;
}
if (State_Automato == 258 && Evento == 0) {
    State_Automato =259;
}
if (State_Automato == 258 && Evento == 4) {
    State_Automato =260;
}
if (State_Automato == 258 && Evento == 16) {
    State_Automato =252;
}
if (State_Automato == 265 && Evento == 0) {
    State_Automato =266;
}
if (State_Automato == 265 && Evento == 8) {
    State_Automato =260;
}
if (State_Automato == 265 && Evento == 16) {
    State_Automato =251;
}
if (State_Automato == 270 && Evento == 4) {
    State_Automato =266;
}
if (State_Automato == 270 && Evento == 8) {
    State_Automato =259;
}
if (State_Automato == 270 && Evento == 16) {
    State_Automato =250;
}
if (State_Automato == 295 && Evento == 12) {
    State_Automato =281;
}
if (State_Automato == 295 && Evento == 16) {
    State_Automato =273;
}
if (State_Automato == 295 && Evento == 6) {
    State_Automato =28;
}
if (State_Automato == 300 && Evento == 6) {
    State_Automato =106;
}
if (State_Automato == 315 && Evento == 12) {
    State_Automato =310;
}
if (State_Automato == 315 && Evento == 16) {
    State_Automato =296;
}
if (State_Automato == 315 && Evento == 6) {
    State_Automato =100;
}
if (State_Automato == 319 && Evento == 0) {
    State_Automato =320;
}
if (State_Automato == 319 && Evento == 4) {
    State_Automato =321;
}
if (State_Automato == 319 && Evento == 6) {
    State_Automato =168;
}
if (State_Automato == 330 && Evento == 0) {
    State_Automato =331;
}
if (State_Automato == 330 && Evento == 4) {
    State_Automato =332;
}
if (State_Automato == 330 && Evento == 12) {
    State_Automato =333;
}
if (State_Automato == 330 && Evento == 16) {
    State_Automato =334;
}
if (State_Automato == 330 && Evento == 6) {
    State_Automato =204;
}
if (State_Automato == 338 && Evento == 0) {
    State_Automato =339;
}
if (State_Automato == 338 && Evento == 4) {
    State_Automato =340;
}
if (State_Automato == 338 && Evento == 6) {
    State_Automato =210;
}
if (State_Automato == 364 && Evento == 6) {
    State_Automato =128;
}
if (State_Automato == 366 && Evento == 8) {
    State_Automato =359;
}
if (State_Automato == 366 && Evento == 2) {
    State_Automato =302;
}
if (State_Automato == 366 && Evento == 6) {
    State_Automato =123;
}
if (State_Automato == 372 && Evento == 0) {
    State_Automato =373;
}
if (State_Automato == 372 && Evento == 2) {
    State_Automato =340;
}
if (State_Automato == 372 && Evento == 6) {
    State_Automato =217;
}
if (State_Automato == 378 && Evento == 6) {
    State_Automato =221;
}
if (State_Automato == 387 && Evento == 4) {
    State_Automato =373;
}
if (State_Automato == 387 && Evento == 2) {
    State_Automato =339;
}
if (State_Automato == 387 && Evento == 6) {
    State_Automato =216;
}
if (State_Automato == 395 && Evento == 0) {
    State_Automato =396;
}
if (State_Automato == 395 && Evento == 8) {
    State_Automato =389;
}
if (State_Automato == 395 && Evento == 2) {
    State_Automato =357;
}
if (State_Automato == 398 && Evento == 0) {
    State_Automato =399;
}
if (State_Automato == 398 && Evento == 8) {
    State_Automato =391;
}
if (State_Automato == 398 && Evento == 6) {
    State_Automato =251;
}
if (State_Automato == 410 && Evento == 0) {
    State_Automato =411;
}
if (State_Automato == 410 && Evento == 4) {
    State_Automato =412;
}
if (State_Automato == 410 && Evento == 8) {
    State_Automato =413;
}
if (State_Automato == 410 && Evento == 2) {
    State_Automato =316;
}
if (State_Automato == 410 && Evento == 6) {
    State_Automato =163;
}
if (State_Automato == 421 && Evento == 0) {
    State_Automato =422;
}
if (State_Automato == 421 && Evento == 2) {
    State_Automato =321;
}
if (State_Automato == 421 && Evento == 6) {
    State_Automato =175;
}
if (State_Automato == 430 && Evento == 4) {
    State_Automato =426;
}
if (State_Automato == 430 && Evento == 8) {
    State_Automato =415;
}
if (State_Automato == 430 && Evento == 2) {
    State_Automato =328;
}
if (State_Automato == 446 && Evento == 6) {
    State_Automato =186;
}
if (State_Automato == 450 && Evento == 4) {
    State_Automato =447;
}
if (State_Automato == 450 && Evento == 12) {
    State_Automato =417;
}
if (State_Automato == 450 && Evento == 6) {
    State_Automato =192;
}
if (State_Automato == 452 && Evento == 0) {
    State_Automato =453;
}
if (State_Automato == 452 && Evento == 16) {
    State_Automato =391;
}
if (State_Automato == 452 && Evento == 6) {
    State_Automato =260;
}
if (State_Automato == 456 && Evento == 0) {
    State_Automato =457;
}
if (State_Automato == 456 && Evento == 12) {
    State_Automato =432;
}
if (State_Automato == 456 && Evento == 16) {
    State_Automato =368;
}
if (State_Automato == 456 && Evento == 2) {
    State_Automato =332;
}
if (State_Automato == 456 && Evento == 6) {
    State_Automato =203;
}
if (State_Automato == 462 && Evento == 12) {
    State_Automato =436;
}
if (State_Automato == 462 && Evento == 16) {
    State_Automato =380;
}
if (State_Automato == 462 && Evento == 6) {
    State_Automato =235;
}
if (State_Automato == 464 && Evento == 8) {
    State_Automato =453;
}
if (State_Automato == 464 && Evento == 16) {
    State_Automato =399;
}
if (State_Automato == 464 && Evento == 6) {
    State_Automato =266;
}
if (State_Automato == 466 && Evento == 4) {
    State_Automato =457;
}
if (State_Automato == 466 && Evento == 12) {
    State_Automato =431;
}
if (State_Automato == 466 && Evento == 16) {
    State_Automato =367;
}
if (State_Automato == 466 && Evento == 2) {
    State_Automato =331;
}
if (State_Automato == 466 && Evento == 6) {
    State_Automato =202;
}
if (State_Automato == 474 && Evento == 8) {
    State_Automato =475;
}
if (State_Automato == 474 && Evento == 12) {
    State_Automato =476;
}
if (State_Automato == 474 && Evento == 16) {
    State_Automato =477;
}
if (State_Automato == 474 && Evento == 2) {
    State_Automato =478;
}
if (State_Automato == 474 && Evento == 6) {
    State_Automato =479;
}
if (State_Automato == 491 && Evento == 12) {
    State_Automato =492;
}
if (State_Automato == 491 && Evento == 16) {
    State_Automato =493;
}
if (State_Automato == 491 && Evento == 2) {
    State_Automato =494;
}
if (State_Automato == 517 && Evento == 12) {
    State_Automato =518;
}
if (State_Automato == 517 && Evento == 16) {
    State_Automato =519;
}
if (State_Automato == 517 && Evento == 6) {
    State_Automato =494;
}
if (State_Automato == 533 && Evento == 8) {
    State_Automato =534;
}
if (State_Automato == 533 && Evento == 2) {
    State_Automato =524;
}
if (State_Automato == 533 && Evento == 6) {
    State_Automato =506;
}
if (State_Automato == 548 && Evento == 8) {
    State_Automato =549;
}
if (State_Automato == 548 && Evento == 2) {
    State_Automato =513;
}
if (State_Automato == 548 && Evento == 6) {
    State_Automato =483;
}
if (State_Automato == 566 && Evento == 0) {
    State_Automato =567;
}
if (State_Automato == 566 && Evento == 12) {
    State_Automato =568;
}
if (State_Automato == 566 && Evento == 2) {
    State_Automato =569;
}
if (State_Automato == 582 && Evento == 0) {
    State_Automato =583;
}
if (State_Automato == 582 && Evento == 12) {
    State_Automato =584;
}
if (State_Automato == 582 && Evento == 6) {
    State_Automato =569;
}
if (State_Automato == 587 && Evento == 0) {
    State_Automato =588;
}
if (State_Automato == 594 && Evento == 12) {
    State_Automato =588;
}
if (State_Automato == 605 && Evento == 0) {
    State_Automato =606;
}
if (State_Automato == 605 && Evento == 2) {
    State_Automato =584;
}
if (State_Automato == 605 && Evento == 6) {
    State_Automato =568;
}
if (State_Automato == 609 && Evento == 2) {
    State_Automato =588;
}
if (State_Automato == 610 && Evento == 0) {
    State_Automato =611;
}
if (State_Automato == 610 && Evento == 8) {
    State_Automato =612;
}
if (State_Automato == 610 && Evento == 2) {
    State_Automato =598;
}
if (State_Automato == 615 && Evento == 0) {
    State_Automato =616;
}
if (State_Automato == 620 && Evento == 8) {
    State_Automato =616;
}
if (State_Automato == 621 && Evento == 0) {
    State_Automato =622;
}
if (State_Automato == 621 && Evento == 8) {
    State_Automato =623;
}
if (State_Automato == 621 && Evento == 6) {
    State_Automato =579;
}
if (State_Automato == 629 && Evento == 12) {
    State_Automato =616;
}
if (State_Automato == 635 && Evento == 12) {
    State_Automato =606;
}
if (State_Automato == 635 && Evento == 2) {
    State_Automato =583;
}
if (State_Automato == 635 && Evento == 6) {
    State_Automato =567;
}
if (State_Automato == 636 && Evento == 8) {
    State_Automato =626;
}
if (State_Automato == 636 && Evento == 12) {
    State_Automato =611;
}
if (State_Automato == 636 && Evento == 2) {
    State_Automato =597;
}
if (State_Automato == 637 && Evento == 0) {
    State_Automato =638;
}
if (State_Automato == 637 && Evento == 12) {
    State_Automato =639;
}
if (State_Automato == 637 && Evento == 16) {
    State_Automato =640;
}
if (State_Automato == 637 && Evento == 2) {
    State_Automato =641;
}
if (State_Automato == 637 && Evento == 6) {
    State_Automato =642;
}
if (State_Automato == 647 && Evento == 0) {
    State_Automato =648;
}
if (State_Automato == 647 && Evento == 12) {
    State_Automato =649;
}
if (State_Automato == 647 && Evento == 16) {
    State_Automato =650;
}
if (State_Automato == 662 && Evento == 0) {
    State_Automato =663;
}
if (State_Automato == 662 && Evento == 12) {
    State_Automato =664;
}
if (State_Automato == 662 && Evento == 16) {
    State_Automato =665;
}
if (State_Automato == 691 && Evento == 12) {
    State_Automato =685;
}
if (State_Automato == 691 && Evento == 16) {
    State_Automato =676;
}
if (State_Automato == 691 && Evento == 2) {
    State_Automato =663;
}
if (State_Automato == 698 && Evento == 0) {
    State_Automato =699;
}
if (State_Automato == 698 && Evento == 8) {
    State_Automato =700;
}
if (State_Automato == 698 && Evento == 2) {
    State_Automato =694;
}
if (State_Automato == 703 && Evento == 0) {
    State_Automato =704;
}
if (State_Automato == 703 && Evento == 8) {
    State_Automato =705;
}
if (State_Automato == 703 && Evento == 6) {
    State_Automato =692;
}
if (State_Automato == 708 && Evento == 0) {
    State_Automato =709;
}
if (State_Automato == 708 && Evento == 8) {
    State_Automato =710;
}
if (State_Automato == 708 && Evento == 12) {
    State_Automato =711;
}
if (State_Automato == 708 && Evento == 16) {
    State_Automato =712;
}
if (State_Automato == 708 && Evento == 2) {
    State_Automato =713;
}
if (State_Automato == 723 && Evento == 0) {
    State_Automato =724;
}
if (State_Automato == 723 && Evento == 12) {
    State_Automato =719;
}
if (State_Automato == 723 && Evento == 16) {
    State_Automato =716;
}
if (State_Automato == 733 && Evento == 8) {
    State_Automato =734;
}
if (State_Automato == 733 && Evento == 12) {
    State_Automato =735;
}
if (State_Automato == 733 && Evento == 16) {
    State_Automato =736;
}
if (State_Automato == 733 && Evento == 2) {
    State_Automato =737;
}
if (State_Automato == 733 && Evento == 10) {
    State_Automato =479;
}
if (State_Automato == 744 && Evento == 12) {
    State_Automato =745;
}
if (State_Automato == 744 && Evento == 16) {
    State_Automato =746;
}
if (State_Automato == 744 && Evento == 10) {
    State_Automato =494;
}
if (State_Automato == 756 && Evento == 8) {
    State_Automato =757;
}
if (State_Automato == 756 && Evento == 2) {
    State_Automato =751;
}
if (State_Automato == 756 && Evento == 10) {
    State_Automato =506;
}
if (State_Automato == 765 && Evento == 8) {
    State_Automato =766;
}
if (State_Automato == 765 && Evento == 2) {
    State_Automato =740;
}
if (State_Automato == 765 && Evento == 10) {
    State_Automato =483;
}
if (State_Automato == 774 && Evento == 0) {
    State_Automato =775;
}
if (State_Automato == 774 && Evento == 8) {
    State_Automato =776;
}
if (State_Automato == 774 && Evento == 12) {
    State_Automato =777;
}
if (State_Automato == 774 && Evento == 2) {
    State_Automato =778;
}
if (State_Automato == 774 && Evento == 10) {
    State_Automato =563;
}
if (State_Automato == 781 && Evento == 0) {
    State_Automato =782;
}
if (State_Automato == 781 && Evento == 12) {
    State_Automato =783;
}
if (State_Automato == 781 && Evento == 10) {
    State_Automato =569;
}
if (State_Automato == 800 && Evento == 8) {
    State_Automato =794;
}
if (State_Automato == 800 && Evento == 2) {
    State_Automato =788;
}
if (State_Automato == 800 && Evento == 10) {
    State_Automato =577;
}
if (State_Automato == 812 && Evento == 0) {
    State_Automato =813;
}
if (State_Automato == 812 && Evento == 8) {
    State_Automato =814;
}
if (State_Automato == 812 && Evento == 10) {
    State_Automato =692;
}
if (State_Automato == 825 && Evento == 0) {
    State_Automato =826;
}
if (State_Automato == 825 && Evento == 6) {
    State_Automato =783;
}
if (State_Automato == 825 && Evento == 10) {
    State_Automato =584;
}
if (State_Automato == 829 && Evento == 10) {
    State_Automato =588;
}
if (State_Automato == 834 && Evento == 12) {
    State_Automato =826;
}
if (State_Automato == 834 && Evento == 6) {
    State_Automato =782;
}
if (State_Automato == 834 && Evento == 10) {
    State_Automato =583;
}
if (State_Automato == 835 && Evento == 0) {
    State_Automato =836;
}
if (State_Automato == 835 && Evento == 12) {
    State_Automato =837;
}
if (State_Automato == 835 && Evento == 16) {
    State_Automato =838;
}
if (State_Automato == 835 && Evento == 6) {
    State_Automato =801;
}
if (State_Automato == 835 && Evento == 10) {
    State_Automato =641;
}
if (State_Automato == 853 && Evento == 12) {
    State_Automato =847;
}
if (State_Automato == 853 && Evento == 16) {
    State_Automato =842;
}
if (State_Automato == 853 && Evento == 10) {
    State_Automato =663;
}
if (State_Automato == 867 && Evento == 0) {
    State_Automato =868;
}
if (State_Automato == 867 && Evento == 8) {
    State_Automato =869;
}
if (State_Automato == 867 && Evento == 2) {
    State_Automato =822;
}
if (State_Automato == 867 && Evento == 6) {
    State_Automato =777;
}
if (State_Automato == 867 && Evento == 10) {
    State_Automato =562;
}
if (State_Automato == 875 && Evento == 10) {
    State_Automato =616;
}
if (State_Automato == 876 && Evento == 0) {
    State_Automato =877;
}
if (State_Automato == 876 && Evento == 6) {
    State_Automato =791;
}
if (State_Automato == 876 && Evento == 10) {
    State_Automato =623;
}
if (State_Automato == 881 && Evento == 8) {
    State_Automato =872;
}
if (State_Automato == 881 && Evento == 2) {
    State_Automato =830;
}
if (State_Automato == 881 && Evento == 10) {
    State_Automato =611;
}
if (State_Automato == 889 && Evento == 12) {
    State_Automato =877;
}
if (State_Automato == 889 && Evento == 6) {
    State_Automato =796;
}
if (State_Automato == 889 && Evento == 10) {
    State_Automato =630;
}
if (State_Automato == 890 && Evento == 0) {
    State_Automato =891;
}
if (State_Automato == 890 && Evento == 12) {
    State_Automato =882;
}
if (State_Automato == 890 && Evento == 16) {
    State_Automato =860;
}
if (State_Automato == 890 && Evento == 6) {
    State_Automato =817;
}
if (State_Automato == 890 && Evento == 10) {
    State_Automato =727;
}
if (State_Automato == 894 && Evento == 8) {
    State_Automato =886;
}
if (State_Automato == 894 && Evento == 12) {
    State_Automato =868;
}
if (State_Automato == 894 && Evento == 2) {
    State_Automato =821;
}
if (State_Automato == 894 && Evento == 6) {
    State_Automato =775;
}
if (State_Automato == 894 && Evento == 10) {
    State_Automato =561;
}
if (State_Automato == 934 && Evento == 4) {
    State_Automato =935;
}
if (State_Automato == 934 && Evento == 8) {
    State_Automato =936;
}
if (State_Automato == 934 && Evento == 6) {
    State_Automato =907;
}
if (State_Automato == 951 && Evento == 8) {
    State_Automato =941;
}
if (State_Automato == 951 && Evento == 2) {
    State_Automato =915;
}
if (State_Automato == 951 && Evento == 6) {
    State_Automato =901;
}
if (State_Automato == 952 && Evento == 8) {
    State_Automato =945;
}
if (State_Automato == 952 && Evento == 12) {
    State_Automato =930;
}
if (State_Automato == 952 && Evento == 2) {
    State_Automato =921;
}
if (State_Automato == 958 && Evento == 4) {
    State_Automato =959;
}
if (State_Automato == 958 && Evento == 16) {
    State_Automato =960;
}
if (State_Automato == 958 && Evento == 2) {
    State_Automato =961;
}
if (State_Automato == 965 && Evento == 4) {
    State_Automato =966;
}
if (State_Automato == 965 && Evento == 12) {
    State_Automato =967;
}
if (State_Automato == 965 && Evento == 16) {
    State_Automato =968;
}
if (State_Automato == 975 && Evento == 4) {
    State_Automato =976;
}
if (State_Automato == 975 && Evento == 16) {
    State_Automato =977;
}
if (State_Automato == 975 && Evento == 6) {
    State_Automato =961;
}
if (State_Automato == 984 && Evento == 4) {
    State_Automato =985;
}
if (State_Automato == 984 && Evento == 12) {
    State_Automato =986;
}
if (State_Automato == 984 && Evento == 16) {
    State_Automato =987;
}
if (State_Automato == 991 && Evento == 4) {
    State_Automato =992;
}
if (State_Automato == 991 && Evento == 8) {
    State_Automato =993;
}
if (State_Automato == 991 && Evento == 16) {
    State_Automato =994;
}
if (State_Automato == 991 && Evento == 2) {
    State_Automato =995;
}
if (State_Automato == 991 && Evento == 6) {
    State_Automato =996;
}
if (State_Automato == 1027 && Evento == 4) {
    State_Automato =1028;
}
if (State_Automato == 1027 && Evento == 12) {
    State_Automato =1023;
}
if (State_Automato == 1027 && Evento == 16) {
    State_Automato =1021;
}
if (State_Automato == 1043 && Evento == 4) {
    State_Automato =1044;
}
if (State_Automato == 1043 && Evento == 8) {
    State_Automato =1045;
}
if (State_Automato == 1043 && Evento == 10) {
    State_Automato =907;
}
if (State_Automato == 1052 && Evento == 4) {
    State_Automato =1053;
}
if (State_Automato == 1052 && Evento == 12) {
    State_Automato =1054;
}
if (State_Automato == 1052 && Evento == 16) {
    State_Automato =1055;
}
if (State_Automato == 1052 && Evento == 2) {
    State_Automato =1056;
}
if (State_Automato == 1052 && Evento == 10) {
    State_Automato =954;
}
if (State_Automato == 1059 && Evento == 4) {
    State_Automato =1060;
}
if (State_Automato == 1059 && Evento == 16) {
    State_Automato =1061;
}
if (State_Automato == 1059 && Evento == 10) {
    State_Automato =961;
}
if (State_Automato == 1066 && Evento == 4) {
    State_Automato =1067;
}
if (State_Automato == 1066 && Evento == 2) {
    State_Automato =1061;
}
if (State_Automato == 1066 && Evento == 10) {
    State_Automato =960;
}
if (State_Automato == 1074 && Evento == 16) {
    State_Automato =1067;
}
if (State_Automato == 1074 && Evento == 2) {
    State_Automato =1060;
}
if (State_Automato == 1074 && Evento == 10) {
    State_Automato =959;
}
if (State_Automato == 1079 && Evento == 4) {
    State_Automato =1080;
}
if (State_Automato == 1079 && Evento == 8) {
    State_Automato =1081;
}
if (State_Automato == 1079 && Evento == 10) {
    State_Automato =998;
}
if (State_Automato == 1099 && Evento == 4) {
    State_Automato =1100;
}
if (State_Automato == 1099 && Evento == 12) {
    State_Automato =1101;
}
if (State_Automato == 1099 && Evento == 16) {
    State_Automato =1102;
}
if (State_Automato == 1099 && Evento == 6) {
    State_Automato =1056;
}
if (State_Automato == 1099 && Evento == 10) {
    State_Automato =953;
}
if (State_Automato == 1105 && Evento == 4) {
    State_Automato =1106;
}
if (State_Automato == 1105 && Evento == 6) {
    State_Automato =1061;
}
if (State_Automato == 1105 && Evento == 10) {
    State_Automato =977;
}
if (State_Automato == 1118 && Evento == 16) {
    State_Automato =1106;
}
if (State_Automato == 1118 && Evento == 6) {
    State_Automato =1060;
}
if (State_Automato == 1118 && Evento == 10) {
    State_Automato =976;
}
if (State_Automato == 1119 && Evento == 12) {
    State_Automato =1113;
}
if (State_Automato == 1119 && Evento == 16) {
    State_Automato =1110;
}
if (State_Automato == 1119 && Evento == 10) {
    State_Automato =985;
}
if (State_Automato == 1131 && Evento == 4) {
    State_Automato =1132;
}
if (State_Automato == 1131 && Evento == 8) {
    State_Automato =1133;
}
if (State_Automato == 1131 && Evento == 2) {
    State_Automato =1121;
}
if (State_Automato == 1131 && Evento == 6) {
    State_Automato =1076;
}
if (State_Automato == 1131 && Evento == 10) {
    State_Automato =994;
}
if (State_Automato == 1138 && Evento == 4) {
    State_Automato =1139;
}
if (State_Automato == 1138 && Evento == 6) {
    State_Automato =1081;
}
if (State_Automato == 1138 && Evento == 10) {
    State_Automato =1006;
}
if (State_Automato == 1159 && Evento == 16) {
    State_Automato =1139;
}
if (State_Automato == 1159 && Evento == 6) {
    State_Automato =1084;
}
if (State_Automato == 1159 && Evento == 10) {
    State_Automato =1013;
}
if (State_Automato == 1160 && Evento == 4) {
    State_Automato =1161;
}
if (State_Automato == 1160 && Evento == 12) {
    State_Automato =1150;
}
if (State_Automato == 1160 && Evento == 16) {
    State_Automato =1146;
}
if (State_Automato == 1160 && Evento == 6) {
    State_Automato =1087;
}
if (State_Automato == 1160 && Evento == 10) {
    State_Automato =1030;
}
if (State_Automato == 1164 && Evento == 8) {
    State_Automato =1154;
}
if (State_Automato == 1164 && Evento == 16) {
    State_Automato =1132;
}
if (State_Automato == 1164 && Evento == 2) {
    State_Automato =1120;
}
if (State_Automato == 1164 && Evento == 6) {
    State_Automato =1075;
}
if (State_Automato == 1164 && Evento == 10) {
    State_Automato =992;
}
if (State_Automato == 1165 && Evento == 0) {
    State_Automato =1166;
}
if (State_Automato == 1165 && Evento == 4) {
    State_Automato =1167;
}
if (State_Automato == 1165 && Evento == 8) {
    State_Automato =1168;
}
if (State_Automato == 1165 && Evento == 12) {
    State_Automato =1169;
}
if (State_Automato == 1165 && Evento == 2) {
    State_Automato =1170;
}
if (State_Automato == 1165 && Evento == 6) {
    State_Automato =1171;
}
if (State_Automato == 1165 && Evento == 10) {
    State_Automato =1172;
}
if (State_Automato == 1177 && Evento == 0) {
    State_Automato =1178;
}
if (State_Automato == 1177 && Evento == 4) {
    State_Automato =1179;
}
if (State_Automato == 1177 && Evento == 12) {
    State_Automato =1180;
}
if (State_Automato == 1177 && Evento == 2) {
    State_Automato =1181;
}
if (State_Automato == 1177 && Evento == 6) {
    State_Automato =1182;
}
if (State_Automato == 1186 && Evento == 0) {
    State_Automato =1187;
}
if (State_Automato == 1186 && Evento == 4) {
    State_Automato =1188;
}
if (State_Automato == 1186 && Evento == 2) {
    State_Automato =1189;
}
if (State_Automato == 1193 && Evento == 0) {
    State_Automato =1194;
}
if (State_Automato == 1198 && Evento == 4) {
    State_Automato =1194;
}
if (State_Automato == 1199 && Evento == 0) {
    State_Automato =1200;
}
if (State_Automato == 1199 && Evento == 4) {
    State_Automato =1201;
}
if (State_Automato == 1199 && Evento == 12) {
    State_Automato =1202;
}
if (State_Automato == 1209 && Evento == 0) {
    State_Automato =1210;
}
if (State_Automato == 1209 && Evento == 4) {
    State_Automato =1211;
}
if (State_Automato == 1209 && Evento == 6) {
    State_Automato =1189;
}
if (State_Automato == 1214 && Evento == 0) {
    State_Automato =1215;
}
if (State_Automato == 1214 && Evento == 4) {
    State_Automato =1216;
}
if (State_Automato == 1214 && Evento == 12) {
    State_Automato =1217;
}
if (State_Automato == 1224 && Evento == 0) {
    State_Automato =1225;
}
if (State_Automato == 1224 && Evento == 4) {
    State_Automato =1226;
}
if (State_Automato == 1224 && Evento == 2) {
    State_Automato =1217;
}
if (State_Automato == 1229 && Evento == 0) {
    State_Automato =1230;
}
if (State_Automato == 1234 && Evento == 4) {
    State_Automato =1230;
}
if (State_Automato == 1235 && Evento == 0) {
    State_Automato =1236;
}
if (State_Automato == 1235 && Evento == 4) {
    State_Automato =1237;
}
if (State_Automato == 1235 && Evento == 6) {
    State_Automato =1202;
}
if (State_Automato == 1244 && Evento == 0) {
    State_Automato =1245;
}
if (State_Automato == 1244 && Evento == 2) {
    State_Automato =1211;
}
if (State_Automato == 1244 && Evento == 6) {
    State_Automato =1188;
}
if (State_Automato == 1248 && Evento == 6) {
    State_Automato =1194;
}
if (State_Automato == 1249 && Evento == 0) {
    State_Automato =1250;
}
if (State_Automato == 1249 && Evento == 12) {
    State_Automato =1226;
}
if (State_Automato == 1249 && Evento == 2) {
    State_Automato =1216;
}
if (State_Automato == 1253 && Evento == 12) {
    State_Automato =1230;
}
if (State_Automato == 1254 && Evento == 0) {
    State_Automato =1255;
}
if (State_Automato == 1254 && Evento == 12) {
    State_Automato =1237;
}
if (State_Automato == 1254 && Evento == 6) {
    State_Automato =1201;
}
if (State_Automato == 1261 && Evento == 4) {
    State_Automato =1245;
}
if (State_Automato == 1261 && Evento == 2) {
    State_Automato =1210;
}
if (State_Automato == 1261 && Evento == 6) {
    State_Automato =1187;
}
if (State_Automato == 1262 && Evento == 4) {
    State_Automato =1250;
}
if (State_Automato == 1262 && Evento == 12) {
    State_Automato =1225;
}
if (State_Automato == 1262 && Evento == 2) {
    State_Automato =1215;
}
if (State_Automato == 1263 && Evento == 4) {
    State_Automato =1255;
}
if (State_Automato == 1263 && Evento == 12) {
    State_Automato =1236;
}
if (State_Automato == 1263 && Evento == 6) {
    State_Automato =1200;
}
if (State_Automato == 1278 && Evento == 0) {
    State_Automato =1279;
}
if (State_Automato == 1283 && Evento == 4) {
    State_Automato =1279;
}
if (State_Automato == 1291 && Evento == 0) {
    State_Automato =1292;
}
if (State_Automato == 1291 && Evento == 8) {
    State_Automato =1275;
}
if (State_Automato == 1291 && Evento == 2) {
    State_Automato =1272;
}
if (State_Automato == 1295 && Evento == 8) {
    State_Automato =1279;
}
if (State_Automato == 1296 && Evento == 0) {
    State_Automato =1297;
}
if (State_Automato == 1296 && Evento == 8) {
    State_Automato =1285;
}
if (State_Automato == 1296 && Evento == 6) {
    State_Automato =1268;
}
if (State_Automato == 1301 && Evento == 4) {
    State_Automato =1297;
}
if (State_Automato == 1301 && Evento == 8) {
    State_Automato =1284;
}
if (State_Automato == 1301 && Evento == 6) {
    State_Automato =1267;
}
if (State_Automato == 1302 && Evento == 0) {
    State_Automato =1303;
}
if (State_Automato == 1302 && Evento == 4) {
    State_Automato =1304;
}
if (State_Automato == 1302 && Evento == 8) {
    State_Automato =1305;
}
if (State_Automato == 1302 && Evento == 12) {
    State_Automato =1306;
}
if (State_Automato == 1302 && Evento == 2) {
    State_Automato =1307;
}
if (State_Automato == 1311 && Evento == 0) {
    State_Automato =1312;
}
if (State_Automato == 1311 && Evento == 4) {
    State_Automato =1313;
}
if (State_Automato == 1311 && Evento == 8) {
    State_Automato =1314;
}
if (State_Automato == 1320 && Evento == 0) {
    State_Automato =1321;
}
if (State_Automato == 1320 && Evento == 4) {
    State_Automato =1322;
}
if (State_Automato == 1320 && Evento == 12) {
    State_Automato =1314;
}
if (State_Automato == 1327 && Evento == 0) {
    State_Automato =1328;
}
if (State_Automato == 1327 && Evento == 8) {
    State_Automato =1322;
}
if (State_Automato == 1327 && Evento == 12) {
    State_Automato =1313;
}
if (State_Automato == 1332 && Evento == 4) {
    State_Automato =1328;
}
if (State_Automato == 1332 && Evento == 8) {
    State_Automato =1321;
}
if (State_Automato == 1332 && Evento == 12) {
    State_Automato =1312;
}
if (State_Automato == 1333 && Evento == 0) {
    State_Automato =1334;
}
if (State_Automato == 1333 && Evento == 4) {
    State_Automato =1335;
}
if (State_Automato == 1333 && Evento == 8) {
    State_Automato =1336;
}
if (State_Automato == 1333 && Evento == 12) {
    State_Automato =1337;
}
if (State_Automato == 1333 && Evento == 6) {
    State_Automato =1338;
}
if (State_Automato == 1347 && Evento == 0) {
    State_Automato =1348;
}
if (State_Automato == 1347 && Evento == 4) {
    State_Automato =1349;
}
if (State_Automato == 1347 && Evento == 12) {
    State_Automato =1350;
}
if (State_Automato == 1347 && Evento == 2) {
    State_Automato =1351;
}
if (State_Automato == 1347 && Evento == 10) {
    State_Automato =1182;
}
if (State_Automato == 1354 && Evento == 0) {
    State_Automato =1355;
}
if (State_Automato == 1354 && Evento == 4) {
    State_Automato =1356;
}
if (State_Automato == 1354 && Evento == 10) {
    State_Automato =1189;
}
if (State_Automato == 1365 && Evento == 0) {
    State_Automato =1366;
}
if (State_Automato == 1365 && Evento == 2) {
    State_Automato =1356;
}
if (State_Automato == 1365 && Evento == 10) {
    State_Automato =1188;
}
if (State_Automato == 1369 && Evento == 10) {
    State_Automato =1194;
}
if (State_Automato == 1370 && Evento == 0) {
    State_Automato =1371;
}
if (State_Automato == 1370 && Evento == 12) {
    State_Automato =1360;
}
if (State_Automato == 1370 && Evento == 10) {
    State_Automato =1201;
}
if (State_Automato == 1375 && Evento == 4) {
    State_Automato =1366;
}
if (State_Automato == 1375 && Evento == 2) {
    State_Automato =1355;
}
if (State_Automato == 1375 && Evento == 10) {
    State_Automato =1187;
}
if (State_Automato == 1386 && Evento == 0) {
    State_Automato =1387;
}
if (State_Automato == 1386 && Evento == 8) {
    State_Automato =1381;
}
if (State_Automato == 1386 && Evento == 10) {
    State_Automato =1268;
}
if (State_Automato == 1391 && Evento == 4) {
    State_Automato =1387;
}
if (State_Automato == 1391 && Evento == 8) {
    State_Automato =1380;
}
if (State_Automato == 1391 && Evento == 10) {
    State_Automato =1267;
}
if (State_Automato == 1392 && Evento == 0) {
    State_Automato =1393;
}
if (State_Automato == 1392 && Evento == 4) {
    State_Automato =1394;
}
if (State_Automato == 1392 && Evento == 8) {
    State_Automato =1395;
}
if (State_Automato == 1392 && Evento == 12) {
    State_Automato =1396;
}
if (State_Automato == 1392 && Evento == 10) {
    State_Automato =1338;
}
if (State_Automato == 1403 && Evento == 0) {
    State_Automato =1404;
}
if (State_Automato == 1403 && Evento == 4) {
    State_Automato =1405;
}
if (State_Automato == 1403 && Evento == 12) {
    State_Automato =1406;
}
if (State_Automato == 1403 && Evento == 6) {
    State_Automato =1351;
}
if (State_Automato == 1403 && Evento == 10) {
    State_Automato =1181;
}
if (State_Automato == 1409 && Evento == 0) {
    State_Automato =1410;
}
if (State_Automato == 1409 && Evento == 4) {
    State_Automato =1411;
}
if (State_Automato == 1409 && Evento == 10) {
    State_Automato =1217;
}
if (State_Automato == 1419 && Evento == 0) {
    State_Automato =1420;
}
if (State_Automato == 1419 && Evento == 4) {
    State_Automato =1421;
}
if (State_Automato == 1419 && Evento == 2) {
    State_Automato =1406;
}
if (State_Automato == 1419 && Evento == 6) {
    State_Automato =1350;
}
if (State_Automato == 1419 && Evento == 10) {
    State_Automato =1180;
}
if (State_Automato == 1425 && Evento == 0) {
    State_Automato =1426;
}
if (State_Automato == 1425 && Evento == 2) {
    State_Automato =1411;
}
if (State_Automato == 1425 && Evento == 10) {
    State_Automato =1226;
}
if (State_Automato == 1429 && Evento == 10) {
    State_Automato =1230;
}
if (State_Automato == 1430 && Evento == 0) {
    State_Automato =1431;
}
if (State_Automato == 1430 && Evento == 6) {
    State_Automato =1360;
}
if (State_Automato == 1430 && Evento == 10) {
    State_Automato =1237;
}
if (State_Automato == 1435 && Evento == 4) {
    State_Automato =1426;
}
if (State_Automato == 1435 && Evento == 2) {
    State_Automato =1410;
}
if (State_Automato == 1435 && Evento == 10) {
    State_Automato =1225;
}
if (State_Automato == 1441 && Evento == 4) {
    State_Automato =1438;
}
if (State_Automato == 1441 && Evento == 8) {
    State_Automato =1436;
}
if (State_Automato == 1441 && Evento == 10) {
    State_Automato =1312;
}
if (State_Automato == 1442 && Evento == 0) {
    State_Automato =1443;
}
if (State_Automato == 1442 && Evento == 4) {
    State_Automato =1444;
}
if (State_Automato == 1442 && Evento == 8) {
    State_Automato =1445;
}
if (State_Automato == 1442 && Evento == 6) {
    State_Automato =1396;
}
if (State_Automato == 1442 && Evento == 10) {
    State_Automato =1337;
}
if (State_Automato == 1456 && Evento == 10) {
    State_Automato =1279;
}
if (State_Automato == 1457 && Evento == 0) {
    State_Automato =1458;
}
if (State_Automato == 1457 && Evento == 6) {
    State_Automato =1381;
}
if (State_Automato == 1457 && Evento == 10) {
    State_Automato =1285;
}
if (State_Automato == 1462 && Evento == 4) {
    State_Automato =1458;
}
if (State_Automato == 1462 && Evento == 6) {
    State_Automato =1380;
}
if (State_Automato == 1462 && Evento == 10) {
    State_Automato =1284;
}
if (State_Automato == 1466 && Evento == 4) {
    State_Automato =1463;
}
if (State_Automato == 1466 && Evento == 12) {
    State_Automato =1436;
}
if (State_Automato == 1466 && Evento == 10) {
    State_Automato =1321;
}
if (State_Automato == 1467 && Evento == 0) {
    State_Automato =1468;
}
if (State_Automato == 1467 && Evento == 4) {
    State_Automato =1469;
}
if (State_Automato == 1467 && Evento == 12) {
    State_Automato =1445;
}
if (State_Automato == 1467 && Evento == 6) {
    State_Automato =1395;
}
if (State_Automato == 1467 && Evento == 10) {
    State_Automato =1336;
}
if (State_Automato == 1475 && Evento == 0) {
    State_Automato =1476;
}
if (State_Automato == 1475 && Evento == 12) {
    State_Automato =1421;
}
if (State_Automato == 1475 && Evento == 2) {
    State_Automato =1405;
}
if (State_Automato == 1475 && Evento == 6) {
    State_Automato =1349;
}
if (State_Automato == 1475 && Evento == 10) {
    State_Automato =1179;
}
if (State_Automato == 1479 && Evento == 12) {
    State_Automato =1431;
}
if (State_Automato == 1479 && Evento == 6) {
    State_Automato =1371;
}
if (State_Automato == 1479 && Evento == 10) {
    State_Automato =1255;
}
if (State_Automato == 1481 && Evento == 8) {
    State_Automato =1458;
}
if (State_Automato == 1481 && Evento == 6) {
    State_Automato =1387;
}
if (State_Automato == 1481 && Evento == 10) {
    State_Automato =1297;
}
if (State_Automato == 1483 && Evento == 8) {
    State_Automato =1463;
}
if (State_Automato == 1483 && Evento == 12) {
    State_Automato =1438;
}
if (State_Automato == 1483 && Evento == 10) {
    State_Automato =1328;
}
if (State_Automato == 1484 && Evento == 0) {
    State_Automato =1485;
}
if (State_Automato == 1484 && Evento == 8) {
    State_Automato =1469;
}
if (State_Automato == 1484 && Evento == 12) {
    State_Automato =1444;
}
if (State_Automato == 1484 && Evento == 6) {
    State_Automato =1394;
}
if (State_Automato == 1484 && Evento == 10) {
    State_Automato =1335;
}
if (State_Automato == 1490 && Evento == 4) {
    State_Automato =1476;
}
if (State_Automato == 1490 && Evento == 12) {
    State_Automato =1420;
}
if (State_Automato == 1490 && Evento == 2) {
    State_Automato =1404;
}
if (State_Automato == 1490 && Evento == 6) {
    State_Automato =1348;
}
if (State_Automato == 1490 && Evento == 10) {
    State_Automato =1178;
}
if (State_Automato == 1491 && Evento == 4) {
    State_Automato =1485;
}
if (State_Automato == 1491 && Evento == 8) {
    State_Automato =1468;
}
if (State_Automato == 1491 && Evento == 12) {
    State_Automato =1443;
}
if (State_Automato == 1491 && Evento == 6) {
    State_Automato =1393;
}
if (State_Automato == 1491 && Evento == 10) {
    State_Automato =1334;
}
if (State_Automato == 1492 && Evento == 0) {
    State_Automato =1493;
}
if (State_Automato == 1492 && Evento == 4) {
    State_Automato =1494;
}
if (State_Automato == 1492 && Evento == 12) {
    State_Automato =1495;
}
if (State_Automato == 1492 && Evento == 16) {
    State_Automato =1496;
}
if (State_Automato == 1492 && Evento == 2) {
    State_Automato =1497;
}
if (State_Automato == 1492 && Evento == 6) {
    State_Automato =1498;
}
if (State_Automato == 1492 && Evento == 10) {
    State_Automato =1499;
}
if (State_Automato == 1502 && Evento == 0) {
    State_Automato =1503;
}
if (State_Automato == 1502 && Evento == 4) {
    State_Automato =1504;
}
if (State_Automato == 1502 && Evento == 16) {
    State_Automato =1505;
}
if (State_Automato == 1502 && Evento == 2) {
    State_Automato =1506;
}
if (State_Automato == 1502 && Evento == 6) {
    State_Automato =1507;
}
if (State_Automato == 1510 && Evento == 0) {
    State_Automato =1511;
}
if (State_Automato == 1510 && Evento == 4) {
    State_Automato =1512;
}
if (State_Automato == 1510 && Evento == 16) {
    State_Automato =1513;
}
if (State_Automato == 1519 && Evento == 0) {
    State_Automato =1520;
}
if (State_Automato == 1519 && Evento == 4) {
    State_Automato =1521;
}
if (State_Automato == 1519 && Evento == 16) {
    State_Automato =1522;
}
if (State_Automato == 1536 && Evento == 4) {
    State_Automato =1532;
}
if (State_Automato == 1536 && Evento == 16) {
    State_Automato =1529;
}
if (State_Automato == 1536 && Evento == 6) {
    State_Automato =1511;
}
if (State_Automato == 1555 && Evento == 0) {
    State_Automato =1556;
}
if (State_Automato == 1555 && Evento == 4) {
    State_Automato =1557;
}
if (State_Automato == 1555 && Evento == 16) {
    State_Automato =1558;
}
if (State_Automato == 1555 && Evento == 2) {
    State_Automato =1559;
}
if (State_Automato == 1555 && Evento == 10) {
    State_Automato =1507;
}
if (State_Automato == 1563 && Evento == 0) {
    State_Automato =1564;
}
if (State_Automato == 1563 && Evento == 4) {
    State_Automato =1565;
}
if (State_Automato == 1563 && Evento == 10) {
    State_Automato =1513;
}
if (State_Automato == 1570 && Evento == 0) {
    State_Automato =1571;
}
if (State_Automato == 1570 && Evento == 16) {
    State_Automato =1565;
}
if (State_Automato == 1570 && Evento == 10) {
    State_Automato =1512;
}
if (State_Automato == 1575 && Evento == 4) {
    State_Automato =1571;
}
if (State_Automato == 1575 && Evento == 16) {
    State_Automato =1564;
}
if (State_Automato == 1575 && Evento == 10) {
    State_Automato =1511;
}
if (State_Automato == 1583 && Evento == 0) {
    State_Automato =1584;
}
if (State_Automato == 1583 && Evento == 4) {
    State_Automato =1585;
}
if (State_Automato == 1583 && Evento == 16) {
    State_Automato =1586;
}
if (State_Automato == 1583 && Evento == 6) {
    State_Automato =1559;
}
if (State_Automato == 1583 && Evento == 10) {
    State_Automato =1506;
}
if (State_Automato == 1589 && Evento == 0) {
    State_Automato =1590;
}
if (State_Automato == 1589 && Evento == 4) {
    State_Automato =1591;
}
if (State_Automato == 1589 && Evento == 10) {
    State_Automato =1522;
}
if (State_Automato == 1596 && Evento == 0) {
    State_Automato =1597;
}
if (State_Automato == 1596 && Evento == 4) {
    State_Automato =1598;
}
if (State_Automato == 1596 && Evento == 12) {
    State_Automato =1599;
}
if (State_Automato == 1596 && Evento == 16) {
    State_Automato =1600;
}
if (State_Automato == 1596 && Evento == 10) {
    State_Automato =1539;
}
if (State_Automato == 1607 && Evento == 0) {
    State_Automato =1608;
}
if (State_Automato == 1607 && Evento == 4) {
    State_Automato =1609;
}
if (State_Automato == 1607 && Evento == 2) {
    State_Automato =1586;
}
if (State_Automato == 1607 && Evento == 6) {
    State_Automato =1558;
}
if (State_Automato == 1607 && Evento == 10) {
    State_Automato =1505;
}
if (State_Automato == 1618 && Evento == 4) {
    State_Automato =1611;
}
if (State_Automato == 1618 && Evento == 2) {
    State_Automato =1590;
}
if (State_Automato == 1618 && Evento == 10) {
    State_Automato =1527;
}
if (State_Automato == 1619 && Evento == 4) {
    State_Automato =1613;
}
if (State_Automato == 1619 && Evento == 6) {
    State_Automato =1564;
}
if (State_Automato == 1619 && Evento == 10) {
    State_Automato =1529;
}
if (State_Automato == 1640 && Evento == 0) {
    State_Automato =1641;
}
if (State_Automato == 1640 && Evento == 16) {
    State_Automato =1609;
}
if (State_Automato == 1640 && Evento == 2) {
    State_Automato =1585;
}
if (State_Automato == 1640 && Evento == 6) {
    State_Automato =1557;
}
if (State_Automato == 1640 && Evento == 10) {
    State_Automato =1504;
}
if (State_Automato == 1644 && Evento == 16) {
    State_Automato =1613;
}
if (State_Automato == 1644 && Evento == 6) {
    State_Automato =1571;
}
if (State_Automato == 1644 && Evento == 10) {
    State_Automato =1532;
}
if (State_Automato == 1645 && Evento == 0) {
    State_Automato =1646;
}
if (State_Automato == 1645 && Evento == 12) {
    State_Automato =1630;
}
if (State_Automato == 1645 && Evento == 16) {
    State_Automato =1621;
}
if (State_Automato == 1645 && Evento == 2) {
    State_Automato =1598;
}
if (State_Automato == 1645 && Evento == 10) {
    State_Automato =1538;
}
if (State_Automato == 1649 && Evento == 12) {
    State_Automato =1632;
}
if (State_Automato == 1649 && Evento == 16) {
    State_Automato =1623;
}
if (State_Automato == 1649 && Evento == 10) {
    State_Automato =1544;
}
if (State_Automato == 1655 && Evento == 4) {
    State_Automato =1641;
}
if (State_Automato == 1655 && Evento == 16) {
    State_Automato =1608;
}
if (State_Automato == 1655 && Evento == 2) {
    State_Automato =1584;
}
if (State_Automato == 1655 && Evento == 6) {
    State_Automato =1556;
}
if (State_Automato == 1655 && Evento == 10) {
    State_Automato =1503;
}
if (State_Automato == 1656 && Evento == 4) {
    State_Automato =1646;
}
if (State_Automato == 1656 && Evento == 12) {
    State_Automato =1629;
}
if (State_Automato == 1656 && Evento == 16) {
    State_Automato =1620;
}
if (State_Automato == 1656 && Evento == 2) {
    State_Automato =1597;
}
if (State_Automato == 1656 && Evento == 10) {
    State_Automato =1537;
}
if (State_Automato == 1657 && Evento == 0) {
    State_Automato =1658;
}
if (State_Automato == 1657 && Evento == 4) {
    State_Automato =1659;
}
if (State_Automato == 1657 && Evento == 8) {
    State_Automato =1660;
}
if (State_Automato == 1657 && Evento == 16) {
    State_Automato =1661;
}
if (State_Automato == 1657 && Evento == 2) {
    State_Automato =1662;
}
if (State_Automato == 1657 && Evento == 6) {
    State_Automato =1663;
}
if (State_Automato == 1657 && Evento == 10) {
    State_Automato =1664;
}
if (State_Automato == 1674 && Evento == 0) {
    State_Automato =1675;
}
if (State_Automato == 1674 && Evento == 4) {
    State_Automato =1676;
}
if (State_Automato == 1674 && Evento == 16) {
    State_Automato =1670;
}
if (State_Automato == 1679 && Evento == 0) {
    State_Automato =1680;
}
if (State_Automato == 1679 && Evento == 4) {
    State_Automato =1681;
}
if (State_Automato == 1679 && Evento == 8) {
    State_Automato =1682;
}
if (State_Automato == 1679 && Evento == 16) {
    State_Automato =1683;
}
if (State_Automato == 1679 && Evento == 6) {
    State_Automato =1684;
}
if (State_Automato == 1692 && Evento == 0) {
    State_Automato =1693;
}
if (State_Automato == 1692 && Evento == 4) {
    State_Automato =1694;
}
if (State_Automato == 1692 && Evento == 8) {
    State_Automato =1695;
}
if (State_Automato == 1692 && Evento == 16) {
    State_Automato =1696;
}
if (State_Automato == 1692 && Evento == 10) {
    State_Automato =1684;
}
if (State_Automato == 1707 && Evento == 0) {
    State_Automato =1708;
}
if (State_Automato == 1707 && Evento == 4) {
    State_Automato =1709;
}
if (State_Automato == 1707 && Evento == 8) {
    State_Automato =1710;
}
if (State_Automato == 1707 && Evento == 2) {
    State_Automato =1702;
}
if (State_Automato == 1707 && Evento == 10) {
    State_Automato =1668;
}
if (State_Automato == 1716 && Evento == 0) {
    State_Automato =1717;
}
if (State_Automato == 1716 && Evento == 4) {
    State_Automato =1718;
}
if (State_Automato == 1716 && Evento == 8) {
    State_Automato =1719;
}
if (State_Automato == 1716 && Evento == 6) {
    State_Automato =1696;
}
if (State_Automato == 1716 && Evento == 10) {
    State_Automato =1683;
}
if (State_Automato == 1726 && Evento == 0) {
    State_Automato =1727;
}
if (State_Automato == 1726 && Evento == 16) {
    State_Automato =1712;
}
if (State_Automato == 1726 && Evento == 10) {
    State_Automato =1676;
}
if (State_Automato == 1729 && Evento == 0) {
    State_Automato =1730;
}
if (State_Automato == 1729 && Evento == 4) {
    State_Automato =1731;
}
if (State_Automato == 1729 && Evento == 16) {
    State_Automato =1719;
}
if (State_Automato == 1729 && Evento == 6) {
    State_Automato =1695;
}
if (State_Automato == 1729 && Evento == 10) {
    State_Automato =1682;
}
if (State_Automato == 1736 && Evento == 0) {
    State_Automato =1737;
}
if (State_Automato == 1736 && Evento == 8) {
    State_Automato =1731;
}
if (State_Automato == 1736 && Evento == 16) {
    State_Automato =1718;
}
if (State_Automato == 1736 && Evento == 6) {
    State_Automato =1694;
}
if (State_Automato == 1736 && Evento == 10) {
    State_Automato =1681;
}
if (State_Automato == 1741 && Evento == 4) {
    State_Automato =1737;
}
if (State_Automato == 1741 && Evento == 8) {
    State_Automato =1730;
}
if (State_Automato == 1741 && Evento == 16) {
    State_Automato =1717;
}
if (State_Automato == 1741 && Evento == 6) {
    State_Automato =1693;
}
if (State_Automato == 1741 && Evento == 10) {
    State_Automato =1680;
}
if (State_Automato == 1744 && Evento == 0) {
    State_Automato =1745;
}
if (State_Automato == 1744 && Evento == 4) {
    State_Automato =1746;
}
if (State_Automato == 1744 && Evento == 8) {
    State_Automato =1747;
}
if (State_Automato == 1744 && Evento == 12) {
    State_Automato =1748;
}
if (State_Automato == 1744 && Evento == 16) {
    State_Automato =1749;
}
if (State_Automato == 1744 && Evento == 6) {
    State_Automato =1750;
}
if (State_Automato == 1744 && Evento == 10) {
    State_Automato =1751;
}
if (State_Automato == 1773 && Evento == 12) {
    State_Automato =1774;
}
if (State_Automato == 1778 && Evento == 16) {
    State_Automato =1774;
}
if (State_Automato == 1783 && Evento == 0) {
    State_Automato =1784;
}
if (State_Automato == 1783 && Evento == 12) {
    State_Automato =1785;
}
if (State_Automato == 1783 && Evento == 16) {
    State_Automato =1786;
}
if (State_Automato == 1801 && Evento == 2) {
    State_Automato =1774;
}
if (State_Automato == 1803 && Evento == 0) {
    State_Automato =1804;
}
if (State_Automato == 1803 && Evento == 12) {
    State_Automato =1805;
}
if (State_Automato == 1803 && Evento == 2) {
    State_Automato =1786;
}
if (State_Automato == 1827 && Evento == 4) {
    State_Automato =1828;
}
if (State_Automato == 1827 && Evento == 12) {
    State_Automato =1829;
}
if (State_Automato == 1827 && Evento == 16) {
    State_Automato =1830;
}
if (State_Automato == 1845 && Evento == 4) {
    State_Automato =1846;
}
if (State_Automato == 1845 && Evento == 16) {
    State_Automato =1836;
}
if (State_Automato == 1845 && Evento == 2) {
    State_Automato =1829;
}
if (State_Automato == 1853 && Evento == 0) {
    State_Automato =1854;
}
if (State_Automato == 1853 && Evento == 4) {
    State_Automato =1855;
}
if (State_Automato == 1853 && Evento == 12) {
    State_Automato =1856;
}
if (State_Automato == 1872 && Evento == 0) {
    State_Automato =1873;
}
if (State_Automato == 1872 && Evento == 12) {
    State_Automato =1865;
}
if (State_Automato == 1872 && Evento == 2) {
    State_Automato =1855;
}
if (State_Automato == 1886 && Evento == 0) {
    State_Automato =1887;
}
if (State_Automato == 1886 && Evento == 4) {
    State_Automato =1888;
}
if (State_Automato == 1886 && Evento == 12) {
    State_Automato =1889;
}
if (State_Automato == 1886 && Evento == 16) {
    State_Automato =1890;
}
if (State_Automato == 1886 && Evento == 2) {
    State_Automato =1891;
}
if (State_Automato == 1894 && Evento == 0) {
    State_Automato =1895;
}
if (State_Automato == 1894 && Evento == 4) {
    State_Automato =1896;
}
if (State_Automato == 1894 && Evento == 16) {
    State_Automato =1897;
}
if (State_Automato == 1921 && Evento == 4) {
    State_Automato =1913;
}
if (State_Automato == 1921 && Evento == 16) {
    State_Automato =1903;
}
if (State_Automato == 1921 && Evento == 2) {
    State_Automato =1895;
}
if (State_Automato == 1930 && Evento == 0) {
    State_Automato =1931;
}
if (State_Automato == 1930 && Evento == 8) {
    State_Automato =1932;
}
if (State_Automato == 1930 && Evento == 12) {
    State_Automato =1933;
}
if (State_Automato == 1930 && Evento == 16) {
    State_Automato =1934;
}
if (State_Automato == 1930 && Evento == 6) {
    State_Automato =1766;
}
if (State_Automato == 1939 && Evento == 8) {
    State_Automato =1940;
}
if (State_Automato == 1939 && Evento == 12) {
    State_Automato =1941;
}
if (State_Automato == 1939 && Evento == 6) {
    State_Automato =1770;
}
if (State_Automato == 1944 && Evento == 6) {
    State_Automato =1774;
}
if (State_Automato == 1947 && Evento == 12) {
    State_Automato =128;
}
if (State_Automato == 1948 && Evento == 0) {
    State_Automato =1949;
}
if (State_Automato == 1948 && Evento == 12) {
    State_Automato =1950;
}
if (State_Automato == 1948 && Evento == 6) {
    State_Automato =1786;
}
if (State_Automato == 1956 && Evento == 12) {
    State_Automato =221;
}
if (State_Automato == 1959 && Evento == 0) {
    State_Automato =1960;
}
if (State_Automato == 1959 && Evento == 8) {
    State_Automato =1961;
}
if (State_Automato == 1959 && Evento == 12) {
    State_Automato =251;
}
if (State_Automato == 1967 && Evento == 8) {
    State_Automato =1968;
}
if (State_Automato == 1967 && Evento == 16) {
    State_Automato =1941;
}
if (State_Automato == 1967 && Evento == 6) {
    State_Automato =1769;
}
if (State_Automato == 1974 && Evento == 0) {
    State_Automato =1975;
}
if (State_Automato == 1974 && Evento == 16) {
    State_Automato =1950;
}
if (State_Automato == 1974 && Evento == 6) {
    State_Automato =1785;
}
if (State_Automato == 1984 && Evento == 12) {
    State_Automato =186;
}
if (State_Automato == 1987 && Evento == 0) {
    State_Automato =1988;
}
if (State_Automato == 1987 && Evento == 12) {
    State_Automato =260;
}
if (State_Automato == 1987 && Evento == 16) {
    State_Automato =1961;
}
if (State_Automato == 1995 && Evento == 8) {
    State_Automato =1979;
}
if (State_Automato == 1995 && Evento == 12) {
    State_Automato =1970;
}
if (State_Automato == 1995 && Evento == 6) {
    State_Automato =1779;
}
if (State_Automato == 1996 && Evento == 12) {
    State_Automato =1975;
}
if (State_Automato == 1996 && Evento == 16) {
    State_Automato =1949;
}
if (State_Automato == 1996 && Evento == 6) {
    State_Automato =1784;
}
if (State_Automato == 1997 && Evento == 8) {
    State_Automato =1985;
}
if (State_Automato == 1997 && Evento == 16) {
    State_Automato =1957;
}
if (State_Automato == 1997 && Evento == 6) {
    State_Automato =1794;
}
if (State_Automato == 1998 && Evento == 8) {
    State_Automato =1988;
}
if (State_Automato == 1998 && Evento == 12) {
    State_Automato =266;
}
if (State_Automato == 1998 && Evento == 16) {
    State_Automato =1960;
}
if (State_Automato == 1999 && Evento == 4) {
    State_Automato =2000;
}
if (State_Automato == 1999 && Evento == 8) {
    State_Automato =2001;
}
if (State_Automato == 1999 && Evento == 12) {
    State_Automato =2002;
}
if (State_Automato == 1999 && Evento == 16) {
    State_Automato =2003;
}
if (State_Automato == 1999 && Evento == 6) {
    State_Automato =1816;
}
if (State_Automato == 2019 && Evento == 4) {
    State_Automato =2020;
}
if (State_Automato == 2019 && Evento == 16) {
    State_Automato =2005;
}
if (State_Automato == 2019 && Evento == 6) {
    State_Automato =1829;
}
if (State_Automato == 2034 && Evento == 4) {
    State_Automato =2035;
}
if (State_Automato == 2034 && Evento == 12) {
    State_Automato =2022;
}
if (State_Automato == 2034 && Evento == 16) {
    State_Automato =2011;
}
if (State_Automato == 2039 && Evento == 8) {
    State_Automato =2026;
}
if (State_Automato == 2039 && Evento == 12) {
    State_Automato =2015;
}
if (State_Automato == 2039 && Evento == 6) {
    State_Automato =1819;
}
if (State_Automato == 2050 && Evento == 0) {
    State_Automato =2051;
}
if (State_Automato == 2050 && Evento == 4) {
    State_Automato =2052;
}
if (State_Automato == 2050 && Evento == 12) {
    State_Automato =2044;
}
if (State_Automato == 2077 && Evento == 0) {
    State_Automato =2078;
}
if (State_Automato == 2077 && Evento == 4) {
    State_Automato =2079;
}
if (State_Automato == 2077 && Evento == 16) {
    State_Automato =2073;
}
if (State_Automato == 2086 && Evento == 8) {
    State_Automato =2087;
}
if (State_Automato == 2086 && Evento == 2) {
    State_Automato =1941;
}
if (State_Automato == 2086 && Evento == 6) {
    State_Automato =1797;
}
if (State_Automato == 2091 && Evento == 2) {
    State_Automato =128;
}
if (State_Automato == 2093 && Evento == 0) {
    State_Automato =2094;
}
if (State_Automato == 2093 && Evento == 2) {
    State_Automato =1950;
}
if (State_Automato == 2093 && Evento == 6) {
    State_Automato =1805;
}
if (State_Automato == 2098 && Evento == 2) {
    State_Automato =221;
}
if (State_Automato == 2100 && Evento == 0) {
    State_Automato =2101;
}
if (State_Automato == 2100 && Evento == 8) {
    State_Automato =2102;
}
if (State_Automato == 2100 && Evento == 2) {
    State_Automato =251;
}
if (State_Automato == 2105 && Evento == 0) {
    State_Automato =2106;
}
if (State_Automato == 2105 && Evento == 8) {
    State_Automato =2107;
}
if (State_Automato == 2105 && Evento == 6) {
    State_Automato =1814;
}
if (State_Automato == 2111 && Evento == 12) {
    State_Automato =2094;
}
if (State_Automato == 2111 && Evento == 2) {
    State_Automato =1949;
}
if (State_Automato == 2111 && Evento == 6) {
    State_Automato =1804;
}
if (State_Automato == 2127 && Evento == 2) {
    State_Automato =186;
}
if (State_Automato == 2128 && Evento == 0) {
    State_Automato =2129;
}
if (State_Automato == 2128 && Evento == 16) {
    State_Automato =2102;
}
if (State_Automato == 2128 && Evento == 2) {
    State_Automato =260;
}
if (State_Automato == 2132 && Evento == 8) {
    State_Automato =2129;
}
if (State_Automato == 2132 && Evento == 16) {
    State_Automato =2101;
}
if (State_Automato == 2132 && Evento == 2) {
    State_Automato =266;
}
if (State_Automato == 2138 && Evento == 0) {
    State_Automato =2139;
}
if (State_Automato == 2138 && Evento == 2) {
    State_Automato =2042;
}
if (State_Automato == 2138 && Evento == 6) {
    State_Automato =1865;
}
if (State_Automato == 2145 && Evento == 0) {
    State_Automato =2146;
}
if (State_Automato == 2145 && Evento == 4) {
    State_Automato =2147;
}
if (State_Automato == 2145 && Evento == 16) {
    State_Automato =2113;
}
if (State_Automato == 2145 && Evento == 2) {
    State_Automato =2065;
}
if (State_Automato == 2145 && Evento == 6) {
    State_Automato =1889;
}
if (State_Automato == 2158 && Evento == 4) {
    State_Automato =2150;
}
if (State_Automato == 2158 && Evento == 16) {
    State_Automato =2116;
}
if (State_Automato == 2158 && Evento == 2) {
    State_Automato =2069;
}
if (State_Automato == 2175 && Evento == 4) {
    State_Automato =2164;
}
if (State_Automato == 2175 && Evento == 12) {
    State_Automato =2134;
}
if (State_Automato == 2175 && Evento == 2) {
    State_Automato =2051;
}
if (State_Automato == 2177 && Evento == 0) {
    State_Automato =2178;
}
if (State_Automato == 2177 && Evento == 8) {
    State_Automato =2160;
}
if (State_Automato == 2177 && Evento == 12) {
    State_Automato =2133;
}
if (State_Automato == 2177 && Evento == 2) {
    State_Automato =2040;
}
if (State_Automato == 2177 && Evento == 6) {
    State_Automato =1850;
}
if (State_Automato == 2183 && Evento == 8) {
    State_Automato =2168;
}
if (State_Automato == 2183 && Evento == 12) {
    State_Automato =2143;
}
if (State_Automato == 2183 && Evento == 6) {
    State_Automato =1880;
}
if (State_Automato == 2189 && Evento == 4) {
    State_Automato =2184;
}
if (State_Automato == 2189 && Evento == 12) {
    State_Automato =2146;
}
if (State_Automato == 2189 && Evento == 16) {
    State_Automato =2112;
}
if (State_Automato == 2189 && Evento == 2) {
    State_Automato =2064;
}
if (State_Automato == 2189 && Evento == 6) {
    State_Automato =1887;
}
if (State_Automato == 2190 && Evento == 0) {
    State_Automato =2191;
}
if (State_Automato == 2190 && Evento == 8) {
    State_Automato =2192;
}
if (State_Automato == 2190 && Evento == 12) {
    State_Automato =2193;
}
if (State_Automato == 2190 && Evento == 16) {
    State_Automato =2194;
}
if (State_Automato == 2190 && Evento == 2) {
    State_Automato =2195;
}
if (State_Automato == 2190 && Evento == 6) {
    State_Automato =2196;
}
if (State_Automato == 2190 && Evento == 14) {
    State_Automato =469;
}
if (State_Automato == 2206 && Evento == 12) {
    State_Automato =2207;
}
if (State_Automato == 2206 && Evento == 16) {
    State_Automato =2208;
}
if (State_Automato == 2206 && Evento == 14) {
    State_Automato =494;
}
if (State_Automato == 2218 && Evento == 12) {
    State_Automato =2219;
}
if (State_Automato == 2218 && Evento == 2) {
    State_Automato =2208;
}
if (State_Automato == 2218 && Evento == 14) {
    State_Automato =493;
}
if (State_Automato == 2227 && Evento == 16) {
    State_Automato =2219;
}
if (State_Automato == 2227 && Evento == 2) {
    State_Automato =2207;
}
if (State_Automato == 2227 && Evento == 14) {
    State_Automato =492;
}
if (State_Automato == 2232 && Evento == 0) {
    State_Automato =2233;
}
if (State_Automato == 2232 && Evento == 12) {
    State_Automato =2234;
}
if (State_Automato == 2232 && Evento == 14) {
    State_Automato =569;
}
if (State_Automato == 2241 && Evento == 0) {
    State_Automato =2242;
}
if (State_Automato == 2241 && Evento == 12) {
    State_Automato =2243;
}
if (State_Automato == 2241 && Evento == 16) {
    State_Automato =2244;
}
if (State_Automato == 2241 && Evento == 2) {
    State_Automato =2245;
}
if (State_Automato == 2241 && Evento == 14) {
    State_Automato =642;
}
if (State_Automato == 2253 && Evento == 0) {
    State_Automato =2254;
}
if (State_Automato == 2253 && Evento == 12) {
    State_Automato =2255;
}
if (State_Automato == 2253 && Evento == 14) {
    State_Automato =650;
}
if (State_Automato == 2275 && Evento == 12) {
    State_Automato =2276;
}
if (State_Automato == 2275 && Evento == 6) {
    State_Automato =2208;
}
if (State_Automato == 2275 && Evento == 14) {
    State_Automato =519;
}
if (State_Automato == 2278 && Evento == 8) {
    State_Automato =2279;
}
if (State_Automato == 2278 && Evento == 6) {
    State_Automato =2213;
}
if (State_Automato == 2278 && Evento == 14) {
    State_Automato =524;
}
if (State_Automato == 2283 && Evento == 8) {
    State_Automato =2284;
}
if (State_Automato == 2283 && Evento == 12) {
    State_Automato =2285;
}
if (State_Automato == 2283 && Evento == 14) {
    State_Automato =528;
}
if (State_Automato == 2290 && Evento == 16) {
    State_Automato =2276;
}
if (State_Automato == 2290 && Evento == 6) {
    State_Automato =2207;
}
if (State_Automato == 2290 && Evento == 14) {
    State_Automato =518;
}
if (State_Automato == 2298 && Evento == 0) {
    State_Automato =2299;
}
if (State_Automato == 2298 && Evento == 6) {
    State_Automato =2234;
}
if (State_Automato == 2298 && Evento == 14) {
    State_Automato =584;
}
if (State_Automato == 2302 && Evento == 14) {
    State_Automato =588;
}
if (State_Automato == 2303 && Evento == 0) {
    State_Automato =2304;
}
if (State_Automato == 2303 && Evento == 8) {
    State_Automato =2305;
}
if (State_Automato == 2303 && Evento == 14) {
    State_Automato =598;
}
if (State_Automato == 2316 && Evento == 12) {
    State_Automato =2299;
}
if (State_Automato == 2316 && Evento == 6) {
    State_Automato =2233;
}
if (State_Automato == 2316 && Evento == 14) {
    State_Automato =583;
}
if (State_Automato == 2317 && Evento == 8) {
    State_Automato =2308;
}
if (State_Automato == 2317 && Evento == 6) {
    State_Automato =2239;
}
if (State_Automato == 2317 && Evento == 14) {
    State_Automato =595;
}
if (State_Automato == 2318 && Evento == 8) {
    State_Automato =2310;
}
if (State_Automato == 2318 && Evento == 12) {
    State_Automato =2304;
}
if (State_Automato == 2318 && Evento == 14) {
    State_Automato =597;
}
if (State_Automato == 2319 && Evento == 0) {
    State_Automato =2320;
}
if (State_Automato == 2319 && Evento == 12) {
    State_Automato =2321;
}
if (State_Automato == 2319 && Evento == 16) {
    State_Automato =2322;
}
if (State_Automato == 2319 && Evento == 6) {
    State_Automato =2245;
}
if (State_Automato == 2319 && Evento == 14) {
    State_Automato =641;
}
if (State_Automato == 2327 && Evento == 0) {
    State_Automato =2328;
}
if (State_Automato == 2327 && Evento == 12) {
    State_Automato =2329;
}
if (State_Automato == 2327 && Evento == 14) {
    State_Automato =665;
}
if (State_Automato == 2336 && Evento == 0) {
    State_Automato =2337;
}
if (State_Automato == 2336 && Evento == 16) {
    State_Automato =2329;
}
if (State_Automato == 2336 && Evento == 14) {
    State_Automato =664;
}
if (State_Automato == 2343 && Evento == 12) {
    State_Automato =2337;
}
if (State_Automato == 2343 && Evento == 16) {
    State_Automato =2328;
}
if (State_Automato == 2343 && Evento == 14) {
    State_Automato =663;
}
if (State_Automato == 2345 && Evento == 0) {
    State_Automato =2346;
}
if (State_Automato == 2345 && Evento == 8) {
    State_Automato =2347;
}
if (State_Automato == 2345 && Evento == 14) {
    State_Automato =694;
}
if (State_Automato == 2350 && Evento == 0) {
    State_Automato =2351;
}
if (State_Automato == 2350 && Evento == 8) {
    State_Automato =2352;
}
if (State_Automato == 2350 && Evento == 12) {
    State_Automato =2353;
}
if (State_Automato == 2350 && Evento == 16) {
    State_Automato =2354;
}
if (State_Automato == 2350 && Evento == 14) {
    State_Automato =713;
}
if (State_Automato == 2364 && Evento == 8) {
    State_Automato =2365;
}
if (State_Automato == 2364 && Evento == 12) {
    State_Automato =2366;
}
if (State_Automato == 2364 && Evento == 2) {
    State_Automato =2270;
}
if (State_Automato == 2364 && Evento == 6) {
    State_Automato =2200;
}
if (State_Automato == 2364 && Evento == 14) {
    State_Automato =477;
}
if (State_Automato == 2377 && Evento == 12) {
    State_Automato =2369;
}
if (State_Automato == 2377 && Evento == 2) {
    State_Automato =2284;
}
if (State_Automato == 2377 && Evento == 14) {
    State_Automato =540;
}
if (State_Automato == 2379 && Evento == 0) {
    State_Automato =2380;
}
if (State_Automato == 2379 && Evento == 12) {
    State_Automato =2381;
}
if (State_Automato == 2379 && Evento == 2) {
    State_Automato =2322;
}
if (State_Automato == 2379 && Evento == 6) {
    State_Automato =2244;
}
if (State_Automato == 2379 && Evento == 14) {
    State_Automato =640;
}
if (State_Automato == 2392 && Evento == 12) {
    State_Automato =2383;
}
if (State_Automato == 2392 && Evento == 2) {
    State_Automato =2328;
}
if (State_Automato == 2392 && Evento == 14) {
    State_Automato =676;
}
if (State_Automato == 2393 && Evento == 12) {
    State_Automato =2385;
}
if (State_Automato == 2393 && Evento == 6) {
    State_Automato =2254;
}
if (State_Automato == 2393 && Evento == 14) {
    State_Automato =680;
}
if (State_Automato == 2394 && Evento == 0) {
    State_Automato =2395;
}
if (State_Automato == 2394 && Evento == 8) {
    State_Automato =2396;
}
if (State_Automato == 2394 && Evento == 12) {
    State_Automato =2397;
}
if (State_Automato == 2394 && Evento == 2) {
    State_Automato =2354;
}
if (State_Automato == 2394 && Evento == 14) {
    State_Automato =712;
}
if (State_Automato == 2403 && Evento == 0) {
    State_Automato =2404;
}
if (State_Automato == 2403 && Evento == 8) {
    State_Automato =2405;
}
if (State_Automato == 2403 && Evento == 12) {
    State_Automato =2406;
}
if (State_Automato == 2403 && Evento == 6) {
    State_Automato =2264;
}
if (State_Automato == 2403 && Evento == 14) {
    State_Automato =728;
}
if (State_Automato == 2414 && Evento == 8) {
    State_Automato =2415;
}
if (State_Automato == 2414 && Evento == 16) {
    State_Automato =2366;
}
if (State_Automato == 2414 && Evento == 2) {
    State_Automato =2269;
}
if (State_Automato == 2414 && Evento == 6) {
    State_Automato =2199;
}
if (State_Automato == 2414 && Evento == 14) {
    State_Automato =476;
}
if (State_Automato == 2419 && Evento == 16) {
    State_Automato =2369;
}
if (State_Automato == 2419 && Evento == 2) {
    State_Automato =2291;
}
if (State_Automato == 2419 && Evento == 14) {
    State_Automato =553;
}
if (State_Automato == 2424 && Evento == 0) {
    State_Automato =2425;
}
if (State_Automato == 2424 && Evento == 2) {
    State_Automato =2305;
}
if (State_Automato == 2424 && Evento == 14) {
    State_Automato =612;
}
if (State_Automato == 2428 && Evento == 14) {
    State_Automato =616;
}
if (State_Automato == 2430 && Evento == 8) {
    State_Automato =2425;
}
if (State_Automato == 2430 && Evento == 2) {
    State_Automato =2304;
}
if (State_Automato == 2430 && Evento == 14) {
    State_Automato =611;
}
if (State_Automato == 2431 && Evento == 0) {
    State_Automato =2432;
}
if (State_Automato == 2431 && Evento == 16) {
    State_Automato =2381;
}
if (State_Automato == 2431 && Evento == 2) {
    State_Automato =2321;
}
if (State_Automato == 2431 && Evento == 6) {
    State_Automato =2243;
}
if (State_Automato == 2431 && Evento == 14) {
    State_Automato =639;
}
if (State_Automato == 2435 && Evento == 16) {
    State_Automato =2383;
}
if (State_Automato == 2435 && Evento == 2) {
    State_Automato =2337;
}
if (State_Automato == 2435 && Evento == 14) {
    State_Automato =685;
}
if (State_Automato == 2436 && Evento == 0) {
    State_Automato =2437;
}
if (State_Automato == 2436 && Evento == 8) {
    State_Automato =2438;
}
if (State_Automato == 2436 && Evento == 16) {
    State_Automato =2397;
}
if (State_Automato == 2436 && Evento == 2) {
    State_Automato =2353;
}
if (State_Automato == 2436 && Evento == 14) {
    State_Automato =711;
}
if (State_Automato == 2441 && Evento == 0) {
    State_Automato =2442;
}
if (State_Automato == 2441 && Evento == 16) {
    State_Automato =2399;
}
if (State_Automato == 2441 && Evento == 14) {
    State_Automato =719;
}
if (State_Automato == 2450 && Evento == 12) {
    State_Automato =2425;
}
if (State_Automato == 2450 && Evento == 2) {
    State_Automato =2310;
}
if (State_Automato == 2450 && Evento == 14) {
    State_Automato =626;
}
if (State_Automato == 2451 && Evento == 0) {
    State_Automato =2452;
}
if (State_Automato == 2451 && Evento == 12) {
    State_Automato =2438;
}
if (State_Automato == 2451 && Evento == 16) {
    State_Automato =2396;
}
if (State_Automato == 2451 && Evento == 2) {
    State_Automato =2352;
}
if (State_Automato == 2451 && Evento == 14) {
    State_Automato =710;
}
if (State_Automato == 2457 && Evento == 12) {
    State_Automato =2432;
}
if (State_Automato == 2457 && Evento == 16) {
    State_Automato =2380;
}
if (State_Automato == 2457 && Evento == 2) {
    State_Automato =2320;
}
if (State_Automato == 2457 && Evento == 6) {
    State_Automato =2242;
}
if (State_Automato == 2457 && Evento == 14) {
    State_Automato =638;
}
if (State_Automato == 2458 && Evento == 8) {
    State_Automato =2452;
}
if (State_Automato == 2458 && Evento == 12) {
    State_Automato =2437;
}
if (State_Automato == 2458 && Evento == 16) {
    State_Automato =2395;
}
if (State_Automato == 2458 && Evento == 2) {
    State_Automato =2351;
}
if (State_Automato == 2458 && Evento == 14) {
    State_Automato =709;
}
if (State_Automato == 2476 && Evento == 4) {
    State_Automato =2477;
}
if (State_Automato == 2476 && Evento == 12) {
    State_Automato =2478;
}
if (State_Automato == 2476 && Evento == 16) {
    State_Automato =2479;
}
if (State_Automato == 2476 && Evento == 2) {
    State_Automato =2480;
}
if (State_Automato == 2476 && Evento == 14) {
    State_Automato =954;
}
if (State_Automato == 2483 && Evento == 4) {
    State_Automato =2484;
}
if (State_Automato == 2483 && Evento == 16) {
    State_Automato =2485;
}
if (State_Automato == 2483 && Evento == 14) {
    State_Automato =961;
}
if (State_Automato == 2493 && Evento == 4) {
    State_Automato =2494;
}
if (State_Automato == 2493 && Evento == 16) {
    State_Automato =2489;
}
if (State_Automato == 2493 && Evento == 14) {
    State_Automato =967;
}
if (State_Automato == 2520 && Evento == 8) {
    State_Automato =2510;
}
if (State_Automato == 2520 && Evento == 6) {
    State_Automato =2466;
}
if (State_Automato == 2520 && Evento == 14) {
    State_Automato =915;
}
if (State_Automato == 2521 && Evento == 8) {
    State_Automato =2514;
}
if (State_Automato == 2521 && Evento == 12) {
    State_Automato =2506;
}
if (State_Automato == 2521 && Evento == 14) {
    State_Automato =921;
}
if (State_Automato == 2522 && Evento == 4) {
    State_Automato =2523;
}
if (State_Automato == 2522 && Evento == 12) {
    State_Automato =2524;
}
if (State_Automato == 2522 && Evento == 16) {
    State_Automato =2525;
}
if (State_Automato == 2522 && Evento == 6) {
    State_Automato =2480;
}
if (State_Automato == 2522 && Evento == 14) {
    State_Automato =953;
}
if (State_Automato == 2531 && Evento == 4) {
    State_Automato =2532;
}
if (State_Automato == 2531 && Evento == 8) {
    State_Automato =2533;
}
if (State_Automato == 2531 && Evento == 16) {
    State_Automato =2534;
}
if (State_Automato == 2531 && Evento == 6) {
    State_Automato =2497;
}
if (State_Automato == 2531 && Evento == 14) {
    State_Automato =995;
}
if (State_Automato == 2564 && Evento == 4) {
    State_Automato =2565;
}
if (State_Automato == 2564 && Evento == 12) {
    State_Automato =2556;
}
if (State_Automato == 2564 && Evento == 16) {
    State_Automato =2552;
}
if (State_Automato == 2564 && Evento == 2) {
    State_Automato =2545;
}
if (State_Automato == 2564 && Evento == 14) {
    State_Automato =1020;
}
if (State_Automato == 2567 && Evento == 0) {
    State_Automato =2568;
}
if (State_Automato == 2567 && Evento == 4) {
    State_Automato =2569;
}
if (State_Automato == 2567 && Evento == 8) {
    State_Automato =2570;
}
if (State_Automato == 2567 && Evento == 12) {
    State_Automato =2571;
}
if (State_Automato == 2567 && Evento == 2) {
    State_Automato =2572;
}
if (State_Automato == 2567 && Evento == 6) {
    State_Automato =2573;
}
if (State_Automato == 2567 && Evento == 14) {
    State_Automato =1172;
}
if (State_Automato == 2576 && Evento == 0) {
    State_Automato =2577;
}
if (State_Automato == 2576 && Evento == 4) {
    State_Automato =2578;
}
if (State_Automato == 2576 && Evento == 12) {
    State_Automato =2579;
}
if (State_Automato == 2576 && Evento == 2) {
    State_Automato =2580;
}
if (State_Automato == 2576 && Evento == 14) {
    State_Automato =1182;
}
if (State_Automato == 2583 && Evento == 0) {
    State_Automato =2584;
}
if (State_Automato == 2583 && Evento == 4) {
    State_Automato =2585;
}
if (State_Automato == 2583 && Evento == 14) {
    State_Automato =1189;
}
if (State_Automato == 2594 && Evento == 0) {
    State_Automato =2595;
}
if (State_Automato == 2594 && Evento == 2) {
    State_Automato =2585;
}
if (State_Automato == 2594 && Evento == 14) {
    State_Automato =1188;
}
if (State_Automato == 2598 && Evento == 14) {
    State_Automato =1194;
}
if (State_Automato == 2599 && Evento == 0) {
    State_Automato =2600;
}
if (State_Automato == 2599 && Evento == 12) {
    State_Automato =2589;
}
if (State_Automato == 2599 && Evento == 14) {
    State_Automato =1201;
}
if (State_Automato == 2604 && Evento == 4) {
    State_Automato =2595;
}
if (State_Automato == 2604 && Evento == 2) {
    State_Automato =2584;
}
if (State_Automato == 2604 && Evento == 14) {
    State_Automato =1187;
}
if (State_Automato == 2617 && Evento == 0) {
    State_Automato =2618;
}
if (State_Automato == 2617 && Evento == 4) {
    State_Automato =2619;
}
if (State_Automato == 2617 && Evento == 12) {
    State_Automato =2620;
}
if (State_Automato == 2617 && Evento == 6) {
    State_Automato =2580;
}
if (State_Automato == 2617 && Evento == 14) {
    State_Automato =1181;
}
if (State_Automato == 2623 && Evento == 0) {
    State_Automato =2624;
}
if (State_Automato == 2623 && Evento == 4) {
    State_Automato =2625;
}
if (State_Automato == 2623 && Evento == 14) {
    State_Automato =1217;
}
if (State_Automato == 2630 && Evento == 0) {
    State_Automato =2631;
}
if (State_Automato == 2630 && Evento == 4) {
    State_Automato =2632;
}
if (State_Automato == 2630 && Evento == 8) {
    State_Automato =2633;
}
if (State_Automato == 2630 && Evento == 6) {
    State_Automato =2607;
}
if (State_Automato == 2630 && Evento == 14) {
    State_Automato =1266;
}
if (State_Automato == 2641 && Evento == 0) {
    State_Automato =2642;
}
if (State_Automato == 2641 && Evento == 4) {
    State_Automato =2643;
}
if (State_Automato == 2641 && Evento == 8) {
    State_Automato =2644;
}
if (State_Automato == 2641 && Evento == 12) {
    State_Automato =2645;
}
if (State_Automato == 2641 && Evento == 14) {
    State_Automato =1307;
}
if (State_Automato == 2653 && Evento == 0) {
    State_Automato =2654;
}
if (State_Automato == 2653 && Evento == 4) {
    State_Automato =2655;
}
if (State_Automato == 2653 && Evento == 2) {
    State_Automato =2620;
}
if (State_Automato == 2653 && Evento == 6) {
    State_Automato =2579;
}
if (State_Automato == 2653 && Evento == 14) {
    State_Automato =1180;
}
if (State_Automato == 2659 && Evento == 0) {
    State_Automato =2660;
}
if (State_Automato == 2659 && Evento == 2) {
    State_Automato =2625;
}
if (State_Automato == 2659 && Evento == 14) {
    State_Automato =1226;
}
if (State_Automato == 2663 && Evento == 14) {
    State_Automato =1230;
}
if (State_Automato == 2664 && Evento == 0) {
    State_Automato =2665;
}
if (State_Automato == 2664 && Evento == 6) {
    State_Automato =2589;
}
if (State_Automato == 2664 && Evento == 14) {
    State_Automato =1237;
}
if (State_Automato == 2669 && Evento == 4) {
    State_Automato =2660;
}
if (State_Automato == 2669 && Evento == 2) {
    State_Automato =2624;
}
if (State_Automato == 2669 && Evento == 14) {
    State_Automato =1225;
}
if (State_Automato == 2670 && Evento == 0) {
    State_Automato =2671;
}
if (State_Automato == 2670 && Evento == 4) {
    State_Automato =2672;
}
if (State_Automato == 2670 && Evento == 8) {
    State_Automato =2673;
}
if (State_Automato == 2670 && Evento == 2) {
    State_Automato =2645;
}
if (State_Automato == 2670 && Evento == 14) {
    State_Automato =1306;
}
if (State_Automato == 2682 && Evento == 4) {
    State_Automato =2678;
}
if (State_Automato == 2682 && Evento == 8) {
    State_Automato =2675;
}
if (State_Automato == 2682 && Evento == 14) {
    State_Automato =1312;
}
if (State_Automato == 2689 && Evento == 0) {
    State_Automato =2690;
}
if (State_Automato == 2689 && Evento == 2) {
    State_Automato =2636;
}
if (State_Automato == 2689 && Evento == 14) {
    State_Automato =1275;
}
if (State_Automato == 2693 && Evento == 14) {
    State_Automato =1279;
}
if (State_Automato == 2698 && Evento == 4) {
    State_Automato =2690;
}
if (State_Automato == 2698 && Evento == 2) {
    State_Automato =2635;
}
if (State_Automato == 2698 && Evento == 14) {
    State_Automato =1274;
}
if (State_Automato == 2699 && Evento == 0) {
    State_Automato =2700;
}
if (State_Automato == 2699 && Evento == 4) {
    State_Automato =2701;
}
if (State_Automato == 2699 && Evento == 12) {
    State_Automato =2673;
}
if (State_Automato == 2699 && Evento == 2) {
    State_Automato =2644;
}
if (State_Automato == 2699 && Evento == 14) {
    State_Automato =1305;
}
if (State_Automato == 2707 && Evento == 4) {
    State_Automato =2703;
}
if (State_Automato == 2707 && Evento == 12) {
    State_Automato =2675;
}
if (State_Automato == 2707 && Evento == 14) {
    State_Automato =1321;
}
if (State_Automato == 2712 && Evento == 0) {
    State_Automato =2713;
}
if (State_Automato == 2712 && Evento == 12) {
    State_Automato =2655;
}
if (State_Automato == 2712 && Evento == 2) {
    State_Automato =2619;
}
if (State_Automato == 2712 && Evento == 6) {
    State_Automato =2578;
}
if (State_Automato == 2712 && Evento == 14) {
    State_Automato =1179;
}
if (State_Automato == 2716 && Evento == 12) {
    State_Automato =2665;
}
if (State_Automato == 2716 && Evento == 6) {
    State_Automato =2600;
}
if (State_Automato == 2716 && Evento == 14) {
    State_Automato =1255;
}
if (State_Automato == 2717 && Evento == 0) {
    State_Automato =2718;
}
if (State_Automato == 2717 && Evento == 8) {
    State_Automato =2686;
}
if (State_Automato == 2717 && Evento == 2) {
    State_Automato =2632;
}
if (State_Automato == 2717 && Evento == 6) {
    State_Automato =2606;
}
if (State_Automato == 2717 && Evento == 14) {
    State_Automato =1265;
}
if (State_Automato == 2721 && Evento == 8) {
    State_Automato =2694;
}
if (State_Automato == 2721 && Evento == 6) {
    State_Automato =2610;
}
if (State_Automato == 2721 && Evento == 14) {
    State_Automato =1297;
}
if (State_Automato == 2722 && Evento == 0) {
    State_Automato =2723;
}
if (State_Automato == 2722 && Evento == 8) {
    State_Automato =2701;
}
if (State_Automato == 2722 && Evento == 12) {
    State_Automato =2672;
}
if (State_Automato == 2722 && Evento == 2) {
    State_Automato =2643;
}
if (State_Automato == 2722 && Evento == 14) {
    State_Automato =1304;
}
if (State_Automato == 2726 && Evento == 8) {
    State_Automato =2703;
}
if (State_Automato == 2726 && Evento == 12) {
    State_Automato =2678;
}
if (State_Automato == 2726 && Evento == 14) {
    State_Automato =1328;
}
if (State_Automato == 2731 && Evento == 4) {
    State_Automato =2713;
}
if (State_Automato == 2731 && Evento == 12) {
    State_Automato =2654;
}
if (State_Automato == 2731 && Evento == 2) {
    State_Automato =2618;
}
if (State_Automato == 2731 && Evento == 6) {
    State_Automato =2577;
}
if (State_Automato == 2731 && Evento == 14) {
    State_Automato =1178;
}
if (State_Automato == 2732 && Evento == 4) {
    State_Automato =2718;
}
if (State_Automato == 2732 && Evento == 8) {
    State_Automato =2685;
}
if (State_Automato == 2732 && Evento == 2) {
    State_Automato =2631;
}
if (State_Automato == 2732 && Evento == 6) {
    State_Automato =2605;
}
if (State_Automato == 2732 && Evento == 14) {
    State_Automato =1264;
}
if (State_Automato == 2733 && Evento == 4) {
    State_Automato =2723;
}
if (State_Automato == 2733 && Evento == 8) {
    State_Automato =2700;
}
if (State_Automato == 2733 && Evento == 12) {
    State_Automato =2671;
}
if (State_Automato == 2733 && Evento == 2) {
    State_Automato =2642;
}
if (State_Automato == 2733 && Evento == 14) {
    State_Automato =1303;
}
if (State_Automato == 2734 && Evento == 0) {
    State_Automato =2735;
}
if (State_Automato == 2734 && Evento == 4) {
    State_Automato =2736;
}
if (State_Automato == 2734 && Evento == 12) {
    State_Automato =2737;
}
if (State_Automato == 2734 && Evento == 16) {
    State_Automato =2738;
}
if (State_Automato == 2734 && Evento == 2) {
    State_Automato =2739;
}
if (State_Automato == 2734 && Evento == 6) {
    State_Automato =2740;
}
if (State_Automato == 2734 && Evento == 14) {
    State_Automato =1499;
}
if (State_Automato == 2744 && Evento == 0) {
    State_Automato =2745;
}
if (State_Automato == 2744 && Evento == 4) {
    State_Automato =2746;
}
if (State_Automato == 2744 && Evento == 16) {
    State_Automato =2747;
}
if (State_Automato == 2744 && Evento == 2) {
    State_Automato =2748;
}
if (State_Automato == 2744 && Evento == 14) {
    State_Automato =1507;
}
if (State_Automato == 2758 && Evento == 4) {
    State_Automato =2754;
}
if (State_Automato == 2758 && Evento == 16) {
    State_Automato =2751;
}
if (State_Automato == 2758 && Evento == 14) {
    State_Automato =1511;
}
if (State_Automato == 2759 && Evento == 0) {
    State_Automato =2760;
}
if (State_Automato == 2759 && Evento == 4) {
    State_Automato =2761;
}
if (State_Automato == 2759 && Evento == 12) {
    State_Automato =2762;
}
if (State_Automato == 2759 && Evento == 16) {
    State_Automato =2763;
}
if (State_Automato == 2759 && Evento == 14) {
    State_Automato =1549;
}
if (State_Automato == 2791 && Evento == 4) {
    State_Automato =2787;
}
if (State_Automato == 2791 && Evento == 16) {
    State_Automato =2775;
}
if (State_Automato == 2791 && Evento == 14) {
    State_Automato =1541;
}
if (State_Automato == 2792 && Evento == 0) {
    State_Automato =2793;
}
if (State_Automato == 2792 && Evento == 4) {
    State_Automato =2794;
}
if (State_Automato == 2792 && Evento == 16) {
    State_Automato =2779;
}
if (State_Automato == 2792 && Evento == 6) {
    State_Automato =2762;
}
if (State_Automato == 2792 && Evento == 14) {
    State_Automato =1548;
}
if (State_Automato == 2802 && Evento == 4) {
    State_Automato =2798;
}
if (State_Automato == 2802 && Evento == 12) {
    State_Automato =2793;
}
if (State_Automato == 2802 && Evento == 16) {
    State_Automato =2778;
}
if (State_Automato == 2802 && Evento == 6) {
    State_Automato =2760;
}
if (State_Automato == 2802 && Evento == 14) {
    State_Automato =1547;
}
if (State_Automato == 2812 && Evento == 0) {
    State_Automato =2813;
}
if (State_Automato == 2812 && Evento == 4) {
    State_Automato =2814;
}
if (State_Automato == 2812 && Evento == 16) {
    State_Automato =2808;
}
if (State_Automato == 2812 && Evento == 2) {
    State_Automato =2806;
}
if (State_Automato == 2812 && Evento == 14) {
    State_Automato =1667;
}
if (State_Automato == 2817 && Evento == 0) {
    State_Automato =2818;
}
if (State_Automato == 2817 && Evento == 4) {
    State_Automato =2819;
}
if (State_Automato == 2817 && Evento == 8) {
    State_Automato =2820;
}
if (State_Automato == 2817 && Evento == 12) {
    State_Automato =2821;
}
if (State_Automato == 2817 && Evento == 16) {
    State_Automato =2822;
}
if (State_Automato == 2817 && Evento == 2) {
    State_Automato =2823;
}
if (State_Automato == 2817 && Evento == 14) {
    State_Automato =1742;
}
if (State_Automato == 2835 && Evento == 0) {
    State_Automato =2836;
}
if (State_Automato == 2835 && Evento == 4) {
    State_Automato =2837;
}
if (State_Automato == 2835 && Evento == 8) {
    State_Automato =2838;
}
if (State_Automato == 2835 && Evento == 12) {
    State_Automato =2839;
}
if (State_Automato == 2835 && Evento == 16) {
    State_Automato =2840;
}
if (State_Automato == 2835 && Evento == 2) {
    State_Automato =2841;
}
if (State_Automato == 2835 && Evento == 14) {
    State_Automato =15;
}
if (State_Automato == 2858 && Evento == 16) {
    State_Automato =616;
}
if (State_Automato == 2860 && Evento == 4) {
    State_Automato =2861;
}
if (State_Automato == 2860 && Evento == 8) {
    State_Automato =2862;
}
if (State_Automato == 2860 && Evento == 16) {
    State_Automato =1312;
}
if (State_Automato == 2866 && Evento == 16) {
    State_Automato =1230;
}
if (State_Automato == 2873 && Evento == 0) {
    State_Automato =2874;
}
if (State_Automato == 2873 && Evento == 12) {
    State_Automato =2854;
}
if (State_Automato == 2873 && Evento == 16) {
    State_Automato =2845;
}
if (State_Automato == 2878 && Evento == 4) {
    State_Automato =2879;
}
if (State_Automato == 2878 && Evento == 12) {
    State_Automato =2862;
}
if (State_Automato == 2878 && Evento == 16) {
    State_Automato =1321;
}
if (State_Automato == 2882 && Evento == 16) {
    State_Automato =1279;
}
if (State_Automato == 2883 && Evento == 0) {
    State_Automato =2884;
}
if (State_Automato == 2883 && Evento == 4) {
    State_Automato =2885;
}
if (State_Automato == 2883 && Evento == 12) {
    State_Automato =2867;
}
if (State_Automato == 2892 && Evento == 0) {
    State_Automato =2893;
}
if (State_Automato == 2892 && Evento == 4) {
    State_Automato =2894;
}
if (State_Automato == 2892 && Evento == 16) {
    State_Automato =2851;
}
if (State_Automato == 2898 && Evento == 8) {
    State_Automato =2879;
}
if (State_Automato == 2898 && Evento == 12) {
    State_Automato =2861;
}
if (State_Automato == 2898 && Evento == 16) {
    State_Automato =1328;
}
if (State_Automato == 2913 && Evento == 8) {
    State_Automato =2914;
}
if (State_Automato == 2913 && Evento == 16) {
    State_Automato =2902;
}
if (State_Automato == 2913 && Evento == 14) {
    State_Automato =22;
}
if (State_Automato == 2930 && Evento == 8) {
    State_Automato =2922;
}
if (State_Automato == 2930 && Evento == 16) {
    State_Automato =2909;
}
if (State_Automato == 2930 && Evento == 14) {
    State_Automato =42;
}
if (State_Automato == 2931 && Evento == 4) {
    State_Automato =2932;
}
if (State_Automato == 2931 && Evento == 8) {
    State_Automato =2933;
}
if (State_Automato == 2931 && Evento == 12) {
    State_Automato =2934;
}
if (State_Automato == 2931 && Evento == 16) {
    State_Automato =2935;
}
if (State_Automato == 2931 && Evento == 14) {
    State_Automato =90;
}
if (State_Automato == 2939 && Evento == 4) {
    State_Automato =2940;
}
if (State_Automato == 2939 && Evento == 12) {
    State_Automato =2941;
}
if (State_Automato == 2939 && Evento == 14) {
    State_Automato =102;
}
if (State_Automato == 2945 && Evento == 14) {
    State_Automato =106;
}
if (State_Automato == 2946 && Evento == 4) {
    State_Automato =2947;
}
if (State_Automato == 2946 && Evento == 8) {
    State_Automato =2948;
}
if (State_Automato == 2946 && Evento == 14) {
    State_Automato =113;
}
if (State_Automato == 2954 && Evento == 4) {
    State_Automato =2955;
}
if (State_Automato == 2954 && Evento == 8) {
    State_Automato =2956;
}
if (State_Automato == 2954 && Evento == 14) {
    State_Automato =93;
}
if (State_Automato == 2961 && Evento == 4) {
    State_Automato =2962;
}
if (State_Automato == 2961 && Evento == 16) {
    State_Automato =2941;
}
if (State_Automato == 2961 && Evento == 14) {
    State_Automato =101;
}
if (State_Automato == 2970 && Evento == 12) {
    State_Automato =2962;
}
if (State_Automato == 2970 && Evento == 16) {
    State_Automato =2940;
}
if (State_Automato == 2970 && Evento == 14) {
    State_Automato =100;
}
if (State_Automato == 2971 && Evento == 8) {
    State_Automato =2965;
}
if (State_Automato == 2971 && Evento == 16) {
    State_Automato =2947;
}
if (State_Automato == 2971 && Evento == 14) {
    State_Automato =112;
}
if (State_Automato == 2982 && Evento == 0) {
    State_Automato =2983;
}
if (State_Automato == 2982 && Evento == 4) {
    State_Automato =2984;
}
if (State_Automato == 2982 && Evento == 14) {
    State_Automato =210;
}
if (State_Automato == 2988 && Evento == 0) {
    State_Automato =2989;
}
if (State_Automato == 2988 && Evento == 4) {
    State_Automato =2990;
}
if (State_Automato == 2988 && Evento == 8) {
    State_Automato =2991;
}
if (State_Automato == 2988 && Evento == 16) {
    State_Automato =2992;
}
if (State_Automato == 2988 && Evento == 14) {
    State_Automato =245;
}
if (State_Automato == 3002 && Evento == 2) {
    State_Automato =616;
}
if (State_Automato == 3003 && Evento == 4) {
    State_Automato =3004;
}
if (State_Automato == 3003 && Evento == 8) {
    State_Automato =3005;
}
if (State_Automato == 3003 && Evento == 2) {
    State_Automato =1312;
}
if (State_Automato == 3009 && Evento == 2) {
    State_Automato =1230;
}
if (State_Automato == 3015 && Evento == 4) {
    State_Automato =3016;
}
if (State_Automato == 3015 && Evento == 12) {
    State_Automato =3005;
}
if (State_Automato == 3015 && Evento == 2) {
    State_Automato =1321;
}
if (State_Automato == 3019 && Evento == 2) {
    State_Automato =1279;
}
if (State_Automato == 3024 && Evento == 8) {
    State_Automato =3016;
}
if (State_Automato == 3024 && Evento == 12) {
    State_Automato =3004;
}
if (State_Automato == 3024 && Evento == 2) {
    State_Automato =1328;
}
if (State_Automato == 3025 && Evento == 0) {
    State_Automato =3026;
}
if (State_Automato == 3025 && Evento == 12) {
    State_Automato =3010;
}
if (State_Automato == 3025 && Evento == 2) {
    State_Automato =2847;
}
if (State_Automato == 3037 && Evento == 12) {
    State_Automato =3031;
}
if (State_Automato == 3037 && Evento == 2) {
    State_Automato =2901;
}
if (State_Automato == 3037 && Evento == 14) {
    State_Automato =46;
}
if (State_Automato == 3038 && Evento == 4) {
    State_Automato =3039;
}
if (State_Automato == 3038 && Evento == 8) {
    State_Automato =3040;
}
if (State_Automato == 3038 && Evento == 12) {
    State_Automato =3041;
}
if (State_Automato == 3038 && Evento == 2) {
    State_Automato =2935;
}
if (State_Automato == 3038 && Evento == 14) {
    State_Automato =89;
}
if (State_Automato == 3050 && Evento == 4) {
    State_Automato =3051;
}
if (State_Automato == 3050 && Evento == 2) {
    State_Automato =2948;
}
if (State_Automato == 3050 && Evento == 14) {
    State_Automato =124;
}
if (State_Automato == 3054 && Evento == 14) {
    State_Automato =128;
}
if (State_Automato == 3055 && Evento == 4) {
    State_Automato =3056;
}
if (State_Automato == 3055 && Evento == 12) {
    State_Automato =3045;
}
if (State_Automato == 3055 && Evento == 14) {
    State_Automato =133;
}
if (State_Automato == 3061 && Evento == 12) {
    State_Automato =3043;
}
if (State_Automato == 3061 && Evento == 2) {
    State_Automato =2940;
}
if (State_Automato == 3061 && Evento == 14) {
    State_Automato =118;
}
if (State_Automato == 3062 && Evento == 8) {
    State_Automato =3051;
}
if (State_Automato == 3062 && Evento == 2) {
    State_Automato =2947;
}
if (State_Automato == 3062 && Evento == 14) {
    State_Automato =123;
}
if (State_Automato == 3070 && Evento == 0) {
    State_Automato =3071;
}
if (State_Automato == 3070 && Evento == 2) {
    State_Automato =2984;
}
if (State_Automato == 3070 && Evento == 14) {
    State_Automato =217;
}
if (State_Automato == 3074 && Evento == 14) {
    State_Automato =221;
}
if (State_Automato == 3075 && Evento == 0) {
    State_Automato =3076;
}
if (State_Automato == 3075 && Evento == 12) {
    State_Automato =3065;
}
if (State_Automato == 3075 && Evento == 14) {
    State_Automato =226;
}
if (State_Automato == 3080 && Evento == 4) {
    State_Automato =3071;
}
if (State_Automato == 3080 && Evento == 2) {
    State_Automato =2983;
}
if (State_Automato == 3080 && Evento == 14) {
    State_Automato =216;
}
if (State_Automato == 3081 && Evento == 0) {
    State_Automato =3082;
}
if (State_Automato == 3081 && Evento == 4) {
    State_Automato =3083;
}
if (State_Automato == 3081 && Evento == 8) {
    State_Automato =3084;
}
if (State_Automato == 3081 && Evento == 2) {
    State_Automato =2992;
}
if (State_Automato == 3081 && Evento == 14) {
    State_Automato =244;
}
if (State_Automato == 3090 && Evento == 0) {
    State_Automato =3091;
}
if (State_Automato == 3090 && Evento == 8) {
    State_Automato =3086;
}
if (State_Automato == 3090 && Evento == 14) {
    State_Automato =251;
}
if (State_Automato == 3100 && Evento == 16) {
    State_Automato =3031;
}
if (State_Automato == 3100 && Evento == 2) {
    State_Automato =2914;
}
if (State_Automato == 3100 && Evento == 14) {
    State_Automato =57;
}
if (State_Automato == 3102 && Evento == 4) {
    State_Automato =3103;
}
if (State_Automato == 3102 && Evento == 8) {
    State_Automato =3104;
}
if (State_Automato == 3102 && Evento == 16) {
    State_Automato =3041;
}
if (State_Automato == 3102 && Evento == 2) {
    State_Automato =2934;
}
if (State_Automato == 3102 && Evento == 14) {
    State_Automato =88;
}
if (State_Automato == 3108 && Evento == 16) {
    State_Automato =3043;
}
if (State_Automato == 3108 && Evento == 2) {
    State_Automato =2962;
}
if (State_Automato == 3108 && Evento == 14) {
    State_Automato =144;
}
if (State_Automato == 3121 && Evento == 0) {
    State_Automato =3122;
}
if (State_Automato == 3121 && Evento == 16) {
    State_Automato =3020;
}
if (State_Automato == 3121 && Evento == 2) {
    State_Automato =2894;
}
if (State_Automato == 3124 && Evento == 0) {
    State_Automato =3125;
}
if (State_Automato == 3124 && Evento == 12) {
    State_Automato =3096;
}
if (State_Automato == 3124 && Evento == 16) {
    State_Automato =3030;
}
if (State_Automato == 3124 && Evento == 2) {
    State_Automato =2900;
}
if (State_Automato == 3124 && Evento == 14) {
    State_Automato =19;
}
if (State_Automato == 3129 && Evento == 4) {
    State_Automato =3130;
}
if (State_Automato == 3129 && Evento == 12) {
    State_Automato =3104;
}
if (State_Automato == 3129 && Evento == 16) {
    State_Automato =3040;
}
if (State_Automato == 3129 && Evento == 2) {
    State_Automato =2933;
}
if (State_Automato == 3129 && Evento == 14) {
    State_Automato =87;
}
if (State_Automato == 3133 && Evento == 16) {
    State_Automato =3051;
}
if (State_Automato == 3133 && Evento == 2) {
    State_Automato =2965;
}
if (State_Automato == 3133 && Evento == 14) {
    State_Automato =150;
}
if (State_Automato == 3134 && Evento == 0) {
    State_Automato =3135;
}
if (State_Automato == 3134 && Evento == 4) {
    State_Automato =3136;
}
if (State_Automato == 3134 && Evento == 12) {
    State_Automato =3109;
}
if (State_Automato == 3134 && Evento == 2) {
    State_Automato =2972;
}
if (State_Automato == 3134 && Evento == 14) {
    State_Automato =162;
}
if (State_Automato == 3139 && Evento == 0) {
    State_Automato =3140;
}
if (State_Automato == 3139 && Evento == 2) {
    State_Automato =2975;
}
if (State_Automato == 3139 && Evento == 14) {
    State_Automato =182;
}
if (State_Automato == 3143 && Evento == 14) {
    State_Automato =186;
}
if (State_Automato == 3146 && Evento == 4) {
    State_Automato =3140;
}
if (State_Automato == 3146 && Evento == 2) {
    State_Automato =2974;
}
if (State_Automato == 3146 && Evento == 14) {
    State_Automato =181;
}
if (State_Automato == 3147 && Evento == 0) {
    State_Automato =3148;
}
if (State_Automato == 3147 && Evento == 4) {
    State_Automato =3149;
}
if (State_Automato == 3147 && Evento == 16) {
    State_Automato =3084;
}
if (State_Automato == 3147 && Evento == 2) {
    State_Automato =2991;
}
if (State_Automato == 3147 && Evento == 14) {
    State_Automato =243;
}
if (State_Automato == 3152 && Evento == 0) {
    State_Automato =3153;
}
if (State_Automato == 3152 && Evento == 16) {
    State_Automato =3086;
}
if (State_Automato == 3152 && Evento == 14) {
    State_Automato =260;
}
if (State_Automato == 3159 && Evento == 8) {
    State_Automato =3130;
}
if (State_Automato == 3159 && Evento == 12) {
    State_Automato =3103;
}
if (State_Automato == 3159 && Evento == 16) {
    State_Automato =3039;
}
if (State_Automato == 3159 && Evento == 2) {
    State_Automato =2932;
}
if (State_Automato == 3159 && Evento == 14) {
    State_Automato =86;
}
if (State_Automato == 3160 && Evento == 0) {
    State_Automato =3161;
}
if (State_Automato == 3160 && Evento == 8) {
    State_Automato =3149;
}
if (State_Automato == 3160 && Evento == 16) {
    State_Automato =3083;
}
if (State_Automato == 3160 && Evento == 2) {
    State_Automato =2990;
}
if (State_Automato == 3160 && Evento == 14) {
    State_Automato =242;
}
if (State_Automato == 3164 && Evento == 8) {
    State_Automato =3153;
}
if (State_Automato == 3164 && Evento == 16) {
    State_Automato =3091;
}
if (State_Automato == 3164 && Evento == 14) {
    State_Automato =266;
}
if (State_Automato == 3167 && Evento == 4) {
    State_Automato =3161;
}
if (State_Automato == 3167 && Evento == 8) {
    State_Automato =3148;
}
if (State_Automato == 3167 && Evento == 16) {
    State_Automato =3082;
}
if (State_Automato == 3167 && Evento == 2) {
    State_Automato =2989;
}
if (State_Automato == 3167 && Evento == 14) {
    State_Automato =241;
}
if (State_Automato == 3172 && Evento == 0) {
    State_Automato =3173;
}
if (State_Automato == 3172 && Evento == 8) {
    State_Automato =3174;
}
if (State_Automato == 3172 && Evento == 12) {
    State_Automato =3175;
}
if (State_Automato == 3172 && Evento == 16) {
    State_Automato =3176;
}
if (State_Automato == 3172 && Evento == 10) {
    State_Automato =1766;
}
if (State_Automato == 3180 && Evento == 8) {
    State_Automato =3181;
}
if (State_Automato == 3180 && Evento == 12) {
    State_Automato =3182;
}
if (State_Automato == 3180 && Evento == 10) {
    State_Automato =1770;
}
if (State_Automato == 3185 && Evento == 10) {
    State_Automato =1774;
}
if (State_Automato == 3187 && Evento == 0) {
    State_Automato =3188;
}
if (State_Automato == 3187 && Evento == 12) {
    State_Automato =3189;
}
if (State_Automato == 3187 && Evento == 10) {
    State_Automato =1786;
}
if (State_Automato == 3198 && Evento == 8) {
    State_Automato =3199;
}
if (State_Automato == 3198 && Evento == 16) {
    State_Automato =3182;
}
if (State_Automato == 3198 && Evento == 10) {
    State_Automato =1769;
}
if (State_Automato == 3212 && Evento == 8) {
    State_Automato =3208;
}
if (State_Automato == 3212 && Evento == 16) {
    State_Automato =3194;
}
if (State_Automato == 3212 && Evento == 10) {
    State_Automato =1794;
}
if (State_Automato == 3213 && Evento == 4) {
    State_Automato =3214;
}
if (State_Automato == 3213 && Evento == 8) {
    State_Automato =3215;
}
if (State_Automato == 3213 && Evento == 12) {
    State_Automato =3216;
}
if (State_Automato == 3213 && Evento == 16) {
    State_Automato =3217;
}
if (State_Automato == 3213 && Evento == 10) {
    State_Automato =1816;
}
if (State_Automato == 3220 && Evento == 4) {
    State_Automato =3221;
}
if (State_Automato == 3220 && Evento == 12) {
    State_Automato =3222;
}
if (State_Automato == 3220 && Evento == 10) {
    State_Automato =1830;
}
if (State_Automato == 3235 && Evento == 4) {
    State_Automato =3236;
}
if (State_Automato == 3235 && Evento == 16) {
    State_Automato =3222;
}
if (State_Automato == 3235 && Evento == 10) {
    State_Automato =1829;
}
if (State_Automato == 3249 && Evento == 8) {
    State_Automato =3239;
}
if (State_Automato == 3249 && Evento == 12) {
    State_Automato =3231;
}
if (State_Automato == 3249 && Evento == 10) {
    State_Automato =1819;
}
if (State_Automato == 3250 && Evento == 12) {
    State_Automato =3236;
}
if (State_Automato == 3250 && Evento == 16) {
    State_Automato =3221;
}
if (State_Automato == 3250 && Evento == 10) {
    State_Automato =1828;
}
if (State_Automato == 3251 && Evento == 8) {
    State_Automato =3243;
}
if (State_Automato == 3251 && Evento == 16) {
    State_Automato =3225;
}
if (State_Automato == 3251 && Evento == 10) {
    State_Automato =1834;
}
if (State_Automato == 3272 && Evento == 8) {
    State_Automato =3273;
}
if (State_Automato == 3272 && Evento == 2) {
    State_Automato =3182;
}
if (State_Automato == 3272 && Evento == 10) {
    State_Automato =1797;
}
if (State_Automato == 3279 && Evento == 4) {
    State_Automato =3280;
}
if (State_Automato == 3279 && Evento == 2) {
    State_Automato =3222;
}
if (State_Automato == 3279 && Evento == 10) {
    State_Automato =1836;
}
if (State_Automato == 3284 && Evento == 4) {
    State_Automato =3285;
}
if (State_Automato == 3284 && Evento == 8) {
    State_Automato =3286;
}
if (State_Automato == 3284 && Evento == 10) {
    State_Automato =1840;
}
if (State_Automato == 3289 && Evento == 0) {
    State_Automato =3290;
}
if (State_Automato == 3289 && Evento == 4) {
    State_Automato =3291;
}
if (State_Automato == 3289 && Evento == 12) {
    State_Automato =3292;
}
if (State_Automato == 3289 && Evento == 2) {
    State_Automato =3261;
}
if (State_Automato == 3289 && Evento == 10) {
    State_Automato =1890;
}
if (State_Automato == 3306 && Evento == 4) {
    State_Automato =3298;
}
if (State_Automato == 3306 && Evento == 2) {
    State_Automato =3263;
}
if (State_Automato == 3306 && Evento == 10) {
    State_Automato =1903;
}
if (State_Automato == 3313 && Evento == 16) {
    State_Automato =3280;
}
if (State_Automato == 3313 && Evento == 2) {
    State_Automato =3236;
}
if (State_Automato == 3313 && Evento == 10) {
    State_Automato =1846;
}
if (State_Automato == 3331 && Evento == 0) {
    State_Automato =3332;
}
if (State_Automato == 3331 && Evento == 12) {
    State_Automato =3314;
}
if (State_Automato == 3331 && Evento == 16) {
    State_Automato =3291;
}
if (State_Automato == 3331 && Evento == 2) {
    State_Automato =3260;
}
if (State_Automato == 3331 && Evento == 10) {
    State_Automato =1888;
}
if (State_Automato == 3339 && Evento == 8) {
    State_Automato =3325;
}
if (State_Automato == 3339 && Evento == 16) {
    State_Automato =3309;
}
if (State_Automato == 3339 && Evento == 10) {
    State_Automato =1924;
}
if (State_Automato == 3341 && Evento == 4) {
    State_Automato =3336;
}
if (State_Automato == 3341 && Evento == 8) {
    State_Automato =3324;
}
if (State_Automato == 3341 && Evento == 16) {
    State_Automato =3308;
}
if (State_Automato == 3341 && Evento == 2) {
    State_Automato =3266;
}
if (State_Automato == 3341 && Evento == 10) {
    State_Automato =1923;
}
if (State_Automato == 3351 && Evento == 12) {
    State_Automato =3352;
}
if (State_Automato == 3351 && Evento == 10) {
    State_Automato =2208;
}
if (State_Automato == 3351 && Evento == 14) {
    State_Automato =746;
}
if (State_Automato == 3357 && Evento == 8) {
    State_Automato =3358;
}
if (State_Automato == 3357 && Evento == 10) {
    State_Automato =2202;
}
if (State_Automato == 3357 && Evento == 14) {
    State_Automato =740;
}
if (State_Automato == 3360 && Evento == 16) {
    State_Automato =3352;
}
if (State_Automato == 3360 && Evento == 10) {
    State_Automato =2207;
}
if (State_Automato == 3360 && Evento == 14) {
    State_Automato =745;
}
if (State_Automato == 3361 && Evento == 0) {
    State_Automato =3362;
}
if (State_Automato == 3361 && Evento == 8) {
    State_Automato =3363;
}
if (State_Automato == 3361 && Evento == 12) {
    State_Automato =3364;
}
if (State_Automato == 3361 && Evento == 10) {
    State_Automato =2229;
}
if (State_Automato == 3361 && Evento == 14) {
    State_Automato =778;
}
if (State_Automato == 3371 && Evento == 8) {
    State_Automato =3367;
}
if (State_Automato == 3371 && Evento == 10) {
    State_Automato =2239;
}
if (State_Automato == 3371 && Evento == 14) {
    State_Automato =788;
}
if (State_Automato == 3372 && Evento == 0) {
    State_Automato =3373;
}
if (State_Automato == 3372 && Evento == 12) {
    State_Automato =3374;
}
if (State_Automato == 3372 && Evento == 16) {
    State_Automato =3375;
}
if (State_Automato == 3372 && Evento == 10) {
    State_Automato =2245;
}
if (State_Automato == 3372 && Evento == 14) {
    State_Automato =801;
}
if (State_Automato == 3384 && Evento == 8) {
    State_Automato =3385;
}
if (State_Automato == 3384 && Evento == 12) {
    State_Automato =3386;
}
if (State_Automato == 3384 && Evento == 2) {
    State_Automato =3348;
}
if (State_Automato == 3384 && Evento == 10) {
    State_Automato =2200;
}
if (State_Automato == 3384 && Evento == 14) {
    State_Automato =736;
}
if (State_Automato == 3396 && Evento == 8) {
    State_Automato =3397;
}
if (State_Automato == 3396 && Evento == 16) {
    State_Automato =3386;
}
if (State_Automato == 3396 && Evento == 2) {
    State_Automato =3347;
}
if (State_Automato == 3396 && Evento == 10) {
    State_Automato =2199;
}
if (State_Automato == 3396 && Evento == 14) {
    State_Automato =735;
}
if (State_Automato == 3406 && Evento == 4) {
    State_Automato =3407;
}
if (State_Automato == 3406 && Evento == 8) {
    State_Automato =3408;
}
if (State_Automato == 3406 && Evento == 12) {
    State_Automato =3409;
}
if (State_Automato == 3406 && Evento == 16) {
    State_Automato =3410;
}
if (State_Automato == 3406 && Evento == 2) {
    State_Automato =3411;
}
if (State_Automato == 3406 && Evento == 10) {
    State_Automato =2461;
}
if (State_Automato == 3406 && Evento == 14) {
    State_Automato =897;
}
if (State_Automato == 3421 && Evento == 8) {
    State_Automato =3416;
}
if (State_Automato == 3421 && Evento == 10) {
    State_Automato =2466;
}
if (State_Automato == 3421 && Evento == 14) {
    State_Automato =1036;
}
if (State_Automato == 3422 && Evento == 4) {
    State_Automato =3423;
}
if (State_Automato == 3422 && Evento == 12) {
    State_Automato =3424;
}
if (State_Automato == 3422 && Evento == 16) {
    State_Automato =3425;
}
if (State_Automato == 3422 && Evento == 10) {
    State_Automato =2480;
}
if (State_Automato == 3422 && Evento == 14) {
    State_Automato =1056;
}
if (State_Automato == 3428 && Evento == 4) {
    State_Automato =3429;
}
if (State_Automato == 3428 && Evento == 10) {
    State_Automato =2485;
}
if (State_Automato == 3428 && Evento == 14) {
    State_Automato =1061;
}
if (State_Automato == 3434 && Evento == 16) {
    State_Automato =3429;
}
if (State_Automato == 3434 && Evento == 10) {
    State_Automato =2484;
}
if (State_Automato == 3434 && Evento == 14) {
    State_Automato =1060;
}
if (State_Automato == 3441 && Evento == 4) {
    State_Automato =3442;
}
if (State_Automato == 3441 && Evento == 12) {
    State_Automato =3443;
}
if (State_Automato == 3441 && Evento == 2) {
    State_Automato =3425;
}
if (State_Automato == 3441 && Evento == 10) {
    State_Automato =2479;
}
if (State_Automato == 3441 && Evento == 14) {
    State_Automato =1055;
}
if (State_Automato == 3457 && Evento == 4) {
    State_Automato =3458;
}
if (State_Automato == 3457 && Evento == 16) {
    State_Automato =3443;
}
if (State_Automato == 3457 && Evento == 2) {
    State_Automato =3424;
}
if (State_Automato == 3457 && Evento == 10) {
    State_Automato =2478;
}
if (State_Automato == 3457 && Evento == 14) {
    State_Automato =1054;
}
if (State_Automato == 3461 && Evento == 16) {
    State_Automato =3445;
}
if (State_Automato == 3461 && Evento == 10) {
    State_Automato =2494;
}
if (State_Automato == 3461 && Evento == 14) {
    State_Automato =1070;
}
if (State_Automato == 3462 && Evento == 4) {
    State_Automato =3463;
}
if (State_Automato == 3462 && Evento == 8) {
    State_Automato =3464;
}
if (State_Automato == 3462 && Evento == 16) {
    State_Automato =3450;
}
if (State_Automato == 3462 && Evento == 10) {
    State_Automato =2499;
}
if (State_Automato == 3462 && Evento == 14) {
    State_Automato =1088;
}
if (State_Automato == 3472 && Evento == 12) {
    State_Automato =3458;
}
if (State_Automato == 3472 && Evento == 16) {
    State_Automato =3442;
}
if (State_Automato == 3472 && Evento == 2) {
    State_Automato =3423;
}
if (State_Automato == 3472 && Evento == 10) {
    State_Automato =2477;
}
if (State_Automato == 3472 && Evento == 14) {
    State_Automato =1053;
}
if (State_Automato == 3475 && Evento == 0) {
    State_Automato =3476;
}
if (State_Automato == 3475 && Evento == 4) {
    State_Automato =3477;
}
if (State_Automato == 3475 && Evento == 8) {
    State_Automato =3478;
}
if (State_Automato == 3475 && Evento == 10) {
    State_Automato =2607;
}
if (State_Automato == 3475 && Evento == 14) {
    State_Automato =1378;
}
if (State_Automato == 3490 && Evento == 0) {
    State_Automato =3491;
}
if (State_Automato == 3490 && Evento == 8) {
    State_Automato =3484;
}
if (State_Automato == 3490 && Evento == 2) {
    State_Automato =3477;
}
if (State_Automato == 3490 && Evento == 10) {
    State_Automato =2606;
}
if (State_Automato == 3490 && Evento == 14) {
    State_Automato =1377;
}
if (State_Automato == 3494 && Evento == 8) {
    State_Automato =3486;
}
if (State_Automato == 3494 && Evento == 10) {
    State_Automato =2610;
}
if (State_Automato == 3494 && Evento == 14) {
    State_Automato =1387;
}
if (State_Automato == 3496 && Evento == 4) {
    State_Automato =3491;
}
if (State_Automato == 3496 && Evento == 8) {
    State_Automato =3483;
}
if (State_Automato == 3496 && Evento == 2) {
    State_Automato =3476;
}
if (State_Automato == 3496 && Evento == 10) {
    State_Automato =2605;
}
if (State_Automato == 3496 && Evento == 14) {
    State_Automato =1376;
}
if (State_Automato == 3497 && Evento == 0) {
    State_Automato =3498;
}
if (State_Automato == 3497 && Evento == 4) {
    State_Automato =3499;
}
if (State_Automato == 3497 && Evento == 12) {
    State_Automato =3500;
}
if (State_Automato == 3497 && Evento == 16) {
    State_Automato =3501;
}
if (State_Automato == 3497 && Evento == 2) {
    State_Automato =3502;
}
if (State_Automato == 3497 && Evento == 10) {
    State_Automato =2740;
}
if (State_Automato == 3497 && Evento == 14) {
    State_Automato =1498;
}
if (State_Automato == 3505 && Evento == 0) {
    State_Automato =3506;
}
if (State_Automato == 3505 && Evento == 4) {
    State_Automato =3507;
}
if (State_Automato == 3505 && Evento == 16) {
    State_Automato =3508;
}
if (State_Automato == 3505 && Evento == 10) {
    State_Automato =2748;
}
if (State_Automato == 3505 && Evento == 14) {
    State_Automato =1559;
}
if (State_Automato == 3515 && Evento == 0) {
    State_Automato =3516;
}
if (State_Automato == 3515 && Evento == 4) {
    State_Automato =3517;
}
if (State_Automato == 3515 && Evento == 2) {
    State_Automato =3508;
}
if (State_Automato == 3515 && Evento == 10) {
    State_Automato =2747;
}
if (State_Automato == 3515 && Evento == 14) {
    State_Automato =1558;
}
if (State_Automato == 3523 && Evento == 4) {
    State_Automato =3519;
}
if (State_Automato == 3523 && Evento == 10) {
    State_Automato =2751;
}
if (State_Automato == 3523 && Evento == 14) {
    State_Automato =1564;
}
if (State_Automato == 3524 && Evento == 0) {
    State_Automato =3525;
}
if (State_Automato == 3524 && Evento == 4) {
    State_Automato =3526;
}
if (State_Automato == 3524 && Evento == 12) {
    State_Automato =3527;
}
if (State_Automato == 3524 && Evento == 10) {
    State_Automato =2763;
}
if (State_Automato == 3524 && Evento == 14) {
    State_Automato =1577;
}
if (State_Automato == 3537 && Evento == 0) {
    State_Automato =3538;
}
if (State_Automato == 3537 && Evento == 16) {
    State_Automato =3517;
}
if (State_Automato == 3537 && Evento == 2) {
    State_Automato =3507;
}
if (State_Automato == 3537 && Evento == 10) {
    State_Automato =2746;
}
if (State_Automato == 3537 && Evento == 14) {
    State_Automato =1557;
}
if (State_Automato == 3541 && Evento == 16) {
    State_Automato =3519;
}
if (State_Automato == 3541 && Evento == 10) {
    State_Automato =2754;
}
if (State_Automato == 3541 && Evento == 14) {
    State_Automato =1571;
}
if (State_Automato == 3542 && Evento == 0) {
    State_Automato =3543;
}
if (State_Automato == 3542 && Evento == 12) {
    State_Automato =3532;
}
if (State_Automato == 3542 && Evento == 16) {
    State_Automato =3526;
}
if (State_Automato == 3542 && Evento == 10) {
    State_Automato =2761;
}
if (State_Automato == 3542 && Evento == 14) {
    State_Automato =1576;
}
if (State_Automato == 3547 && Evento == 4) {
    State_Automato =3538;
}
if (State_Automato == 3547 && Evento == 16) {
    State_Automato =3516;
}
if (State_Automato == 3547 && Evento == 2) {
    State_Automato =3506;
}
if (State_Automato == 3547 && Evento == 10) {
    State_Automato =2745;
}
if (State_Automato == 3547 && Evento == 14) {
    State_Automato =1556;
}
if (State_Automato == 3548 && Evento == 0) {
    State_Automato =3549;
}
if (State_Automato == 3548 && Evento == 4) {
    State_Automato =3550;
}
if (State_Automato == 3548 && Evento == 8) {
    State_Automato =3551;
}
if (State_Automato == 3548 && Evento == 16) {
    State_Automato =3552;
}
if (State_Automato == 3548 && Evento == 2) {
    State_Automato =3553;
}
if (State_Automato == 3548 && Evento == 10) {
    State_Automato =2804;
}
if (State_Automato == 3548 && Evento == 14) {
    State_Automato =1663;
}
if (State_Automato == 3570 && Evento == 6) {
    State_Automato =616;
}
if (State_Automato == 3571 && Evento == 4) {
    State_Automato =3572;
}
if (State_Automato == 3571 && Evento == 8) {
    State_Automato =3573;
}
if (State_Automato == 3571 && Evento == 6) {
    State_Automato =1312;
}
if (State_Automato == 3577 && Evento == 6) {
    State_Automato =1230;
}
if (State_Automato == 3578 && Evento == 0) {
    State_Automato =3579;
}
if (State_Automato == 3578 && Evento == 4) {
    State_Automato =3580;
}
if (State_Automato == 3578 && Evento == 6) {
    State_Automato =2848;
}
if (State_Automato == 3588 && Evento == 4) {
    State_Automato =3589;
}
if (State_Automato == 3588 && Evento == 12) {
    State_Automato =3573;
}
if (State_Automato == 3588 && Evento == 6) {
    State_Automato =1321;
}
if (State_Automato == 3592 && Evento == 6) {
    State_Automato =1279;
}
if (State_Automato == 3594 && Evento == 8) {
    State_Automato =3589;
}
if (State_Automato == 3594 && Evento == 12) {
    State_Automato =3572;
}
if (State_Automato == 3594 && Evento == 6) {
    State_Automato =1328;
}
if (State_Automato == 3604 && Evento == 12) {
    State_Automato =3596;
}
if (State_Automato == 3604 && Evento == 6) {
    State_Automato =2905;
}
if (State_Automato == 3604 && Evento == 14) {
    State_Automato =273;
}
if (State_Automato == 3620 && Evento == 12) {
    State_Automato =3605;
}
if (State_Automato == 3620 && Evento == 6) {
    State_Automato =2940;
}
if (State_Automato == 3620 && Evento == 14) {
    State_Automato =296;
}
if (State_Automato == 3621 && Evento == 8) {
    State_Automato =3611;
}
if (State_Automato == 3621 && Evento == 6) {
    State_Automato =2947;
}
if (State_Automato == 3621 && Evento == 14) {
    State_Automato =302;
}
if (State_Automato == 3622 && Evento == 8) {
    State_Automato =3615;
}
if (State_Automato == 3622 && Evento == 12) {
    State_Automato =3609;
}
if (State_Automato == 3622 && Evento == 14) {
    State_Automato =306;
}
if (State_Automato == 3623 && Evento == 0) {
    State_Automato =3624;
}
if (State_Automato == 3623 && Evento == 4) {
    State_Automato =3625;
}
if (State_Automato == 3623 && Evento == 12) {
    State_Automato =3626;
}
if (State_Automato == 3623 && Evento == 6) {
    State_Automato =2979;
}
if (State_Automato == 3623 && Evento == 14) {
    State_Automato =334;
}
if (State_Automato == 3638 && Evento == 0) {
    State_Automato =3639;
}
if (State_Automato == 3638 && Evento == 16) {
    State_Automato =3567;
}
if (State_Automato == 3638 && Evento == 6) {
    State_Automato =2854;
}
if (State_Automato == 3654 && Evento == 8) {
    State_Automato =3646;
}
if (State_Automato == 3654 && Evento == 16) {
    State_Automato =3600;
}
if (State_Automato == 3654 && Evento == 14) {
    State_Automato =287;
}
if (State_Automato == 3656 && Evento == 16) {
    State_Automato =3605;
}
if (State_Automato == 3656 && Evento == 6) {
    State_Automato =2962;
}
if (State_Automato == 3656 && Evento == 14) {
    State_Automato =310;
}
if (State_Automato == 3657 && Evento == 0) {
    State_Automato =3658;
}
if (State_Automato == 3657 && Evento == 4) {
    State_Automato =3659;
}
if (State_Automato == 3657 && Evento == 16) {
    State_Automato =3626;
}
if (State_Automato == 3657 && Evento == 6) {
    State_Automato =2978;
}
if (State_Automato == 3657 && Evento == 14) {
    State_Automato =333;
}
if (State_Automato == 3671 && Evento == 8) {
    State_Automato =3666;
}
if (State_Automato == 3671 && Evento == 12) {
    State_Automato =3643;
}
if (State_Automato == 3671 && Evento == 16) {
    State_Automato =3595;
}
if (State_Automato == 3671 && Evento == 6) {
    State_Automato =2899;
}
if (State_Automato == 3671 && Evento == 14) {
    State_Automato =272;
}
if (State_Automato == 3672 && Evento == 0) {
    State_Automato =3673;
}
if (State_Automato == 3672 && Evento == 4) {
    State_Automato =3674;
}
if (State_Automato == 3672 && Evento == 8) {
    State_Automato =3675;
}
if (State_Automato == 3672 && Evento == 12) {
    State_Automato =3676;
}
if (State_Automato == 3672 && Evento == 16) {
    State_Automato =3677;
}
if (State_Automato == 3672 && Evento == 6) {
    State_Automato =3168;
}
if (State_Automato == 3672 && Evento == 10) {
    State_Automato =1764;
}
if (State_Automato == 3681 && Evento == 0) {
    State_Automato =3682;
}
if (State_Automato == 3681 && Evento == 8) {
    State_Automato =3683;
}
if (State_Automato == 3681 && Evento == 12) {
    State_Automato =3684;
}
if (State_Automato == 3681 && Evento == 6) {
    State_Automato =3176;
}
if (State_Automato == 3681 && Evento == 10) {
    State_Automato =1934;
}
if (State_Automato == 3689 && Evento == 8) {
    State_Automato =3690;
}
if (State_Automato == 3689 && Evento == 6) {
    State_Automato =3182;
}
if (State_Automato == 3689 && Evento == 10) {
    State_Automato =1941;
}
if (State_Automato == 3693 && Evento == 10) {
    State_Automato =128;
}
if (State_Automato == 3694 && Evento == 0) {
    State_Automato =3695;
}
if (State_Automato == 3694 && Evento == 6) {
    State_Automato =3189;
}
if (State_Automato == 3694 && Evento == 10) {
    State_Automato =1950;
}
if (State_Automato == 3698 && Evento == 10) {
    State_Automato =221;
}
if (State_Automato == 3699 && Evento == 0) {
    State_Automato =3700;
}
if (State_Automato == 3699 && Evento == 8) {
    State_Automato =3701;
}
if (State_Automato == 3699 && Evento == 10) {
    State_Automato =251;
}
if (State_Automato == 3706 && Evento == 12) {
    State_Automato =3690;
}
if (State_Automato == 3706 && Evento == 6) {
    State_Automato =3181;
}
if (State_Automato == 3706 && Evento == 10) {
    State_Automato =1940;
}
if (State_Automato == 3709 && Evento == 12) {
    State_Automato =3695;
}
if (State_Automato == 3709 && Evento == 6) {
    State_Automato =3188;
}
if (State_Automato == 3709 && Evento == 10) {
    State_Automato =1949;
}
if (State_Automato == 3710 && Evento == 4) {
    State_Automato =3711;
}
if (State_Automato == 3710 && Evento == 8) {
    State_Automato =3712;
}
if (State_Automato == 3710 && Evento == 12) {
    State_Automato =3713;
}
if (State_Automato == 3710 && Evento == 6) {
    State_Automato =3217;
}
if (State_Automato == 3710 && Evento == 10) {
    State_Automato =2003;
}
if (State_Automato == 3716 && Evento == 4) {
    State_Automato =3717;
}
if (State_Automato == 3716 && Evento == 6) {
    State_Automato =3222;
}
if (State_Automato == 3716 && Evento == 10) {
    State_Automato =2005;
}
if (State_Automato == 3724 && Evento == 4) {
    State_Automato =3725;
}
if (State_Automato == 3724 && Evento == 6) {
    State_Automato =3226;
}
if (State_Automato == 3724 && Evento == 10) {
    State_Automato =2007;
}
if (State_Automato == 3729 && Evento == 4) {
    State_Automato =3730;
}
if (State_Automato == 3729 && Evento == 12) {
    State_Automato =3719;
}
if (State_Automato == 3729 && Evento == 10) {
    State_Automato =2011;
}
if (State_Automato == 3737 && Evento == 0) {
    State_Automato =3738;
}
if (State_Automato == 3737 && Evento == 4) {
    State_Automato =3739;
}
if (State_Automato == 3737 && Evento == 10) {
    State_Automato =2066;
}
if (State_Automato == 3748 && Evento == 0) {
    State_Automato =3749;
}
if (State_Automato == 3748 && Evento == 8) {
    State_Automato =3750;
}
if (State_Automato == 3748 && Evento == 16) {
    State_Automato =3684;
}
if (State_Automato == 3748 && Evento == 6) {
    State_Automato =3175;
}
if (State_Automato == 3748 && Evento == 10) {
    State_Automato =1933;
}
if (State_Automato == 3755 && Evento == 16) {
    State_Automato =3690;
}
if (State_Automato == 3755 && Evento == 6) {
    State_Automato =3199;
}
if (State_Automato == 3755 && Evento == 10) {
    State_Automato =1968;
}
if (State_Automato == 3756 && Evento == 0) {
    State_Automato =3757;
}
if (State_Automato == 3756 && Evento == 6) {
    State_Automato =3201;
}
if (State_Automato == 3756 && Evento == 10) {
    State_Automato =1971;
}
if (State_Automato == 3760 && Evento == 10) {
    State_Automato =186;
}
if (State_Automato == 3761 && Evento == 0) {
    State_Automato =3762;
}
if (State_Automato == 3761 && Evento == 16) {
    State_Automato =3701;
}
if (State_Automato == 3761 && Evento == 10) {
    State_Automato =260;
}
if (State_Automato == 3766 && Evento == 8) {
    State_Automato =3762;
}
if (State_Automato == 3766 && Evento == 16) {
    State_Automato =3700;
}
if (State_Automato == 3766 && Evento == 10) {
    State_Automato =266;
}
if (State_Automato == 3767 && Evento == 4) {
    State_Automato =3768;
}
if (State_Automato == 3767 && Evento == 8) {
    State_Automato =3769;
}
if (State_Automato == 3767 && Evento == 16) {
    State_Automato =3713;
}
if (State_Automato == 3767 && Evento == 6) {
    State_Automato =3216;
}
if (State_Automato == 3767 && Evento == 10) {
    State_Automato =2002;
}
if (State_Automato == 3773 && Evento == 16) {
    State_Automato =3717;
}
if (State_Automato == 3773 && Evento == 6) {
    State_Automato =3236;
}
if (State_Automato == 3773 && Evento == 10) {
    State_Automato =2020;
}
if (State_Automato == 3783 && Evento == 0) {
    State_Automato =3784;
}
if (State_Automato == 3783 && Evento == 12) {
    State_Automato =3750;
}
if (State_Automato == 3783 && Evento == 16) {
    State_Automato =3683;
}
if (State_Automato == 3783 && Evento == 6) {
    State_Automato =3174;
}
if (State_Automato == 3783 && Evento == 10) {
    State_Automato =1932;
}
if (State_Automato == 3787 && Evento == 12) {
    State_Automato =3757;
}
if (State_Automato == 3787 && Evento == 6) {
    State_Automato =3204;
}
if (State_Automato == 3787 && Evento == 10) {
    State_Automato =1979;
}
if (State_Automato == 3788 && Evento == 4) {
    State_Automato =3789;
}
if (State_Automato == 3788 && Evento == 12) {
    State_Automato =3769;
}
if (State_Automato == 3788 && Evento == 16) {
    State_Automato =3712;
}
if (State_Automato == 3788 && Evento == 6) {
    State_Automato =3215;
}
if (State_Automato == 3788 && Evento == 10) {
    State_Automato =2001;
}
if (State_Automato == 3792 && Evento == 16) {
    State_Automato =3725;
}
if (State_Automato == 3792 && Evento == 6) {
    State_Automato =3243;
}
if (State_Automato == 3792 && Evento == 10) {
    State_Automato =2030;
}
if (State_Automato == 3793 && Evento == 0) {
    State_Automato =3794;
}
if (State_Automato == 3793 && Evento == 4) {
    State_Automato =3795;
}
if (State_Automato == 3793 && Evento == 12) {
    State_Automato =3774;
}
if (State_Automato == 3793 && Evento == 6) {
    State_Automato =3252;
}
if (State_Automato == 3793 && Evento == 10) {
    State_Automato =2041;
}
if (State_Automato == 3802 && Evento == 0) {
    State_Automato =3803;
}
if (State_Automato == 3802 && Evento == 4) {
    State_Automato =3804;
}
if (State_Automato == 3802 && Evento == 16) {
    State_Automato =3743;
}
if (State_Automato == 3802 && Evento == 6) {
    State_Automato =3267;
}
if (State_Automato == 3802 && Evento == 10) {
    State_Automato =2072;
}
if (State_Automato == 3809 && Evento == 8) {
    State_Automato =3789;
}
if (State_Automato == 3809 && Evento == 12) {
    State_Automato =3768;
}
if (State_Automato == 3809 && Evento == 16) {
    State_Automato =3711;
}
if (State_Automato == 3809 && Evento == 6) {
    State_Automato =3214;
}
if (State_Automato == 3809 && Evento == 10) {
    State_Automato =2000;
}
if (State_Automato == 3812 && Evento == 8) {
    State_Automato =3784;
}
if (State_Automato == 3812 && Evento == 12) {
    State_Automato =3749;
}
if (State_Automato == 3812 && Evento == 16) {
    State_Automato =3682;
}
if (State_Automato == 3812 && Evento == 6) {
    State_Automato =3173;
}
if (State_Automato == 3812 && Evento == 10) {
    State_Automato =1931;
}
if (State_Automato == 3813 && Evento == 0) {
    State_Automato =3814;
}
if (State_Automato == 3813 && Evento == 8) {
    State_Automato =3815;
}
if (State_Automato == 3813 && Evento == 12) {
    State_Automato =3816;
}
if (State_Automato == 3813 && Evento == 16) {
    State_Automato =3817;
}
if (State_Automato == 3813 && Evento == 6) {
    State_Automato =3343;
}
if (State_Automato == 3813 && Evento == 10) {
    State_Automato =2195;
}
if (State_Automato == 3813 && Evento == 14) {
    State_Automato =468;
}
if (State_Automato == 3822 && Evento == 0) {
    State_Automato =3823;
}
if (State_Automato == 3822 && Evento == 12) {
    State_Automato =3824;
}
if (State_Automato == 3822 && Evento == 6) {
    State_Automato =3375;
}
if (State_Automato == 3822 && Evento == 10) {
    State_Automato =2322;
}
if (State_Automato == 3822 && Evento == 14) {
    State_Automato =838;
}
if (State_Automato == 3832 && Evento == 12) {
    State_Automato =3826;
}
if (State_Automato == 3832 && Evento == 10) {
    State_Automato =2328;
}
if (State_Automato == 3832 && Evento == 14) {
    State_Automato =842;
}
if (State_Automato == 3838 && Evento == 0) {
    State_Automato =3839;
}
if (State_Automato == 3838 && Evento == 8) {
    State_Automato =3840;
}
if (State_Automato == 3838 && Evento == 6) {
    State_Automato =3364;
}
if (State_Automato == 3838 && Evento == 10) {
    State_Automato =2294;
}
if (State_Automato == 3838 && Evento == 14) {
    State_Automato =822;
}
if (State_Automato == 3846 && Evento == 8) {
    State_Automato =3842;
}
if (State_Automato == 3846 && Evento == 10) {
    State_Automato =2304;
}
if (State_Automato == 3846 && Evento == 14) {
    State_Automato =830;
}
if (State_Automato == 3847 && Evento == 0) {
    State_Automato =3848;
}
if (State_Automato == 3847 && Evento == 16) {
    State_Automato =3824;
}
if (State_Automato == 3847 && Evento == 6) {
    State_Automato =3374;
}
if (State_Automato == 3847 && Evento == 10) {
    State_Automato =2321;
}
if (State_Automato == 3847 && Evento == 14) {
    State_Automato =837;
}
if (State_Automato == 3851 && Evento == 16) {
    State_Automato =3826;
}
if (State_Automato == 3851 && Evento == 10) {
    State_Automato =2337;
}
if (State_Automato == 3851 && Evento == 14) {
    State_Automato =847;
}
if (State_Automato == 3858 && Evento == 8) {
    State_Automato =3853;
}
if (State_Automato == 3858 && Evento == 12) {
    State_Automato =3839;
}
if (State_Automato == 3858 && Evento == 6) {
    State_Automato =3362;
}
if (State_Automato == 3858 && Evento == 10) {
    State_Automato =2293;
}
if (State_Automato == 3858 && Evento == 14) {
    State_Automato =821;
}
if (State_Automato == 3859 && Evento == 12) {
    State_Automato =3848;
}
if (State_Automato == 3859 && Evento == 16) {
    State_Automato =3823;
}
if (State_Automato == 3859 && Evento == 6) {
    State_Automato =3373;
}
if (State_Automato == 3859 && Evento == 10) {
    State_Automato =2320;
}
if (State_Automato == 3859 && Evento == 14) {
    State_Automato =836;
}
if (State_Automato == 3860 && Evento == 4) {
    State_Automato =3861;
}
if (State_Automato == 3860 && Evento == 8) {
    State_Automato =3862;
}
if (State_Automato == 3860 && Evento == 12) {
    State_Automato =3863;
}
if (State_Automato == 3860 && Evento == 16) {
    State_Automato =3864;
}
if (State_Automato == 3860 && Evento == 6) {
    State_Automato =3411;
}
if (State_Automato == 3860 && Evento == 10) {
    State_Automato =2460;
}
if (State_Automato == 3860 && Evento == 14) {
    State_Automato =896;
}
if (State_Automato == 3868 && Evento == 4) {
    State_Automato =3869;
}
if (State_Automato == 3868 && Evento == 12) {
    State_Automato =3870;
}
if (State_Automato == 3868 && Evento == 6) {
    State_Automato =3425;
}
if (State_Automato == 3868 && Evento == 10) {
    State_Automato =2525;
}
if (State_Automato == 3868 && Evento == 14) {
    State_Automato =1102;
}
if (State_Automato == 3875 && Evento == 4) {
    State_Automato =3876;
}
if (State_Automato == 3875 && Evento == 8) {
    State_Automato =3877;
}
if (State_Automato == 3875 && Evento == 6) {
    State_Automato =3436;
}
if (State_Automato == 3875 && Evento == 10) {
    State_Automato =2534;
}
if (State_Automato == 3875 && Evento == 14) {
    State_Automato =1121;
}
if (State_Automato == 3890 && Evento == 4) {
    State_Automato =3891;
}
if (State_Automato == 3890 && Evento == 16) {
    State_Automato =3870;
}
if (State_Automato == 3890 && Evento == 6) {
    State_Automato =3424;
}
if (State_Automato == 3890 && Evento == 10) {
    State_Automato =2524;
}
if (State_Automato == 3890 && Evento == 14) {
    State_Automato =1101;
}
if (State_Automato == 3894 && Evento == 16) {
    State_Automato =3872;
}
if (State_Automato == 3894 && Evento == 10) {
    State_Automato =2528;
}
if (State_Automato == 3894 && Evento == 14) {
    State_Automato =1113;
}
if (State_Automato == 3908 && Evento == 12) {
    State_Automato =3891;
}
if (State_Automato == 3908 && Evento == 16) {
    State_Automato =3869;
}
if (State_Automato == 3908 && Evento == 6) {
    State_Automato =3423;
}
if (State_Automato == 3908 && Evento == 10) {
    State_Automato =2523;
}
if (State_Automato == 3908 && Evento == 14) {
    State_Automato =1100;
}
if (State_Automato == 3909 && Evento == 8) {
    State_Automato =3898;
}
if (State_Automato == 3909 && Evento == 16) {
    State_Automato =3876;
}
if (State_Automato == 3909 && Evento == 6) {
    State_Automato =3435;
}
if (State_Automato == 3909 && Evento == 10) {
    State_Automato =2532;
}
if (State_Automato == 3909 && Evento == 14) {
    State_Automato =1120;
}
if (State_Automato == 3910 && Evento == 8) {
    State_Automato =3902;
}
if (State_Automato == 3910 && Evento == 12) {
    State_Automato =3895;
}
if (State_Automato == 3910 && Evento == 16) {
    State_Automato =3884;
}
if (State_Automato == 3910 && Evento == 10) {
    State_Automato =2544;
}
if (State_Automato == 3910 && Evento == 14) {
    State_Automato =1128;
}
if (State_Automato == 3917 && Evento == 0) {
    State_Automato =3918;
}
if (State_Automato == 3917 && Evento == 4) {
    State_Automato =3919;
}
if (State_Automato == 3917 && Evento == 12) {
    State_Automato =3920;
}
if (State_Automato == 3917 && Evento == 16) {
    State_Automato =3921;
}
if (State_Automato == 3917 && Evento == 6) {
    State_Automato =3502;
}
if (State_Automato == 3917 && Evento == 10) {
    State_Automato =2739;
}
if (State_Automato == 3917 && Evento == 14) {
    State_Automato =1497;
}
if (State_Automato == 3924 && Evento == 0) {
    State_Automato =3925;
}
if (State_Automato == 3924 && Evento == 4) {
    State_Automato =3926;
}
if (State_Automato == 3924 && Evento == 12) {
    State_Automato =3927;
}
if (State_Automato == 3924 && Evento == 10) {
    State_Automato =2770;
}
if (State_Automato == 3924 && Evento == 14) {
    State_Automato =1600;
}
if (State_Automato == 3933 && Evento == 0) {
    State_Automato =3934;
}
if (State_Automato == 3933 && Evento == 4) {
    State_Automato =3935;
}
if (State_Automato == 3933 && Evento == 16) {
    State_Automato =3927;
}
if (State_Automato == 3933 && Evento == 10) {
    State_Automato =2769;
}
if (State_Automato == 3933 && Evento == 14) {
    State_Automato =1599;
}
if (State_Automato == 3945 && Evento == 0) {
    State_Automato =3946;
}
if (State_Automato == 3945 && Evento == 2) {
    State_Automato =3580;
}
if (State_Automato == 3945 && Evento == 6) {
    State_Automato =3010;
}
if (State_Automato == 3965 && Evento == 2) {
    State_Automato =3611;
}
if (State_Automato == 3965 && Evento == 6) {
    State_Automato =3051;
}
if (State_Automato == 3965 && Evento == 14) {
    State_Automato =359;
}
if (State_Automato == 3967 && Evento == 0) {
    State_Automato =3968;
}
if (State_Automato == 3967 && Evento == 12) {
    State_Automato =3953;
}
if (State_Automato == 3967 && Evento == 2) {
    State_Automato =3625;
}
if (State_Automato == 3967 && Evento == 6) {
    State_Automato =3064;
}
if (State_Automato == 3967 && Evento == 14) {
    State_Automato =368;
}
if (State_Automato == 3973 && Evento == 12) {
    State_Automato =3957;
}
if (State_Automato == 3973 && Evento == 6) {
    State_Automato =3076;
}
if (State_Automato == 3973 && Evento == 14) {
    State_Automato =380;
}
if (State_Automato == 3975 && Evento == 4) {
    State_Automato =3968;
}
if (State_Automato == 3975 && Evento == 12) {
    State_Automato =3952;
}
if (State_Automato == 3975 && Evento == 2) {
    State_Automato =3624;
}
if (State_Automato == 3975 && Evento == 6) {
    State_Automato =3063;
}
if (State_Automato == 3975 && Evento == 14) {
    State_Automato =367;
}
if (State_Automato == 3978 && Evento == 2) {
    State_Automato =3690;
}
if (State_Automato == 3978 && Evento == 6) {
    State_Automato =3273;
}
if (State_Automato == 3978 && Evento == 10) {
    State_Automato =2087;
}
if (State_Automato == 3979 && Evento == 0) {
    State_Automato =3980;
}
if (State_Automato == 3979 && Evento == 4) {
    State_Automato =3981;
}
if (State_Automato == 3979 && Evento == 2) {
    State_Automato =3734;
}
if (State_Automato == 3979 && Evento == 6) {
    State_Automato =3292;
}
if (State_Automato == 3979 && Evento == 10) {
    State_Automato =2113;
}
if (State_Automato == 3992 && Evento == 4) {
    State_Automato =3984;
}
if (State_Automato == 3992 && Evento == 2) {
    State_Automato =3738;
}
if (State_Automato == 3992 && Evento == 10) {
    State_Automato =2116;
}
if (State_Automato == 3999 && Evento == 4) {
    State_Automato =3994;
}
if (State_Automato == 3999 && Evento == 12) {
    State_Automato =3980;
}
if (State_Automato == 3999 && Evento == 2) {
    State_Automato =3733;
}
if (State_Automato == 3999 && Evento == 6) {
    State_Automato =3290;
}
if (State_Automato == 3999 && Evento == 10) {
    State_Automato =2112;
}
if (State_Automato == 4007 && Evento == 12) {
    State_Automato =4001;
}
if (State_Automato == 4007 && Evento == 2) {
    State_Automato =3820;
}
if (State_Automato == 4007 && Evento == 6) {
    State_Automato =3385;
}
if (State_Automato == 4007 && Evento == 10) {
    State_Automato =2365;
}
if (State_Automato == 4007 && Evento == 14) {
    State_Automato =854;
}
if (State_Automato == 4011 && Evento == 4) {
    State_Automato =4012;
}
if (State_Automato == 4011 && Evento == 2) {
    State_Automato =3877;
}
if (State_Automato == 4011 && Evento == 6) {
    State_Automato =3448;
}
if (State_Automato == 4011 && Evento == 10) {
    State_Automato =2548;
}
if (State_Automato == 4011 && Evento == 14) {
    State_Automato =1133;
}
if (State_Automato == 4016 && Evento == 0) {
    State_Automato =4017;
}
if (State_Automato == 4016 && Evento == 4) {
    State_Automato =4018;
}
if (State_Automato == 4016 && Evento == 12) {
    State_Automato =4019;
}
if (State_Automato == 4016 && Evento == 2) {
    State_Automato =3921;
}
if (State_Automato == 4016 && Evento == 6) {
    State_Automato =3501;
}
if (State_Automato == 4016 && Evento == 10) {
    State_Automato =2738;
}
if (State_Automato == 4016 && Evento == 14) {
    State_Automato =1496;
}
if (State_Automato == 4039 && Evento == 4) {
    State_Automato =4032;
}
if (State_Automato == 4039 && Evento == 12) {
    State_Automato =4021;
}
if (State_Automato == 4039 && Evento == 2) {
    State_Automato =3925;
}
if (State_Automato == 4039 && Evento == 10) {
    State_Automato =2774;
}
if (State_Automato == 4039 && Evento == 14) {
    State_Automato =1620;
}
if (State_Automato == 4040 && Evento == 4) {
    State_Automato =4034;
}
if (State_Automato == 4040 && Evento == 12) {
    State_Automato =4027;
}
if (State_Automato == 4040 && Evento == 6) {
    State_Automato =3525;
}
if (State_Automato == 4040 && Evento == 10) {
    State_Automato =2778;
}
if (State_Automato == 4040 && Evento == 14) {
    State_Automato =1626;
}
if (State_Automato == 4048 && Evento == 0) {
    State_Automato =4049;
}
if (State_Automato == 4048 && Evento == 16) {
    State_Automato =3953;
}
if (State_Automato == 4048 && Evento == 2) {
    State_Automato =3659;
}
if (State_Automato == 4048 && Evento == 6) {
    State_Automato =3111;
}
if (State_Automato == 4048 && Evento == 14) {
    State_Automato =432;
}
if (State_Automato == 4054 && Evento == 0) {
    State_Automato =4055;
}
if (State_Automato == 4054 && Evento == 16) {
    State_Automato =3981;
}
if (State_Automato == 4054 && Evento == 2) {
    State_Automato =3776;
}
if (State_Automato == 4054 && Evento == 6) {
    State_Automato =3314;
}
if (State_Automato == 4054 && Evento == 10) {
    State_Automato =2147;
}
if (State_Automato == 4063 && Evento == 16) {
    State_Automato =4001;
}
if (State_Automato == 4063 && Evento == 2) {
    State_Automato =3836;
}
if (State_Automato == 4063 && Evento == 6) {
    State_Automato =3397;
}
if (State_Automato == 4063 && Evento == 10) {
    State_Automato =2415;
}
if (State_Automato == 4063 && Evento == 14) {
    State_Automato =863;
}
if (State_Automato == 4064 && Evento == 0) {
    State_Automato =4065;
}
if (State_Automato == 4064 && Evento == 2) {
    State_Automato =3840;
}
if (State_Automato == 4064 && Evento == 6) {
    State_Automato =3401;
}
if (State_Automato == 4064 && Evento == 10) {
    State_Automato =2421;
}
if (State_Automato == 4064 && Evento == 14) {
    State_Automato =869;
}
if (State_Automato == 4068 && Evento == 2) {
    State_Automato =3842;
}
if (State_Automato == 4068 && Evento == 10) {
    State_Automato =2425;
}
if (State_Automato == 4068 && Evento == 14) {
    State_Automato =872;
}
if (State_Automato == 4073 && Evento == 0) {
    State_Automato =4074;
}
if (State_Automato == 4073 && Evento == 4) {
    State_Automato =4075;
}
if (State_Automato == 4073 && Evento == 16) {
    State_Automato =4019;
}
if (State_Automato == 4073 && Evento == 2) {
    State_Automato =3920;
}
if (State_Automato == 4073 && Evento == 6) {
    State_Automato =3500;
}
if (State_Automato == 4073 && Evento == 10) {
    State_Automato =2737;
}
if (State_Automato == 4073 && Evento == 14) {
    State_Automato =1495;
}
if (State_Automato == 4079 && Evento == 0) {
    State_Automato =4080;
}
if (State_Automato == 4079 && Evento == 16) {
    State_Automato =4022;
}
if (State_Automato == 4079 && Evento == 2) {
    State_Automato =3935;
}
if (State_Automato == 4079 && Evento == 10) {
    State_Automato =2785;
}
if (State_Automato == 4079 && Evento == 14) {
    State_Automato =1630;
}
if (State_Automato == 4083 && Evento == 16) {
    State_Automato =4024;
}
if (State_Automato == 4083 && Evento == 10) {
    State_Automato =2787;
}
if (State_Automato == 4083 && Evento == 14) {
    State_Automato =1632;
}
if (State_Automato == 4084 && Evento == 0) {
    State_Automato =4085;
}
if (State_Automato == 4084 && Evento == 16) {
    State_Automato =4028;
}
if (State_Automato == 4084 && Evento == 6) {
    State_Automato =3532;
}
if (State_Automato == 4084 && Evento == 10) {
    State_Automato =2794;
}
if (State_Automato == 4084 && Evento == 14) {
    State_Automato =1635;
}
if (State_Automato == 4089 && Evento == 4) {
    State_Automato =4080;
}
if (State_Automato == 4089 && Evento == 16) {
    State_Automato =4021;
}
if (State_Automato == 4089 && Evento == 2) {
    State_Automato =3934;
}
if (State_Automato == 4089 && Evento == 10) {
    State_Automato =2784;
}
if (State_Automato == 4089 && Evento == 14) {
    State_Automato =1629;
}
if (State_Automato == 4097 && Evento == 0) {
    State_Automato =4098;
}
if (State_Automato == 4097 && Evento == 12) {
    State_Automato =4059;
}
if (State_Automato == 4097 && Evento == 16) {
    State_Automato =4000;
}
if (State_Automato == 4097 && Evento == 2) {
    State_Automato =3815;
}
if (State_Automato == 4097 && Evento == 6) {
    State_Automato =3342;
}
if (State_Automato == 4097 && Evento == 10) {
    State_Automato =2192;
}
if (State_Automato == 4097 && Evento == 14) {
    State_Automato =467;
}
if (State_Automato == 4101 && Evento == 12) {
    State_Automato =4065;
}
if (State_Automato == 4101 && Evento == 2) {
    State_Automato =3853;
}
if (State_Automato == 4101 && Evento == 6) {
    State_Automato =3404;
}
if (State_Automato == 4101 && Evento == 10) {
    State_Automato =2447;
}
if (State_Automato == 4101 && Evento == 14) {
    State_Automato =886;
}
if (State_Automato == 4102 && Evento == 4) {
    State_Automato =4103;
}
if (State_Automato == 4102 && Evento == 12) {
    State_Automato =4069;
}
if (State_Automato == 4102 && Evento == 16) {
    State_Automato =4008;
}
if (State_Automato == 4102 && Evento == 2) {
    State_Automato =3862;
}
if (State_Automato == 4102 && Evento == 6) {
    State_Automato =3408;
}
if (State_Automato == 4102 && Evento == 10) {
    State_Automato =2459;
}
if (State_Automato == 4102 && Evento == 14) {
    State_Automato =895;
}
if (State_Automato == 4106 && Evento == 16) {
    State_Automato =4012;
}
if (State_Automato == 4106 && Evento == 2) {
    State_Automato =3898;
}
if (State_Automato == 4106 && Evento == 6) {
    State_Automato =3468;
}
if (State_Automato == 4106 && Evento == 10) {
    State_Automato =2560;
}
if (State_Automato == 4106 && Evento == 14) {
    State_Automato =1154;
}
if (State_Automato == 4107 && Evento == 0) {
    State_Automato =4108;
}
if (State_Automato == 4107 && Evento == 4) {
    State_Automato =4109;
}
if (State_Automato == 4107 && Evento == 12) {
    State_Automato =4071;
}
if (State_Automato == 4107 && Evento == 2) {
    State_Automato =3911;
}
if (State_Automato == 4107 && Evento == 6) {
    State_Automato =3473;
}
if (State_Automato == 4107 && Evento == 10) {
    State_Automato =2570;
}
if (State_Automato == 4107 && Evento == 14) {
    State_Automato =1168;
}
if (State_Automato == 4112 && Evento == 0) {
    State_Automato =4113;
}
if (State_Automato == 4112 && Evento == 2) {
    State_Automato =3914;
}
if (State_Automato == 4112 && Evento == 6) {
    State_Automato =3484;
}
if (State_Automato == 4112 && Evento == 10) {
    State_Automato =2686;
}
if (State_Automato == 4112 && Evento == 14) {
    State_Automato =1452;
}
if (State_Automato == 4116 && Evento == 6) {
    State_Automato =3486;
}
if (State_Automato == 4116 && Evento == 10) {
    State_Automato =2694;
}
if (State_Automato == 4116 && Evento == 14) {
    State_Automato =1458;
}
if (State_Automato == 4119 && Evento == 4) {
    State_Automato =4113;
}
if (State_Automato == 4119 && Evento == 2) {
    State_Automato =3913;
}
if (State_Automato == 4119 && Evento == 6) {
    State_Automato =3483;
}
if (State_Automato == 4119 && Evento == 10) {
    State_Automato =2685;
}
if (State_Automato == 4119 && Evento == 14) {
    State_Automato =1451;
}
if (State_Automato == 4120 && Evento == 0) {
    State_Automato =4121;
}
if (State_Automato == 4120 && Evento == 4) {
    State_Automato =4122;
}
if (State_Automato == 4120 && Evento == 16) {
    State_Automato =4041;
}
if (State_Automato == 4120 && Evento == 2) {
    State_Automato =3940;
}
if (State_Automato == 4120 && Evento == 6) {
    State_Automato =3551;
}
if (State_Automato == 4120 && Evento == 10) {
    State_Automato =2803;
}
if (State_Automato == 4120 && Evento == 14) {
    State_Automato =1660;
}
if (State_Automato == 4127 && Evento == 0) {
    State_Automato =4128;
}
if (State_Automato == 4127 && Evento == 12) {
    State_Automato =4075;
}
if (State_Automato == 4127 && Evento == 16) {
    State_Automato =4018;
}
if (State_Automato == 4127 && Evento == 2) {
    State_Automato =3919;
}
if (State_Automato == 4127 && Evento == 6) {
    State_Automato =3499;
}
if (State_Automato == 4127 && Evento == 10) {
    State_Automato =2736;
}
if (State_Automato == 4127 && Evento == 14) {
    State_Automato =1494;
}
if (State_Automato == 4131 && Evento == 12) {
    State_Automato =4085;
}
if (State_Automato == 4131 && Evento == 16) {
    State_Automato =4034;
}
if (State_Automato == 4131 && Evento == 6) {
    State_Automato =3543;
}
if (State_Automato == 4131 && Evento == 10) {
    State_Automato =2798;
}
if (State_Automato == 4131 && Evento == 14) {
    State_Automato =1650;
}
if (State_Automato == 4134 && Evento == 4) {
    State_Automato =4128;
}
if (State_Automato == 4134 && Evento == 12) {
    State_Automato =4074;
}
if (State_Automato == 4134 && Evento == 16) {
    State_Automato =4017;
}
if (State_Automato == 4134 && Evento == 2) {
    State_Automato =3918;
}
if (State_Automato == 4134 && Evento == 6) {
    State_Automato =3498;
}
if (State_Automato == 4134 && Evento == 10) {
    State_Automato =2735;
}
if (State_Automato == 4134 && Evento == 14) {
    State_Automato =1493;
}


}

function trans18(Evento) {
  if (State_Automato == 20 && Evento == 18) {
    State_Automato =27;
}
if (State_Automato == 69 && Evento == 18) {
    State_Automato =76;
}
if (State_Automato == 81 && Evento == 18) {
    State_Automato =84;
}
if (State_Automato == 18 && Evento == 18) {
    State_Automato =85;
}
if (State_Automato == 92 && Evento == 18) {
    State_Automato =99;
}
if (State_Automato == 104 && Evento == 18) {
    State_Automato =105;
}
if (State_Automato == 110 && Evento == 18) {
    State_Automato =111;
}
if (State_Automato == 120 && Evento == 18) {
    State_Automato =121;
}
if (State_Automato == 117 && Evento == 18) {
    State_Automato =122;
}
if (State_Automato == 126 && Evento == 18) {
    State_Automato =127;
}
if (State_Automato == 131 && Evento == 18) {
    State_Automato =132;
}
if (State_Automato == 136 && Evento == 18) {
    State_Automato =137;
}
if (State_Automato == 152 && Evento == 18) {
    State_Automato =153;
}
if (State_Automato == 149 && Evento == 18) {
    State_Automato =154;
}
if (State_Automato == 159 && Evento == 18) {
    State_Automato =160;
}
if (State_Automato == 158 && Evento == 18) {
    State_Automato =161;
}
if (State_Automato == 164 && Evento == 18) {
    State_Automato =165;
}
if (State_Automato == 184 && Evento == 18) {
    State_Automato =185;
}
if (State_Automato == 189 && Evento == 18) {
    State_Automato =190;
}
if (State_Automato == 180 && Evento == 18) {
    State_Automato =191;
}
if (State_Automato == 198 && Evento == 18) {
    State_Automato =199;
}
if (State_Automato == 200 && Evento == 18) {
    State_Automato =201;
}
if (State_Automato == 206 && Evento == 18) {
    State_Automato =207;
}
if (State_Automato == 214 && Evento == 18) {
    State_Automato =215;
}
if (State_Automato == 219 && Evento == 18) {
    State_Automato =220;
}
if (State_Automato == 224 && Evento == 18) {
    State_Automato =225;
}
if (State_Automato == 229 && Evento == 18) {
    State_Automato =230;
}
if (State_Automato == 233 && Evento == 18) {
    State_Automato =234;
}
if (State_Automato == 238 && Evento == 18) {
    State_Automato =239;
}
if (State_Automato == 17 && Evento == 18) {
    State_Automato =240;
}
if (State_Automato == 248 && Evento == 18) {
    State_Automato =249;
}
if (State_Automato == 257 && Evento == 18) {
    State_Automato =258;
}
if (State_Automato == 264 && Evento == 18) {
    State_Automato =265;
}
if (State_Automato == 269 && Evento == 18) {
    State_Automato =270;
}
if (State_Automato == 292 && Evento == 18) {
    State_Automato =295;
}
if (State_Automato == 299 && Evento == 18) {
    State_Automato =300;
}
if (State_Automato == 314 && Evento == 18) {
    State_Automato =315;
}
if (State_Automato == 318 && Evento == 18) {
    State_Automato =319;
}
if (State_Automato == 271 && Evento == 18) {
    State_Automato =330;
}
if (State_Automato == 337 && Evento == 18) {
    State_Automato =338;
}
if (State_Automato == 361 && Evento == 18) {
    State_Automato =364;
}
if (State_Automato == 365 && Evento == 18) {
    State_Automato =366;
}
if (State_Automato == 371 && Evento == 18) {
    State_Automato =372;
}
if (State_Automato == 375 && Evento == 18) {
    State_Automato =378;
}
if (State_Automato == 386 && Evento == 18) {
    State_Automato =387;
}
if (State_Automato == 394 && Evento == 18) {
    State_Automato =395;
}
if (State_Automato == 393 && Evento == 18) {
    State_Automato =398;
}
if (State_Automato == 401 && Evento == 18) {
    State_Automato =410;
}
if (State_Automato == 420 && Evento == 18) {
    State_Automato =421;
}
if (State_Automato == 429 && Evento == 18) {
    State_Automato =430;
}
if (State_Automato == 445 && Evento == 18) {
    State_Automato =446;
}
if (State_Automato == 449 && Evento == 18) {
    State_Automato =450;
}
if (State_Automato == 451 && Evento == 18) {
    State_Automato =452;
}
if (State_Automato == 455 && Evento == 18) {
    State_Automato =456;
}
if (State_Automato == 459 && Evento == 18) {
    State_Automato =462;
}
if (State_Automato == 463 && Evento == 18) {
    State_Automato =464;
}
if (State_Automato == 465 && Evento == 18) {
    State_Automato =466;
}
if (State_Automato == 473 && Evento == 18) {
    State_Automato =474;
}
if (State_Automato == 482 && Evento == 18) {
    State_Automato =491;
}
if (State_Automato == 512 && Evento == 18) {
    State_Automato =517;
}
if (State_Automato == 532 && Evento == 18) {
    State_Automato =533;
}
if (State_Automato == 547 && Evento == 18) {
    State_Automato =548;
}
if (State_Automato == 565 && Evento == 18) {
    State_Automato =566;
}
if (State_Automato == 581 && Evento == 18) {
    State_Automato =582;
}
if (State_Automato == 586 && Evento == 18) {
    State_Automato =587;
}
if (State_Automato == 591 && Evento == 18) {
    State_Automato =594;
}
if (State_Automato == 604 && Evento == 18) {
    State_Automato =605;
}
if (State_Automato == 608 && Evento == 18) {
    State_Automato =609;
}
if (State_Automato == 603 && Evento == 18) {
    State_Automato =610;
}
if (State_Automato == 614 && Evento == 18) {
    State_Automato =615;
}
if (State_Automato == 619 && Evento == 18) {
    State_Automato =620;
}
if (State_Automato == 602 && Evento == 18) {
    State_Automato =621;
}
if (State_Automato == 628 && Evento == 18) {
    State_Automato =629;
}
if (State_Automato == 634 && Evento == 18) {
    State_Automato =635;
}
if (State_Automato == 633 && Evento == 18) {
    State_Automato =636;
}
if (State_Automato == 472 && Evento == 18) {
    State_Automato =637;
}
if (State_Automato == 644 && Evento == 18) {
    State_Automato =647;
}
if (State_Automato == 659 && Evento == 18) {
    State_Automato =662;
}
if (State_Automato == 688 && Evento == 18) {
    State_Automato =691;
}
if (State_Automato == 697 && Evento == 18) {
    State_Automato =698;
}
if (State_Automato == 696 && Evento == 18) {
    State_Automato =703;
}
if (State_Automato == 471 && Evento == 18) {
    State_Automato =708;
}
if (State_Automato == 722 && Evento == 18) {
    State_Automato =723;
}
if (State_Automato == 732 && Evento == 18) {
    State_Automato =733;
}
if (State_Automato == 739 && Evento == 18) {
    State_Automato =744;
}
if (State_Automato == 755 && Evento == 18) {
    State_Automato =756;
}
if (State_Automato == 764 && Evento == 18) {
    State_Automato =765;
}
if (State_Automato == 731 && Evento == 18) {
    State_Automato =774;
}
if (State_Automato == 780 && Evento == 18) {
    State_Automato =781;
}
if (State_Automato == 799 && Evento == 18) {
    State_Automato =800;
}
if (State_Automato == 811 && Evento == 18) {
    State_Automato =812;
}
if (State_Automato == 824 && Evento == 18) {
    State_Automato =825;
}
if (State_Automato == 828 && Evento == 18) {
    State_Automato =829;
}
if (State_Automato == 833 && Evento == 18) {
    State_Automato =834;
}
if (State_Automato == 820 && Evento == 18) {
    State_Automato =835;
}
if (State_Automato == 850 && Evento == 18) {
    State_Automato =853;
}
if (State_Automato == 862 && Evento == 18) {
    State_Automato =867;
}
if (State_Automato == 874 && Evento == 18) {
    State_Automato =875;
}
if (State_Automato == 871 && Evento == 18) {
    State_Automato =876;
}
if (State_Automato == 880 && Evento == 18) {
    State_Automato =881;
}
if (State_Automato == 888 && Evento == 18) {
    State_Automato =889;
}
if (State_Automato == 885 && Evento == 18) {
    State_Automato =890;
}
if (State_Automato == 893 && Evento == 18) {
    State_Automato =894;
}
if (State_Automato == 927 && Evento == 18) {
    State_Automato =934;
}
if (State_Automato == 948 && Evento == 18) {
    State_Automato =951;
}
if (State_Automato == 947 && Evento == 18) {
    State_Automato =952;
}
if (State_Automato == 957 && Evento == 18) {
    State_Automato =958;
}
if (State_Automato == 956 && Evento == 18) {
    State_Automato =965;
}
if (State_Automato == 974 && Evento == 18) {
    State_Automato =975;
}
if (State_Automato == 973 && Evento == 18) {
    State_Automato =984;
}
if (State_Automato == 898 && Evento == 18) {
    State_Automato =991;
}
if (State_Automato == 1026 && Evento == 18) {
    State_Automato =1027;
}
if (State_Automato == 1040 && Evento == 18) {
    State_Automato =1043;
}
if (State_Automato == 1033 && Evento == 18) {
    State_Automato =1052;
}
if (State_Automato == 1058 && Evento == 18) {
    State_Automato =1059;
}
if (State_Automato == 1065 && Evento == 18) {
    State_Automato =1066;
}
if (State_Automato == 1073 && Evento == 18) {
    State_Automato =1074;
}
if (State_Automato == 1078 && Evento == 18) {
    State_Automato =1079;
}
if (State_Automato == 1092 && Evento == 18) {
    State_Automato =1099;
}
if (State_Automato == 1104 && Evento == 18) {
    State_Automato =1105;
}
if (State_Automato == 1117 && Evento == 18) {
    State_Automato =1118;
}
if (State_Automato == 1116 && Evento == 18) {
    State_Automato =1119;
}
if (State_Automato == 1130 && Evento == 18) {
    State_Automato =1131;
}
if (State_Automato == 1135 && Evento == 18) {
    State_Automato =1138;
}
if (State_Automato == 1156 && Evento == 18) {
    State_Automato =1159;
}
if (State_Automato == 1153 && Evento == 18) {
    State_Automato =1160;
}
if (State_Automato == 1163 && Evento == 18) {
    State_Automato =1164;
}
if (State_Automato == 14 && Evento == 18) {
    State_Automato =1165;
}
if (State_Automato == 1176 && Evento == 18) {
    State_Automato =1177;
}
if (State_Automato == 1185 && Evento == 18) {
    State_Automato =1186;
}
if (State_Automato == 1192 && Evento == 18) {
    State_Automato =1193;
}
if (State_Automato == 1197 && Evento == 18) {
    State_Automato =1198;
}
if (State_Automato == 1184 && Evento == 18) {
    State_Automato =1199;
}
if (State_Automato == 1208 && Evento == 18) {
    State_Automato =1209;
}
if (State_Automato == 1207 && Evento == 18) {
    State_Automato =1214;
}
if (State_Automato == 1223 && Evento == 18) {
    State_Automato =1224;
}
if (State_Automato == 1228 && Evento == 18) {
    State_Automato =1229;
}
if (State_Automato == 1233 && Evento == 18) {
    State_Automato =1234;
}
if (State_Automato == 1222 && Evento == 18) {
    State_Automato =1235;
}
if (State_Automato == 1243 && Evento == 18) {
    State_Automato =1244;
}
if (State_Automato == 1247 && Evento == 18) {
    State_Automato =1248;
}
if (State_Automato == 1242 && Evento == 18) {
    State_Automato =1249;
}
if (State_Automato == 1252 && Evento == 18) {
    State_Automato =1253;
}
if (State_Automato == 1241 && Evento == 18) {
    State_Automato =1254;
}
if (State_Automato == 1260 && Evento == 18) {
    State_Automato =1261;
}
if (State_Automato == 1259 && Evento == 18) {
    State_Automato =1262;
}
if (State_Automato == 1258 && Evento == 18) {
    State_Automato =1263;
}
if (State_Automato == 1277 && Evento == 18) {
    State_Automato =1278;
}
if (State_Automato == 1282 && Evento == 18) {
    State_Automato =1283;
}
if (State_Automato == 1290 && Evento == 18) {
    State_Automato =1291;
}
if (State_Automato == 1294 && Evento == 18) {
    State_Automato =1295;
}
if (State_Automato == 1289 && Evento == 18) {
    State_Automato =1296;
}
if (State_Automato == 1300 && Evento == 18) {
    State_Automato =1301;
}
if (State_Automato == 1175 && Evento == 18) {
    State_Automato =1302;
}
if (State_Automato == 1310 && Evento == 18) {
    State_Automato =1311;
}
if (State_Automato == 1319 && Evento == 18) {
    State_Automato =1320;
}
if (State_Automato == 1326 && Evento == 18) {
    State_Automato =1327;
}
if (State_Automato == 1331 && Evento == 18) {
    State_Automato =1332;
}
if (State_Automato == 1174 && Evento == 18) {
    State_Automato =1333;
}
if (State_Automato == 1346 && Evento == 18) {
    State_Automato =1347;
}
if (State_Automato == 1353 && Evento == 18) {
    State_Automato =1354;
}
if (State_Automato == 1364 && Evento == 18) {
    State_Automato =1365;
}
if (State_Automato == 1368 && Evento == 18) {
    State_Automato =1369;
}
if (State_Automato == 1363 && Evento == 18) {
    State_Automato =1370;
}
if (State_Automato == 1374 && Evento == 18) {
    State_Automato =1375;
}
if (State_Automato == 1385 && Evento == 18) {
    State_Automato =1386;
}
if (State_Automato == 1390 && Evento == 18) {
    State_Automato =1391;
}
if (State_Automato == 1345 && Evento == 18) {
    State_Automato =1392;
}
if (State_Automato == 1402 && Evento == 18) {
    State_Automato =1403;
}
if (State_Automato == 1408 && Evento == 18) {
    State_Automato =1409;
}
if (State_Automato == 1418 && Evento == 18) {
    State_Automato =1419;
}
if (State_Automato == 1424 && Evento == 18) {
    State_Automato =1425;
}
if (State_Automato == 1428 && Evento == 18) {
    State_Automato =1429;
}
if (State_Automato == 1423 && Evento == 18) {
    State_Automato =1430;
}
if (State_Automato == 1434 && Evento == 18) {
    State_Automato =1435;
}
if (State_Automato == 1440 && Evento == 18) {
    State_Automato =1441;
}
if (State_Automato == 1417 && Evento == 18) {
    State_Automato =1442;
}
if (State_Automato == 1455 && Evento == 18) {
    State_Automato =1456;
}
if (State_Automato == 1454 && Evento == 18) {
    State_Automato =1457;
}
if (State_Automato == 1461 && Evento == 18) {
    State_Automato =1462;
}
if (State_Automato == 1465 && Evento == 18) {
    State_Automato =1466;
}
if (State_Automato == 1450 && Evento == 18) {
    State_Automato =1467;
}
if (State_Automato == 1474 && Evento == 18) {
    State_Automato =1475;
}
if (State_Automato == 1478 && Evento == 18) {
    State_Automato =1479;
}
if (State_Automato == 1480 && Evento == 18) {
    State_Automato =1481;
}
if (State_Automato == 1482 && Evento == 18) {
    State_Automato =1483;
}
if (State_Automato == 1473 && Evento == 18) {
    State_Automato =1484;
}
if (State_Automato == 1489 && Evento == 18) {
    State_Automato =1490;
}
if (State_Automato == 1488 && Evento == 18) {
    State_Automato =1491;
}
if (State_Automato == 13 && Evento == 18) {
    State_Automato =1492;
}
if (State_Automato == 1501 && Evento == 18) {
    State_Automato =1502;
}
if (State_Automato == 1509 && Evento == 18) {
    State_Automato =1510;
}
if (State_Automato == 1518 && Evento == 18) {
    State_Automato =1519;
}
if (State_Automato == 1535 && Evento == 18) {
    State_Automato =1536;
}
if (State_Automato == 1554 && Evento == 18) {
    State_Automato =1555;
}
if (State_Automato == 1562 && Evento == 18) {
    State_Automato =1563;
}
if (State_Automato == 1569 && Evento == 18) {
    State_Automato =1570;
}
if (State_Automato == 1574 && Evento == 18) {
    State_Automato =1575;
}
if (State_Automato == 1582 && Evento == 18) {
    State_Automato =1583;
}
if (State_Automato == 1588 && Evento == 18) {
    State_Automato =1589;
}
if (State_Automato == 1581 && Evento == 18) {
    State_Automato =1596;
}
if (State_Automato == 1606 && Evento == 18) {
    State_Automato =1607;
}
if (State_Automato == 1617 && Evento == 18) {
    State_Automato =1618;
}
if (State_Automato == 1616 && Evento == 18) {
    State_Automato =1619;
}
if (State_Automato == 1639 && Evento == 18) {
    State_Automato =1640;
}
if (State_Automato == 1643 && Evento == 18) {
    State_Automato =1644;
}
if (State_Automato == 1638 && Evento == 18) {
    State_Automato =1645;
}
if (State_Automato == 1648 && Evento == 18) {
    State_Automato =1649;
}
if (State_Automato == 1654 && Evento == 18) {
    State_Automato =1655;
}
if (State_Automato == 1653 && Evento == 18) {
    State_Automato =1656;
}
if (State_Automato == 12 && Evento == 18) {
    State_Automato =1657;
}
if (State_Automato == 1673 && Evento == 18) {
    State_Automato =1674;
}
if (State_Automato == 1666 && Evento == 18) {
    State_Automato =1679;
}
if (State_Automato == 1691 && Evento == 18) {
    State_Automato =1692;
}
if (State_Automato == 1706 && Evento == 18) {
    State_Automato =1707;
}
if (State_Automato == 1705 && Evento == 18) {
    State_Automato =1716;
}
if (State_Automato == 1725 && Evento == 18) {
    State_Automato =1726;
}
if (State_Automato == 1724 && Evento == 18) {
    State_Automato =1729;
}
if (State_Automato == 1735 && Evento == 18) {
    State_Automato =1736;
}
if (State_Automato == 1740 && Evento == 18) {
    State_Automato =1741;
}
if (State_Automato == 11 && Evento == 18) {
    State_Automato =1744;
}
if (State_Automato == 1772 && Evento == 18) {
    State_Automato =1773;
}
if (State_Automato == 1777 && Evento == 18) {
    State_Automato =1778;
}
if (State_Automato == 1768 && Evento == 18) {
    State_Automato =1783;
}
if (State_Automato == 1800 && Evento == 18) {
    State_Automato =1801;
}
if (State_Automato == 1796 && Evento == 18) {
    State_Automato =1803;
}
if (State_Automato == 1818 && Evento == 18) {
    State_Automato =1827;
}
if (State_Automato == 1842 && Evento == 18) {
    State_Automato =1845;
}
if (State_Automato == 1852 && Evento == 18) {
    State_Automato =1853;
}
if (State_Automato == 1871 && Evento == 18) {
    State_Automato =1872;
}
if (State_Automato == 1765 && Evento == 18) {
    State_Automato =1886;
}
if (State_Automato == 1893 && Evento == 18) {
    State_Automato =1894;
}
if (State_Automato == 1920 && Evento == 18) {
    State_Automato =1921;
}
if (State_Automato == 1929 && Evento == 18) {
    State_Automato =1930;
}
if (State_Automato == 1938 && Evento == 18) {
    State_Automato =1939;
}
if (State_Automato == 1943 && Evento == 18) {
    State_Automato =1944;
}
if (State_Automato == 1946 && Evento == 18) {
    State_Automato =1947;
}
if (State_Automato == 1937 && Evento == 18) {
    State_Automato =1948;
}
if (State_Automato == 1953 && Evento == 18) {
    State_Automato =1956;
}
if (State_Automato == 1936 && Evento == 18) {
    State_Automato =1959;
}
if (State_Automato == 1966 && Evento == 18) {
    State_Automato =1967;
}
if (State_Automato == 1965 && Evento == 18) {
    State_Automato =1974;
}
if (State_Automato == 1981 && Evento == 18) {
    State_Automato =1984;
}
if (State_Automato == 1978 && Evento == 18) {
    State_Automato =1987;
}
if (State_Automato == 1994 && Evento == 18) {
    State_Automato =1995;
}
if (State_Automato == 1993 && Evento == 18) {
    State_Automato =1996;
}
if (State_Automato == 1992 && Evento == 18) {
    State_Automato =1997;
}
if (State_Automato == 1991 && Evento == 18) {
    State_Automato =1998;
}
if (State_Automato == 1928 && Evento == 18) {
    State_Automato =1999;
}
if (State_Automato == 2014 && Evento == 18) {
    State_Automato =2019;
}
if (State_Automato == 2025 && Evento == 18) {
    State_Automato =2034;
}
if (State_Automato == 2038 && Evento == 18) {
    State_Automato =2039;
}
if (State_Automato == 2047 && Evento == 18) {
    State_Automato =2050;
}
if (State_Automato == 2076 && Evento == 18) {
    State_Automato =2077;
}
if (State_Automato == 2085 && Evento == 18) {
    State_Automato =2086;
}
if (State_Automato == 2090 && Evento == 18) {
    State_Automato =2091;
}
if (State_Automato == 2084 && Evento == 18) {
    State_Automato =2093;
}
if (State_Automato == 2097 && Evento == 18) {
    State_Automato =2098;
}
if (State_Automato == 2083 && Evento == 18) {
    State_Automato =2100;
}
if (State_Automato == 2082 && Evento == 18) {
    State_Automato =2105;
}
if (State_Automato == 2110 && Evento == 18) {
    State_Automato =2111;
}
if (State_Automato == 2126 && Evento == 18) {
    State_Automato =2127;
}
if (State_Automato == 2125 && Evento == 18) {
    State_Automato =2128;
}
if (State_Automato == 2131 && Evento == 18) {
    State_Automato =2132;
}
if (State_Automato == 2137 && Evento == 18) {
    State_Automato =2138;
}
if (State_Automato == 2124 && Evento == 18) {
    State_Automato =2145;
}
if (State_Automato == 2157 && Evento == 18) {
    State_Automato =2158;
}
if (State_Automato == 2172 && Evento == 18) {
    State_Automato =2175;
}
if (State_Automato == 2176 && Evento == 18) {
    State_Automato =2177;
}
if (State_Automato == 2180 && Evento == 18) {
    State_Automato =2183;
}
if (State_Automato == 2188 && Evento == 18) {
    State_Automato =2189;
}
if (State_Automato == 1763 && Evento == 18) {
    State_Automato =2190;
}
if (State_Automato == 2201 && Evento == 18) {
    State_Automato =2206;
}
if (State_Automato == 2217 && Evento == 18) {
    State_Automato =2218;
}
if (State_Automato == 2226 && Evento == 18) {
    State_Automato =2227;
}
if (State_Automato == 2231 && Evento == 18) {
    State_Automato =2232;
}
if (State_Automato == 2198 && Evento == 18) {
    State_Automato =2241;
}
if (State_Automato == 2250 && Evento == 18) {
    State_Automato =2253;
}
if (State_Automato == 2274 && Evento == 18) {
    State_Automato =2275;
}
if (State_Automato == 2273 && Evento == 18) {
    State_Automato =2278;
}
if (State_Automato == 2272 && Evento == 18) {
    State_Automato =2283;
}
if (State_Automato == 2289 && Evento == 18) {
    State_Automato =2290;
}
if (State_Automato == 2297 && Evento == 18) {
    State_Automato =2298;
}
if (State_Automato == 2301 && Evento == 18) {
    State_Automato =2302;
}
if (State_Automato == 2296 && Evento == 18) {
    State_Automato =2303;
}
if (State_Automato == 2315 && Evento == 18) {
    State_Automato =2316;
}
if (State_Automato == 2314 && Evento == 18) {
    State_Automato =2317;
}
if (State_Automato == 2313 && Evento == 18) {
    State_Automato =2318;
}
if (State_Automato == 2268 && Evento == 18) {
    State_Automato =2319;
}
if (State_Automato == 2324 && Evento == 18) {
    State_Automato =2327;
}
if (State_Automato == 2335 && Evento == 18) {
    State_Automato =2336;
}
if (State_Automato == 2340 && Evento == 18) {
    State_Automato =2343;
}
if (State_Automato == 2344 && Evento == 18) {
    State_Automato =2345;
}
if (State_Automato == 2267 && Evento == 18) {
    State_Automato =2350;
}
if (State_Automato == 2363 && Evento == 18) {
    State_Automato =2364;
}
if (State_Automato == 2376 && Evento == 18) {
    State_Automato =2377;
}
if (State_Automato == 2362 && Evento == 18) {
    State_Automato =2379;
}
if (State_Automato == 2389 && Evento == 18) {
    State_Automato =2392;
}
if (State_Automato == 2388 && Evento == 18) {
    State_Automato =2393;
}
if (State_Automato == 2361 && Evento == 18) {
    State_Automato =2394;
}
if (State_Automato == 2360 && Evento == 18) {
    State_Automato =2403;
}
if (State_Automato == 2413 && Evento == 18) {
    State_Automato =2414;
}
if (State_Automato == 2418 && Evento == 18) {
    State_Automato =2419;
}
if (State_Automato == 2423 && Evento == 18) {
    State_Automato =2424;
}
if (State_Automato == 2427 && Evento == 18) {
    State_Automato =2428;
}
if (State_Automato == 2429 && Evento == 18) {
    State_Automato =2430;
}
if (State_Automato == 2412 && Evento == 18) {
    State_Automato =2431;
}
if (State_Automato == 2434 && Evento == 18) {
    State_Automato =2435;
}
if (State_Automato == 2411 && Evento == 18) {
    State_Automato =2436;
}
if (State_Automato == 2440 && Evento == 18) {
    State_Automato =2441;
}
if (State_Automato == 2449 && Evento == 18) {
    State_Automato =2450;
}
if (State_Automato == 2446 && Evento == 18) {
    State_Automato =2451;
}
if (State_Automato == 2456 && Evento == 18) {
    State_Automato =2457;
}
if (State_Automato == 2455 && Evento == 18) {
    State_Automato =2458;
}
if (State_Automato == 2463 && Evento == 18) {
    State_Automato =2476;
}
if (State_Automato == 2482 && Evento == 18) {
    State_Automato =2483;
}
if (State_Automato == 2492 && Evento == 18) {
    State_Automato =2493;
}
if (State_Automato == 2517 && Evento == 18) {
    State_Automato =2520;
}
if (State_Automato == 2516 && Evento == 18) {
    State_Automato =2521;
}
if (State_Automato == 2503 && Evento == 18) {
    State_Automato =2522;
}
if (State_Automato == 2502 && Evento == 18) {
    State_Automato =2531;
}
if (State_Automato == 2559 && Evento == 18) {
    State_Automato =2564;
}
if (State_Automato == 1762 && Evento == 18) {
    State_Automato =2567;
}
if (State_Automato == 2575 && Evento == 18) {
    State_Automato =2576;
}
if (State_Automato == 2582 && Evento == 18) {
    State_Automato =2583;
}
if (State_Automato == 2593 && Evento == 18) {
    State_Automato =2594;
}
if (State_Automato == 2597 && Evento == 18) {
    State_Automato =2598;
}
if (State_Automato == 2592 && Evento == 18) {
    State_Automato =2599;
}
if (State_Automato == 2603 && Evento == 18) {
    State_Automato =2604;
}
if (State_Automato == 2616 && Evento == 18) {
    State_Automato =2617;
}
if (State_Automato == 2622 && Evento == 18) {
    State_Automato =2623;
}
if (State_Automato == 2615 && Evento == 18) {
    State_Automato =2630;
}
if (State_Automato == 2614 && Evento == 18) {
    State_Automato =2641;
}
if (State_Automato == 2652 && Evento == 18) {
    State_Automato =2653;
}
if (State_Automato == 2658 && Evento == 18) {
    State_Automato =2659;
}
if (State_Automato == 2662 && Evento == 18) {
    State_Automato =2663;
}
if (State_Automato == 2657 && Evento == 18) {
    State_Automato =2664;
}
if (State_Automato == 2668 && Evento == 18) {
    State_Automato =2669;
}
if (State_Automato == 2651 && Evento == 18) {
    State_Automato =2670;
}
if (State_Automato == 2681 && Evento == 18) {
    State_Automato =2682;
}
if (State_Automato == 2688 && Evento == 18) {
    State_Automato =2689;
}
if (State_Automato == 2692 && Evento == 18) {
    State_Automato =2693;
}
if (State_Automato == 2697 && Evento == 18) {
    State_Automato =2698;
}
if (State_Automato == 2684 && Evento == 18) {
    State_Automato =2699;
}
if (State_Automato == 2706 && Evento == 18) {
    State_Automato =2707;
}
if (State_Automato == 2711 && Evento == 18) {
    State_Automato =2712;
}
if (State_Automato == 2715 && Evento == 18) {
    State_Automato =2716;
}
if (State_Automato == 2710 && Evento == 18) {
    State_Automato =2717;
}
if (State_Automato == 2720 && Evento == 18) {
    State_Automato =2721;
}
if (State_Automato == 2709 && Evento == 18) {
    State_Automato =2722;
}
if (State_Automato == 2725 && Evento == 18) {
    State_Automato =2726;
}
if (State_Automato == 2730 && Evento == 18) {
    State_Automato =2731;
}
if (State_Automato == 2729 && Evento == 18) {
    State_Automato =2732;
}
if (State_Automato == 2728 && Evento == 18) {
    State_Automato =2733;
}
if (State_Automato == 1761 && Evento == 18) {
    State_Automato =2734;
}
if (State_Automato == 2743 && Evento == 18) {
    State_Automato =2744;
}
if (State_Automato == 2757 && Evento == 18) {
    State_Automato =2758;
}
if (State_Automato == 2742 && Evento == 18) {
    State_Automato =2759;
}
if (State_Automato == 2790 && Evento == 18) {
    State_Automato =2791;
}
if (State_Automato == 2783 && Evento == 18) {
    State_Automato =2792;
}
if (State_Automato == 2801 && Evento == 18) {
    State_Automato =2802;
}
if (State_Automato == 2811 && Evento == 18) {
    State_Automato =2812;
}
if (State_Automato == 1760 && Evento == 18) {
    State_Automato =2817;
}
if (State_Automato == 2834 && Evento == 18) {
    State_Automato =2835;
}
if (State_Automato == 2857 && Evento == 18) {
    State_Automato =2858;
}
if (State_Automato == 2853 && Evento == 18) {
    State_Automato =2860;
}
if (State_Automato == 2865 && Evento == 18) {
    State_Automato =2866;
}
if (State_Automato == 2872 && Evento == 18) {
    State_Automato =2873;
}
if (State_Automato == 2871 && Evento == 18) {
    State_Automato =2878;
}
if (State_Automato == 2881 && Evento == 18) {
    State_Automato =2882;
}
if (State_Automato == 2870 && Evento == 18) {
    State_Automato =2883;
}
if (State_Automato == 2869 && Evento == 18) {
    State_Automato =2892;
}
if (State_Automato == 2897 && Evento == 18) {
    State_Automato =2898;
}
if (State_Automato == 2912 && Evento == 18) {
    State_Automato =2913;
}
if (State_Automato == 2927 && Evento == 18) {
    State_Automato =2930;
}
if (State_Automato == 2844 && Evento == 18) {
    State_Automato =2931;
}
if (State_Automato == 2938 && Evento == 18) {
    State_Automato =2939;
}
if (State_Automato == 2944 && Evento == 18) {
    State_Automato =2945;
}
if (State_Automato == 2937 && Evento == 18) {
    State_Automato =2946;
}
if (State_Automato == 2953 && Evento == 18) {
    State_Automato =2954;
}
if (State_Automato == 2952 && Evento == 18) {
    State_Automato =2961;
}
if (State_Automato == 2969 && Evento == 18) {
    State_Automato =2970;
}
if (State_Automato == 2968 && Evento == 18) {
    State_Automato =2971;
}
if (State_Automato == 2981 && Evento == 18) {
    State_Automato =2982;
}
if (State_Automato == 2843 && Evento == 18) {
    State_Automato =2988;
}
if (State_Automato == 3001 && Evento == 18) {
    State_Automato =3002;
}
if (State_Automato == 3000 && Evento == 18) {
    State_Automato =3003;
}
if (State_Automato == 3008 && Evento == 18) {
    State_Automato =3009;
}
if (State_Automato == 3014 && Evento == 18) {
    State_Automato =3015;
}
if (State_Automato == 3018 && Evento == 18) {
    State_Automato =3019;
}
if (State_Automato == 3023 && Evento == 18) {
    State_Automato =3024;
}
if (State_Automato == 3022 && Evento == 18) {
    State_Automato =3025;
}
if (State_Automato == 3036 && Evento == 18) {
    State_Automato =3037;
}
if (State_Automato == 2999 && Evento == 18) {
    State_Automato =3038;
}
if (State_Automato == 3049 && Evento == 18) {
    State_Automato =3050;
}
if (State_Automato == 3053 && Evento == 18) {
    State_Automato =3054;
}
if (State_Automato == 3048 && Evento == 18) {
    State_Automato =3055;
}
if (State_Automato == 3060 && Evento == 18) {
    State_Automato =3061;
}
if (State_Automato == 3059 && Evento == 18) {
    State_Automato =3062;
}
if (State_Automato == 3069 && Evento == 18) {
    State_Automato =3070;
}
if (State_Automato == 3073 && Evento == 18) {
    State_Automato =3074;
}
if (State_Automato == 3068 && Evento == 18) {
    State_Automato =3075;
}
if (State_Automato == 3079 && Evento == 18) {
    State_Automato =3080;
}
if (State_Automato == 2998 && Evento == 18) {
    State_Automato =3081;
}
if (State_Automato == 3089 && Evento == 18) {
    State_Automato =3090;
}
if (State_Automato == 3099 && Evento == 18) {
    State_Automato =3100;
}
if (State_Automato == 3095 && Evento == 18) {
    State_Automato =3102;
}
if (State_Automato == 3107 && Evento == 18) {
    State_Automato =3108;
}
if (State_Automato == 3118 && Evento == 18) {
    State_Automato =3121;
}
if (State_Automato == 3117 && Evento == 18) {
    State_Automato =3124;
}
if (State_Automato == 3116 && Evento == 18) {
    State_Automato =3129;
}
if (State_Automato == 3132 && Evento == 18) {
    State_Automato =3133;
}
if (State_Automato == 3115 && Evento == 18) {
    State_Automato =3134;
}
if (State_Automato == 3138 && Evento == 18) {
    State_Automato =3139;
}
if (State_Automato == 3142 && Evento == 18) {
    State_Automato =3143;
}
if (State_Automato == 3145 && Evento == 18) {
    State_Automato =3146;
}
if (State_Automato == 3114 && Evento == 18) {
    State_Automato =3147;
}
if (State_Automato == 3151 && Evento == 18) {
    State_Automato =3152;
}
if (State_Automato == 3158 && Evento == 18) {
    State_Automato =3159;
}
if (State_Automato == 3157 && Evento == 18) {
    State_Automato =3160;
}
if (State_Automato == 3163 && Evento == 18) {
    State_Automato =3164;
}
if (State_Automato == 3166 && Evento == 18) {
    State_Automato =3167;
}
if (State_Automato == 3171 && Evento == 18) {
    State_Automato =3172;
}
if (State_Automato == 3179 && Evento == 18) {
    State_Automato =3180;
}
if (State_Automato == 3184 && Evento == 18) {
    State_Automato =3185;
}
if (State_Automato == 3178 && Evento == 18) {
    State_Automato =3187;
}
if (State_Automato == 3197 && Evento == 18) {
    State_Automato =3198;
}
if (State_Automato == 3211 && Evento == 18) {
    State_Automato =3212;
}
if (State_Automato == 3170 && Evento == 18) {
    State_Automato =3213;
}
if (State_Automato == 3219 && Evento == 18) {
    State_Automato =3220;
}
if (State_Automato == 3230 && Evento == 18) {
    State_Automato =3235;
}
if (State_Automato == 3248 && Evento == 18) {
    State_Automato =3249;
}
if (State_Automato == 3247 && Evento == 18) {
    State_Automato =3250;
}
if (State_Automato == 3246 && Evento == 18) {
    State_Automato =3251;
}
if (State_Automato == 3271 && Evento == 18) {
    State_Automato =3272;
}
if (State_Automato == 3278 && Evento == 18) {
    State_Automato =3279;
}
if (State_Automato == 3277 && Evento == 18) {
    State_Automato =3284;
}
if (State_Automato == 3270 && Evento == 18) {
    State_Automato =3289;
}
if (State_Automato == 3305 && Evento == 18) {
    State_Automato =3306;
}
if (State_Automato == 3312 && Evento == 18) {
    State_Automato =3313;
}
if (State_Automato == 3328 && Evento == 18) {
    State_Automato =3331;
}
if (State_Automato == 3338 && Evento == 18) {
    State_Automato =3339;
}
if (State_Automato == 3340 && Evento == 18) {
    State_Automato =3341;
}
if (State_Automato == 3350 && Evento == 18) {
    State_Automato =3351;
}
if (State_Automato == 3356 && Evento == 18) {
    State_Automato =3357;
}
if (State_Automato == 3355 && Evento == 18) {
    State_Automato =3360;
}
if (State_Automato == 3346 && Evento == 18) {
    State_Automato =3361;
}
if (State_Automato == 3370 && Evento == 18) {
    State_Automato =3371;
}
if (State_Automato == 3345 && Evento == 18) {
    State_Automato =3372;
}
if (State_Automato == 3383 && Evento == 18) {
    State_Automato =3384;
}
if (State_Automato == 3395 && Evento == 18) {
    State_Automato =3396;
}
if (State_Automato == 2833 && Evento == 18) {
    State_Automato =3406;
}
if (State_Automato == 3418 && Evento == 18) {
    State_Automato =3421;
}
if (State_Automato == 3413 && Evento == 18) {
    State_Automato =3422;
}
if (State_Automato == 3427 && Evento == 18) {
    State_Automato =3428;
}
if (State_Automato == 3433 && Evento == 18) {
    State_Automato =3434;
}
if (State_Automato == 3440 && Evento == 18) {
    State_Automato =3441;
}
if (State_Automato == 3454 && Evento == 18) {
    State_Automato =3457;
}
if (State_Automato == 3460 && Evento == 18) {
    State_Automato =3461;
}
if (State_Automato == 3453 && Evento == 18) {
    State_Automato =3462;
}
if (State_Automato == 3471 && Evento == 18) {
    State_Automato =3472;
}
if (State_Automato == 3474 && Evento == 18) {
    State_Automato =3475;
}
if (State_Automato == 3489 && Evento == 18) {
    State_Automato =3490;
}
if (State_Automato == 3493 && Evento == 18) {
    State_Automato =3494;
}
if (State_Automato == 3495 && Evento == 18) {
    State_Automato =3496;
}
if (State_Automato == 2832 && Evento == 18) {
    State_Automato =3497;
}
if (State_Automato == 3504 && Evento == 18) {
    State_Automato =3505;
}
if (State_Automato == 3514 && Evento == 18) {
    State_Automato =3515;
}
if (State_Automato == 3522 && Evento == 18) {
    State_Automato =3523;
}
if (State_Automato == 3513 && Evento == 18) {
    State_Automato =3524;
}
if (State_Automato == 3536 && Evento == 18) {
    State_Automato =3537;
}
if (State_Automato == 3540 && Evento == 18) {
    State_Automato =3541;
}
if (State_Automato == 3535 && Evento == 18) {
    State_Automato =3542;
}
if (State_Automato == 3546 && Evento == 18) {
    State_Automato =3547;
}
if (State_Automato == 2831 && Evento == 18) {
    State_Automato =3548;
}
if (State_Automato == 3569 && Evento == 18) {
    State_Automato =3570;
}
if (State_Automato == 3566 && Evento == 18) {
    State_Automato =3571;
}
if (State_Automato == 3576 && Evento == 18) {
    State_Automato =3577;
}
if (State_Automato == 3565 && Evento == 18) {
    State_Automato =3578;
}
if (State_Automato == 3587 && Evento == 18) {
    State_Automato =3588;
}
if (State_Automato == 3591 && Evento == 18) {
    State_Automato =3592;
}
if (State_Automato == 3593 && Evento == 18) {
    State_Automato =3594;
}
if (State_Automato == 3603 && Evento == 18) {
    State_Automato =3604;
}
if (State_Automato == 3619 && Evento == 18) {
    State_Automato =3620;
}
if (State_Automato == 3618 && Evento == 18) {
    State_Automato =3621;
}
if (State_Automato == 3617 && Evento == 18) {
    State_Automato =3622;
}
if (State_Automato == 3564 && Evento == 18) {
    State_Automato =3623;
}
if (State_Automato == 3637 && Evento == 18) {
    State_Automato =3638;
}
if (State_Automato == 3651 && Evento == 18) {
    State_Automato =3654;
}
if (State_Automato == 3655 && Evento == 18) {
    State_Automato =3656;
}
if (State_Automato == 3636 && Evento == 18) {
    State_Automato =3657;
}
if (State_Automato == 3670 && Evento == 18) {
    State_Automato =3671;
}
if (State_Automato == 3563 && Evento == 18) {
    State_Automato =3672;
}
if (State_Automato == 3680 && Evento == 18) {
    State_Automato =3681;
}
if (State_Automato == 3688 && Evento == 18) {
    State_Automato =3689;
}
if (State_Automato == 3692 && Evento == 18) {
    State_Automato =3693;
}
if (State_Automato == 3687 && Evento == 18) {
    State_Automato =3694;
}
if (State_Automato == 3697 && Evento == 18) {
    State_Automato =3698;
}
if (State_Automato == 3686 && Evento == 18) {
    State_Automato =3699;
}
if (State_Automato == 3705 && Evento == 18) {
    State_Automato =3706;
}
if (State_Automato == 3708 && Evento == 18) {
    State_Automato =3709;
}
if (State_Automato == 3679 && Evento == 18) {
    State_Automato =3710;
}
if (State_Automato == 3715 && Evento == 18) {
    State_Automato =3716;
}
if (State_Automato == 3723 && Evento == 18) {
    State_Automato =3724;
}
if (State_Automato == 3722 && Evento == 18) {
    State_Automato =3729;
}
if (State_Automato == 3736 && Evento == 18) {
    State_Automato =3737;
}
if (State_Automato == 3747 && Evento == 18) {
    State_Automato =3748;
}
if (State_Automato == 3754 && Evento == 18) {
    State_Automato =3755;
}
if (State_Automato == 3753 && Evento == 18) {
    State_Automato =3756;
}
if (State_Automato == 3759 && Evento == 18) {
    State_Automato =3760;
}
if (State_Automato == 3752 && Evento == 18) {
    State_Automato =3761;
}
if (State_Automato == 3765 && Evento == 18) {
    State_Automato =3766;
}
if (State_Automato == 3746 && Evento == 18) {
    State_Automato =3767;
}
if (State_Automato == 3772 && Evento == 18) {
    State_Automato =3773;
}
if (State_Automato == 3782 && Evento == 18) {
    State_Automato =3783;
}
if (State_Automato == 3786 && Evento == 18) {
    State_Automato =3787;
}
if (State_Automato == 3781 && Evento == 18) {
    State_Automato =3788;
}
if (State_Automato == 3791 && Evento == 18) {
    State_Automato =3792;
}
if (State_Automato == 3780 && Evento == 18) {
    State_Automato =3793;
}
if (State_Automato == 3779 && Evento == 18) {
    State_Automato =3802;
}
if (State_Automato == 3808 && Evento == 18) {
    State_Automato =3809;
}
if (State_Automato == 3811 && Evento == 18) {
    State_Automato =3812;
}
if (State_Automato == 3562 && Evento == 18) {
    State_Automato =3813;
}
if (State_Automato == 3819 && Evento == 18) {
    State_Automato =3822;
}
if (State_Automato == 3829 && Evento == 18) {
    State_Automato =3832;
}
if (State_Automato == 3835 && Evento == 18) {
    State_Automato =3838;
}
if (State_Automato == 3845 && Evento == 18) {
    State_Automato =3846;
}
if (State_Automato == 3834 && Evento == 18) {
    State_Automato =3847;
}
if (State_Automato == 3850 && Evento == 18) {
    State_Automato =3851;
}
if (State_Automato == 3857 && Evento == 18) {
    State_Automato =3858;
}
if (State_Automato == 3856 && Evento == 18) {
    State_Automato =3859;
}
if (State_Automato == 3561 && Evento == 18) {
    State_Automato =3860;
}
if (State_Automato == 3867 && Evento == 18) {
    State_Automato =3868;
}
if (State_Automato == 3866 && Evento == 18) {
    State_Automato =3875;
}
if (State_Automato == 3887 && Evento == 18) {
    State_Automato =3890;
}
if (State_Automato == 3893 && Evento == 18) {
    State_Automato =3894;
}
if (State_Automato == 3907 && Evento == 18) {
    State_Automato =3908;
}
if (State_Automato == 3906 && Evento == 18) {
    State_Automato =3909;
}
if (State_Automato == 3905 && Evento == 18) {
    State_Automato =3910;
}
if (State_Automato == 3560 && Evento == 18) {
    State_Automato =3917;
}
if (State_Automato == 3923 && Evento == 18) {
    State_Automato =3924;
}
if (State_Automato == 3932 && Evento == 18) {
    State_Automato =3933;
}
if (State_Automato == 3944 && Evento == 18) {
    State_Automato =3945;
}
if (State_Automato == 3964 && Evento == 18) {
    State_Automato =3965;
}
if (State_Automato == 3966 && Evento == 18) {
    State_Automato =3967;
}
if (State_Automato == 3970 && Evento == 18) {
    State_Automato =3973;
}
if (State_Automato == 3974 && Evento == 18) {
    State_Automato =3975;
}
if (State_Automato == 3977 && Evento == 18) {
    State_Automato =3978;
}
if (State_Automato == 3976 && Evento == 18) {
    State_Automato =3979;
}
if (State_Automato == 3991 && Evento == 18) {
    State_Automato =3992;
}
if (State_Automato == 3998 && Evento == 18) {
    State_Automato =3999;
}
if (State_Automato == 4006 && Evento == 18) {
    State_Automato =4007;
}
if (State_Automato == 4010 && Evento == 18) {
    State_Automato =4011;
}
if (State_Automato == 3943 && Evento == 18) {
    State_Automato =4016;
}
if (State_Automato == 4038 && Evento == 18) {
    State_Automato =4039;
}
if (State_Automato == 4037 && Evento == 18) {
    State_Automato =4040;
}
if (State_Automato == 4047 && Evento == 18) {
    State_Automato =4048;
}
if (State_Automato == 4053 && Evento == 18) {
    State_Automato =4054;
}
if (State_Automato == 4062 && Evento == 18) {
    State_Automato =4063;
}
if (State_Automato == 4061 && Evento == 18) {
    State_Automato =4064;
}
if (State_Automato == 4067 && Evento == 18) {
    State_Automato =4068;
}
if (State_Automato == 4044 && Evento == 18) {
    State_Automato =4073;
}
if (State_Automato == 4078 && Evento == 18) {
    State_Automato =4079;
}
if (State_Automato == 4082 && Evento == 18) {
    State_Automato =4083;
}
if (State_Automato == 4077 && Evento == 18) {
    State_Automato =4084;
}
if (State_Automato == 4088 && Evento == 18) {
    State_Automato =4089;
}
if (State_Automato == 4094 && Evento == 18) {
    State_Automato =4097;
}
if (State_Automato == 4100 && Evento == 18) {
    State_Automato =4101;
}
if (State_Automato == 4093 && Evento == 18) {
    State_Automato =4102;
}
if (State_Automato == 4105 && Evento == 18) {
    State_Automato =4106;
}
if (State_Automato == 4092 && Evento == 18) {
    State_Automato =4107;
}
if (State_Automato == 4111 && Evento == 18) {
    State_Automato =4112;
}
if (State_Automato == 4115 && Evento == 18) {
    State_Automato =4116;
}
if (State_Automato == 4118 && Evento == 18) {
    State_Automato =4119;
}
if (State_Automato == 4091 && Evento == 18) {
    State_Automato =4120;
}
if (State_Automato == 4126 && Evento == 18) {
    State_Automato =4127;
}
if (State_Automato == 4130 && Evento == 18) {
    State_Automato =4131;
}
if (State_Automato == 4133 && Evento == 18) {
    State_Automato =4134;
}

}

function trans20(Evento) {
  if (State_Automato == 9 && Evento == 20) {
    State_Automato =10;
}
if (State_Automato == 15 && Evento == 20) {
    State_Automato =16;
}
if (State_Automato == 22 && Evento == 20) {
    State_Automato =23;
}
if (State_Automato == 30 && Evento == 20) {
    State_Automato =31;
}
if (State_Automato == 29 && Evento == 20) {
    State_Automato =34;
}
if (State_Automato == 28 && Evento == 20) {
    State_Automato =37;
}
if (State_Automato == 42 && Evento == 20) {
    State_Automato =43;
}
if (State_Automato == 46 && Evento == 20) {
    State_Automato =47;
}
if (State_Automato == 52 && Evento == 20) {
    State_Automato =53;
}
if (State_Automato == 54 && Evento == 20) {
    State_Automato =55;
}
if (State_Automato == 57 && Evento == 20) {
    State_Automato =58;
}
if (State_Automato == 64 && Evento == 20) {
    State_Automato =65;
}
if (State_Automato == 19 && Evento == 20) {
    State_Automato =68;
}
if (State_Automato == 72 && Evento == 20) {
    State_Automato =73;
}
if (State_Automato == 77 && Evento == 20) {
    State_Automato =78;
}
if (State_Automato == 90 && Evento == 20) {
    State_Automato =91;
}
if (State_Automato == 93 && Evento == 20) {
    State_Automato =94;
}
if (State_Automato == 102 && Evento == 20) {
    State_Automato =103;
}
if (State_Automato == 101 && Evento == 20) {
    State_Automato =108;
}
if (State_Automato == 100 && Evento == 20) {
    State_Automato =109;
}
if (State_Automato == 113 && Evento == 20) {
    State_Automato =114;
}
if (State_Automato == 112 && Evento == 20) {
    State_Automato =115;
}
if (State_Automato == 89 && Evento == 20) {
    State_Automato =116;
}
if (State_Automato == 118 && Evento == 20) {
    State_Automato =119;
}
if (State_Automato == 124 && Evento == 20) {
    State_Automato =125;
}
if (State_Automato == 123 && Evento == 20) {
    State_Automato =130;
}
if (State_Automato == 133 && Evento == 20) {
    State_Automato =134;
}
if (State_Automato == 88 && Evento == 20) {
    State_Automato =135;
}
if (State_Automato == 139 && Evento == 20) {
    State_Automato =140;
}
if (State_Automato == 138 && Evento == 20) {
    State_Automato =141;
}
if (State_Automato == 144 && Evento == 20) {
    State_Automato =145;
}
if (State_Automato == 146 && Evento == 20) {
    State_Automato =147;
}
if (State_Automato == 87 && Evento == 20) {
    State_Automato =148;
}
if (State_Automato == 150 && Evento == 20) {
    State_Automato =151;
}
if (State_Automato == 155 && Evento == 20) {
    State_Automato =156;
}
if (State_Automato == 86 && Evento == 20) {
    State_Automato =157;
}
if (State_Automato == 168 && Evento == 20) {
    State_Automato =169;
}
if (State_Automato == 167 && Evento == 20) {
    State_Automato =170;
}
if (State_Automato == 166 && Evento == 20) {
    State_Automato =171;
}
if (State_Automato == 172 && Evento == 20) {
    State_Automato =173;
}
if (State_Automato == 163 && Evento == 20) {
    State_Automato =174;
}
if (State_Automato == 175 && Evento == 20) {
    State_Automato =176;
}
if (State_Automato == 177 && Evento == 20) {
    State_Automato =178;
}
if (State_Automato == 162 && Evento == 20) {
    State_Automato =179;
}
if (State_Automato == 182 && Evento == 20) {
    State_Automato =183;
}
if (State_Automato == 181 && Evento == 20) {
    State_Automato =188;
}
if (State_Automato == 193 && Evento == 20) {
    State_Automato =194;
}
if (State_Automato == 192 && Evento == 20) {
    State_Automato =195;
}
if (State_Automato == 196 && Evento == 20) {
    State_Automato =197;
}
if (State_Automato == 204 && Evento == 20) {
    State_Automato =205;
}
if (State_Automato == 210 && Evento == 20) {
    State_Automato =211;
}
if (State_Automato == 209 && Evento == 20) {
    State_Automato =212;
}
if (State_Automato == 208 && Evento == 20) {
    State_Automato =213;
}
if (State_Automato == 217 && Evento == 20) {
    State_Automato =218;
}
if (State_Automato == 216 && Evento == 20) {
    State_Automato =223;
}
if (State_Automato == 226 && Evento == 20) {
    State_Automato =227;
}
if (State_Automato == 203 && Evento == 20) {
    State_Automato =228;
}
if (State_Automato == 231 && Evento == 20) {
    State_Automato =232;
}
if (State_Automato == 235 && Evento == 20) {
    State_Automato =236;
}
if (State_Automato == 202 && Evento == 20) {
    State_Automato =237;
}
if (State_Automato == 245 && Evento == 20) {
    State_Automato =246;
}
if (State_Automato == 244 && Evento == 20) {
    State_Automato =247;
}
if (State_Automato == 252 && Evento == 20) {
    State_Automato =253;
}
if (State_Automato == 251 && Evento == 20) {
    State_Automato =254;
}
if (State_Automato == 250 && Evento == 20) {
    State_Automato =255;
}
if (State_Automato == 243 && Evento == 20) {
    State_Automato =256;
}
if (State_Automato == 260 && Evento == 20) {
    State_Automato =261;
}
if (State_Automato == 259 && Evento == 20) {
    State_Automato =262;
}
if (State_Automato == 242 && Evento == 20) {
    State_Automato =263;
}
if (State_Automato == 266 && Evento == 20) {
    State_Automato =267;
}
if (State_Automato == 241 && Evento == 20) {
    State_Automato =268;
}
if (State_Automato == 273 && Evento == 20) {
    State_Automato =274;
}
if (State_Automato == 281 && Evento == 20) {
    State_Automato =282;
}
if (State_Automato == 287 && Evento == 20) {
    State_Automato =288;
}
if (State_Automato == 272 && Evento == 20) {
    State_Automato =291;
}
if (State_Automato == 296 && Evento == 20) {
    State_Automato =297;
}
if (State_Automato == 302 && Evento == 20) {
    State_Automato =303;
}
if (State_Automato == 306 && Evento == 20) {
    State_Automato =307;
}
if (State_Automato == 310 && Evento == 20) {
    State_Automato =311;
}
if (State_Automato == 316 && Evento == 20) {
    State_Automato =317;
}
if (State_Automato == 321 && Evento == 20) {
    State_Automato =322;
}
if (State_Automato == 320 && Evento == 20) {
    State_Automato =325;
}
if (State_Automato == 328 && Evento == 20) {
    State_Automato =329;
}
if (State_Automato == 334 && Evento == 20) {
    State_Automato =335;
}
if (State_Automato == 340 && Evento == 20) {
    State_Automato =341;
}
if (State_Automato == 339 && Evento == 20) {
    State_Automato =344;
}
if (State_Automato == 333 && Evento == 20) {
    State_Automato =348;
}
if (State_Automato == 332 && Evento == 20) {
    State_Automato =351;
}
if (State_Automato == 331 && Evento == 20) {
    State_Automato =354;
}
if (State_Automato == 357 && Evento == 20) {
    State_Automato =358;
}
if (State_Automato == 359 && Evento == 20) {
    State_Automato =360;
}
if (State_Automato == 368 && Evento == 20) {
    State_Automato =369;
}
if (State_Automato == 373 && Evento == 20) {
    State_Automato =374;
}
if (State_Automato == 380 && Evento == 20) {
    State_Automato =381;
}
if (State_Automato == 367 && Evento == 20) {
    State_Automato =384;
}
if (State_Automato == 389 && Evento == 20) {
    State_Automato =390;
}
if (State_Automato == 391 && Evento == 20) {
    State_Automato =392;
}
if (State_Automato == 396 && Evento == 20) {
    State_Automato =397;
}
if (State_Automato == 399 && Evento == 20) {
    State_Automato =400;
}
if (State_Automato == 413 && Evento == 20) {
    State_Automato =414;
}
if (State_Automato == 415 && Evento == 20) {
    State_Automato =416;
}
if (State_Automato == 417 && Evento == 20) {
    State_Automato =418;
}
if (State_Automato == 412 && Evento == 20) {
    State_Automato =419;
}
if (State_Automato == 422 && Evento == 20) {
    State_Automato =423;
}
if (State_Automato == 426 && Evento == 20) {
    State_Automato =427;
}
if (State_Automato == 411 && Evento == 20) {
    State_Automato =428;
}
if (State_Automato == 432 && Evento == 20) {
    State_Automato =433;
}
if (State_Automato == 436 && Evento == 20) {
    State_Automato =437;
}
if (State_Automato == 431 && Evento == 20) {
    State_Automato =440;
}
if (State_Automato == 447 && Evento == 20) {
    State_Automato =448;
}
if (State_Automato == 453 && Evento == 20) {
    State_Automato =454;
}
if (State_Automato == 457 && Evento == 20) {
    State_Automato =458;
}
if (State_Automato == 469 && Evento == 20) {
    State_Automato =470;
}
if (State_Automato == 479 && Evento == 20) {
    State_Automato =480;
}
if (State_Automato == 483 && Evento == 20) {
    State_Automato =486;
}
if (State_Automato == 494 && Evento == 20) {
    State_Automato =495;
}
if (State_Automato == 493 && Evento == 20) {
    State_Automato =498;
}
if (State_Automato == 492 && Evento == 20) {
    State_Automato =503;
}
if (State_Automato == 506 && Evento == 20) {
    State_Automato =507;
}
if (State_Automato == 478 && Evento == 20) {
    State_Automato =511;
}
if (State_Automato == 513 && Evento == 20) {
    State_Automato =514;
}
if (State_Automato == 519 && Evento == 20) {
    State_Automato =520;
}
if (State_Automato == 518 && Evento == 20) {
    State_Automato =523;
}
if (State_Automato == 524 && Evento == 20) {
    State_Automato =525;
}
if (State_Automato == 528 && Evento == 20) {
    State_Automato =529;
}
if (State_Automato == 477 && Evento == 20) {
    State_Automato =530;
}
if (State_Automato == 534 && Evento == 20) {
    State_Automato =535;
}
if (State_Automato == 540 && Evento == 20) {
    State_Automato =541;
}
if (State_Automato == 476 && Evento == 20) {
    State_Automato =545;
}
if (State_Automato == 549 && Evento == 20) {
    State_Automato =550;
}
if (State_Automato == 553 && Evento == 20) {
    State_Automato =554;
}
if (State_Automato == 475 && Evento == 20) {
    State_Automato =558;
}
if (State_Automato == 563 && Evento == 20) {
    State_Automato =564;
}
if (State_Automato == 569 && Evento == 20) {
    State_Automato =570;
}
if (State_Automato == 568 && Evento == 20) {
    State_Automato =573;
}
if (State_Automato == 567 && Evento == 20) {
    State_Automato =574;
}
if (State_Automato == 577 && Evento == 20) {
    State_Automato =578;
}
if (State_Automato == 579 && Evento == 20) {
    State_Automato =580;
}
if (State_Automato == 584 && Evento == 20) {
    State_Automato =585;
}
if (State_Automato == 583 && Evento == 20) {
    State_Automato =590;
}
if (State_Automato == 595 && Evento == 20) {
    State_Automato =596;
}
if (State_Automato == 598 && Evento == 20) {
    State_Automato =599;
}
if (State_Automato == 597 && Evento == 20) {
    State_Automato =600;
}
if (State_Automato == 562 && Evento == 20) {
    State_Automato =601;
}
if (State_Automato == 606 && Evento == 20) {
    State_Automato =607;
}
if (State_Automato == 612 && Evento == 20) {
    State_Automato =613;
}
if (State_Automato == 611 && Evento == 20) {
    State_Automato =618;
}
if (State_Automato == 623 && Evento == 20) {
    State_Automato =624;
}
if (State_Automato == 622 && Evento == 20) {
    State_Automato =625;
}
if (State_Automato == 626 && Evento == 20) {
    State_Automato =627;
}
if (State_Automato == 630 && Evento == 20) {
    State_Automato =631;
}
if (State_Automato == 561 && Evento == 20) {
    State_Automato =632;
}
if (State_Automato == 642 && Evento == 20) {
    State_Automato =643;
}
if (State_Automato == 650 && Evento == 20) {
    State_Automato =651;
}
if (State_Automato == 649 && Evento == 20) {
    State_Automato =654;
}
if (State_Automato == 648 && Evento == 20) {
    State_Automato =655;
}
if (State_Automato == 641 && Evento == 20) {
    State_Automato =658;
}
if (State_Automato == 665 && Evento == 20) {
    State_Automato =666;
}
if (State_Automato == 664 && Evento == 20) {
    State_Automato =669;
}
if (State_Automato == 663 && Evento == 20) {
    State_Automato =670;
}
if (State_Automato == 640 && Evento == 20) {
    State_Automato =673;
}
if (State_Automato == 676 && Evento == 20) {
    State_Automato =677;
}
if (State_Automato == 680 && Evento == 20) {
    State_Automato =681;
}
if (State_Automato == 639 && Evento == 20) {
    State_Automato =684;
}
if (State_Automato == 685 && Evento == 20) {
    State_Automato =686;
}
if (State_Automato == 638 && Evento == 20) {
    State_Automato =687;
}
if (State_Automato == 692 && Evento == 20) {
    State_Automato =693;
}
if (State_Automato == 694 && Evento == 20) {
    State_Automato =695;
}
if (State_Automato == 700 && Evento == 20) {
    State_Automato =701;
}
if (State_Automato == 699 && Evento == 20) {
    State_Automato =702;
}
if (State_Automato == 705 && Evento == 20) {
    State_Automato =706;
}
if (State_Automato == 704 && Evento == 20) {
    State_Automato =707;
}
if (State_Automato == 713 && Evento == 20) {
    State_Automato =714;
}
if (State_Automato == 712 && Evento == 20) {
    State_Automato =715;
}
if (State_Automato == 716 && Evento == 20) {
    State_Automato =717;
}
if (State_Automato == 711 && Evento == 20) {
    State_Automato =718;
}
if (State_Automato == 719 && Evento == 20) {
    State_Automato =720;
}
if (State_Automato == 710 && Evento == 20) {
    State_Automato =721;
}
if (State_Automato == 724 && Evento == 20) {
    State_Automato =725;
}
if (State_Automato == 709 && Evento == 20) {
    State_Automato =726;
}
if (State_Automato == 728 && Evento == 20) {
    State_Automato =729;
}
if (State_Automato == 727 && Evento == 20) {
    State_Automato =730;
}
if (State_Automato == 737 && Evento == 20) {
    State_Automato =738;
}
if (State_Automato == 740 && Evento == 20) {
    State_Automato =741;
}
if (State_Automato == 746 && Evento == 20) {
    State_Automato =747;
}
if (State_Automato == 745 && Evento == 20) {
    State_Automato =750;
}
if (State_Automato == 751 && Evento == 20) {
    State_Automato =752;
}
if (State_Automato == 736 && Evento == 20) {
    State_Automato =753;
}
if (State_Automato == 757 && Evento == 20) {
    State_Automato =758;
}
if (State_Automato == 735 && Evento == 20) {
    State_Automato =762;
}
if (State_Automato == 766 && Evento == 20) {
    State_Automato =767;
}
if (State_Automato == 734 && Evento == 20) {
    State_Automato =771;
}
if (State_Automato == 778 && Evento == 20) {
    State_Automato =779;
}
if (State_Automato == 783 && Evento == 20) {
    State_Automato =784;
}
if (State_Automato == 782 && Evento == 20) {
    State_Automato =785;
}
if (State_Automato == 788 && Evento == 20) {
    State_Automato =789;
}
if (State_Automato == 777 && Evento == 20) {
    State_Automato =790;
}
if (State_Automato == 791 && Evento == 20) {
    State_Automato =792;
}
if (State_Automato == 776 && Evento == 20) {
    State_Automato =793;
}
if (State_Automato == 794 && Evento == 20) {
    State_Automato =795;
}
if (State_Automato == 796 && Evento == 20) {
    State_Automato =797;
}
if (State_Automato == 775 && Evento == 20) {
    State_Automato =798;
}
if (State_Automato == 801 && Evento == 20) {
    State_Automato =802;
}
if (State_Automato == 814 && Evento == 20) {
    State_Automato =815;
}
if (State_Automato == 813 && Evento == 20) {
    State_Automato =816;
}
if (State_Automato == 817 && Evento == 20) {
    State_Automato =818;
}
if (State_Automato == 468 && Evento == 20) {
    State_Automato =819;
}
if (State_Automato == 822 && Evento == 20) {
    State_Automato =823;
}
if (State_Automato == 826 && Evento == 20) {
    State_Automato =827;
}
if (State_Automato == 830 && Evento == 20) {
    State_Automato =831;
}
if (State_Automato == 821 && Evento == 20) {
    State_Automato =832;
}
if (State_Automato == 838 && Evento == 20) {
    State_Automato =839;
}
if (State_Automato == 842 && Evento == 20) {
    State_Automato =843;
}
if (State_Automato == 837 && Evento == 20) {
    State_Automato =846;
}
if (State_Automato == 847 && Evento == 20) {
    State_Automato =848;
}
if (State_Automato == 836 && Evento == 20) {
    State_Automato =849;
}
if (State_Automato == 854 && Evento == 20) {
    State_Automato =855;
}
if (State_Automato == 860 && Evento == 20) {
    State_Automato =861;
}
if (State_Automato == 863 && Evento == 20) {
    State_Automato =864;
}
if (State_Automato == 869 && Evento == 20) {
    State_Automato =870;
}
if (State_Automato == 872 && Evento == 20) {
    State_Automato =873;
}
if (State_Automato == 877 && Evento == 20) {
    State_Automato =878;
}
if (State_Automato == 868 && Evento == 20) {
    State_Automato =879;
}
if (State_Automato == 882 && Evento == 20) {
    State_Automato =883;
}
if (State_Automato == 467 && Evento == 20) {
    State_Automato =884;
}
if (State_Automato == 886 && Evento == 20) {
    State_Automato =887;
}
if (State_Automato == 891 && Evento == 20) {
    State_Automato =892;
}
if (State_Automato == 901 && Evento == 20) {
    State_Automato =904;
}
if (State_Automato == 907 && Evento == 20) {
    State_Automato =908;
}
if (State_Automato == 915 && Evento == 20) {
    State_Automato =916;
}
if (State_Automato == 921 && Evento == 20) {
    State_Automato =924;
}
if (State_Automato == 930 && Evento == 20) {
    State_Automato =931;
}
if (State_Automato == 936 && Evento == 20) {
    State_Automato =937;
}
if (State_Automato == 935 && Evento == 20) {
    State_Automato =938;
}
if (State_Automato == 941 && Evento == 20) {
    State_Automato =942;
}
if (State_Automato == 945 && Evento == 20) {
    State_Automato =946;
}
if (State_Automato == 954 && Evento == 20) {
    State_Automato =955;
}
if (State_Automato == 961 && Evento == 20) {
    State_Automato =962;
}
if (State_Automato == 960 && Evento == 20) {
    State_Automato =963;
}
if (State_Automato == 959 && Evento == 20) {
    State_Automato =964;
}
if (State_Automato == 968 && Evento == 20) {
    State_Automato =969;
}
if (State_Automato == 967 && Evento == 20) {
    State_Automato =970;
}
if (State_Automato == 966 && Evento == 20) {
    State_Automato =971;
}
if (State_Automato == 953 && Evento == 20) {
    State_Automato =972;
}
if (State_Automato == 977 && Evento == 20) {
    State_Automato =978;
}
if (State_Automato == 976 && Evento == 20) {
    State_Automato =981;
}
if (State_Automato == 987 && Evento == 20) {
    State_Automato =988;
}
if (State_Automato == 986 && Evento == 20) {
    State_Automato =989;
}
if (State_Automato == 985 && Evento == 20) {
    State_Automato =990;
}
if (State_Automato == 996 && Evento == 20) {
    State_Automato =997;
}
if (State_Automato == 998 && Evento == 20) {
    State_Automato =999;
}
if (State_Automato == 995 && Evento == 20) {
    State_Automato =1000;
}
if (State_Automato == 994 && Evento == 20) {
    State_Automato =1003;
}
if (State_Automato == 1006 && Evento == 20) {
    State_Automato =1007;
}
if (State_Automato == 993 && Evento == 20) {
    State_Automato =1010;
}
if (State_Automato == 1013 && Evento == 20) {
    State_Automato =1014;
}
if (State_Automato == 992 && Evento == 20) {
    State_Automato =1017;
}
if (State_Automato == 1021 && Evento == 20) {
    State_Automato =1022;
}
if (State_Automato == 1023 && Evento == 20) {
    State_Automato =1024;
}
if (State_Automato == 1020 && Evento == 20) {
    State_Automato =1025;
}
if (State_Automato == 1028 && Evento == 20) {
    State_Automato =1029;
}
if (State_Automato == 1030 && Evento == 20) {
    State_Automato =1031;
}
if (State_Automato == 897 && Evento == 20) {
    State_Automato =1032;
}
if (State_Automato == 1036 && Evento == 20) {
    State_Automato =1037;
}
if (State_Automato == 1045 && Evento == 20) {
    State_Automato =1046;
}
if (State_Automato == 1044 && Evento == 20) {
    State_Automato =1047;
}
if (State_Automato == 1056 && Evento == 20) {
    State_Automato =1057;
}
if (State_Automato == 1061 && Evento == 20) {
    State_Automato =1062;
}
if (State_Automato == 1060 && Evento == 20) {
    State_Automato =1063;
}
if (State_Automato == 1055 && Evento == 20) {
    State_Automato =1064;
}
if (State_Automato == 1067 && Evento == 20) {
    State_Automato =1068;
}
if (State_Automato == 1054 && Evento == 20) {
    State_Automato =1069;
}
if (State_Automato == 1070 && Evento == 20) {
    State_Automato =1071;
}
if (State_Automato == 1053 && Evento == 20) {
    State_Automato =1072;
}
if (State_Automato == 1076 && Evento == 20) {
    State_Automato =1077;
}
if (State_Automato == 1081 && Evento == 20) {
    State_Automato =1082;
}
if (State_Automato == 1080 && Evento == 20) {
    State_Automato =1083;
}
if (State_Automato == 1084 && Evento == 20) {
    State_Automato =1085;
}
if (State_Automato == 1075 && Evento == 20) {
    State_Automato =1086;
}
if (State_Automato == 1088 && Evento == 20) {
    State_Automato =1089;
}
if (State_Automato == 1087 && Evento == 20) {
    State_Automato =1090;
}
if (State_Automato == 896 && Evento == 20) {
    State_Automato =1091;
}
if (State_Automato == 1102 && Evento == 20) {
    State_Automato =1103;
}
if (State_Automato == 1106 && Evento == 20) {
    State_Automato =1107;
}
if (State_Automato == 1110 && Evento == 20) {
    State_Automato =1111;
}
if (State_Automato == 1101 && Evento == 20) {
    State_Automato =1112;
}
if (State_Automato == 1113 && Evento == 20) {
    State_Automato =1114;
}
if (State_Automato == 1100 && Evento == 20) {
    State_Automato =1115;
}
if (State_Automato == 1121 && Evento == 20) {
    State_Automato =1122;
}
if (State_Automato == 1120 && Evento == 20) {
    State_Automato =1125;
}
if (State_Automato == 1128 && Evento == 20) {
    State_Automato =1129;
}
if (State_Automato == 1133 && Evento == 20) {
    State_Automato =1134;
}
if (State_Automato == 1139 && Evento == 20) {
    State_Automato =1140;
}
if (State_Automato == 1132 && Evento == 20) {
    State_Automato =1143;
}
if (State_Automato == 1146 && Evento == 20) {
    State_Automato =1147;
}
if (State_Automato == 1150 && Evento == 20) {
    State_Automato =1151;
}
if (State_Automato == 895 && Evento == 20) {
    State_Automato =1152;
}
if (State_Automato == 1154 && Evento == 20) {
    State_Automato =1155;
}
if (State_Automato == 1161 && Evento == 20) {
    State_Automato =1162;
}
if (State_Automato == 1172 && Evento == 20) {
    State_Automato =1173;
}
if (State_Automato == 1182 && Evento == 20) {
    State_Automato =1183;
}
if (State_Automato == 1189 && Evento == 20) {
    State_Automato =1190;
}
if (State_Automato == 1188 && Evento == 20) {
    State_Automato =1191;
}
if (State_Automato == 1187 && Evento == 20) {
    State_Automato =1196;
}
if (State_Automato == 1202 && Evento == 20) {
    State_Automato =1203;
}
if (State_Automato == 1201 && Evento == 20) {
    State_Automato =1204;
}
if (State_Automato == 1200 && Evento == 20) {
    State_Automato =1205;
}
if (State_Automato == 1181 && Evento == 20) {
    State_Automato =1206;
}
if (State_Automato == 1211 && Evento == 20) {
    State_Automato =1212;
}
if (State_Automato == 1210 && Evento == 20) {
    State_Automato =1213;
}
if (State_Automato == 1217 && Evento == 20) {
    State_Automato =1218;
}
if (State_Automato == 1216 && Evento == 20) {
    State_Automato =1219;
}
if (State_Automato == 1215 && Evento == 20) {
    State_Automato =1220;
}
if (State_Automato == 1180 && Evento == 20) {
    State_Automato =1221;
}
if (State_Automato == 1226 && Evento == 20) {
    State_Automato =1227;
}
if (State_Automato == 1225 && Evento == 20) {
    State_Automato =1232;
}
if (State_Automato == 1237 && Evento == 20) {
    State_Automato =1238;
}
if (State_Automato == 1236 && Evento == 20) {
    State_Automato =1239;
}
if (State_Automato == 1179 && Evento == 20) {
    State_Automato =1240;
}
if (State_Automato == 1245 && Evento == 20) {
    State_Automato =1246;
}
if (State_Automato == 1250 && Evento == 20) {
    State_Automato =1251;
}
if (State_Automato == 1255 && Evento == 20) {
    State_Automato =1256;
}
if (State_Automato == 1178 && Evento == 20) {
    State_Automato =1257;
}
if (State_Automato == 1268 && Evento == 20) {
    State_Automato =1269;
}
if (State_Automato == 1267 && Evento == 20) {
    State_Automato =1270;
}
if (State_Automato == 1266 && Evento == 20) {
    State_Automato =1271;
}
if (State_Automato == 1272 && Evento == 20) {
    State_Automato =1273;
}
if (State_Automato == 1275 && Evento == 20) {
    State_Automato =1276;
}
if (State_Automato == 1274 && Evento == 20) {
    State_Automato =1281;
}
if (State_Automato == 1285 && Evento == 20) {
    State_Automato =1286;
}
if (State_Automato == 1284 && Evento == 20) {
    State_Automato =1287;
}
if (State_Automato == 1265 && Evento == 20) {
    State_Automato =1288;
}
if (State_Automato == 1292 && Evento == 20) {
    State_Automato =1293;
}
if (State_Automato == 1297 && Evento == 20) {
    State_Automato =1298;
}
if (State_Automato == 1264 && Evento == 20) {
    State_Automato =1299;
}
if (State_Automato == 1307 && Evento == 20) {
    State_Automato =1308;
}
if (State_Automato == 1306 && Evento == 20) {
    State_Automato =1309;
}
if (State_Automato == 1314 && Evento == 20) {
    State_Automato =1315;
}
if (State_Automato == 1313 && Evento == 20) {
    State_Automato =1316;
}
if (State_Automato == 1312 && Evento == 20) {
    State_Automato =1317;
}
if (State_Automato == 1305 && Evento == 20) {
    State_Automato =1318;
}
if (State_Automato == 1322 && Evento == 20) {
    State_Automato =1323;
}
if (State_Automato == 1321 && Evento == 20) {
    State_Automato =1324;
}
if (State_Automato == 1304 && Evento == 20) {
    State_Automato =1325;
}
if (State_Automato == 1328 && Evento == 20) {
    State_Automato =1329;
}
if (State_Automato == 1303 && Evento == 20) {
    State_Automato =1330;
}
if (State_Automato == 1338 && Evento == 20) {
    State_Automato =1339;
}
if (State_Automato == 1337 && Evento == 20) {
    State_Automato =1340;
}
if (State_Automato == 1336 && Evento == 20) {
    State_Automato =1341;
}
if (State_Automato == 1335 && Evento == 20) {
    State_Automato =1342;
}
if (State_Automato == 1334 && Evento == 20) {
    State_Automato =1343;
}
if (State_Automato == 1171 && Evento == 20) {
    State_Automato =1344;
}
if (State_Automato == 1351 && Evento == 20) {
    State_Automato =1352;
}
if (State_Automato == 1356 && Evento == 20) {
    State_Automato =1357;
}
if (State_Automato == 1355 && Evento == 20) {
    State_Automato =1358;
}
if (State_Automato == 1350 && Evento == 20) {
    State_Automato =1359;
}
if (State_Automato == 1360 && Evento == 20) {
    State_Automato =1361;
}
if (State_Automato == 1349 && Evento == 20) {
    State_Automato =1362;
}
if (State_Automato == 1366 && Evento == 20) {
    State_Automato =1367;
}
if (State_Automato == 1371 && Evento == 20) {
    State_Automato =1372;
}
if (State_Automato == 1348 && Evento == 20) {
    State_Automato =1373;
}
if (State_Automato == 1378 && Evento == 20) {
    State_Automato =1379;
}
if (State_Automato == 1381 && Evento == 20) {
    State_Automato =1382;
}
if (State_Automato == 1380 && Evento == 20) {
    State_Automato =1383;
}
if (State_Automato == 1377 && Evento == 20) {
    State_Automato =1384;
}
if (State_Automato == 1387 && Evento == 20) {
    State_Automato =1388;
}
if (State_Automato == 1376 && Evento == 20) {
    State_Automato =1389;
}
if (State_Automato == 1396 && Evento == 20) {
    State_Automato =1397;
}
if (State_Automato == 1395 && Evento == 20) {
    State_Automato =1398;
}
if (State_Automato == 1394 && Evento == 20) {
    State_Automato =1399;
}
if (State_Automato == 1393 && Evento == 20) {
    State_Automato =1400;
}
if (State_Automato == 1170 && Evento == 20) {
    State_Automato =1401;
}
if (State_Automato == 1406 && Evento == 20) {
    State_Automato =1407;
}
if (State_Automato == 1411 && Evento == 20) {
    State_Automato =1412;
}
if (State_Automato == 1410 && Evento == 20) {
    State_Automato =1413;
}
if (State_Automato == 1405 && Evento == 20) {
    State_Automato =1414;
}
if (State_Automato == 1404 && Evento == 20) {
    State_Automato =1415;
}
if (State_Automato == 1169 && Evento == 20) {
    State_Automato =1416;
}
if (State_Automato == 1421 && Evento == 20) {
    State_Automato =1422;
}
if (State_Automato == 1426 && Evento == 20) {
    State_Automato =1427;
}
if (State_Automato == 1431 && Evento == 20) {
    State_Automato =1432;
}
if (State_Automato == 1420 && Evento == 20) {
    State_Automato =1433;
}
if (State_Automato == 1436 && Evento == 20) {
    State_Automato =1437;
}
if (State_Automato == 1438 && Evento == 20) {
    State_Automato =1439;
}
if (State_Automato == 1445 && Evento == 20) {
    State_Automato =1446;
}
if (State_Automato == 1444 && Evento == 20) {
    State_Automato =1447;
}
if (State_Automato == 1443 && Evento == 20) {
    State_Automato =1448;
}
if (State_Automato == 1168 && Evento == 20) {
    State_Automato =1449;
}
if (State_Automato == 1452 && Evento == 20) {
    State_Automato =1453;
}
if (State_Automato == 1458 && Evento == 20) {
    State_Automato =1459;
}
if (State_Automato == 1451 && Evento == 20) {
    State_Automato =1460;
}
if (State_Automato == 1463 && Evento == 20) {
    State_Automato =1464;
}
if (State_Automato == 1469 && Evento == 20) {
    State_Automato =1470;
}
if (State_Automato == 1468 && Evento == 20) {
    State_Automato =1471;
}
if (State_Automato == 1167 && Evento == 20) {
    State_Automato =1472;
}
if (State_Automato == 1476 && Evento == 20) {
    State_Automato =1477;
}
if (State_Automato == 1485 && Evento == 20) {
    State_Automato =1486;
}
if (State_Automato == 1166 && Evento == 20) {
    State_Automato =1487;
}
if (State_Automato == 1499 && Evento == 20) {
    State_Automato =1500;
}
if (State_Automato == 1507 && Evento == 20) {
    State_Automato =1508;
}
if (State_Automato == 1513 && Evento == 20) {
    State_Automato =1514;
}
if (State_Automato == 1512 && Evento == 20) {
    State_Automato =1515;
}
if (State_Automato == 1511 && Evento == 20) {
    State_Automato =1516;
}
if (State_Automato == 1506 && Evento == 20) {
    State_Automato =1517;
}
if (State_Automato == 1522 && Evento == 20) {
    State_Automato =1523;
}
if (State_Automato == 1521 && Evento == 20) {
    State_Automato =1524;
}
if (State_Automato == 1520 && Evento == 20) {
    State_Automato =1525;
}
if (State_Automato == 1505 && Evento == 20) {
    State_Automato =1526;
}
if (State_Automato == 1527 && Evento == 20) {
    State_Automato =1528;
}
if (State_Automato == 1529 && Evento == 20) {
    State_Automato =1530;
}
if (State_Automato == 1504 && Evento == 20) {
    State_Automato =1531;
}
if (State_Automato == 1532 && Evento == 20) {
    State_Automato =1533;
}
if (State_Automato == 1503 && Evento == 20) {
    State_Automato =1534;
}
if (State_Automato == 1539 && Evento == 20) {
    State_Automato =1540;
}
if (State_Automato == 1541 && Evento == 20) {
    State_Automato =1542;
}
if (State_Automato == 1538 && Evento == 20) {
    State_Automato =1543;
}
if (State_Automato == 1544 && Evento == 20) {
    State_Automato =1545;
}
if (State_Automato == 1537 && Evento == 20) {
    State_Automato =1546;
}
if (State_Automato == 1549 && Evento == 20) {
    State_Automato =1550;
}
if (State_Automato == 1548 && Evento == 20) {
    State_Automato =1551;
}
if (State_Automato == 1547 && Evento == 20) {
    State_Automato =1552;
}
if (State_Automato == 1498 && Evento == 20) {
    State_Automato =1553;
}
if (State_Automato == 1559 && Evento == 20) {
    State_Automato =1560;
}
if (State_Automato == 1558 && Evento == 20) {
    State_Automato =1561;
}
if (State_Automato == 1565 && Evento == 20) {
    State_Automato =1566;
}
if (State_Automato == 1564 && Evento == 20) {
    State_Automato =1567;
}
if (State_Automato == 1557 && Evento == 20) {
    State_Automato =1568;
}
if (State_Automato == 1571 && Evento == 20) {
    State_Automato =1572;
}
if (State_Automato == 1556 && Evento == 20) {
    State_Automato =1573;
}
if (State_Automato == 1577 && Evento == 20) {
    State_Automato =1578;
}
if (State_Automato == 1576 && Evento == 20) {
    State_Automato =1579;
}
if (State_Automato == 1497 && Evento == 20) {
    State_Automato =1580;
}
if (State_Automato == 1586 && Evento == 20) {
    State_Automato =1587;
}
if (State_Automato == 1591 && Evento == 20) {
    State_Automato =1592;
}
if (State_Automato == 1590 && Evento == 20) {
    State_Automato =1593;
}
if (State_Automato == 1585 && Evento == 20) {
    State_Automato =1594;
}
if (State_Automato == 1584 && Evento == 20) {
    State_Automato =1595;
}
if (State_Automato == 1600 && Evento == 20) {
    State_Automato =1601;
}
if (State_Automato == 1599 && Evento == 20) {
    State_Automato =1602;
}
if (State_Automato == 1598 && Evento == 20) {
    State_Automato =1603;
}
if (State_Automato == 1597 && Evento == 20) {
    State_Automato =1604;
}
if (State_Automato == 1496 && Evento == 20) {
    State_Automato =1605;
}
if (State_Automato == 1609 && Evento == 20) {
    State_Automato =1610;
}
if (State_Automato == 1611 && Evento == 20) {
    State_Automato =1612;
}
if (State_Automato == 1613 && Evento == 20) {
    State_Automato =1614;
}
if (State_Automato == 1608 && Evento == 20) {
    State_Automato =1615;
}
if (State_Automato == 1621 && Evento == 20) {
    State_Automato =1622;
}
if (State_Automato == 1623 && Evento == 20) {
    State_Automato =1624;
}
if (State_Automato == 1620 && Evento == 20) {
    State_Automato =1625;
}
if (State_Automato == 1626 && Evento == 20) {
    State_Automato =1627;
}
if (State_Automato == 1495 && Evento == 20) {
    State_Automato =1628;
}
if (State_Automato == 1630 && Evento == 20) {
    State_Automato =1631;
}
if (State_Automato == 1632 && Evento == 20) {
    State_Automato =1633;
}
if (State_Automato == 1629 && Evento == 20) {
    State_Automato =1634;
}
if (State_Automato == 1635 && Evento == 20) {
    State_Automato =1636;
}
if (State_Automato == 1494 && Evento == 20) {
    State_Automato =1637;
}
if (State_Automato == 1641 && Evento == 20) {
    State_Automato =1642;
}
if (State_Automato == 1646 && Evento == 20) {
    State_Automato =1647;
}
if (State_Automato == 1650 && Evento == 20) {
    State_Automato =1651;
}
if (State_Automato == 1493 && Evento == 20) {
    State_Automato =1652;
}
if (State_Automato == 1664 && Evento == 20) {
    State_Automato =1665;
}
if (State_Automato == 1668 && Evento == 20) {
    State_Automato =1669;
}
if (State_Automato == 1670 && Evento == 20) {
    State_Automato =1671;
}
if (State_Automato == 1667 && Evento == 20) {
    State_Automato =1672;
}
if (State_Automato == 1676 && Evento == 20) {
    State_Automato =1677;
}
if (State_Automato == 1675 && Evento == 20) {
    State_Automato =1678;
}
if (State_Automato == 1684 && Evento == 20) {
    State_Automato =1685;
}
if (State_Automato == 1683 && Evento == 20) {
    State_Automato =1686;
}
if (State_Automato == 1682 && Evento == 20) {
    State_Automato =1687;
}
if (State_Automato == 1681 && Evento == 20) {
    State_Automato =1688;
}
if (State_Automato == 1680 && Evento == 20) {
    State_Automato =1689;
}
if (State_Automato == 1663 && Evento == 20) {
    State_Automato =1690;
}
if (State_Automato == 1696 && Evento == 20) {
    State_Automato =1697;
}
if (State_Automato == 1695 && Evento == 20) {
    State_Automato =1698;
}
if (State_Automato == 1694 && Evento == 20) {
    State_Automato =1699;
}
if (State_Automato == 1693 && Evento == 20) {
    State_Automato =1700;
}
if (State_Automato == 1662 && Evento == 20) {
    State_Automato =1701;
}
if (State_Automato == 1702 && Evento == 20) {
    State_Automato =1703;
}
if (State_Automato == 1661 && Evento == 20) {
    State_Automato =1704;
}
if (State_Automato == 1710 && Evento == 20) {
    State_Automato =1711;
}
if (State_Automato == 1712 && Evento == 20) {
    State_Automato =1713;
}
if (State_Automato == 1709 && Evento == 20) {
    State_Automato =1714;
}
if (State_Automato == 1708 && Evento == 20) {
    State_Automato =1715;
}
if (State_Automato == 1719 && Evento == 20) {
    State_Automato =1720;
}
if (State_Automato == 1718 && Evento == 20) {
    State_Automato =1721;
}
if (State_Automato == 1717 && Evento == 20) {
    State_Automato =1722;
}
if (State_Automato == 1660 && Evento == 20) {
    State_Automato =1723;
}
if (State_Automato == 1727 && Evento == 20) {
    State_Automato =1728;
}
if (State_Automato == 1731 && Evento == 20) {
    State_Automato =1732;
}
if (State_Automato == 1730 && Evento == 20) {
    State_Automato =1733;
}
if (State_Automato == 1659 && Evento == 20) {
    State_Automato =1734;
}
if (State_Automato == 1737 && Evento == 20) {
    State_Automato =1738;
}
if (State_Automato == 1658 && Evento == 20) {
    State_Automato =1739;
}
if (State_Automato == 1742 && Evento == 20) {
    State_Automato =1743;
}
if (State_Automato == 1751 && Evento == 20) {
    State_Automato =1752;
}
if (State_Automato == 1750 && Evento == 20) {
    State_Automato =1753;
}
if (State_Automato == 1749 && Evento == 20) {
    State_Automato =1754;
}
if (State_Automato == 1748 && Evento == 20) {
    State_Automato =1755;
}
if (State_Automato == 1747 && Evento == 20) {
    State_Automato =1756;
}
if (State_Automato == 1746 && Evento == 20) {
    State_Automato =1757;
}
if (State_Automato == 1745 && Evento == 20) {
    State_Automato =1758;
}
if (State_Automato == 8 && Evento == 20) {
    State_Automato =1759;
}
if (State_Automato == 1766 && Evento == 20) {
    State_Automato =1767;
}
if (State_Automato == 1770 && Evento == 20) {
    State_Automato =1771;
}
if (State_Automato == 1769 && Evento == 20) {
    State_Automato =1776;
}
if (State_Automato == 1779 && Evento == 20) {
    State_Automato =1780;
}
if (State_Automato == 1786 && Evento == 20) {
    State_Automato =1787;
}
if (State_Automato == 1785 && Evento == 20) {
    State_Automato =1790;
}
if (State_Automato == 1784 && Evento == 20) {
    State_Automato =1791;
}
if (State_Automato == 1794 && Evento == 20) {
    State_Automato =1795;
}
if (State_Automato == 1797 && Evento == 20) {
    State_Automato =1798;
}
if (State_Automato == 1805 && Evento == 20) {
    State_Automato =1806;
}
if (State_Automato == 1804 && Evento == 20) {
    State_Automato =1809;
}
if (State_Automato == 1814 && Evento == 20) {
    State_Automato =1815;
}
if (State_Automato == 1816 && Evento == 20) {
    State_Automato =1817;
}
if (State_Automato == 1819 && Evento == 20) {
    State_Automato =1822;
}
if (State_Automato == 1830 && Evento == 20) {
    State_Automato =1831;
}
if (State_Automato == 1829 && Evento == 20) {
    State_Automato =1832;
}
if (State_Automato == 1828 && Evento == 20) {
    State_Automato =1833;
}
if (State_Automato == 1834 && Evento == 20) {
    State_Automato =1835;
}
if (State_Automato == 1836 && Evento == 20) {
    State_Automato =1837;
}
if (State_Automato == 1840 && Evento == 20) {
    State_Automato =1841;
}
if (State_Automato == 1846 && Evento == 20) {
    State_Automato =1847;
}
if (State_Automato == 1856 && Evento == 20) {
    State_Automato =1857;
}
if (State_Automato == 1855 && Evento == 20) {
    State_Automato =1858;
}
if (State_Automato == 1854 && Evento == 20) {
    State_Automato =1861;
}
if (State_Automato == 1865 && Evento == 20) {
    State_Automato =1866;
}
if (State_Automato == 1850 && Evento == 20) {
    State_Automato =1869;
}
if (State_Automato == 1873 && Evento == 20) {
    State_Automato =1874;
}
if (State_Automato == 1880 && Evento == 20) {
    State_Automato =1881;
}
if (State_Automato == 1891 && Evento == 20) {
    State_Automato =1892;
}
if (State_Automato == 1897 && Evento == 20) {
    State_Automato =1898;
}
if (State_Automato == 1896 && Evento == 20) {
    State_Automato =1899;
}
if (State_Automato == 1895 && Evento == 20) {
    State_Automato =1900;
}
if (State_Automato == 1890 && Evento == 20) {
    State_Automato =1901;
}
if (State_Automato == 1903 && Evento == 20) {
    State_Automato =1904;
}
if (State_Automato == 1889 && Evento == 20) {
    State_Automato =1908;
}
if (State_Automato == 1888 && Evento == 20) {
    State_Automato =1911;
}
if (State_Automato == 1913 && Evento == 20) {
    State_Automato =1914;
}
if (State_Automato == 1887 && Evento == 20) {
    State_Automato =1918;
}
if (State_Automato == 1924 && Evento == 20) {
    State_Automato =1925;
}
if (State_Automato == 1923 && Evento == 20) {
    State_Automato =1926;
}
if (State_Automato == 1764 && Evento == 20) {
    State_Automato =1927;
}
if (State_Automato == 1934 && Evento == 20) {
    State_Automato =1935;
}
if (State_Automato == 1941 && Evento == 20) {
    State_Automato =1942;
}
if (State_Automato == 1940 && Evento == 20) {
    State_Automato =1945;
}
if (State_Automato == 1950 && Evento == 20) {
    State_Automato =1951;
}
if (State_Automato == 1949 && Evento == 20) {
    State_Automato =1952;
}
if (State_Automato == 1957 && Evento == 20) {
    State_Automato =1958;
}
if (State_Automato == 1961 && Evento == 20) {
    State_Automato =1962;
}
if (State_Automato == 1960 && Evento == 20) {
    State_Automato =1963;
}
if (State_Automato == 1933 && Evento == 20) {
    State_Automato =1964;
}
if (State_Automato == 1968 && Evento == 20) {
    State_Automato =1969;
}
if (State_Automato == 1971 && Evento == 20) {
    State_Automato =1972;
}
if (State_Automato == 1970 && Evento == 20) {
    State_Automato =1973;
}
if (State_Automato == 1975 && Evento == 20) {
    State_Automato =1976;
}
if (State_Automato == 1932 && Evento == 20) {
    State_Automato =1977;
}
if (State_Automato == 1979 && Evento == 20) {
    State_Automato =1980;
}
if (State_Automato == 1985 && Evento == 20) {
    State_Automato =1986;
}
if (State_Automato == 1988 && Evento == 20) {
    State_Automato =1989;
}
if (State_Automato == 1931 && Evento == 20) {
    State_Automato =1990;
}
if (State_Automato == 2003 && Evento == 20) {
    State_Automato =2004;
}
if (State_Automato == 2005 && Evento == 20) {
    State_Automato =2006;
}
if (State_Automato == 2007 && Evento == 20) {
    State_Automato =2008;
}
if (State_Automato == 2011 && Evento == 20) {
    State_Automato =2012;
}
if (State_Automato == 2002 && Evento == 20) {
    State_Automato =2013;
}
if (State_Automato == 2015 && Evento == 20) {
    State_Automato =2016;
}
if (State_Automato == 2020 && Evento == 20) {
    State_Automato =2021;
}
if (State_Automato == 2022 && Evento == 20) {
    State_Automato =2023;
}
if (State_Automato == 2001 && Evento == 20) {
    State_Automato =2024;
}
if (State_Automato == 2026 && Evento == 20) {
    State_Automato =2027;
}
if (State_Automato == 2030 && Evento == 20) {
    State_Automato =2031;
}
if (State_Automato == 2035 && Evento == 20) {
    State_Automato =2036;
}
if (State_Automato == 2000 && Evento == 20) {
    State_Automato =2037;
}
if (State_Automato == 2042 && Evento == 20) {
    State_Automato =2043;
}
if (State_Automato == 2044 && Evento == 20) {
    State_Automato =2045;
}
if (State_Automato == 2041 && Evento == 20) {
    State_Automato =2046;
}
if (State_Automato == 2052 && Evento == 20) {
    State_Automato =2053;
}
if (State_Automato == 2051 && Evento == 20) {
    State_Automato =2056;
}
if (State_Automato == 2040 && Evento == 20) {
    State_Automato =2059;
}
if (State_Automato == 2066 && Evento == 20) {
    State_Automato =2067;
}
if (State_Automato == 2065 && Evento == 20) {
    State_Automato =2068;
}
if (State_Automato == 2069 && Evento == 20) {
    State_Automato =2070;
}
if (State_Automato == 2064 && Evento == 20) {
    State_Automato =2071;
}
if (State_Automato == 2073 && Evento == 20) {
    State_Automato =2074;
}
if (State_Automato == 2072 && Evento == 20) {
    State_Automato =2075;
}
if (State_Automato == 2079 && Evento == 20) {
    State_Automato =2080;
}
if (State_Automato == 2078 && Evento == 20) {
    State_Automato =2081;
}
if (State_Automato == 2087 && Evento == 20) {
    State_Automato =2088;
}
if (State_Automato == 2094 && Evento == 20) {
    State_Automato =2095;
}
if (State_Automato == 2102 && Evento == 20) {
    State_Automato =2103;
}
if (State_Automato == 2101 && Evento == 20) {
    State_Automato =2104;
}
if (State_Automato == 2107 && Evento == 20) {
    State_Automato =2108;
}
if (State_Automato == 2106 && Evento == 20) {
    State_Automato =2109;
}
if (State_Automato == 2113 && Evento == 20) {
    State_Automato =2114;
}
if (State_Automato == 2116 && Evento == 20) {
    State_Automato =2117;
}
if (State_Automato == 2112 && Evento == 20) {
    State_Automato =2121;
}
if (State_Automato == 2129 && Evento == 20) {
    State_Automato =2130;
}
if (State_Automato == 2134 && Evento == 20) {
    State_Automato =2135;
}
if (State_Automato == 2133 && Evento == 20) {
    State_Automato =2136;
}
if (State_Automato == 2139 && Evento == 20) {
    State_Automato =2140;
}
if (State_Automato == 2143 && Evento == 20) {
    State_Automato =2144;
}
if (State_Automato == 2147 && Evento == 20) {
    State_Automato =2148;
}
if (State_Automato == 2150 && Evento == 20) {
    State_Automato =2151;
}
if (State_Automato == 2146 && Evento == 20) {
    State_Automato =2155;
}
if (State_Automato == 2160 && Evento == 20) {
    State_Automato =2161;
}
if (State_Automato == 2164 && Evento == 20) {
    State_Automato =2165;
}
if (State_Automato == 2168 && Evento == 20) {
    State_Automato =2169;
}
if (State_Automato == 2178 && Evento == 20) {
    State_Automato =2179;
}
if (State_Automato == 2184 && Evento == 20) {
    State_Automato =2185;
}
if (State_Automato == 2196 && Evento == 20) {
    State_Automato =2197;
}
if (State_Automato == 2202 && Evento == 20) {
    State_Automato =2203;
}
if (State_Automato == 2208 && Evento == 20) {
    State_Automato =2209;
}
if (State_Automato == 2207 && Evento == 20) {
    State_Automato =2212;
}
if (State_Automato == 2213 && Evento == 20) {
    State_Automato =2214;
}
if (State_Automato == 2200 && Evento == 20) {
    State_Automato =2215;
}
if (State_Automato == 2219 && Evento == 20) {
    State_Automato =2220;
}
if (State_Automato == 2199 && Evento == 20) {
    State_Automato =2224;
}
if (State_Automato == 2229 && Evento == 20) {
    State_Automato =2230;
}
if (State_Automato == 2234 && Evento == 20) {
    State_Automato =2235;
}
if (State_Automato == 2233 && Evento == 20) {
    State_Automato =2236;
}
if (State_Automato == 2239 && Evento == 20) {
    State_Automato =2240;
}
if (State_Automato == 2245 && Evento == 20) {
    State_Automato =2246;
}
if (State_Automato == 2244 && Evento == 20) {
    State_Automato =2249;
}
if (State_Automato == 2255 && Evento == 20) {
    State_Automato =2256;
}
if (State_Automato == 2254 && Evento == 20) {
    State_Automato =2257;
}
if (State_Automato == 2243 && Evento == 20) {
    State_Automato =2260;
}
if (State_Automato == 2242 && Evento == 20) {
    State_Automato =2261;
}
if (State_Automato == 2264 && Evento == 20) {
    State_Automato =2265;
}
if (State_Automato == 2195 && Evento == 20) {
    State_Automato =2266;
}
if (State_Automato == 2270 && Evento == 20) {
    State_Automato =2271;
}
if (State_Automato == 2276 && Evento == 20) {
    State_Automato =2277;
}
if (State_Automato == 2279 && Evento == 20) {
    State_Automato =2280;
}
if (State_Automato == 2285 && Evento == 20) {
    State_Automato =2286;
}
if (State_Automato == 2284 && Evento == 20) {
    State_Automato =2287;
}
if (State_Automato == 2269 && Evento == 20) {
    State_Automato =2288;
}
if (State_Automato == 2291 && Evento == 20) {
    State_Automato =2292;
}
if (State_Automato == 2294 && Evento == 20) {
    State_Automato =2295;
}
if (State_Automato == 2299 && Evento == 20) {
    State_Automato =2300;
}
if (State_Automato == 2305 && Evento == 20) {
    State_Automato =2306;
}
if (State_Automato == 2304 && Evento == 20) {
    State_Automato =2307;
}
if (State_Automato == 2308 && Evento == 20) {
    State_Automato =2309;
}
if (State_Automato == 2310 && Evento == 20) {
    State_Automato =2311;
}
if (State_Automato == 2293 && Evento == 20) {
    State_Automato =2312;
}
if (State_Automato == 2322 && Evento == 20) {
    State_Automato =2323;
}
if (State_Automato == 2329 && Evento == 20) {
    State_Automato =2330;
}
if (State_Automato == 2328 && Evento == 20) {
    State_Automato =2331;
}
if (State_Automato == 2321 && Evento == 20) {
    State_Automato =2334;
}
if (State_Automato == 2337 && Evento == 20) {
    State_Automato =2338;
}
if (State_Automato == 2320 && Evento == 20) {
    State_Automato =2339;
}
if (State_Automato == 2347 && Evento == 20) {
    State_Automato =2348;
}
if (State_Automato == 2346 && Evento == 20) {
    State_Automato =2349;
}
if (State_Automato == 2354 && Evento == 20) {
    State_Automato =2355;
}
if (State_Automato == 2353 && Evento == 20) {
    State_Automato =2356;
}
if (State_Automato == 2352 && Evento == 20) {
    State_Automato =2357;
}
if (State_Automato == 2351 && Evento == 20) {
    State_Automato =2358;
}
if (State_Automato == 2194 && Evento == 20) {
    State_Automato =2359;
}
if (State_Automato == 2366 && Evento == 20) {
    State_Automato =2367;
}
if (State_Automato == 2369 && Evento == 20) {
    State_Automato =2370;
}
if (State_Automato == 2365 && Evento == 20) {
    State_Automato =2374;
}
if (State_Automato == 2381 && Evento == 20) {
    State_Automato =2382;
}
if (State_Automato == 2383 && Evento == 20) {
    State_Automato =2384;
}
if (State_Automato == 2385 && Evento == 20) {
    State_Automato =2386;
}
if (State_Automato == 2380 && Evento == 20) {
    State_Automato =2387;
}
if (State_Automato == 2397 && Evento == 20) {
    State_Automato =2398;
}
if (State_Automato == 2399 && Evento == 20) {
    State_Automato =2400;
}
if (State_Automato == 2396 && Evento == 20) {
    State_Automato =2401;
}
if (State_Automato == 2395 && Evento == 20) {
    State_Automato =2402;
}
if (State_Automato == 2406 && Evento == 20) {
    State_Automato =2407;
}
if (State_Automato == 2405 && Evento == 20) {
    State_Automato =2408;
}
if (State_Automato == 2404 && Evento == 20) {
    State_Automato =2409;
}
if (State_Automato == 2193 && Evento == 20) {
    State_Automato =2410;
}
if (State_Automato == 2415 && Evento == 20) {
    State_Automato =2416;
}
if (State_Automato == 2421 && Evento == 20) {
    State_Automato =2422;
}
if (State_Automato == 2425 && Evento == 20) {
    State_Automato =2426;
}
if (State_Automato == 2432 && Evento == 20) {
    State_Automato =2433;
}
if (State_Automato == 2438 && Evento == 20) {
    State_Automato =2439;
}
if (State_Automato == 2442 && Evento == 20) {
    State_Automato =2443;
}
if (State_Automato == 2437 && Evento == 20) {
    State_Automato =2444;
}
if (State_Automato == 2192 && Evento == 20) {
    State_Automato =2445;
}
if (State_Automato == 2447 && Evento == 20) {
    State_Automato =2448;
}
if (State_Automato == 2452 && Evento == 20) {
    State_Automato =2453;
}
if (State_Automato == 2191 && Evento == 20) {
    State_Automato =2454;
}
if (State_Automato == 2461 && Evento == 20) {
    State_Automato =2462;
}
if (State_Automato == 2466 && Evento == 20) {
    State_Automato =2467;
}
if (State_Automato == 2480 && Evento == 20) {
    State_Automato =2481;
}
if (State_Automato == 2485 && Evento == 20) {
    State_Automato =2486;
}
if (State_Automato == 2484 && Evento == 20) {
    State_Automato =2487;
}
if (State_Automato == 2479 && Evento == 20) {
    State_Automato =2488;
}
if (State_Automato == 2489 && Evento == 20) {
    State_Automato =2490;
}
if (State_Automato == 2478 && Evento == 20) {
    State_Automato =2491;
}
if (State_Automato == 2494 && Evento == 20) {
    State_Automato =2495;
}
if (State_Automato == 2477 && Evento == 20) {
    State_Automato =2496;
}
if (State_Automato == 2497 && Evento == 20) {
    State_Automato =2498;
}
if (State_Automato == 2499 && Evento == 20) {
    State_Automato =2500;
}
if (State_Automato == 2460 && Evento == 20) {
    State_Automato =2501;
}
if (State_Automato == 2506 && Evento == 20) {
    State_Automato =2507;
}
if (State_Automato == 2510 && Evento == 20) {
    State_Automato =2511;
}
if (State_Automato == 2514 && Evento == 20) {
    State_Automato =2515;
}
if (State_Automato == 2525 && Evento == 20) {
    State_Automato =2526;
}
if (State_Automato == 2524 && Evento == 20) {
    State_Automato =2527;
}
if (State_Automato == 2528 && Evento == 20) {
    State_Automato =2529;
}
if (State_Automato == 2523 && Evento == 20) {
    State_Automato =2530;
}
if (State_Automato == 2534 && Evento == 20) {
    State_Automato =2535;
}
if (State_Automato == 2533 && Evento == 20) {
    State_Automato =2538;
}
if (State_Automato == 2532 && Evento == 20) {
    State_Automato =2541;
}
if (State_Automato == 2545 && Evento == 20) {
    State_Automato =2546;
}
if (State_Automato == 2544 && Evento == 20) {
    State_Automato =2547;
}
if (State_Automato == 2548 && Evento == 20) {
    State_Automato =2549;
}
if (State_Automato == 2552 && Evento == 20) {
    State_Automato =2553;
}
if (State_Automato == 2556 && Evento == 20) {
    State_Automato =2557;
}
if (State_Automato == 2459 && Evento == 20) {
    State_Automato =2558;
}
if (State_Automato == 2560 && Evento == 20) {
    State_Automato =2561;
}
if (State_Automato == 2565 && Evento == 20) {
    State_Automato =2566;
}
if (State_Automato == 2573 && Evento == 20) {
    State_Automato =2574;
}
if (State_Automato == 2580 && Evento == 20) {
    State_Automato =2581;
}
if (State_Automato == 2585 && Evento == 20) {
    State_Automato =2586;
}
if (State_Automato == 2584 && Evento == 20) {
    State_Automato =2587;
}
if (State_Automato == 2579 && Evento == 20) {
    State_Automato =2588;
}
if (State_Automato == 2589 && Evento == 20) {
    State_Automato =2590;
}
if (State_Automato == 2578 && Evento == 20) {
    State_Automato =2591;
}
if (State_Automato == 2595 && Evento == 20) {
    State_Automato =2596;
}
if (State_Automato == 2600 && Evento == 20) {
    State_Automato =2601;
}
if (State_Automato == 2577 && Evento == 20) {
    State_Automato =2602;
}
if (State_Automato == 2607 && Evento == 20) {
    State_Automato =2608;
}
if (State_Automato == 2606 && Evento == 20) {
    State_Automato =2609;
}
if (State_Automato == 2610 && Evento == 20) {
    State_Automato =2611;
}
if (State_Automato == 2605 && Evento == 20) {
    State_Automato =2612;
}
if (State_Automato == 2572 && Evento == 20) {
    State_Automato =2613;
}
if (State_Automato == 2620 && Evento == 20) {
    State_Automato =2621;
}
if (State_Automato == 2625 && Evento == 20) {
    State_Automato =2626;
}
if (State_Automato == 2624 && Evento == 20) {
    State_Automato =2627;
}
if (State_Automato == 2619 && Evento == 20) {
    State_Automato =2628;
}
if (State_Automato == 2618 && Evento == 20) {
    State_Automato =2629;
}
if (State_Automato == 2633 && Evento == 20) {
    State_Automato =2634;
}
if (State_Automato == 2636 && Evento == 20) {
    State_Automato =2637;
}
if (State_Automato == 2635 && Evento == 20) {
    State_Automato =2638;
}
if (State_Automato == 2632 && Evento == 20) {
    State_Automato =2639;
}
if (State_Automato == 2631 && Evento == 20) {
    State_Automato =2640;
}
if (State_Automato == 2645 && Evento == 20) {
    State_Automato =2646;
}
if (State_Automato == 2644 && Evento == 20) {
    State_Automato =2647;
}
if (State_Automato == 2643 && Evento == 20) {
    State_Automato =2648;
}
if (State_Automato == 2642 && Evento == 20) {
    State_Automato =2649;
}
if (State_Automato == 2571 && Evento == 20) {
    State_Automato =2650;
}
if (State_Automato == 2655 && Evento == 20) {
    State_Automato =2656;
}
if (State_Automato == 2660 && Evento == 20) {
    State_Automato =2661;
}
if (State_Automato == 2665 && Evento == 20) {
    State_Automato =2666;
}
if (State_Automato == 2654 && Evento == 20) {
    State_Automato =2667;
}
if (State_Automato == 2673 && Evento == 20) {
    State_Automato =2674;
}
if (State_Automato == 2675 && Evento == 20) {
    State_Automato =2676;
}
if (State_Automato == 2672 && Evento == 20) {
    State_Automato =2677;
}
if (State_Automato == 2678 && Evento == 20) {
    State_Automato =2679;
}
if (State_Automato == 2671 && Evento == 20) {
    State_Automato =2680;
}
if (State_Automato == 2570 && Evento == 20) {
    State_Automato =2683;
}
if (State_Automato == 2686 && Evento == 20) {
    State_Automato =2687;
}
if (State_Automato == 2690 && Evento == 20) {
    State_Automato =2691;
}
if (State_Automato == 2694 && Evento == 20) {
    State_Automato =2695;
}
if (State_Automato == 2685 && Evento == 20) {
    State_Automato =2696;
}
if (State_Automato == 2701 && Evento == 20) {
    State_Automato =2702;
}
if (State_Automato == 2703 && Evento == 20) {
    State_Automato =2704;
}
if (State_Automato == 2700 && Evento == 20) {
    State_Automato =2705;
}
if (State_Automato == 2569 && Evento == 20) {
    State_Automato =2708;
}
if (State_Automato == 2713 && Evento == 20) {
    State_Automato =2714;
}
if (State_Automato == 2718 && Evento == 20) {
    State_Automato =2719;
}
if (State_Automato == 2723 && Evento == 20) {
    State_Automato =2724;
}
if (State_Automato == 2568 && Evento == 20) {
    State_Automato =2727;
}
if (State_Automato == 2740 && Evento == 20) {
    State_Automato =2741;
}
if (State_Automato == 2748 && Evento == 20) {
    State_Automato =2749;
}
if (State_Automato == 2747 && Evento == 20) {
    State_Automato =2750;
}
if (State_Automato == 2751 && Evento == 20) {
    State_Automato =2752;
}
if (State_Automato == 2746 && Evento == 20) {
    State_Automato =2753;
}
if (State_Automato == 2754 && Evento == 20) {
    State_Automato =2755;
}
if (State_Automato == 2745 && Evento == 20) {
    State_Automato =2756;
}
if (State_Automato == 2763 && Evento == 20) {
    State_Automato =2764;
}
if (State_Automato == 2762 && Evento == 20) {
    State_Automato =2765;
}
if (State_Automato == 2761 && Evento == 20) {
    State_Automato =2766;
}
if (State_Automato == 2760 && Evento == 20) {
    State_Automato =2767;
}
if (State_Automato == 2739 && Evento == 20) {
    State_Automato =2768;
}
if (State_Automato == 2770 && Evento == 20) {
    State_Automato =2771;
}
if (State_Automato == 2769 && Evento == 20) {
    State_Automato =2772;
}
if (State_Automato == 2738 && Evento == 20) {
    State_Automato =2773;
}
if (State_Automato == 2775 && Evento == 20) {
    State_Automato =2776;
}
if (State_Automato == 2774 && Evento == 20) {
    State_Automato =2777;
}
if (State_Automato == 2779 && Evento == 20) {
    State_Automato =2780;
}
if (State_Automato == 2778 && Evento == 20) {
    State_Automato =2781;
}
if (State_Automato == 2737 && Evento == 20) {
    State_Automato =2782;
}
if (State_Automato == 2785 && Evento == 20) {
    State_Automato =2786;
}
if (State_Automato == 2787 && Evento == 20) {
    State_Automato =2788;
}
if (State_Automato == 2784 && Evento == 20) {
    State_Automato =2789;
}
if (State_Automato == 2794 && Evento == 20) {
    State_Automato =2795;
}
if (State_Automato == 2793 && Evento == 20) {
    State_Automato =2796;
}
if (State_Automato == 2736 && Evento == 20) {
    State_Automato =2797;
}
if (State_Automato == 2798 && Evento == 20) {
    State_Automato =2799;
}
if (State_Automato == 2735 && Evento == 20) {
    State_Automato =2800;
}
if (State_Automato == 2804 && Evento == 20) {
    State_Automato =2805;
}
if (State_Automato == 2806 && Evento == 20) {
    State_Automato =2807;
}
if (State_Automato == 2808 && Evento == 20) {
    State_Automato =2809;
}
if (State_Automato == 2803 && Evento == 20) {
    State_Automato =2810;
}
if (State_Automato == 2814 && Evento == 20) {
    State_Automato =2815;
}
if (State_Automato == 2813 && Evento == 20) {
    State_Automato =2816;
}
if (State_Automato == 2823 && Evento == 20) {
    State_Automato =2824;
}
if (State_Automato == 2822 && Evento == 20) {
    State_Automato =2825;
}
if (State_Automato == 2821 && Evento == 20) {
    State_Automato =2826;
}
if (State_Automato == 2820 && Evento == 20) {
    State_Automato =2827;
}
if (State_Automato == 2819 && Evento == 20) {
    State_Automato =2828;
}
if (State_Automato == 2818 && Evento == 20) {
    State_Automato =2829;
}
if (State_Automato == 7 && Evento == 20) {
    State_Automato =2830;
}
if (State_Automato == 2841 && Evento == 20) {
    State_Automato =2842;
}
if (State_Automato == 2845 && Evento == 20) {
    State_Automato =2846;
}
if (State_Automato == 2848 && Evento == 20) {
    State_Automato =2849;
}
if (State_Automato == 2847 && Evento == 20) {
    State_Automato =2850;
}
if (State_Automato == 2851 && Evento == 20) {
    State_Automato =2852;
}
if (State_Automato == 2854 && Evento == 20) {
    State_Automato =2855;
}
if (State_Automato == 2862 && Evento == 20) {
    State_Automato =2863;
}
if (State_Automato == 2861 && Evento == 20) {
    State_Automato =2864;
}
if (State_Automato == 2867 && Evento == 20) {
    State_Automato =2868;
}
if (State_Automato == 2874 && Evento == 20) {
    State_Automato =2875;
}
if (State_Automato == 2879 && Evento == 20) {
    State_Automato =2880;
}
if (State_Automato == 2885 && Evento == 20) {
    State_Automato =2886;
}
if (State_Automato == 2884 && Evento == 20) {
    State_Automato =2889;
}
if (State_Automato == 2894 && Evento == 20) {
    State_Automato =2895;
}
if (State_Automato == 2893 && Evento == 20) {
    State_Automato =2896;
}
if (State_Automato == 2902 && Evento == 20) {
    State_Automato =2903;
}
if (State_Automato == 2901 && Evento == 20) {
    State_Automato =2904;
}
if (State_Automato == 2905 && Evento == 20) {
    State_Automato =2906;
}
if (State_Automato == 2909 && Evento == 20) {
    State_Automato =2910;
}
if (State_Automato == 2914 && Evento == 20) {
    State_Automato =2915;
}
if (State_Automato == 2900 && Evento == 20) {
    State_Automato =2919;
}
if (State_Automato == 2922 && Evento == 20) {
    State_Automato =2923;
}
if (State_Automato == 2899 && Evento == 20) {
    State_Automato =2926;
}
if (State_Automato == 2935 && Evento == 20) {
    State_Automato =2936;
}
if (State_Automato == 2941 && Evento == 20) {
    State_Automato =2942;
}
if (State_Automato == 2940 && Evento == 20) {
    State_Automato =2943;
}
if (State_Automato == 2948 && Evento == 20) {
    State_Automato =2949;
}
if (State_Automato == 2947 && Evento == 20) {
    State_Automato =2950;
}
if (State_Automato == 2934 && Evento == 20) {
    State_Automato =2951;
}
if (State_Automato == 2956 && Evento == 20) {
    State_Automato =2957;
}
if (State_Automato == 2955 && Evento == 20) {
    State_Automato =2958;
}
if (State_Automato == 2962 && Evento == 20) {
    State_Automato =2963;
}
if (State_Automato == 2933 && Evento == 20) {
    State_Automato =2964;
}
if (State_Automato == 2965 && Evento == 20) {
    State_Automato =2966;
}
if (State_Automato == 2932 && Evento == 20) {
    State_Automato =2967;
}
if (State_Automato == 2972 && Evento == 20) {
    State_Automato =2973;
}
if (State_Automato == 2975 && Evento == 20) {
    State_Automato =2976;
}
if (State_Automato == 2974 && Evento == 20) {
    State_Automato =2977;
}
if (State_Automato == 2979 && Evento == 20) {
    State_Automato =2980;
}
if (State_Automato == 2984 && Evento == 20) {
    State_Automato =2985;
}
if (State_Automato == 2983 && Evento == 20) {
    State_Automato =2986;
}
if (State_Automato == 2978 && Evento == 20) {
    State_Automato =2987;
}
if (State_Automato == 2992 && Evento == 20) {
    State_Automato =2993;
}
if (State_Automato == 2991 && Evento == 20) {
    State_Automato =2994;
}
if (State_Automato == 2990 && Evento == 20) {
    State_Automato =2995;
}
if (State_Automato == 2989 && Evento == 20) {
    State_Automato =2996;
}
if (State_Automato == 2840 && Evento == 20) {
    State_Automato =2997;
}
if (State_Automato == 3005 && Evento == 20) {
    State_Automato =3006;
}
if (State_Automato == 3004 && Evento == 20) {
    State_Automato =3007;
}
if (State_Automato == 3010 && Evento == 20) {
    State_Automato =3011;
}
if (State_Automato == 3016 && Evento == 20) {
    State_Automato =3017;
}
if (State_Automato == 3020 && Evento == 20) {
    State_Automato =3021;
}
if (State_Automato == 3026 && Evento == 20) {
    State_Automato =3027;
}
if (State_Automato == 3031 && Evento == 20) {
    State_Automato =3032;
}
if (State_Automato == 3030 && Evento == 20) {
    State_Automato =3035;
}
if (State_Automato == 3041 && Evento == 20) {
    State_Automato =3042;
}
if (State_Automato == 3043 && Evento == 20) {
    State_Automato =3044;
}
if (State_Automato == 3045 && Evento == 20) {
    State_Automato =3046;
}
if (State_Automato == 3040 && Evento == 20) {
    State_Automato =3047;
}
if (State_Automato == 3051 && Evento == 20) {
    State_Automato =3052;
}
if (State_Automato == 3056 && Evento == 20) {
    State_Automato =3057;
}
if (State_Automato == 3039 && Evento == 20) {
    State_Automato =3058;
}
if (State_Automato == 3065 && Evento == 20) {
    State_Automato =3066;
}
if (State_Automato == 3064 && Evento == 20) {
    State_Automato =3067;
}
if (State_Automato == 3071 && Evento == 20) {
    State_Automato =3072;
}
if (State_Automato == 3076 && Evento == 20) {
    State_Automato =3077;
}
if (State_Automato == 3063 && Evento == 20) {
    State_Automato =3078;
}
if (State_Automato == 3084 && Evento == 20) {
    State_Automato =3085;
}
if (State_Automato == 3086 && Evento == 20) {
    State_Automato =3087;
}
if (State_Automato == 3083 && Evento == 20) {
    State_Automato =3088;
}
if (State_Automato == 3091 && Evento == 20) {
    State_Automato =3092;
}
if (State_Automato == 3082 && Evento == 20) {
    State_Automato =3093;
}
if (State_Automato == 2839 && Evento == 20) {
    State_Automato =3094;
}
if (State_Automato == 3096 && Evento == 20) {
    State_Automato =3097;
}
if (State_Automato == 3104 && Evento == 20) {
    State_Automato =3105;
}
if (State_Automato == 3103 && Evento == 20) {
    State_Automato =3106;
}
if (State_Automato == 3109 && Evento == 20) {
    State_Automato =3110;
}
if (State_Automato == 3111 && Evento == 20) {
    State_Automato =3112;
}
if (State_Automato == 2838 && Evento == 20) {
    State_Automato =3113;
}
if (State_Automato == 3122 && Evento == 20) {
    State_Automato =3123;
}
if (State_Automato == 3125 && Evento == 20) {
    State_Automato =3126;
}
if (State_Automato == 3130 && Evento == 20) {
    State_Automato =3131;
}
if (State_Automato == 3136 && Evento == 20) {
    State_Automato =3137;
}
if (State_Automato == 3140 && Evento == 20) {
    State_Automato =3141;
}
if (State_Automato == 3135 && Evento == 20) {
    State_Automato =3144;
}
if (State_Automato == 3149 && Evento == 20) {
    State_Automato =3150;
}
if (State_Automato == 3153 && Evento == 20) {
    State_Automato =3154;
}
if (State_Automato == 3148 && Evento == 20) {
    State_Automato =3155;
}
if (State_Automato == 2837 && Evento == 20) {
    State_Automato =3156;
}
if (State_Automato == 3161 && Evento == 20) {
    State_Automato =3162;
}
if (State_Automato == 2836 && Evento == 20) {
    State_Automato =3165;
}
if (State_Automato == 3168 && Evento == 20) {
    State_Automato =3169;
}
if (State_Automato == 3176 && Evento == 20) {
    State_Automato =3177;
}
if (State_Automato == 3182 && Evento == 20) {
    State_Automato =3183;
}
if (State_Automato == 3181 && Evento == 20) {
    State_Automato =3186;
}
if (State_Automato == 3189 && Evento == 20) {
    State_Automato =3190;
}
if (State_Automato == 3188 && Evento == 20) {
    State_Automato =3191;
}
if (State_Automato == 3194 && Evento == 20) {
    State_Automato =3195;
}
if (State_Automato == 3175 && Evento == 20) {
    State_Automato =3196;
}
if (State_Automato == 3199 && Evento == 20) {
    State_Automato =3200;
}
if (State_Automato == 3201 && Evento == 20) {
    State_Automato =3202;
}
if (State_Automato == 3174 && Evento == 20) {
    State_Automato =3203;
}
if (State_Automato == 3204 && Evento == 20) {
    State_Automato =3205;
}
if (State_Automato == 3208 && Evento == 20) {
    State_Automato =3209;
}
if (State_Automato == 3173 && Evento == 20) {
    State_Automato =3210;
}
if (State_Automato == 3217 && Evento == 20) {
    State_Automato =3218;
}
if (State_Automato == 3222 && Evento == 20) {
    State_Automato =3223;
}
if (State_Automato == 3221 && Evento == 20) {
    State_Automato =3224;
}
if (State_Automato == 3226 && Evento == 20) {
    State_Automato =3227;
}
if (State_Automato == 3225 && Evento == 20) {
    State_Automato =3228;
}
if (State_Automato == 3216 && Evento == 20) {
    State_Automato =3229;
}
if (State_Automato == 3231 && Evento == 20) {
    State_Automato =3232;
}
if (State_Automato == 3236 && Evento == 20) {
    State_Automato =3237;
}
if (State_Automato == 3215 && Evento == 20) {
    State_Automato =3238;
}
if (State_Automato == 3239 && Evento == 20) {
    State_Automato =3240;
}
if (State_Automato == 3243 && Evento == 20) {
    State_Automato =3244;
}
if (State_Automato == 3214 && Evento == 20) {
    State_Automato =3245;
}
if (State_Automato == 3252 && Evento == 20) {
    State_Automato =3253;
}
if (State_Automato == 3261 && Evento == 20) {
    State_Automato =3262;
}
if (State_Automato == 3263 && Evento == 20) {
    State_Automato =3264;
}
if (State_Automato == 3260 && Evento == 20) {
    State_Automato =3265;
}
if (State_Automato == 3267 && Evento == 20) {
    State_Automato =3268;
}
if (State_Automato == 3266 && Evento == 20) {
    State_Automato =3269;
}
if (State_Automato == 3273 && Evento == 20) {
    State_Automato =3274;
}
if (State_Automato == 3280 && Evento == 20) {
    State_Automato =3281;
}
if (State_Automato == 3286 && Evento == 20) {
    State_Automato =3287;
}
if (State_Automato == 3285 && Evento == 20) {
    State_Automato =3288;
}
if (State_Automato == 3292 && Evento == 20) {
    State_Automato =3293;
}
if (State_Automato == 3291 && Evento == 20) {
    State_Automato =3296;
}
if (State_Automato == 3298 && Evento == 20) {
    State_Automato =3299;
}
if (State_Automato == 3290 && Evento == 20) {
    State_Automato =3303;
}
if (State_Automato == 3309 && Evento == 20) {
    State_Automato =3310;
}
if (State_Automato == 3308 && Evento == 20) {
    State_Automato =3311;
}
if (State_Automato == 3314 && Evento == 20) {
    State_Automato =3315;
}
if (State_Automato == 3325 && Evento == 20) {
    State_Automato =3326;
}
if (State_Automato == 3324 && Evento == 20) {
    State_Automato =3327;
}
if (State_Automato == 3332 && Evento == 20) {
    State_Automato =3333;
}
if (State_Automato == 3336 && Evento == 20) {
    State_Automato =3337;
}
if (State_Automato == 3343 && Evento == 20) {
    State_Automato =3344;
}
if (State_Automato == 3348 && Evento == 20) {
    State_Automato =3349;
}
if (State_Automato == 3352 && Evento == 20) {
    State_Automato =3353;
}
if (State_Automato == 3347 && Evento == 20) {
    State_Automato =3354;
}
if (State_Automato == 3358 && Evento == 20) {
    State_Automato =3359;
}
if (State_Automato == 3364 && Evento == 20) {
    State_Automato =3365;
}
if (State_Automato == 3363 && Evento == 20) {
    State_Automato =3366;
}
if (State_Automato == 3367 && Evento == 20) {
    State_Automato =3368;
}
if (State_Automato == 3362 && Evento == 20) {
    State_Automato =3369;
}
if (State_Automato == 3375 && Evento == 20) {
    State_Automato =3376;
}
if (State_Automato == 3374 && Evento == 20) {
    State_Automato =3379;
}
if (State_Automato == 3373 && Evento == 20) {
    State_Automato =3380;
}
if (State_Automato == 3386 && Evento == 20) {
    State_Automato =3387;
}
if (State_Automato == 3385 && Evento == 20) {
    State_Automato =3390;
}
if (State_Automato == 3397 && Evento == 20) {
    State_Automato =3398;
}
if (State_Automato == 3401 && Evento == 20) {
    State_Automato =3402;
}
if (State_Automato == 3342 && Evento == 20) {
    State_Automato =3403;
}
if (State_Automato == 3404 && Evento == 20) {
    State_Automato =3405;
}
if (State_Automato == 3411 && Evento == 20) {
    State_Automato =3412;
}
if (State_Automato == 3416 && Evento == 20) {
    State_Automato =3417;
}
if (State_Automato == 3425 && Evento == 20) {
    State_Automato =3426;
}
if (State_Automato == 3429 && Evento == 20) {
    State_Automato =3430;
}
if (State_Automato == 3424 && Evento == 20) {
    State_Automato =3431;
}
if (State_Automato == 3423 && Evento == 20) {
    State_Automato =3432;
}
if (State_Automato == 3436 && Evento == 20) {
    State_Automato =3437;
}
if (State_Automato == 3435 && Evento == 20) {
    State_Automato =3438;
}
if (State_Automato == 3410 && Evento == 20) {
    State_Automato =3439;
}
if (State_Automato == 3443 && Evento == 20) {
    State_Automato =3444;
}
if (State_Automato == 3445 && Evento == 20) {
    State_Automato =3446;
}
if (State_Automato == 3442 && Evento == 20) {
    State_Automato =3447;
}
if (State_Automato == 3448 && Evento == 20) {
    State_Automato =3449;
}
if (State_Automato == 3450 && Evento == 20) {
    State_Automato =3451;
}
if (State_Automato == 3409 && Evento == 20) {
    State_Automato =3452;
}
if (State_Automato == 3458 && Evento == 20) {
    State_Automato =3459;
}
if (State_Automato == 3464 && Evento == 20) {
    State_Automato =3465;
}
if (State_Automato == 3463 && Evento == 20) {
    State_Automato =3466;
}
if (State_Automato == 3408 && Evento == 20) {
    State_Automato =3467;
}
if (State_Automato == 3468 && Evento == 20) {
    State_Automato =3469;
}
if (State_Automato == 3407 && Evento == 20) {
    State_Automato =3470;
}
if (State_Automato == 3478 && Evento == 20) {
    State_Automato =3479;
}
if (State_Automato == 3477 && Evento == 20) {
    State_Automato =3480;
}
if (State_Automato == 3476 && Evento == 20) {
    State_Automato =3481;
}
if (State_Automato == 3473 && Evento == 20) {
    State_Automato =3482;
}
if (State_Automato == 3484 && Evento == 20) {
    State_Automato =3485;
}
if (State_Automato == 3486 && Evento == 20) {
    State_Automato =3487;
}
if (State_Automato == 3483 && Evento == 20) {
    State_Automato =3488;
}
if (State_Automato == 3491 && Evento == 20) {
    State_Automato =3492;
}
if (State_Automato == 3502 && Evento == 20) {
    State_Automato =3503;
}
if (State_Automato == 3508 && Evento == 20) {
    State_Automato =3509;
}
if (State_Automato == 3507 && Evento == 20) {
    State_Automato =3510;
}
if (State_Automato == 3506 && Evento == 20) {
    State_Automato =3511;
}
if (State_Automato == 3501 && Evento == 20) {
    State_Automato =3512;
}
if (State_Automato == 3517 && Evento == 20) {
    State_Automato =3518;
}
if (State_Automato == 3519 && Evento == 20) {
    State_Automato =3520;
}
if (State_Automato == 3516 && Evento == 20) {
    State_Automato =3521;
}
if (State_Automato == 3527 && Evento == 20) {
    State_Automato =3528;
}
if (State_Automato == 3526 && Evento == 20) {
    State_Automato =3529;
}
if (State_Automato == 3525 && Evento == 20) {
    State_Automato =3530;
}
if (State_Automato == 3500 && Evento == 20) {
    State_Automato =3531;
}
if (State_Automato == 3532 && Evento == 20) {
    State_Automato =3533;
}
if (State_Automato == 3499 && Evento == 20) {
    State_Automato =3534;
}
if (State_Automato == 3538 && Evento == 20) {
    State_Automato =3539;
}
if (State_Automato == 3543 && Evento == 20) {
    State_Automato =3544;
}
if (State_Automato == 3498 && Evento == 20) {
    State_Automato =3545;
}
if (State_Automato == 3553 && Evento == 20) {
    State_Automato =3554;
}
if (State_Automato == 3552 && Evento == 20) {
    State_Automato =3555;
}
if (State_Automato == 3551 && Evento == 20) {
    State_Automato =3556;
}
if (State_Automato == 3550 && Evento == 20) {
    State_Automato =3557;
}
if (State_Automato == 3549 && Evento == 20) {
    State_Automato =3558;
}
if (State_Automato == 6 && Evento == 20) {
    State_Automato =3559;
}
if (State_Automato == 3567 && Evento == 20) {
    State_Automato =3568;
}
if (State_Automato == 3573 && Evento == 20) {
    State_Automato =3574;
}
if (State_Automato == 3572 && Evento == 20) {
    State_Automato =3575;
}
if (State_Automato == 3580 && Evento == 20) {
    State_Automato =3581;
}
if (State_Automato == 3579 && Evento == 20) {
    State_Automato =3584;
}
if (State_Automato == 3589 && Evento == 20) {
    State_Automato =3590;
}
if (State_Automato == 3596 && Evento == 20) {
    State_Automato =3597;
}
if (State_Automato == 3600 && Evento == 20) {
    State_Automato =3601;
}
if (State_Automato == 3595 && Evento == 20) {
    State_Automato =3602;
}
if (State_Automato == 3605 && Evento == 20) {
    State_Automato =3606;
}
if (State_Automato == 3609 && Evento == 20) {
    State_Automato =3610;
}
if (State_Automato == 3611 && Evento == 20) {
    State_Automato =3612;
}
if (State_Automato == 3615 && Evento == 20) {
    State_Automato =3616;
}
if (State_Automato == 3626 && Evento == 20) {
    State_Automato =3627;
}
if (State_Automato == 3625 && Evento == 20) {
    State_Automato =3630;
}
if (State_Automato == 3624 && Evento == 20) {
    State_Automato =3633;
}
if (State_Automato == 3639 && Evento == 20) {
    State_Automato =3640;
}
if (State_Automato == 3646 && Evento == 20) {
    State_Automato =3647;
}
if (State_Automato == 3643 && Evento == 20) {
    State_Automato =3650;
}
if (State_Automato == 3659 && Evento == 20) {
    State_Automato =3660;
}
if (State_Automato == 3658 && Evento == 20) {
    State_Automato =3663;
}
if (State_Automato == 3666 && Evento == 20) {
    State_Automato =3667;
}
if (State_Automato == 3677 && Evento == 20) {
    State_Automato =3678;
}
if (State_Automato == 3684 && Evento == 20) {
    State_Automato =3685;
}
if (State_Automato == 3690 && Evento == 20) {
    State_Automato =3691;
}
if (State_Automato == 3695 && Evento == 20) {
    State_Automato =3696;
}
if (State_Automato == 3701 && Evento == 20) {
    State_Automato =3702;
}
if (State_Automato == 3700 && Evento == 20) {
    State_Automato =3703;
}
if (State_Automato == 3683 && Evento == 20) {
    State_Automato =3704;
}
if (State_Automato == 3682 && Evento == 20) {
    State_Automato =3707;
}
if (State_Automato == 3713 && Evento == 20) {
    State_Automato =3714;
}
if (State_Automato == 3717 && Evento == 20) {
    State_Automato =3718;
}
if (State_Automato == 3719 && Evento == 20) {
    State_Automato =3720;
}
if (State_Automato == 3712 && Evento == 20) {
    State_Automato =3721;
}
if (State_Automato == 3725 && Evento == 20) {
    State_Automato =3726;
}
if (State_Automato == 3730 && Evento == 20) {
    State_Automato =3731;
}
if (State_Automato == 3711 && Evento == 20) {
    State_Automato =3732;
}
if (State_Automato == 3734 && Evento == 20) {
    State_Automato =3735;
}
if (State_Automato == 3739 && Evento == 20) {
    State_Automato =3740;
}
if (State_Automato == 3738 && Evento == 20) {
    State_Automato =3741;
}
if (State_Automato == 3733 && Evento == 20) {
    State_Automato =3742;
}
if (State_Automato == 3743 && Evento == 20) {
    State_Automato =3744;
}
if (State_Automato == 3676 && Evento == 20) {
    State_Automato =3745;
}
if (State_Automato == 3750 && Evento == 20) {
    State_Automato =3751;
}
if (State_Automato == 3757 && Evento == 20) {
    State_Automato =3758;
}
if (State_Automato == 3762 && Evento == 20) {
    State_Automato =3763;
}
if (State_Automato == 3749 && Evento == 20) {
    State_Automato =3764;
}
if (State_Automato == 3769 && Evento == 20) {
    State_Automato =3770;
}
if (State_Automato == 3768 && Evento == 20) {
    State_Automato =3771;
}
if (State_Automato == 3774 && Evento == 20) {
    State_Automato =3775;
}
if (State_Automato == 3776 && Evento == 20) {
    State_Automato =3777;
}
if (State_Automato == 3675 && Evento == 20) {
    State_Automato =3778;
}
if (State_Automato == 3784 && Evento == 20) {
    State_Automato =3785;
}
if (State_Automato == 3789 && Evento == 20) {
    State_Automato =3790;
}
if (State_Automato == 3795 && Evento == 20) {
    State_Automato =3796;
}
if (State_Automato == 3794 && Evento == 20) {
    State_Automato =3799;
}
if (State_Automato == 3804 && Evento == 20) {
    State_Automato =3805;
}
if (State_Automato == 3803 && Evento == 20) {
    State_Automato =3806;
}
if (State_Automato == 3674 && Evento == 20) {
    State_Automato =3807;
}
if (State_Automato == 3673 && Evento == 20) {
    State_Automato =3810;
}
if (State_Automato == 3817 && Evento == 20) {
    State_Automato =3818;
}
if (State_Automato == 3820 && Evento == 20) {
    State_Automato =3821;
}
if (State_Automato == 3824 && Evento == 20) {
    State_Automato =3825;
}
if (State_Automato == 3826 && Evento == 20) {
    State_Automato =3827;
}
if (State_Automato == 3823 && Evento == 20) {
    State_Automato =3828;
}
if (State_Automato == 3816 && Evento == 20) {
    State_Automato =3833;
}
if (State_Automato == 3836 && Evento == 20) {
    State_Automato =3837;
}
if (State_Automato == 3840 && Evento == 20) {
    State_Automato =3841;
}
if (State_Automato == 3842 && Evento == 20) {
    State_Automato =3843;
}
if (State_Automato == 3839 && Evento == 20) {
    State_Automato =3844;
}
if (State_Automato == 3848 && Evento == 20) {
    State_Automato =3849;
}
if (State_Automato == 3815 && Evento == 20) {
    State_Automato =3852;
}
if (State_Automato == 3853 && Evento == 20) {
    State_Automato =3854;
}
if (State_Automato == 3814 && Evento == 20) {
    State_Automato =3855;
}
if (State_Automato == 3864 && Evento == 20) {
    State_Automato =3865;
}
if (State_Automato == 3870 && Evento == 20) {
    State_Automato =3871;
}
if (State_Automato == 3872 && Evento == 20) {
    State_Automato =3873;
}
if (State_Automato == 3869 && Evento == 20) {
    State_Automato =3874;
}
if (State_Automato == 3877 && Evento == 20) {
    State_Automato =3878;
}
if (State_Automato == 3876 && Evento == 20) {
    State_Automato =3881;
}
if (State_Automato == 3884 && Evento == 20) {
    State_Automato =3885;
}
if (State_Automato == 3863 && Evento == 20) {
    State_Automato =3886;
}
if (State_Automato == 3891 && Evento == 20) {
    State_Automato =3892;
}
if (State_Automato == 3895 && Evento == 20) {
    State_Automato =3896;
}
if (State_Automato == 3862 && Evento == 20) {
    State_Automato =3897;
}
if (State_Automato == 3898 && Evento == 20) {
    State_Automato =3899;
}
if (State_Automato == 3902 && Evento == 20) {
    State_Automato =3903;
}
if (State_Automato == 3861 && Evento == 20) {
    State_Automato =3904;
}
if (State_Automato == 3911 && Evento == 20) {
    State_Automato =3912;
}
if (State_Automato == 3914 && Evento == 20) {
    State_Automato =3915;
}
if (State_Automato == 3913 && Evento == 20) {
    State_Automato =3916;
}
if (State_Automato == 3921 && Evento == 20) {
    State_Automato =3922;
}
if (State_Automato == 3927 && Evento == 20) {
    State_Automato =3928;
}
if (State_Automato == 3926 && Evento == 20) {
    State_Automato =3929;
}
if (State_Automato == 3925 && Evento == 20) {
    State_Automato =3930;
}
if (State_Automato == 3920 && Evento == 20) {
    State_Automato =3931;
}
if (State_Automato == 3935 && Evento == 20) {
    State_Automato =3936;
}
if (State_Automato == 3934 && Evento == 20) {
    State_Automato =3937;
}
if (State_Automato == 3919 && Evento == 20) {
    State_Automato =3938;
}
if (State_Automato == 3918 && Evento == 20) {
    State_Automato =3939;
}
if (State_Automato == 3940 && Evento == 20) {
    State_Automato =3941;
}
if (State_Automato == 5 && Evento == 20) {
    State_Automato =3942;
}
if (State_Automato == 3946 && Evento == 20) {
    State_Automato =3947;
}
if (State_Automato == 3953 && Evento == 20) {
    State_Automato =3954;
}
if (State_Automato == 3957 && Evento == 20) {
    State_Automato =3958;
}
if (State_Automato == 3952 && Evento == 20) {
    State_Automato =3961;
}
if (State_Automato == 3968 && Evento == 20) {
    State_Automato =3969;
}
if (State_Automato == 3981 && Evento == 20) {
    State_Automato =3982;
}
if (State_Automato == 3984 && Evento == 20) {
    State_Automato =3985;
}
if (State_Automato == 3980 && Evento == 20) {
    State_Automato =3989;
}
if (State_Automato == 3994 && Evento == 20) {
    State_Automato =3995;
}
if (State_Automato == 4001 && Evento == 20) {
    State_Automato =4002;
}
if (State_Automato == 4000 && Evento == 20) {
    State_Automato =4005;
}
if (State_Automato == 4008 && Evento == 20) {
    State_Automato =4009;
}
if (State_Automato == 4012 && Evento == 20) {
    State_Automato =4013;
}
if (State_Automato == 4019 && Evento == 20) {
    State_Automato =4020;
}
if (State_Automato == 4022 && Evento == 20) {
    State_Automato =4023;
}
if (State_Automato == 4024 && Evento == 20) {
    State_Automato =4025;
}
if (State_Automato == 4021 && Evento == 20) {
    State_Automato =4026;
}
if (State_Automato == 4028 && Evento == 20) {
    State_Automato =4029;
}
if (State_Automato == 4027 && Evento == 20) {
    State_Automato =4030;
}
if (State_Automato == 4018 && Evento == 20) {
    State_Automato =4031;
}
if (State_Automato == 4032 && Evento == 20) {
    State_Automato =4033;
}
if (State_Automato == 4034 && Evento == 20) {
    State_Automato =4035;
}
if (State_Automato == 4017 && Evento == 20) {
    State_Automato =4036;
}
if (State_Automato == 4041 && Evento == 20) {
    State_Automato =4042;
}
if (State_Automato == 4 && Evento == 20) {
    State_Automato =4043;
}
if (State_Automato == 4049 && Evento == 20) {
    State_Automato =4050;
}
if (State_Automato == 4055 && Evento == 20) {
    State_Automato =4056;
}
if (State_Automato == 4059 && Evento == 20) {
    State_Automato =4060;
}
if (State_Automato == 4065 && Evento == 20) {
    State_Automato =4066;
}
if (State_Automato == 4069 && Evento == 20) {
    State_Automato =4070;
}
if (State_Automato == 4071 && Evento == 20) {
    State_Automato =4072;
}
if (State_Automato == 4075 && Evento == 20) {
    State_Automato =4076;
}
if (State_Automato == 4080 && Evento == 20) {
    State_Automato =4081;
}
if (State_Automato == 4085 && Evento == 20) {
    State_Automato =4086;
}
if (State_Automato == 4074 && Evento == 20) {
    State_Automato =4087;
}
if (State_Automato == 3 && Evento == 20) {
    State_Automato =4090;
}
if (State_Automato == 4098 && Evento == 20) {
    State_Automato =4099;
}
if (State_Automato == 4103 && Evento == 20) {
    State_Automato =4104;
}
if (State_Automato == 4109 && Evento == 20) {
    State_Automato =4110;
}
if (State_Automato == 4113 && Evento == 20) {
    State_Automato =4114;
}
if (State_Automato == 4108 && Evento == 20) {
    State_Automato =4117;
}
if (State_Automato == 4122 && Evento == 20) {
    State_Automato =4123;
}
if (State_Automato == 4121 && Evento == 20) {
    State_Automato =4124;
}
if (State_Automato == 2 && Evento == 20) {
    State_Automato =4125;
}
if (State_Automato == 4128 && Evento == 20) {
    State_Automato =4129;
}
if (State_Automato == 1 && Evento == 20) {
    State_Automato =4132;
}


}

function trans1(){
    if (State_Automato == 16){
        Gera_Evento = 1;
        State_Automato = 18;
   }
   if (State_Automato == 55){
        Gera_Evento = 1;
        State_Automato = 48;
   }
   if (State_Automato == 65){
        Gera_Evento = 1;
        State_Automato = 59;
   }
   if (State_Automato == 169){
        Gera_Evento = 1;
        State_Automato = 95;
   }
   if (State_Automato == 170){
        Gera_Evento = 1;
        State_Automato = 97;
   }
   if (State_Automato == 174){
        Gera_Evento = 1;
        State_Automato = 136;
   }
   if (State_Automato == 176){
        Gera_Evento = 1;
        State_Automato = 142;
   }
   if (State_Automato == 205){
        Gera_Evento = 1;
        State_Automato = 92;
   }
   if (State_Automato == 211){
        Gera_Evento = 1;
        State_Automato = 104;
   }
   if (State_Automato == 212){
        Gera_Evento = 1;
        State_Automato = 110;
   }
   if (State_Automato == 218){
        Gera_Evento = 1;
        State_Automato = 120;
   }
   if (State_Automato == 228){
        Gera_Evento = 1;
        State_Automato = 159;
   }
   if (State_Automato == 247){
        Gera_Evento = 1;
        State_Automato = 117;
   }
   if (State_Automato == 253){
        Gera_Evento = 1;
        State_Automato = 126;
   }
   if (State_Automato == 254){
        Gera_Evento = 1;
        State_Automato = 131;
   }
   if (State_Automato == 261){
        Gera_Evento = 1;
        State_Automato = 152;
   }
   if (State_Automato == 263){
        Gera_Evento = 1;
        State_Automato = 158;
   }
   if (State_Automato == 322){
        Gera_Evento = 1;
        State_Automato = 308;
   }
   if (State_Automato == 341){
        Gera_Evento = 1;
        State_Automato = 299;
   }
   if (State_Automato == 351){
        Gera_Evento = 1;
        State_Automato = 314;
   }
   if (State_Automato == 358){
        Gera_Evento = 1;
        State_Automato = 304;
   }
   if (State_Automato == 390){
        Gera_Evento = 1;
        State_Automato = 362;
   }
   if (State_Automato == 392){
        Gera_Evento = 1;
        State_Automato = 361;
   }
   if (State_Automato == 470){
        Gera_Evento = 1;
        State_Automato = 473;
   }
   if (State_Automato == 570){
        Gera_Evento = 1;
        State_Automato = 484;
   }
   if (State_Automato == 573){
        Gera_Evento = 1;
        State_Automato = 488;
   }
   if (State_Automato == 580){
        Gera_Evento = 1;
        State_Automato = 487;
   }
   if (State_Automato == 585){
        Gera_Evento = 1;
        State_Automato = 515;
   }
   if (State_Automato == 601){
        Gera_Evento = 1;
        State_Automato = 547;
   }
   if (State_Automato == 624){
        Gera_Evento = 1;
        State_Automato = 551;
   }
   if (State_Automato == 643){
        Gera_Evento = 1;
        State_Automato = 482;
   }
   if (State_Automato == 651){
        Gera_Evento = 1;
        State_Automato = 499;
   }
   if (State_Automato == 654){
        Gera_Evento = 1;
        State_Automato = 504;
   }
   if (State_Automato == 658){
        Gera_Evento = 1;
        State_Automato = 512;
   }
   if (State_Automato == 693){
        Gera_Evento = 1;
        State_Automato = 508;
   }
   if (State_Automato == 695){
        Gera_Evento = 1;
        State_Automato = 526;
   }
   if (State_Automato == 701){
        Gera_Evento = 1;
        State_Automato = 537;
   }
   if (State_Automato == 706){
        Gera_Evento = 1;
        State_Automato = 536;
   }
   if (State_Automato == 717){
        Gera_Evento = 1;
        State_Automato = 542;
   }
   if (State_Automato == 720){
        Gera_Evento = 1;
        State_Automato = 555;
   }
   if (State_Automato == 729){
        Gera_Evento = 1;
        State_Automato = 531;
   }
   if (State_Automato == 730){
        Gera_Evento = 1;
        State_Automato = 559;
   }
   if (State_Automato == 784){
        Gera_Evento = 1;
        State_Automato = 742;
   }
   if (State_Automato == 790){
        Gera_Evento = 1;
        State_Automato = 764;
   }
   if (State_Automato == 792){
        Gera_Evento = 1;
        State_Automato = 768;
   }
   if (State_Automato == 802){
        Gera_Evento = 1;
        State_Automato = 739;
   }
   if (State_Automato == 815){
        Gera_Evento = 1;
        State_Automato = 759;
   }
   if (State_Automato == 818){
        Gera_Evento = 1;
        State_Automato = 772;
   }
   if (State_Automato == 861){
        Gera_Evento = 1;
        State_Automato = 856;
   }
   if (State_Automato == 883){
        Gera_Evento = 1;
        State_Automato = 865;
   }
   if (State_Automato == 1183){
        Gera_Evento = 1;
        State_Automato = 899;
   }
   if (State_Automato == 1190){
        Gera_Evento = 1;
        State_Automato = 902;
   }
   if (State_Automato == 1191){
        Gera_Evento = 1;
        State_Automato = 905;
   }
   if (State_Automato == 1203){
        Gera_Evento = 1;
        State_Automato = 909;
   }
   if (State_Automato == 1204){
        Gera_Evento = 1;
        State_Automato = 911;
   }
   if (State_Automato == 1206){
        Gera_Evento = 1;
        State_Automato = 913;
   }
   if (State_Automato == 1212){
        Gera_Evento = 1;
        State_Automato = 918;
   }
   if (State_Automato == 1218){
        Gera_Evento = 1;
        State_Automato = 922;
   }
   if (State_Automato == 1219){
        Gera_Evento = 1;
        State_Automato = 925;
   }
   if (State_Automato == 1221){
        Gera_Evento = 1;
        State_Automato = 928;
   }
   if (State_Automato == 1227){
        Gera_Evento = 1;
        State_Automato = 932;
   }
   if (State_Automato == 1238){
        Gera_Evento = 1;
        State_Automato = 939;
   }
   if (State_Automato == 1240){
        Gera_Evento = 1;
        State_Automato = 949;
   }
   if (State_Automato == 1273){
        Gera_Evento = 1;
        State_Automato = 917;
   }
   if (State_Automato == 1276){
        Gera_Evento = 1;
        State_Automato = 943;
   }
   if (State_Automato == 1288){
        Gera_Evento = 1;
        State_Automato = 948;
   }
   if (State_Automato == 1325){
        Gera_Evento = 1;
        State_Automato = 947;
   }
   if (State_Automato == 1340){
        Gera_Evento = 1;
        State_Automato = 927;
   }
   if (State_Automato == 1352){
        Gera_Evento = 1;
        State_Automato = 1034;
   }
   if (State_Automato == 1357){
        Gera_Evento = 1;
        State_Automato = 1038;
   }
   if (State_Automato == 1359){
        Gera_Evento = 1;
        State_Automato = 1041;
   }
   if (State_Automato == 1361){
        Gera_Evento = 1;
        State_Automato = 1048;
   }
   if (State_Automato == 1362){
        Gera_Evento = 1;
        State_Automato = 1050;
   }
   if (State_Automato == 1397){
        Gera_Evento = 1;
        State_Automato = 1040;
   }
   if (State_Automato == 1407){
        Gera_Evento = 1;
        State_Automato = 1093;
   }
   if (State_Automato == 1412){
        Gera_Evento = 1;
        State_Automato = 1095;
   }
   if (State_Automato == 1414){
        Gera_Evento = 1;
        State_Automato = 1097;
   }
   if (State_Automato == 1422){
        Gera_Evento = 1;
        State_Automato = 1148;
   }
   if (State_Automato == 1508){
        Gera_Evento = 1;
        State_Automato = 957;
   }
   if (State_Automato == 1517){
        Gera_Evento = 1;
        State_Automato = 974;
   }
   if (State_Automato == 1523){
        Gera_Evento = 1;
        State_Automato = 979;
   }
   if (State_Automato == 1524){
        Gera_Evento = 1;
        State_Automato = 982;
   }
   if (State_Automato == 1540){
        Gera_Evento = 1;
        State_Automato = 973;
   }
   if (State_Automato == 1550){
        Gera_Evento = 1;
        State_Automato = 956;
   }
   if (State_Automato == 1553){
        Gera_Evento = 1;
        State_Automato = 1033;
   }
   if (State_Automato == 1560){
        Gera_Evento = 1;
        State_Automato = 1058;
   }
   if (State_Automato == 1561){
        Gera_Evento = 1;
        State_Automato = 1065;
   }
   if (State_Automato == 1568){
        Gera_Evento = 1;
        State_Automato = 1073;
   }
   if (State_Automato == 1580){
        Gera_Evento = 1;
        State_Automato = 1092;
   }
   if (State_Automato == 1587){
        Gera_Evento = 1;
        State_Automato = 1104;
   }
   if (State_Automato == 1592){
        Gera_Evento = 1;
        State_Automato = 1108;
   }
   if (State_Automato == 1594){
        Gera_Evento = 1;
        State_Automato = 1117;
   }
   if (State_Automato == 1603){
        Gera_Evento = 1;
        State_Automato = 1116;
   }
   if (State_Automato == 1665){
        Gera_Evento = 1;
        State_Automato = 898;
   }
   if (State_Automato == 1669){
        Gera_Evento = 1;
        State_Automato = 1004;
   }
   if (State_Automato == 1671){
        Gera_Evento = 1;
        State_Automato = 1008;
   }
   if (State_Automato == 1672){
        Gera_Evento = 1;
        State_Automato = 1011;
   }
   if (State_Automato == 1677){
        Gera_Evento = 1;
        State_Automato = 1015;
   }
   if (State_Automato == 1697){
        Gera_Evento = 1;
        State_Automato = 1078;
   }
   if (State_Automato == 1703){
        Gera_Evento = 1;
        State_Automato = 1123;
   }
   if (State_Automato == 1704){
        Gera_Evento = 1;
        State_Automato = 1130;
   }
   if (State_Automato == 1711){
        Gera_Evento = 1;
        State_Automato = 1136;
   }
   if (State_Automato == 1713){
        Gera_Evento = 1;
        State_Automato = 1141;
   }
   if (State_Automato == 1714){
        Gera_Evento = 1;
        State_Automato = 1144;
   }
   if (State_Automato == 1720){
        Gera_Evento = 1;
        State_Automato = 1135;
   }
   if (State_Automato == 1732){
        Gera_Evento = 1;
        State_Automato = 1156;
   }
   if (State_Automato == 1734){
        Gera_Evento = 1;
        State_Automato = 1163;
   }
   if (State_Automato == 1756){
        Gera_Evento = 1;
        State_Automato = 1153;
   }
   if (State_Automato == 1787){
        Gera_Evento = 1;
        State_Automato = 1772;
   }
   if (State_Automato == 1790){
        Gera_Evento = 1;
        State_Automato = 1777;
   }
   if (State_Automato == 1806){
        Gera_Evento = 1;
        State_Automato = 1800;
   }
   if (State_Automato == 1815){
        Gera_Evento = 1;
        State_Automato = 1799;
   }
   if (State_Automato == 1857){
        Gera_Evento = 1;
        State_Automato = 1820;
   }
   if (State_Automato == 1858){
        Gera_Evento = 1;
        State_Automato = 1824;
   }
   if (State_Automato == 1866){
        Gera_Evento = 1;
        State_Automato = 1843;
   }
   if (State_Automato == 1892){
        Gera_Evento = 1;
        State_Automato = 1818;
   }
   if (State_Automato == 1908){
        Gera_Evento = 1;
        State_Automato = 1842;
   }
   if (State_Automato == 1927){
        Gera_Evento = 1;
        State_Automato = 1928;
   }
   if (State_Automato == 1935){
        Gera_Evento = 1;
        State_Automato = 1938;
   }
   if (State_Automato == 1951){
        Gera_Evento = 1;
        State_Automato = 1943;
   }
   if (State_Automato == 1962){
        Gera_Evento = 1;
        State_Automato = 1946;
   }
   if (State_Automato == 1964){
        Gera_Evento = 1;
        State_Automato = 1966;
   }
   if (State_Automato == 2043){
        Gera_Evento = 1;
        State_Automato = 2017;
   }
   if (State_Automato == 2059){
        Gera_Evento = 1;
        State_Automato = 2038;
   }
   if (State_Automato == 2068){
        Gera_Evento = 1;
        State_Automato = 2014;
   }
   if (State_Automato == 2074){
        Gera_Evento = 1;
        State_Automato = 2009;
   }
   if (State_Automato == 2080){
        Gera_Evento = 1;
        State_Automato = 2032;
   }
   if (State_Automato == 2103){
        Gera_Evento = 1;
        State_Automato = 2090;
   }
   if (State_Automato == 2108){
        Gera_Evento = 1;
        State_Automato = 2089;
   }
   if (State_Automato == 2235){
        Gera_Evento = 1;
        State_Automato = 2204;
   }
   if (State_Automato == 2246){
        Gera_Evento = 1;
        State_Automato = 2201;
   }
   if (State_Automato == 2249){
        Gera_Evento = 1;
        State_Automato = 2217;
   }
   if (State_Automato == 2256){
        Gera_Evento = 1;
        State_Automato = 2221;
   }
   if (State_Automato == 2260){
        Gera_Evento = 1;
        State_Automato = 2226;
   }
   if (State_Automato == 2265){
        Gera_Evento = 1;
        State_Automato = 2216;
   }
   if (State_Automato == 2323){
        Gera_Evento = 1;
        State_Automato = 2274;
   }
   if (State_Automato == 2334){
        Gera_Evento = 1;
        State_Automato = 2289;
   }
   if (State_Automato == 2348){
        Gera_Evento = 1;
        State_Automato = 2281;
   }
   if (State_Automato == 2355){
        Gera_Evento = 1;
        State_Automato = 2272;
   }
   if (State_Automato == 2359){
        Gera_Evento = 1;
        State_Automato = 2363;
   }
   if (State_Automato == 2400){
        Gera_Evento = 1;
        State_Automato = 2371;
   }
   if (State_Automato == 2401){
        Gera_Evento = 1;
        State_Automato = 2376;
   }
   if (State_Automato == 2407){
        Gera_Evento = 1;
        State_Automato = 2368;
   }
   if (State_Automato == 2408){
        Gera_Evento = 1;
        State_Automato = 2375;
   }
   if (State_Automato == 2410){
        Gera_Evento = 1;
        State_Automato = 2413;
   }
   if (State_Automato == 2439){
        Gera_Evento = 1;
        State_Automato = 2418;
   }
   if (State_Automato == 2581){
        Gera_Evento = 1;
        State_Automato = 2464;
   }
   if (State_Automato == 2586){
        Gera_Evento = 1;
        State_Automato = 2468;
   }
   if (State_Automato == 2588){
        Gera_Evento = 1;
        State_Automato = 2470;
   }
   if (State_Automato == 2590){
        Gera_Evento = 1;
        State_Automato = 2472;
   }
   if (State_Automato == 2591){
        Gera_Evento = 1;
        State_Automato = 2474;
   }
   if (State_Automato == 2621){
        Gera_Evento = 1;
        State_Automato = 2504;
   }
   if (State_Automato == 2626){
        Gera_Evento = 1;
        State_Automato = 2508;
   }
   if (State_Automato == 2628){
        Gera_Evento = 1;
        State_Automato = 2518;
   }
   if (State_Automato == 2637){
        Gera_Evento = 1;
        State_Automato = 2512;
   }
   if (State_Automato == 2639){
        Gera_Evento = 1;
        State_Automato = 2517;
   }
   if (State_Automato == 2648){
        Gera_Evento = 1;
        State_Automato = 2516;
   }
   if (State_Automato == 2656){
        Gera_Evento = 1;
        State_Automato = 2554;
   }
   if (State_Automato == 2741){
        Gera_Evento = 1;
        State_Automato = 2463;
   }
   if (State_Automato == 2749){
        Gera_Evento = 1;
        State_Automato = 2482;
   }
   if (State_Automato == 2765){
        Gera_Evento = 1;
        State_Automato = 2492;
   }
   if (State_Automato == 2768){
        Gera_Evento = 1;
        State_Automato = 2503;
   }
   if (State_Automato == 2807){
        Gera_Evento = 1;
        State_Automato = 2539;
   }
   if (State_Automato == 2809){
        Gera_Evento = 1;
        State_Automato = 2550;
   }
   if (State_Automato == 2815){
        Gera_Evento = 1;
        State_Automato = 2562;
   }
   if (State_Automato == 2827){
        Gera_Evento = 1;
        State_Automato = 2559;
   }
   if (State_Automato == 2830){
        Gera_Evento = 1;
        State_Automato = 2833;
   }
   if (State_Automato == 2842){
        Gera_Evento = 1;
        State_Automato = 2844;
   }
   if (State_Automato == 2846){
        Gera_Evento = 1;
        State_Automato = 628;
   }
   if (State_Automato == 2849){
        Gera_Evento = 1;
        State_Automato = 1233;
   }
   if (State_Automato == 2850){
        Gera_Evento = 1;
        State_Automato = 1252;
   }
   if (State_Automato == 2852){
        Gera_Evento = 1;
        State_Automato = 1282;
   }
   if (State_Automato == 2855){
        Gera_Evento = 1;
        State_Automato = 2857;
   }
   if (State_Automato == 2895){
        Gera_Evento = 1;
        State_Automato = 2881;
   }
   if (State_Automato == 2980){
        Gera_Evento = 1;
        State_Automato = 2938;
   }
   if (State_Automato == 2985){
        Gera_Evento = 1;
        State_Automato = 2944;
   }
   if (State_Automato == 2987){
        Gera_Evento = 1;
        State_Automato = 2952;
   }
   if (State_Automato == 2993){
        Gera_Evento = 1;
        State_Automato = 2937;
   }
   if (State_Automato == 2995){
        Gera_Evento = 1;
        State_Automato = 2968;
   }
   if (State_Automato == 2997){
        Gera_Evento = 1;
        State_Automato = 2999;
   }
   if (State_Automato == 3011){
        Gera_Evento = 1;
        State_Automato = 3008;
   }
   if (State_Automato == 3021){
        Gera_Evento = 1;
        State_Automato = 3018;
   }
   if (State_Automato == 3035){
        Gera_Evento = 1;
        State_Automato = 3036;
   }
   if (State_Automato == 3067){
        Gera_Evento = 1;
        State_Automato = 3060;
   }
   if (State_Automato == 3085){
        Gera_Evento = 1;
        State_Automato = 3049;
   }
   if (State_Automato == 3087){
        Gera_Evento = 1;
        State_Automato = 3053;
   }
   if (State_Automato == 3088){
        Gera_Evento = 1;
        State_Automato = 3059;
   }
   if (State_Automato == 3094){
        Gera_Evento = 1;
        State_Automato = 3095;
   }
   if (State_Automato == 3097){
        Gera_Evento = 1;
        State_Automato = 3099;
   }
   if (State_Automato == 3112){
        Gera_Evento = 1;
        State_Automato = 3107;
   }
   if (State_Automato == 3113){
        Gera_Evento = 1;
        State_Automato = 3116;
   }
   if (State_Automato == 3150){
        Gera_Evento = 1;
        State_Automato = 3132;
   }
   if (State_Automato == 3156){
        Gera_Evento = 1;
        State_Automato = 3158;
   }
   if (State_Automato == 3169){
        Gera_Evento = 1;
        State_Automato = 3170;
   }
   if (State_Automato == 3177){
        Gera_Evento = 1;
        State_Automato = 3179;
   }
   if (State_Automato == 3190){
        Gera_Evento = 1;
        State_Automato = 3184;
   }
   if (State_Automato == 3196){
        Gera_Evento = 1;
        State_Automato = 3197;
   }
   if (State_Automato == 3262){
        Gera_Evento = 1;
        State_Automato = 3219;
   }
   if (State_Automato == 3265){
        Gera_Evento = 1;
        State_Automato = 3247;
   }
   if (State_Automato == 3293){
        Gera_Evento = 1;
        State_Automato = 3278;
   }
   if (State_Automato == 3315){
        Gera_Evento = 1;
        State_Automato = 3312;
   }
   if (State_Automato == 3365){
        Gera_Evento = 1;
        State_Automato = 3356;
   }
   if (State_Automato == 3376){
        Gera_Evento = 1;
        State_Automato = 3350;
   }
   if (State_Automato == 3379){
        Gera_Evento = 1;
        State_Automato = 3355;
   }
   if (State_Automato == 3480){
        Gera_Evento = 1;
        State_Automato = 3418;
   }
   if (State_Automato == 3503){
        Gera_Evento = 1;
        State_Automato = 3413;
   }
   if (State_Automato == 3509){
        Gera_Evento = 1;
        State_Automato = 3427;
   }
   if (State_Automato == 3510){
        Gera_Evento = 1;
        State_Automato = 3433;
   }
   if (State_Automato == 3512){
        Gera_Evento = 1;
        State_Automato = 3440;
   }
   if (State_Automato == 3531){
        Gera_Evento = 1;
        State_Automato = 3454;
   }
   if (State_Automato == 3533){
        Gera_Evento = 1;
        State_Automato = 3460;
   }
   if (State_Automato == 3534){
        Gera_Evento = 1;
        State_Automato = 3471;
   }
   if (State_Automato == 3559){
        Gera_Evento = 1;
        State_Automato = 3561;
   }
   if (State_Automato == 3568){
        Gera_Evento = 1;
        State_Automato = 3569;
   }
   if (State_Automato == 3581){
        Gera_Evento = 1;
        State_Automato = 3576;
   }
   if (State_Automato == 3630){
        Gera_Evento = 1;
        State_Automato = 3619;
   }
   if (State_Automato == 3660){
        Gera_Evento = 1;
        State_Automato = 3655;
   }
   if (State_Automato == 3678){
        Gera_Evento = 1;
        State_Automato = 3679;
   }
   if (State_Automato == 3685){
        Gera_Evento = 1;
        State_Automato = 3688;
   }
   if (State_Automato == 3702){
        Gera_Evento = 1;
        State_Automato = 3692;
   }
   if (State_Automato == 3704){
        Gera_Evento = 1;
        State_Automato = 3705;
   }
   if (State_Automato == 3735){
        Gera_Evento = 1;
        State_Automato = 3715;
   }
   if (State_Automato == 3744){
        Gera_Evento = 1;
        State_Automato = 3723;
   }
   if (State_Automato == 3745){
        Gera_Evento = 1;
        State_Automato = 3746;
   }
   if (State_Automato == 3751){
        Gera_Evento = 1;
        State_Automato = 3754;
   }
   if (State_Automato == 3777){
        Gera_Evento = 1;
        State_Automato = 3772;
   }
   if (State_Automato == 3778){
        Gera_Evento = 1;
        State_Automato = 3781;
   }
   if (State_Automato == 3805){
        Gera_Evento = 1;
        State_Automato = 3791;
   }
   if (State_Automato == 3807){
        Gera_Evento = 1;
        State_Automato = 3808;
   }
   if (State_Automato == 3922){
        Gera_Evento = 1;
        State_Automato = 3867;
   }
   if (State_Automato == 3931){
        Gera_Evento = 1;
        State_Automato = 3887;
   }
   if (State_Automato == 3936){
        Gera_Evento = 1;
        State_Automato = 3893;
   }
   if (State_Automato == 3938){
        Gera_Evento = 1;
        State_Automato = 3907;
   }
   if (State_Automato == 4005){
        Gera_Evento = 1;
        State_Automato = 4006;
   }
   if (State_Automato == 4042){
        Gera_Evento = 1;
        State_Automato = 4010;
   }
   if (State_Automato == 4060){
        Gera_Evento = 1;
        State_Automato = 4062;
   }
   if (State_Automato == 4090){
        Gera_Evento = 1;
        State_Automato = 4093;
   }
   if (State_Automato == 4123){
        Gera_Evento = 1;
        State_Automato = 4105;
   }
   
}

function trans3(){  
    if (State_Automato == 10){
        Gera_Evento = 3;
        State_Automato = 11;
   }
   if (State_Automato == 47){
        Gera_Evento = 3;
        State_Automato = 48;
   }
   if (State_Automato == 58){
        Gera_Evento = 3;
        State_Automato = 59;
   }
   if (State_Automato == 68){
        Gera_Evento = 3;
        State_Automato = 69;
   }
   if (State_Automato == 125){
        Gera_Evento = 3;
        State_Automato = 126;
   }
   if (State_Automato == 130){
        Gera_Evento = 3;
        State_Automato = 131;
   }
   if (State_Automato == 148){
        Gera_Evento = 3;
        State_Automato = 149;
   }
   if (State_Automato == 151){
        Gera_Evento = 3;
        State_Automato = 152;
   }
   if (State_Automato == 179){
        Gera_Evento = 3;
        State_Automato = 180;
   }
   if (State_Automato == 183){
        Gera_Evento = 3;
        State_Automato = 184;
   }
   if (State_Automato == 188){
        Gera_Evento = 3;
        State_Automato = 189;
   }
   if (State_Automato == 197){
        Gera_Evento = 3;
        State_Automato = 198;
   }
   if (State_Automato == 218){
        Gera_Evento = 3;
        State_Automato = 219;
   }
   if (State_Automato == 223){
        Gera_Evento = 3;
        State_Automato = 224;
   }
   if (State_Automato == 232){
        Gera_Evento = 3;
        State_Automato = 233;
   }
   if (State_Automato == 247){
        Gera_Evento = 3;
        State_Automato = 248;
   }
   if (State_Automato == 256){
        Gera_Evento = 3;
        State_Automato = 257;
   }
   if (State_Automato == 263){
        Gera_Evento = 3;
        State_Automato = 264;
   }
   if (State_Automato == 268){
        Gera_Evento = 3;
        State_Automato = 269;
   }
   if (State_Automato == 360){
        Gera_Evento = 3;
        State_Automato = 361;
   }
   if (State_Automato == 374){
        Gera_Evento = 3;
        State_Automato = 375;
   }
   if (State_Automato == 458){
        Gera_Evento = 3;
        State_Automato = 459;
   }
   if (State_Automato == 480){
        Gera_Evento = 3;
        State_Automato = 481;
   }
   if (State_Automato == 486){
        Gera_Evento = 3;
        State_Automato = 487;
   }
   if (State_Automato == 498){
        Gera_Evento = 3;
        State_Automato = 499;
   }
   if (State_Automato == 503){
        Gera_Evento = 3;
        State_Automato = 504;
   }
   if (State_Automato == 507){
        Gera_Evento = 3;
        State_Automato = 508;
   }
   if (State_Automato == 530){
        Gera_Evento = 3;
        State_Automato = 531;
   }
   if (State_Automato == 535){
        Gera_Evento = 3;
        State_Automato = 536;
   }
   if (State_Automato == 541){
        Gera_Evento = 3;
        State_Automato = 542;
   }
   if (State_Automato == 545){
        Gera_Evento = 3;
        State_Automato = 546;
   }
   if (State_Automato == 550){
        Gera_Evento = 3;
        State_Automato = 551;
   }
   if (State_Automato == 554){
        Gera_Evento = 3;
        State_Automato = 555;
   }
   if (State_Automato == 558){
        Gera_Evento = 3;
        State_Automato = 559;
   }
   if (State_Automato == 601){
        Gera_Evento = 3;
        State_Automato = 602;
   }
   if (State_Automato == 613){
        Gera_Evento = 3;
        State_Automato = 614;
   }
   if (State_Automato == 618){
        Gera_Evento = 3;
        State_Automato = 619;
   }
   if (State_Automato == 627){
        Gera_Evento = 3;
        State_Automato = 628;
   }
   if (State_Automato == 643){
        Gera_Evento = 3;
        State_Automato = 644;
   }
   if (State_Automato == 721){
        Gera_Evento = 3;
        State_Automato = 722;
   }
   if (State_Automato == 753){
        Gera_Evento = 3;
        State_Automato = 754;
   }
   if (State_Automato == 758){
        Gera_Evento = 3;
        State_Automato = 759;
   }
   if (State_Automato == 762){
        Gera_Evento = 3;
        State_Automato = 763;
   }
   if (State_Automato == 767){
        Gera_Evento = 3;
        State_Automato = 768;
   }
   if (State_Automato == 771){
        Gera_Evento = 3;
        State_Automato = 772;
   }
   if (State_Automato == 855){
        Gera_Evento = 3;
        State_Automato = 856;
   }
   if (State_Automato == 864){
        Gera_Evento = 3;
        State_Automato = 865;
   }
   if (State_Automato == 870){
        Gera_Evento = 3;
        State_Automato = 871;
   }
   if (State_Automato == 873){
        Gera_Evento = 3;
        State_Automato = 874;
   }
   if (State_Automato == 884){
        Gera_Evento = 3;
        State_Automato = 885;
   }
   if (State_Automato == 887){
        Gera_Evento = 3;
        State_Automato = 888;
   }
   if (State_Automato == 955){
        Gera_Evento = 3;
        State_Automato = 956;
   }
   if (State_Automato == 1025){
        Gera_Evento = 3;
        State_Automato = 1026;
   }
   if (State_Automato == 1077){
        Gera_Evento = 3;
        State_Automato = 1078;
   }
   if (State_Automato == 1134){
        Gera_Evento = 3;
        State_Automato = 1135;
   }
   if (State_Automato == 1152){
        Gera_Evento = 3;
        State_Automato = 1153;
   }
   if (State_Automato == 1155){
        Gera_Evento = 3;
        State_Automato = 1156;
   }
   if (State_Automato == 1173){
        Gera_Evento = 3;
        State_Automato = 1174;
   }
   if (State_Automato == 1183){
        Gera_Evento = 3;
        State_Automato = 1184;
   }
   if (State_Automato == 1191){
        Gera_Evento = 3;
        State_Automato = 1192;
   }
   if (State_Automato == 1196){
        Gera_Evento = 3;
        State_Automato = 1197;
   }
   if (State_Automato == 1221){
        Gera_Evento = 3;
        State_Automato = 1222;
   }
   if (State_Automato == 1227){
        Gera_Evento = 3;
        State_Automato = 1228;
   }
   if (State_Automato == 1232){
        Gera_Evento = 3;
        State_Automato = 1233;
   }
   if (State_Automato == 1240){
        Gera_Evento = 3;
        State_Automato = 1241;
   }
   if (State_Automato == 1246){
        Gera_Evento = 3;
        State_Automato = 1247;
   }
   if (State_Automato == 1251){
        Gera_Evento = 3;
        State_Automato = 1252;
   }
   if (State_Automato == 1257){
        Gera_Evento = 3;
        State_Automato = 1258;
   }
   if (State_Automato == 1276){
        Gera_Evento = 3;
        State_Automato = 1277;
   }
   if (State_Automato == 1281){
        Gera_Evento = 3;
        State_Automato = 1282;
   }
   if (State_Automato == 1288){
        Gera_Evento = 3;
        State_Automato = 1289;
   }
   if (State_Automato == 1293){
        Gera_Evento = 3;
        State_Automato = 1294;
   }
   if (State_Automato == 1299){
        Gera_Evento = 3;
        State_Automato = 1300;
   }
   if (State_Automato == 1309){
        Gera_Evento = 3;
        State_Automato = 1310;
   }
   if (State_Automato == 1318){
        Gera_Evento = 3;
        State_Automato = 1319;
   }
   if (State_Automato == 1325){
        Gera_Evento = 3;
        State_Automato = 1326;
   }
   if (State_Automato == 1330){
        Gera_Evento = 3;
        State_Automato = 1331;
   }
   if (State_Automato == 1344){
        Gera_Evento = 3;
        State_Automato = 1345;
   }
   if (State_Automato == 1362){
        Gera_Evento = 3;
        State_Automato = 1363;
   }
   if (State_Automato == 1367){
        Gera_Evento = 3;
        State_Automato = 1368;
   }
   if (State_Automato == 1384){
        Gera_Evento = 3;
        State_Automato = 1385;
   }
   if (State_Automato == 1389){
        Gera_Evento = 3;
        State_Automato = 1390;
   }
   if (State_Automato == 1416){
        Gera_Evento = 3;
        State_Automato = 1417;
   }
   if (State_Automato == 1422){
        Gera_Evento = 3;
        State_Automato = 1423;
   }
   if (State_Automato == 1427){
        Gera_Evento = 3;
        State_Automato = 1428;
   }
   if (State_Automato == 1449){
        Gera_Evento = 3;
        State_Automato = 1450;
   }
   if (State_Automato == 1453){
        Gera_Evento = 3;
        State_Automato = 1454;
   }
   if (State_Automato == 1460){
        Gera_Evento = 3;
        State_Automato = 1461;
   }
   if (State_Automato == 1472){
        Gera_Evento = 3;
        State_Automato = 1473;
   }
   if (State_Automato == 1477){
        Gera_Evento = 3;
        State_Automato = 1478;
   }
   if (State_Automato == 1487){
        Gera_Evento = 3;
        State_Automato = 1488;
   }
   if (State_Automato == 1508){
        Gera_Evento = 3;
        State_Automato = 1509;
   }
   if (State_Automato == 1534){
        Gera_Evento = 3;
        State_Automato = 1535;
   }
   if (State_Automato == 1561){
        Gera_Evento = 3;
        State_Automato = 1562;
   }
   if (State_Automato == 1568){
        Gera_Evento = 3;
        State_Automato = 1569;
   }
   if (State_Automato == 1573){
        Gera_Evento = 3;
        State_Automato = 1574;
   }
   if (State_Automato == 1615){
        Gera_Evento = 3;
        State_Automato = 1616;
   }
   if (State_Automato == 1642){
        Gera_Evento = 3;
        State_Automato = 1643;
   }
   if (State_Automato == 1647){
        Gera_Evento = 3;
        State_Automato = 1648;
   }
   if (State_Automato == 1665){
        Gera_Evento = 3;
        State_Automato = 1666;
   }
   if (State_Automato == 1672){
        Gera_Evento = 3;
        State_Automato = 1673;
   }
   if (State_Automato == 1690){
        Gera_Evento = 3;
        State_Automato = 1691;
   }
   if (State_Automato == 1704){
        Gera_Evento = 3;
        State_Automato = 1705;
   }
   if (State_Automato == 1723){
        Gera_Evento = 3;
        State_Automato = 1724;
   }
   if (State_Automato == 1734){
        Gera_Evento = 3;
        State_Automato = 1735;
   }
   if (State_Automato == 1739){
        Gera_Evento = 3;
        State_Automato = 1740;
   }
   if (State_Automato == 1798){
        Gera_Evento = 3;
        State_Automato = 1799;
   }
   if (State_Automato == 1806){
        Gera_Evento = 3;
        State_Automato = 1807;
   }
   if (State_Automato == 1809){
        Gera_Evento = 3;
        State_Automato = 1810;
   }
   if (State_Automato == 1837){
        Gera_Evento = 3;
        State_Automato = 1838;
   }
   if (State_Automato == 1847){
        Gera_Evento = 3;
        State_Automato = 1848;
   }
   if (State_Automato == 1866){
        Gera_Evento = 3;
        State_Automato = 1867;
   }
   if (State_Automato == 1874){
        Gera_Evento = 3;
        State_Automato = 1875;
   }
   if (State_Automato == 1901){
        Gera_Evento = 3;
        State_Automato = 1902;
   }
   if (State_Automato == 1904){
        Gera_Evento = 3;
        State_Automato = 1905;
   }
   if (State_Automato == 1908){
        Gera_Evento = 3;
        State_Automato = 1909;
   }
   if (State_Automato == 1911){
        Gera_Evento = 3;
        State_Automato = 1912;
   }
   if (State_Automato == 1914){
        Gera_Evento = 3;
        State_Automato = 1915;
   }
   if (State_Automato == 1918){
        Gera_Evento = 3;
        State_Automato = 1919;
   }
   if (State_Automato == 2088){
        Gera_Evento = 3;
        State_Automato = 2089;
   }
   if (State_Automato == 2095){
        Gera_Evento = 3;
        State_Automato = 2096;
   }
   if (State_Automato == 2114){
        Gera_Evento = 3;
        State_Automato = 2115;
   }
   if (State_Automato == 2117){
        Gera_Evento = 3;
        State_Automato = 2118;
   }
   if (State_Automato == 2121){
        Gera_Evento = 3;
        State_Automato = 2122;
   }
   if (State_Automato == 2140){
        Gera_Evento = 3;
        State_Automato = 2141;
   }
   if (State_Automato == 2148){
        Gera_Evento = 3;
        State_Automato = 2149;
   }
   if (State_Automato == 2151){
        Gera_Evento = 3;
        State_Automato = 2152;
   }
   if (State_Automato == 2155){
        Gera_Evento = 3;
        State_Automato = 2156;
   }
   if (State_Automato == 2179){
        Gera_Evento = 3;
        State_Automato = 2180;
   }
   if (State_Automato == 2185){
        Gera_Evento = 3;
        State_Automato = 2186;
   }
   if (State_Automato == 2215){
        Gera_Evento = 3;
        State_Automato = 2216;
   }
   if (State_Automato == 2220){
        Gera_Evento = 3;
        State_Automato = 2221;
   }
   if (State_Automato == 2224){
        Gera_Evento = 3;
        State_Automato = 2225;
   }
   if (State_Automato == 2249){
        Gera_Evento = 3;
        State_Automato = 2250;
   }
   if (State_Automato == 2359){
        Gera_Evento = 3;
        State_Automato = 2360;
   }
   if (State_Automato == 2367){
        Gera_Evento = 3;
        State_Automato = 2368;
   }
   if (State_Automato == 2370){
        Gera_Evento = 3;
        State_Automato = 2371;
   }
   if (State_Automato == 2374){
        Gera_Evento = 3;
        State_Automato = 2375;
   }
   if (State_Automato == 2387){
        Gera_Evento = 3;
        State_Automato = 2388;
   }
   if (State_Automato == 2416){
        Gera_Evento = 3;
        State_Automato = 2417;
   }
   if (State_Automato == 2426){
        Gera_Evento = 3;
        State_Automato = 2427;
   }
   if (State_Automato == 2439){
        Gera_Evento = 3;
        State_Automato = 2440;
   }
   if (State_Automato == 2491){
        Gera_Evento = 3;
        State_Automato = 2492;
   }
   if (State_Automato == 2591){
        Gera_Evento = 3;
        State_Automato = 2592;
   }
   if (State_Automato == 2596){
        Gera_Evento = 3;
        State_Automato = 2597;
   }
   if (State_Automato == 2656){
        Gera_Evento = 3;
        State_Automato = 2657;
   }
   if (State_Automato == 2661){
        Gera_Evento = 3;
        State_Automato = 2662;
   }
   if (State_Automato == 2680){
        Gera_Evento = 3;
        State_Automato = 2681;
   }
   if (State_Automato == 2691){
        Gera_Evento = 3;
        State_Automato = 2692;
   }
   if (State_Automato == 2705){
        Gera_Evento = 3;
        State_Automato = 2706;
   }
   if (State_Automato == 2714){
        Gera_Evento = 3;
        State_Automato = 2715;
   }
   if (State_Automato == 2719){
        Gera_Evento = 3;
        State_Automato = 2720;
   }
   if (State_Automato == 2724){
        Gera_Evento = 3;
        State_Automato = 2725;
   }
   if (State_Automato == 2741){
        Gera_Evento = 3;
        State_Automato = 2742;
   }
   if (State_Automato == 2756){
        Gera_Evento = 3;
        State_Automato = 2757;
   }
   if (State_Automato == 2782){
        Gera_Evento = 3;
        State_Automato = 2783;
   }
   if (State_Automato == 2789){
        Gera_Evento = 3;
        State_Automato = 2790;
   }
   if (State_Automato == 2800){
        Gera_Evento = 3;
        State_Automato = 2801;
   }
   if (State_Automato == 3011){
        Gera_Evento = 3;
        State_Automato = 3012;
   }
   if (State_Automato == 3027){
        Gera_Evento = 3;
        State_Automato = 3028;
   }
   if (State_Automato == 3032){
        Gera_Evento = 3;
        State_Automato = 3033;
   }
   if (State_Automato == 3047){
        Gera_Evento = 3;
        State_Automato = 3048;
   }
   if (State_Automato == 3052){
        Gera_Evento = 3;
        State_Automato = 3053;
   }
   if (State_Automato == 3067){
        Gera_Evento = 3;
        State_Automato = 3068;
   }
   if (State_Automato == 3072){
        Gera_Evento = 3;
        State_Automato = 3073;
   }
   if (State_Automato == 3088){
        Gera_Evento = 3;
        State_Automato = 3089;
   }
   if (State_Automato == 3141){
        Gera_Evento = 3;
        State_Automato = 3142;
   }
   if (State_Automato == 3150){
        Gera_Evento = 3;
        State_Automato = 3151;
   }
   if (State_Automato == 3162){
        Gera_Evento = 3;
        State_Automato = 3163;
   }
   if (State_Automato == 3274){
        Gera_Evento = 3;
        State_Automato = 3275;
   }
   if (State_Automato == 3281){
        Gera_Evento = 3;
        State_Automato = 3282;
   }
   if (State_Automato == 3293){
        Gera_Evento = 3;
        State_Automato = 3294;
   }
   if (State_Automato == 3296){
        Gera_Evento = 3;
        State_Automato = 3297;
   }
   if (State_Automato == 3299){
        Gera_Evento = 3;
        State_Automato = 3300;
   }
   if (State_Automato == 3303){
        Gera_Evento = 3;
        State_Automato = 3304;
   }
   if (State_Automato == 3315){
        Gera_Evento = 3;
        State_Automato = 3316;
   }
   if (State_Automato == 3333){
        Gera_Evento = 3;
        State_Automato = 3334;
   }
   if (State_Automato == 3337){
        Gera_Evento = 3;
        State_Automato = 3338;
   }
   if (State_Automato == 3387){
        Gera_Evento = 3;
        State_Automato = 3388;
   }
   if (State_Automato == 3390){
        Gera_Evento = 3;
        State_Automato = 3391;
   }
   if (State_Automato == 3398){
        Gera_Evento = 3;
        State_Automato = 3399;
   }
   if (State_Automato == 3452){
        Gera_Evento = 3;
        State_Automato = 3453;
   }
   if (State_Automato == 3459){
        Gera_Evento = 3;
        State_Automato = 3460;
   }
   if (State_Automato == 3492){
        Gera_Evento = 3;
        State_Automato = 3493;
   }
   if (State_Automato == 3512){
        Gera_Evento = 3;
        State_Automato = 3513;
   }
   if (State_Automato == 3521){
        Gera_Evento = 3;
        State_Automato = 3522;
   }
   if (State_Automato == 3534){
        Gera_Evento = 3;
        State_Automato = 3535;
   }
   if (State_Automato == 3539){
        Gera_Evento = 3;
        State_Automato = 3540;
   }
   if (State_Automato == 3947){
        Gera_Evento = 3;
        State_Automato = 3948;
   }
   if (State_Automato == 3969){
        Gera_Evento = 3;
        State_Automato = 3970;
   }
   if (State_Automato == 3982){
        Gera_Evento = 3;
        State_Automato = 3983;
   }
   if (State_Automato == 3985){
        Gera_Evento = 3;
        State_Automato = 3986;
   }
   if (State_Automato == 3989){
        Gera_Evento = 3;
        State_Automato = 3990;
   }
   if (State_Automato == 3995){
        Gera_Evento = 3;
        State_Automato = 3996;
   }
   if (State_Automato == 4002){
        Gera_Evento = 3;
        State_Automato = 4003;
   }
   if (State_Automato == 4036){
        Gera_Evento = 3;
        State_Automato = 4037;
   }
   if (State_Automato == 4056){
        Gera_Evento = 3;
        State_Automato = 4057;
   }
   if (State_Automato == 4076){
        Gera_Evento = 3;
        State_Automato = 4077;
   }
   if (State_Automato == 4081){
        Gera_Evento = 3;
        State_Automato = 4082;
   }
   if (State_Automato == 4114){
        Gera_Evento = 3;
        State_Automato = 4115;
   }
   if (State_Automato == 4129){
        Gera_Evento = 3;
        State_Automato = 4130;
   }  

}

function trans5(){    
    if (State_Automato == 94){
        Gera_Evento = 5;
        State_Automato = 24;
   }
   if (State_Automato == 134){
        Gera_Evento = 5;
        State_Automato = 48;
   }
   if (State_Automato == 140){
        Gera_Evento = 5;
        State_Automato = 60;
   }
   if (State_Automato == 147){
        Gera_Evento = 5;
        State_Automato = 59;
   }
   if (State_Automato == 169){
        Gera_Evento = 5;
        State_Automato = 35;
   }
   if (State_Automato == 171){
        Gera_Evento = 5;
        State_Automato = 39;
   }
   if (State_Automato == 173){
        Gera_Evento = 5;
        State_Automato = 44;
   }
   if (State_Automato == 174){
        Gera_Evento = 5;
        State_Automato = 56;
   }
   if (State_Automato == 178){
        Gera_Evento = 5;
        State_Automato = 66;
   }
   if (State_Automato == 179){
        Gera_Evento = 5;
        State_Automato = 70;
   }
   if (State_Automato == 188){
        Gera_Evento = 5;
        State_Automato = 74;
   }
   if (State_Automato == 195){
        Gera_Evento = 5;
        State_Automato = 79;
   }
   if (State_Automato == 205){
        Gera_Evento = 5;
        State_Automato = 20;
   }
   if (State_Automato == 211){
        Gera_Evento = 5;
        State_Automato = 32;
   }
   if (State_Automato == 213){
        Gera_Evento = 5;
        State_Automato = 38;
   }
   if (State_Automato == 223){
        Gera_Evento = 5;
        State_Automato = 50;
   }
   if (State_Automato == 268){
        Gera_Evento = 5;
        State_Automato = 81;
   }
   if (State_Automato == 317){
        Gera_Evento = 5;
        State_Automato = 279;
   }
   if (State_Automato == 325){
        Gera_Evento = 5;
        State_Automato = 284;
   }
   if (State_Automato == 329){
        Gera_Evento = 5;
        State_Automato = 289;
   }
   if (State_Automato == 344){
        Gera_Evento = 5;
        State_Automato = 276;
   }
   if (State_Automato == 354){
        Gera_Evento = 5;
        State_Automato = 292;
   }
   if (State_Automato == 414){
        Gera_Evento = 5;
        State_Automato = 402;
   }
   if (State_Automato == 416){
        Gera_Evento = 5;
        State_Automato = 404;
   }
   if (State_Automato == 418){
        Gera_Evento = 5;
        State_Automato = 406;
   }
   if (State_Automato == 428){
        Gera_Evento = 5;
        State_Automato = 408;
   }
   if (State_Automato == 908){
        Gera_Evento = 5;
        State_Automato = 487;
   }
   if (State_Automato == 937){
        Gera_Evento = 5;
        State_Automato = 551;
   }
   if (State_Automato == 955){
        Gera_Evento = 5;
        State_Automato = 482;
   }
   if (State_Automato == 962){
        Gera_Evento = 5;
        State_Automato = 496;
   }
   if (State_Automato == 963){
        Gera_Evento = 5;
        State_Automato = 500;
   }
   if (State_Automato == 969){
        Gera_Evento = 5;
        State_Automato = 499;
   }
   if (State_Automato == 970){
        Gera_Evento = 5;
        State_Automato = 504;
   }
   if (State_Automato == 972){
        Gera_Evento = 5;
        State_Automato = 512;
   }
   if (State_Automato == 978){
        Gera_Evento = 5;
        State_Automato = 521;
   }
   if (State_Automato == 999){
        Gera_Evento = 5;
        State_Automato = 508;
   }
   if (State_Automato == 1003){
        Gera_Evento = 5;
        State_Automato = 532;
   }
   if (State_Automato == 1007){
        Gera_Evento = 5;
        State_Automato = 536;
   }
   if (State_Automato == 1022){
        Gera_Evento = 5;
        State_Automato = 542;
   }
   if (State_Automato == 1024){
        Gera_Evento = 5;
        State_Automato = 555;
   }
   if (State_Automato == 1031){
        Gera_Evento = 5;
        State_Automato = 559;
   }
   if (State_Automato == 1032){
        Gera_Evento = 5;
        State_Automato = 732;
   }
   if (State_Automato == 1046){
        Gera_Evento = 5;
        State_Automato = 768;
   }
   if (State_Automato == 1057){
        Gera_Evento = 5;
        State_Automato = 739;
   }
   if (State_Automato == 1062){
        Gera_Evento = 5;
        State_Automato = 748;
   }
   if (State_Automato == 1077){
        Gera_Evento = 5;
        State_Automato = 755;
   }
   if (State_Automato == 1082){
        Gera_Evento = 5;
        State_Automato = 759;
   }
   if (State_Automato == 1089){
        Gera_Evento = 5;
        State_Automato = 763;
   }
   if (State_Automato == 1090){
        Gera_Evento = 5;
        State_Automato = 772;
   }
   if (State_Automato == 1147){
        Gera_Evento = 5;
        State_Automato = 856;
   }
   if (State_Automato == 1151){
        Gera_Evento = 5;
        State_Automato = 865;
   }
   if (State_Automato == 1183){
        Gera_Evento = 5;
        State_Automato = 565;
   }
   if (State_Automato == 1190){
        Gera_Evento = 5;
        State_Automato = 571;
   }
   if (State_Automato == 1196){
        Gera_Evento = 5;
        State_Automato = 575;
   }
   if (State_Automato == 1206){
        Gera_Evento = 5;
        State_Automato = 581;
   }
   if (State_Automato == 1213){
        Gera_Evento = 5;
        State_Automato = 592;
   }
   if (State_Automato == 1218){
        Gera_Evento = 5;
        State_Automato = 586;
   }
   if (State_Automato == 1220){
        Gera_Evento = 5;
        State_Automato = 591;
   }
   if (State_Automato == 1221){
        Gera_Evento = 5;
        State_Automato = 604;
   }
   if (State_Automato == 1232){
        Gera_Evento = 5;
        State_Automato = 608;
   }
   if (State_Automato == 1257){
        Gera_Evento = 5;
        State_Automato = 634;
   }
   if (State_Automato == 1309){
        Gera_Evento = 5;
        State_Automato = 603;
   }
   if (State_Automato == 1315){
        Gera_Evento = 5;
        State_Automato = 614;
   }
   if (State_Automato == 1317){
        Gera_Evento = 5;
        State_Automato = 619;
   }
   if (State_Automato == 1324){
        Gera_Evento = 5;
        State_Automato = 628;
   }
   if (State_Automato == 1330){
        Gera_Evento = 5;
        State_Automato = 633;
   }
   if (State_Automato == 1340){
        Gera_Evento = 5;
        State_Automato = 602;
   }
   if (State_Automato == 1344){
        Gera_Evento = 5;
        State_Automato = 731;
   }
   if (State_Automato == 1352){
        Gera_Evento = 5;
        State_Automato = 780;
   }
   if (State_Automato == 1358){
        Gera_Evento = 5;
        State_Automato = 786;
   }
   if (State_Automato == 1389){
        Gera_Evento = 5;
        State_Automato = 799;
   }
   if (State_Automato == 1407){
        Gera_Evento = 5;
        State_Automato = 824;
   }
   if (State_Automato == 1413){
        Gera_Evento = 5;
        State_Automato = 828;
   }
   if (State_Automato == 1415){
        Gera_Evento = 5;
        State_Automato = 833;
   }
   if (State_Automato == 1416){
        Gera_Evento = 5;
        State_Automato = 862;
   }
   if (State_Automato == 1437){
        Gera_Evento = 5;
        State_Automato = 874;
   }
   if (State_Automato == 1446){
        Gera_Evento = 5;
        State_Automato = 871;
   }
   if (State_Automato == 1471){
        Gera_Evento = 5;
        State_Automato = 888;
   }
   if (State_Automato == 1487){
        Gera_Evento = 5;
        State_Automato = 893;
   }
   if (State_Automato == 1500){
        Gera_Evento = 5;
        State_Automato = 472;
   }
   if (State_Automato == 1508){
        Gera_Evento = 5;
        State_Automato = 645;
   }
   if (State_Automato == 1514){
        Gera_Evento = 5;
        State_Automato = 652;
   }
   if (State_Automato == 1516){
        Gera_Evento = 5;
        State_Automato = 656;
   }
   if (State_Automato == 1517){
        Gera_Evento = 5;
        State_Automato = 660;
   }
   if (State_Automato == 1523){
        Gera_Evento = 5;
        State_Automato = 667;
   }
   if (State_Automato == 1525){
        Gera_Evento = 5;
        State_Automato = 671;
   }
   if (State_Automato == 1526){
        Gera_Evento = 5;
        State_Automato = 674;
   }
   if (State_Automato == 1528){
        Gera_Evento = 5;
        State_Automato = 678;
   }
   if (State_Automato == 1530){
        Gera_Evento = 5;
        State_Automato = 682;
   }
   if (State_Automato == 1534){
        Gera_Evento = 5;
        State_Automato = 689;
   }
   if (State_Automato == 1540){
        Gera_Evento = 5;
        State_Automato = 659;
   }
   if (State_Automato == 1546){
        Gera_Evento = 5;
        State_Automato = 688;
   }
   if (State_Automato == 1550){
        Gera_Evento = 5;
        State_Automato = 644;
   }
   if (State_Automato == 1560){
        Gera_Evento = 5;
        State_Automato = 803;
   }
   if (State_Automato == 1561){
        Gera_Evento = 5;
        State_Automato = 805;
   }
   if (State_Automato == 1567){
        Gera_Evento = 5;
        State_Automato = 807;
   }
   if (State_Automato == 1573){
        Gera_Evento = 5;
        State_Automato = 809;
   }
   if (State_Automato == 1580){
        Gera_Evento = 5;
        State_Automato = 820;
   }
   if (State_Automato == 1587){
        Gera_Evento = 5;
        State_Automato = 840;
   }
   if (State_Automato == 1593){
        Gera_Evento = 5;
        State_Automato = 844;
   }
   if (State_Automato == 1595){
        Gera_Evento = 5;
        State_Automato = 851;
   }
   if (State_Automato == 1604){
        Gera_Evento = 5;
        State_Automato = 850;
   }
   if (State_Automato == 1615){
        Gera_Evento = 5;
        State_Automato = 858;
   }
   if (State_Automato == 1669){
        Gera_Evento = 5;
        State_Automato = 697;
   }
   if (State_Automato == 1686){
        Gera_Evento = 5;
        State_Automato = 696;
   }
   if (State_Automato == 1697){
        Gera_Evento = 5;
        State_Automato = 811;
   }
   if (State_Automato == 1743){
        Gera_Evento = 5;
        State_Automato = 471;
   }
   if (State_Automato == 1756){
        Gera_Evento = 5;
        State_Automato = 885;
   }
   if (State_Automato == 1759){
        Gera_Evento = 5;
        State_Automato = 1763;
   }
   if (State_Automato == 1831){
        Gera_Evento = 5;
        State_Automato = 1772;
   }
   if (State_Automato == 1832){
        Gera_Evento = 5;
        State_Automato = 1777;
   }
   if (State_Automato == 1837){
        Gera_Evento = 5;
        State_Automato = 1800;
   }
   if (State_Automato == 1841){
        Gera_Evento = 5;
        State_Automato = 1799;
   }
   if (State_Automato == 1892){
        Gera_Evento = 5;
        State_Automato = 1768;
   }
   if (State_Automato == 1898){
        Gera_Evento = 5;
        State_Automato = 1788;
   }
   if (State_Automato == 1900){
        Gera_Evento = 5;
        State_Automato = 1792;
   }
   if (State_Automato == 1901){
        Gera_Evento = 5;
        State_Automato = 1796;
   }
   if (State_Automato == 1904){
        Gera_Evento = 5;
        State_Automato = 1811;
   }
   if (State_Automato == 1927){
        Gera_Evento = 5;
        State_Automato = 1929;
   }
   if (State_Automato == 2004){
        Gera_Evento = 5;
        State_Automato = 1938;
   }
   if (State_Automato == 2006){
        Gera_Evento = 5;
        State_Automato = 1943;
   }
   if (State_Automato == 2012){
        Gera_Evento = 5;
        State_Automato = 1946;
   }
   if (State_Automato == 2013){
        Gera_Evento = 5;
        State_Automato = 1966;
   }
   if (State_Automato == 2023){
        Gera_Evento = 5;
        State_Automato = 152;
   }
   if (State_Automato == 2045){
        Gera_Evento = 5;
        State_Automato = 184;
   }
   if (State_Automato == 2056){
        Gera_Evento = 5;
        State_Automato = 1981;
   }
   if (State_Automato == 2067){
        Gera_Evento = 5;
        State_Automato = 219;
   }
   if (State_Automato == 2068){
        Gera_Evento = 5;
        State_Automato = 1965;
   }
   if (State_Automato == 2070){
        Gera_Evento = 5;
        State_Automato = 233;
   }
   if (State_Automato == 2071){
        Gera_Evento = 5;
        State_Automato = 1993;
   }
   if (State_Automato == 2114){
        Gera_Evento = 5;
        State_Automato = 2084;
   }
   if (State_Automato == 2117){
        Gera_Evento = 5;
        State_Automato = 2097;
   }
   if (State_Automato == 2121){
        Gera_Evento = 5;
        State_Automato = 2110;
   }
   if (State_Automato == 2135){
        Gera_Evento = 5;
        State_Automato = 2126;
   }
   if (State_Automato == 2481){
        Gera_Evento = 5;
        State_Automato = 2201;
   }
   if (State_Automato == 2486){
        Gera_Evento = 5;
        State_Automato = 2210;
   }
   if (State_Automato == 2488){
        Gera_Evento = 5;
        State_Automato = 2217;
   }
   if (State_Automato == 2490){
        Gera_Evento = 5;
        State_Automato = 2221;
   }
   if (State_Automato == 2491){
        Gera_Evento = 5;
        State_Automato = 2226;
   }
   if (State_Automato == 2500){
        Gera_Evento = 5;
        State_Automato = 2225;
   }
   if (State_Automato == 2526){
        Gera_Evento = 5;
        State_Automato = 2274;
   }
   if (State_Automato == 2527){
        Gera_Evento = 5;
        State_Automato = 2289;
   }
   if (State_Automato == 2535){
        Gera_Evento = 5;
        State_Automato = 2273;
   }
   if (State_Automato == 2553){
        Gera_Evento = 5;
        State_Automato = 2376;
   }
   if (State_Automato == 2557){
        Gera_Evento = 5;
        State_Automato = 2418;
   }
   if (State_Automato == 2581){
        Gera_Evento = 5;
        State_Automato = 2231;
   }
   if (State_Automato == 2587){
        Gera_Evento = 5;
        State_Automato = 2237;
   }
   if (State_Automato == 2621){
        Gera_Evento = 5;
        State_Automato = 2297;
   }
   if (State_Automato == 2627){
        Gera_Evento = 5;
        State_Automato = 2301;
   }
   if (State_Automato == 2629){
        Gera_Evento = 5;
        State_Automato = 2315;
   }
   if (State_Automato == 2640){
        Gera_Evento = 5;
        State_Automato = 2314;
   }
   if (State_Automato == 2646){
        Gera_Evento = 5;
        State_Automato = 2296;
   }
   if (State_Automato == 2649){
        Gera_Evento = 5;
        State_Automato = 2313;
   }
   if (State_Automato == 2674){
        Gera_Evento = 5;
        State_Automato = 2423;
   }
   if (State_Automato == 2676){
        Gera_Evento = 5;
        State_Automato = 2427;
   }
   if (State_Automato == 2680){
        Gera_Evento = 5;
        State_Automato = 2429;
   }
   if (State_Automato == 2705){
        Gera_Evento = 5;
        State_Automato = 2449;
   }
   if (State_Automato == 2741){
        Gera_Evento = 5;
        State_Automato = 2198;
   }
   if (State_Automato == 2749){
        Gera_Evento = 5;
        State_Automato = 2247;
   }
   if (State_Automato == 2750){
        Gera_Evento = 5;
        State_Automato = 2251;
   }
   if (State_Automato == 2752){
        Gera_Evento = 5;
        State_Automato = 2258;
   }
   if (State_Automato == 2756){
        Gera_Evento = 5;
        State_Automato = 2262;
   }
   if (State_Automato == 2764){
        Gera_Evento = 5;
        State_Automato = 2250;
   }
   if (State_Automato == 2768){
        Gera_Evento = 5;
        State_Automato = 2268;
   }
   if (State_Automato == 2771){
        Gera_Evento = 5;
        State_Automato = 2324;
   }
   if (State_Automato == 2772){
        Gera_Evento = 5;
        State_Automato = 2335;
   }
   if (State_Automato == 2773){
        Gera_Evento = 5;
        State_Automato = 2362;
   }
   if (State_Automato == 2777){
        Gera_Evento = 5;
        State_Automato = 2389;
   }
   if (State_Automato == 2781){
        Gera_Evento = 5;
        State_Automato = 2388;
   }
   if (State_Automato == 2782){
        Gera_Evento = 5;
        State_Automato = 2412;
   }
   if (State_Automato == 2789){
        Gera_Evento = 5;
        State_Automato = 2434;
   }
   if (State_Automato == 2800){
        Gera_Evento = 5;
        State_Automato = 2456;
   }
   if (State_Automato == 2824){
        Gera_Evento = 5;
        State_Automato = 2267;
   }
   if (State_Automato == 2825){
        Gera_Evento = 5;
        State_Automato = 2361;
   }
   if (State_Automato == 2826){
        Gera_Evento = 5;
        State_Automato = 2411;
   }
   if (State_Automato == 2827){
        Gera_Evento = 5;
        State_Automato = 2446;
   }
   if (State_Automato == 2829){
        Gera_Evento = 5;
        State_Automato = 2455;
   }
   if (State_Automato == 2863){
        Gera_Evento = 5;
        State_Automato = 2857;
   }
   if (State_Automato == 2868){
        Gera_Evento = 5;
        State_Automato = 2856;
   }
   if (State_Automato == 2889){
        Gera_Evento = 5;
        State_Automato = 2876;
   }
   if (State_Automato == 2951){
        Gera_Evento = 5;
        State_Automato = 2912;
   }
   if (State_Automato == 2957){
        Gera_Evento = 5;
        State_Automato = 2916;
   }
   if (State_Automato == 2973){
        Gera_Evento = 5;
        State_Automato = 2920;
   }
   if (State_Automato == 2977){
        Gera_Evento = 5;
        State_Automato = 2924;
   }
   if (State_Automato == 2986){
        Gera_Evento = 5;
        State_Automato = 2907;
   }
   if (State_Automato == 2996){
        Gera_Evento = 5;
        State_Automato = 2927;
   }
   if (State_Automato == 3006){
        Gera_Evento = 5;
        State_Automato = 3001;
   }
   if (State_Automato == 3046){
        Gera_Evento = 5;
        State_Automato = 3033;
   }
   if (State_Automato == 3047){
        Gera_Evento = 5;
        State_Automato = 3036;
   }
   if (State_Automato == 3105){
        Gera_Evento = 5;
        State_Automato = 3099;
   }
   if (State_Automato == 3110){
        Gera_Evento = 5;
        State_Automato = 3098;
   }
   if (State_Automato == 3113){
        Gera_Evento = 5;
        State_Automato = 3117;
   }
   if (State_Automato == 3144){
        Gera_Evento = 5;
        State_Automato = 3127;
   }
   if (State_Automato == 3169){
        Gera_Evento = 5;
        State_Automato = 3171;
   }
   if (State_Automato == 3218){
        Gera_Evento = 5;
        State_Automato = 3179;
   }
   if (State_Automato == 3223){
        Gera_Evento = 5;
        State_Automato = 3184;
   }
   if (State_Automato == 3229){
        Gera_Evento = 5;
        State_Automato = 3197;
   }
   if (State_Automato == 3262){
        Gera_Evento = 5;
        State_Automato = 3178;
   }
   if (State_Automato == 3264){
        Gera_Evento = 5;
        State_Automato = 3192;
   }
   if (State_Automato == 3269){
        Gera_Evento = 5;
        State_Automato = 3211;
   }
   if (State_Automato == 3287){
        Gera_Evento = 5;
        State_Automato = 3275;
   }
   if (State_Automato == 3426){
        Gera_Evento = 5;
        State_Automato = 3350;
   }
   if (State_Automato == 3431){
        Gera_Evento = 5;
        State_Automato = 3355;
   }
   if (State_Automato == 3439){
        Gera_Evento = 5;
        State_Automato = 3383;
   }
   if (State_Automato == 3451){
        Gera_Evento = 5;
        State_Automato = 3388;
   }
   if (State_Automato == 3452){
        Gera_Evento = 5;
        State_Automato = 3395;
   }
   if (State_Automato == 3465){
        Gera_Evento = 5;
        State_Automato = 3399;
   }
   if (State_Automato == 3481){
        Gera_Evento = 5;
        State_Automato = 3370;
   }
   if (State_Automato == 3503){
        Gera_Evento = 5;
        State_Automato = 3345;
   }
   if (State_Automato == 3509){
        Gera_Evento = 5;
        State_Automato = 3377;
   }
   if (State_Automato == 3511){
        Gera_Evento = 5;
        State_Automato = 3381;
   }
   if (State_Automato == 3521){
        Gera_Evento = 5;
        State_Automato = 3393;
   }
   if (State_Automato == 3559){
        Gera_Evento = 5;
        State_Automato = 3562;
   }
   if (State_Automato == 3574){
        Gera_Evento = 5;
        State_Automato = 3569;
   }
   if (State_Automato == 3633){
        Gera_Evento = 5;
        State_Automato = 3603;
   }
   if (State_Automato == 3678){
        Gera_Evento = 5;
        State_Automato = 3680;
   }
   if (State_Automato == 3714){
        Gera_Evento = 5;
        State_Automato = 3688;
   }
   if (State_Automato == 3720){
        Gera_Evento = 5;
        State_Automato = 3692;
   }
   if (State_Automato == 3721){
        Gera_Evento = 5;
        State_Automato = 3705;
   }
   if (State_Automato == 3735){
        Gera_Evento = 5;
        State_Automato = 3687;
   }
   if (State_Automato == 3741){
        Gera_Evento = 5;
        State_Automato = 3697;
   }
   if (State_Automato == 3742){
        Gera_Evento = 5;
        State_Automato = 3708;
   }
   if (State_Automato == 3745){
        Gera_Evento = 5;
        State_Automato = 3747;
   }
   if (State_Automato == 3770){
        Gera_Evento = 5;
        State_Automato = 3754;
   }
   if (State_Automato == 3775){
        Gera_Evento = 5;
        State_Automato = 3753;
   }
   if (State_Automato == 3778){
        Gera_Evento = 5;
        State_Automato = 3782;
   }
   if (State_Automato == 3799){
        Gera_Evento = 5;
        State_Automato = 3786;
   }
   if (State_Automato == 3810){
        Gera_Evento = 5;
        State_Automato = 3811;
   }
   if (State_Automato == 3922){
        Gera_Evento = 5;
        State_Automato = 3819;
   }
   if (State_Automato == 3930){
        Gera_Evento = 5;
        State_Automato = 3829;
   }
   if (State_Automato == 3931){
        Gera_Evento = 5;
        State_Automato = 3834;
   }
   if (State_Automato == 3937){
        Gera_Evento = 5;
        State_Automato = 3850;
   }
   if (State_Automato == 3939){
        Gera_Evento = 5;
        State_Automato = 3856;
   }
   if (State_Automato == 4009){
        Gera_Evento = 5;
        State_Automato = 4006;
   }
   if (State_Automato == 4070){
        Gera_Evento = 5;
        State_Automato = 4062;
   }
   if (State_Automato == 4072){
        Gera_Evento = 5;
        State_Automato = 4061;
   }
   if (State_Automato == 4090){
        Gera_Evento = 5;
        State_Automato = 4094;
   }
   if (State_Automato == 4117){
        Gera_Evento = 5;
        State_Automato = 4100;
   }
}

function trans7(){    
    if (State_Automato == 274){
        Gera_Evento = 7;
        State_Automato = 275;
   }
   if (State_Automato == 282){
        Gera_Evento = 7;
        State_Automato = 283;
   }
   if (State_Automato == 297){
        Gera_Evento = 7;
        State_Automato = 298;
   }
   if (State_Automato == 303){
        Gera_Evento = 7;
        State_Automato = 304;
   }
   if (State_Automato == 311){
        Gera_Evento = 7;
        State_Automato = 312;
   }
   if (State_Automato == 322){
        Gera_Evento = 7;
        State_Automato = 323;
   }
   if (State_Automato == 325){
        Gera_Evento = 7;
        State_Automato = 326;
   }
   if (State_Automato == 335){
        Gera_Evento = 7;
        State_Automato = 336;
   }
   if (State_Automato == 341){
        Gera_Evento = 7;
        State_Automato = 342;
   }
   if (State_Automato == 344){
        Gera_Evento = 7;
        State_Automato = 345;
   }
   if (State_Automato == 348){
        Gera_Evento = 7;
        State_Automato = 349;
   }
   if (State_Automato == 351){
        Gera_Evento = 7;
        State_Automato = 352;
   }
   if (State_Automato == 354){
        Gera_Evento = 7;
        State_Automato = 355;
   }
   if (State_Automato == 360){
        Gera_Evento = 7;
        State_Automato = 362;
   }
   if (State_Automato == 369){
        Gera_Evento = 7;
        State_Automato = 370;
   }
   if (State_Automato == 374){
        Gera_Evento = 7;
        State_Automato = 376;
   }
   if (State_Automato == 381){
        Gera_Evento = 7;
        State_Automato = 382;
   }
   if (State_Automato == 384){
        Gera_Evento = 7;
        State_Automato = 385;
   }
   if (State_Automato == 423){
        Gera_Evento = 7;
        State_Automato = 424;
   }
   if (State_Automato == 428){
        Gera_Evento = 7;
        State_Automato = 429;
   }
   if (State_Automato == 433){
        Gera_Evento = 7;
        State_Automato = 434;
   }
   if (State_Automato == 437){
        Gera_Evento = 7;
        State_Automato = 438;
   }
   if (State_Automato == 440){
        Gera_Evento = 7;
        State_Automato = 441;
   }
   if (State_Automato == 458){
        Gera_Evento = 7;
        State_Automato = 460;
   }
   if (State_Automato == 470){
        Gera_Evento = 7;
        State_Automato = 471;
   }
   if (State_Automato == 525){
        Gera_Evento = 7;
        State_Automato = 526;
   }
   if (State_Automato == 535){
        Gera_Evento = 7;
        State_Automato = 537;
   }
   if (State_Automato == 585){
        Gera_Evento = 7;
        State_Automato = 586;
   }
   if (State_Automato == 590){
        Gera_Evento = 7;
        State_Automato = 591;
   }
   if (State_Automato == 601){
        Gera_Evento = 7;
        State_Automato = 603;
   }
   if (State_Automato == 607){
        Gera_Evento = 7;
        State_Automato = 608;
   }
   if (State_Automato == 624){
        Gera_Evento = 7;
        State_Automato = 614;
   }
   if (State_Automato == 625){
        Gera_Evento = 7;
        State_Automato = 619;
   }
   if (State_Automato == 631){
        Gera_Evento = 7;
        State_Automato = 628;
   }
   if (State_Automato == 632){
        Gera_Evento = 7;
        State_Automato = 633;
   }
   if (State_Automato == 658){
        Gera_Evento = 7;
        State_Automato = 659;
   }
   if (State_Automato == 687){
        Gera_Evento = 7;
        State_Automato = 688;
   }
   if (State_Automato == 730){
        Gera_Evento = 7;
        State_Automato = 722;
   }
   if (State_Automato == 827){
        Gera_Evento = 7;
        State_Automato = 828;
   }
   if (State_Automato == 849){
        Gera_Evento = 7;
        State_Automato = 850;
   }
   if (State_Automato == 878){
        Gera_Evento = 7;
        State_Automato = 874;
   }
   if (State_Automato == 879){
        Gera_Evento = 7;
        State_Automato = 880;
   }
   if (State_Automato == 916){
        Gera_Evento = 7;
        State_Automato = 917;
   }
   if (State_Automato == 942){
        Gera_Evento = 7;
        State_Automato = 943;
   }
   if (State_Automato == 972){
        Gera_Evento = 7;
        State_Automato = 973;
   }
   if (State_Automato == 978){
        Gera_Evento = 7;
        State_Automato = 979;
   }
   if (State_Automato == 981){
        Gera_Evento = 7;
        State_Automato = 982;
   }
   if (State_Automato == 1000){
        Gera_Evento = 7;
        State_Automato = 1001;
   }
   if (State_Automato == 1003){
        Gera_Evento = 7;
        State_Automato = 1004;
   }
   if (State_Automato == 1007){
        Gera_Evento = 7;
        State_Automato = 1008;
   }
   if (State_Automato == 1010){
        Gera_Evento = 7;
        State_Automato = 1011;
   }
   if (State_Automato == 1014){
        Gera_Evento = 7;
        State_Automato = 1015;
   }
   if (State_Automato == 1017){
        Gera_Evento = 7;
        State_Automato = 1018;
   }
   if (State_Automato == 1031){
        Gera_Evento = 7;
        State_Automato = 1026;
   }
   if (State_Automato == 1107){
        Gera_Evento = 7;
        State_Automato = 1108;
   }
   if (State_Automato == 1115){
        Gera_Evento = 7;
        State_Automato = 1116;
   }
   if (State_Automato == 1122){
        Gera_Evento = 7;
        State_Automato = 1123;
   }
   if (State_Automato == 1125){
        Gera_Evento = 7;
        State_Automato = 1126;
   }
   if (State_Automato == 1134){
        Gera_Evento = 7;
        State_Automato = 1136;
   }
   if (State_Automato == 1140){
        Gera_Evento = 7;
        State_Automato = 1141;
   }
   if (State_Automato == 1143){
        Gera_Evento = 7;
        State_Automato = 1144;
   }
   if (State_Automato == 1155){
        Gera_Evento = 7;
        State_Automato = 1157;
   }
   if (State_Automato == 1173){
        Gera_Evento = 7;
        State_Automato = 1175;
   }
   if (State_Automato == 1206){
        Gera_Evento = 7;
        State_Automato = 1207;
   }
   if (State_Automato == 1221){
        Gera_Evento = 7;
        State_Automato = 1223;
   }
   if (State_Automato == 1238){
        Gera_Evento = 7;
        State_Automato = 1228;
   }
   if (State_Automato == 1239){
        Gera_Evento = 7;
        State_Automato = 1233;
   }
   if (State_Automato == 1240){
        Gera_Evento = 7;
        State_Automato = 1242;
   }
   if (State_Automato == 1256){
        Gera_Evento = 7;
        State_Automato = 1252;
   }
   if (State_Automato == 1257){
        Gera_Evento = 7;
        State_Automato = 1259;
   }
   if (State_Automato == 1286){
        Gera_Evento = 7;
        State_Automato = 1277;
   }
   if (State_Automato == 1287){
        Gera_Evento = 7;
        State_Automato = 1282;
   }
   if (State_Automato == 1288){
        Gera_Evento = 7;
        State_Automato = 1290;
   }
   if (State_Automato == 1298){
        Gera_Evento = 7;
        State_Automato = 1294;
   }
   if (State_Automato == 1340){
        Gera_Evento = 7;
        State_Automato = 1310;
   }
   if (State_Automato == 1341){
        Gera_Evento = 7;
        State_Automato = 1319;
   }
   if (State_Automato == 1342){
        Gera_Evento = 7;
        State_Automato = 1326;
   }
   if (State_Automato == 1343){
        Gera_Evento = 7;
        State_Automato = 1331;
   }
   if (State_Automato == 1407){
        Gera_Evento = 7;
        State_Automato = 1408;
   }
   if (State_Automato == 1422){
        Gera_Evento = 7;
        State_Automato = 1424;
   }
   if (State_Automato == 1432){
        Gera_Evento = 7;
        State_Automato = 1428;
   }
   if (State_Automato == 1433){
        Gera_Evento = 7;
        State_Automato = 1434;
   }
   if (State_Automato == 1448){
        Gera_Evento = 7;
        State_Automato = 1440;
   }
   if (State_Automato == 1459){
        Gera_Evento = 7;
        State_Automato = 1455;
   }
   if (State_Automato == 1471){
        Gera_Evento = 7;
        State_Automato = 1465;
   }
   if (State_Automato == 1486){
        Gera_Evento = 7;
        State_Automato = 1482;
   }
   if (State_Automato == 1517){
        Gera_Evento = 7;
        State_Automato = 1518;
   }
   if (State_Automato == 1580){
        Gera_Evento = 7;
        State_Automato = 1581;
   }
   if (State_Automato == 1587){
        Gera_Evento = 7;
        State_Automato = 1588;
   }
   if (State_Automato == 1615){
        Gera_Evento = 7;
        State_Automato = 1617;
   }
   if (State_Automato == 1637){
        Gera_Evento = 7;
        State_Automato = 1638;
   }
   if (State_Automato == 1651){
        Gera_Evento = 7;
        State_Automato = 1648;
   }
   if (State_Automato == 1652){
        Gera_Evento = 7;
        State_Automato = 1653;
   }
   if (State_Automato == 1687){
        Gera_Evento = 7;
        State_Automato = 1673;
   }
   if (State_Automato == 1704){
        Gera_Evento = 7;
        State_Automato = 1706;
   }
   if (State_Automato == 1732){
        Gera_Evento = 7;
        State_Automato = 1725;
   }
   if (State_Automato == 1759){
        Gera_Evento = 7;
        State_Automato = 1760;
   }
   if (State_Automato == 1935){
        Gera_Evento = 7;
        State_Automato = 1936;
   }
   if (State_Automato == 1942){
        Gera_Evento = 7;
        State_Automato = 131;
   }
   if (State_Automato == 1945){
        Gera_Evento = 7;
        State_Automato = 1946;
   }
   if (State_Automato == 1951){
        Gera_Evento = 7;
        State_Automato = 219;
   }
   if (State_Automato == 1952){
        Gera_Evento = 7;
        State_Automato = 1953;
   }
   if (State_Automato == 1964){
        Gera_Evento = 7;
        State_Automato = 264;
   }
   if (State_Automato == 1969){
        Gera_Evento = 7;
        State_Automato = 152;
   }
   if (State_Automato == 1972){
        Gera_Evento = 7;
        State_Automato = 184;
   }
   if (State_Automato == 1973){
        Gera_Evento = 7;
        State_Automato = 198;
   }
   if (State_Automato == 1976){
        Gera_Evento = 7;
        State_Automato = 233;
   }
   if (State_Automato == 1977){
        Gera_Evento = 7;
        State_Automato = 1978;
   }
   if (State_Automato == 1980){
        Gera_Evento = 7;
        State_Automato = 1981;
   }
   if (State_Automato == 1990){
        Gera_Evento = 7;
        State_Automato = 1991;
   }
   if (State_Automato == 2008){
        Gera_Evento = 7;
        State_Automato = 2009;
   }
   if (State_Automato == 2024){
        Gera_Evento = 7;
        State_Automato = 2025;
   }
   if (State_Automato == 2031){
        Gera_Evento = 7;
        State_Automato = 2032;
   }
   if (State_Automato == 2046){
        Gera_Evento = 7;
        State_Automato = 2047;
   }
   if (State_Automato == 2075){
        Gera_Evento = 7;
        State_Automato = 2076;
   }
   if (State_Automato == 2088){
        Gera_Evento = 7;
        State_Automato = 2090;
   }
   if (State_Automato == 2095){
        Gera_Evento = 7;
        State_Automato = 2097;
   }
   if (State_Automato == 2155){
        Gera_Evento = 7;
        State_Automato = 2157;
   }
   if (State_Automato == 2266){
        Gera_Evento = 7;
        State_Automato = 2267;
   }
   if (State_Automato == 2271){
        Gera_Evento = 7;
        State_Automato = 2272;
   }
   if (State_Automato == 2280){
        Gera_Evento = 7;
        State_Automato = 2281;
   }
   if (State_Automato == 2295){
        Gera_Evento = 7;
        State_Automato = 2296;
   }
   if (State_Automato == 2300){
        Gera_Evento = 7;
        State_Automato = 2301;
   }
   if (State_Automato == 2312){
        Gera_Evento = 7;
        State_Automato = 2313;
   }
   if (State_Automato == 2323){
        Gera_Evento = 7;
        State_Automato = 2324;
   }
   if (State_Automato == 2334){
        Gera_Evento = 7;
        State_Automato = 2335;
   }
   if (State_Automato == 2339){
        Gera_Evento = 7;
        State_Automato = 2340;
   }
   if (State_Automato == 2359){
        Gera_Evento = 7;
        State_Automato = 2361;
   }
   if (State_Automato == 2374){
        Gera_Evento = 7;
        State_Automato = 2376;
   }
   if (State_Automato == 2387){
        Gera_Evento = 7;
        State_Automato = 2389;
   }
   if (State_Automato == 2410){
        Gera_Evento = 7;
        State_Automato = 2411;
   }
   if (State_Automato == 2416){
        Gera_Evento = 7;
        State_Automato = 2418;
   }
   if (State_Automato == 2422){
        Gera_Evento = 7;
        State_Automato = 2423;
   }
   if (State_Automato == 2433){
        Gera_Evento = 7;
        State_Automato = 2434;
   }
   if (State_Automato == 2445){
        Gera_Evento = 7;
        State_Automato = 2446;
   }
   if (State_Automato == 2448){
        Gera_Evento = 7;
        State_Automato = 2449;
   }
   if (State_Automato == 2454){
        Gera_Evento = 7;
        State_Automato = 2455;
   }
   if (State_Automato == 2511){
        Gera_Evento = 7;
        State_Automato = 2512;
   }
   if (State_Automato == 2535){
        Gera_Evento = 7;
        State_Automato = 2536;
   }
   if (State_Automato == 2538){
        Gera_Evento = 7;
        State_Automato = 2539;
   }
   if (State_Automato == 2541){
        Gera_Evento = 7;
        State_Automato = 2542;
   }
   if (State_Automato == 2549){
        Gera_Evento = 7;
        State_Automato = 2550;
   }
   if (State_Automato == 2558){
        Gera_Evento = 7;
        State_Automato = 2559;
   }
   if (State_Automato == 2561){
        Gera_Evento = 7;
        State_Automato = 2562;
   }
   if (State_Automato == 2613){
        Gera_Evento = 7;
        State_Automato = 2614;
   }
   if (State_Automato == 2621){
        Gera_Evento = 7;
        State_Automato = 2622;
   }
   if (State_Automato == 2650){
        Gera_Evento = 7;
        State_Automato = 2651;
   }
   if (State_Automato == 2656){
        Gera_Evento = 7;
        State_Automato = 2658;
   }
   if (State_Automato == 2666){
        Gera_Evento = 7;
        State_Automato = 2662;
   }
   if (State_Automato == 2667){
        Gera_Evento = 7;
        State_Automato = 2668;
   }
   if (State_Automato == 2683){
        Gera_Evento = 7;
        State_Automato = 2684;
   }
   if (State_Automato == 2687){
        Gera_Evento = 7;
        State_Automato = 2688;
   }
   if (State_Automato == 2695){
        Gera_Evento = 7;
        State_Automato = 2692;
   }
   if (State_Automato == 2696){
        Gera_Evento = 7;
        State_Automato = 2697;
   }
   if (State_Automato == 2708){
        Gera_Evento = 7;
        State_Automato = 2709;
   }
   if (State_Automato == 2727){
        Gera_Evento = 7;
        State_Automato = 2728;
   }
   if (State_Automato == 2796){
        Gera_Evento = 7;
        State_Automato = 2790;
   }
   if (State_Automato == 2810){
        Gera_Evento = 7;
        State_Automato = 2811;
   }
   if (State_Automato == 3581){
        Gera_Evento = 7;
        State_Automato = 3582;
   }
   if (State_Automato == 3584){
        Gera_Evento = 7;
        State_Automato = 3585;
   }
   if (State_Automato == 3597){
        Gera_Evento = 7;
        State_Automato = 3598;
   }
   if (State_Automato == 3606){
        Gera_Evento = 7;
        State_Automato = 3607;
   }
   if (State_Automato == 3612){
        Gera_Evento = 7;
        State_Automato = 3613;
   }
   if (State_Automato == 3627){
        Gera_Evento = 7;
        State_Automato = 3628;
   }
   if (State_Automato == 3630){
        Gera_Evento = 7;
        State_Automato = 3631;
   }
   if (State_Automato == 3633){
        Gera_Evento = 7;
        State_Automato = 3634;
   }
   if (State_Automato == 3650){
        Gera_Evento = 7;
        State_Automato = 3651;
   }
   if (State_Automato == 3660){
        Gera_Evento = 7;
        State_Automato = 3661;
   }
   if (State_Automato == 3663){
        Gera_Evento = 7;
        State_Automato = 3664;
   }
   if (State_Automato == 3685){
        Gera_Evento = 7;
        State_Automato = 3686;
   }
   if (State_Automato == 3691){
        Gera_Evento = 7;
        State_Automato = 3692;
   }
   if (State_Automato == 3696){
        Gera_Evento = 7;
        State_Automato = 3697;
   }
   if (State_Automato == 3721){
        Gera_Evento = 7;
        State_Automato = 3722;
   }
   if (State_Automato == 3726){
        Gera_Evento = 7;
        State_Automato = 3727;
   }
   if (State_Automato == 3735){
        Gera_Evento = 7;
        State_Automato = 3736;
   }
   if (State_Automato == 3751){
        Gera_Evento = 7;
        State_Automato = 3752;
   }
   if (State_Automato == 3758){
        Gera_Evento = 7;
        State_Automato = 3759;
   }
   if (State_Automato == 3764){
        Gera_Evento = 7;
        State_Automato = 3765;
   }
   if (State_Automato == 3828){
        Gera_Evento = 7;
        State_Automato = 3829;
   }
   if (State_Automato == 3844){
        Gera_Evento = 7;
        State_Automato = 3845;
   }
   if (State_Automato == 3849){
        Gera_Evento = 7;
        State_Automato = 3850;
   }
   if (State_Automato == 3878){
        Gera_Evento = 7;
        State_Automato = 3879;
   }
   if (State_Automato == 3881){
        Gera_Evento = 7;
        State_Automato = 3882;
   }
   if (State_Automato == 3892){
        Gera_Evento = 7;
        State_Automato = 3893;
   }
   if (State_Automato == 3899){
        Gera_Evento = 7;
        State_Automato = 3900;
   }
   if (State_Automato == 3904){
        Gera_Evento = 7;
        State_Automato = 3905;
   }
   if (State_Automato == 3922){
        Gera_Evento = 7;
        State_Automato = 3923;
   }
   if (State_Automato == 3931){
        Gera_Evento = 7;
        State_Automato = 3932;
   }
   if (State_Automato == 3947){
        Gera_Evento = 7;
        State_Automato = 3949;
   }
   if (State_Automato == 3954){
        Gera_Evento = 7;
        State_Automato = 3955;
   }
   if (State_Automato == 3958){
        Gera_Evento = 7;
        State_Automato = 3959;
   }
   if (State_Automato == 3961){
        Gera_Evento = 7;
        State_Automato = 3962;
   }
   if (State_Automato == 3969){
        Gera_Evento = 7;
        State_Automato = 3971;
   }
   if (State_Automato == 3989){
        Gera_Evento = 7;
        State_Automato = 3991;
   }
   if (State_Automato == 4013){
        Gera_Evento = 7;
        State_Automato = 4014;
   }
   if (State_Automato == 4036){
        Gera_Evento = 7;
        State_Automato = 4038;
   }
   if (State_Automato == 4050){
        Gera_Evento = 7;
        State_Automato = 4051;
   }
   if (State_Automato == 4066){
        Gera_Evento = 7;
        State_Automato = 4067;
   }
   if (State_Automato == 4076){
        Gera_Evento = 7;
        State_Automato = 4078;
   }
   if (State_Automato == 4086){
        Gera_Evento = 7;
        State_Automato = 4082;
   }
   if (State_Automato == 4087){
        Gera_Evento = 7;
        State_Automato = 4088;
   }
   

}

function trans9(){    
    if (State_Automato == 10){
        Gera_Evento = 9;
        State_Automato = 13;
   }
   if (State_Automato == 43){
        Gera_Evento = 9;
        State_Automato = 38;
   }
   if (State_Automato == 53){
        Gera_Evento = 9;
        State_Automato = 50;
   }
   if (State_Automato == 91){
        Gera_Evento = 9;
        State_Automato = 92;
   }
   if (State_Automato == 94){
        Gera_Evento = 9;
        State_Automato = 95;
   }
   if (State_Automato == 114){
        Gera_Evento = 9;
        State_Automato = 104;
   }
   if (State_Automato == 115){
        Gera_Evento = 9;
        State_Automato = 110;
   }
   if (State_Automato == 130){
        Gera_Evento = 9;
        State_Automato = 120;
   }
   if (State_Automato == 141){
        Gera_Evento = 9;
        State_Automato = 142;
   }
   if (State_Automato == 157){
        Gera_Evento = 9;
        State_Automato = 159;
   }
   if (State_Automato == 246){
        Gera_Evento = 9;
        State_Automato = 206;
   }
   if (State_Automato == 247){
        Gera_Evento = 9;
        State_Automato = 214;
   }
   if (State_Automato == 254){
        Gera_Evento = 9;
        State_Automato = 219;
   }
   if (State_Automato == 255){
        Gera_Evento = 9;
        State_Automato = 224;
   }
   if (State_Automato == 263){
        Gera_Evento = 9;
        State_Automato = 229;
   }
   if (State_Automato == 267){
        Gera_Evento = 9;
        State_Automato = 233;
   }
   if (State_Automato == 268){
        Gera_Evento = 9;
        State_Automato = 238;
   }
   if (State_Automato == 288){
        Gera_Evento = 9;
        State_Automato = 283;
   }
   if (State_Automato == 291){
        Gera_Evento = 9;
        State_Automato = 292;
   }
   if (State_Automato == 303){
        Gera_Evento = 9;
        State_Automato = 299;
   }
   if (State_Automato == 307){
        Gera_Evento = 9;
        State_Automato = 298;
   }
   if (State_Automato == 317){
        Gera_Evento = 9;
        State_Automato = 318;
   }
   if (State_Automato == 329){
        Gera_Evento = 9;
        State_Automato = 326;
   }
   if (State_Automato == 358){
        Gera_Evento = 9;
        State_Automato = 342;
   }
   if (State_Automato == 397){
        Gera_Evento = 9;
        State_Automato = 376;
   }
   if (State_Automato == 400){
        Gera_Evento = 9;
        State_Automato = 375;
   }
   if (State_Automato == 419){
        Gera_Evento = 9;
        State_Automato = 420;
   }
   if (State_Automato == 427){
        Gera_Evento = 9;
        State_Automato = 424;
   }
   if (State_Automato == 470){
        Gera_Evento = 9;
        State_Automato = 472;
   }
   if (State_Automato == 480){
        Gera_Evento = 9;
        State_Automato = 482;
   }
   if (State_Automato == 486){
        Gera_Evento = 9;
        State_Automato = 488;
   }
   if (State_Automato == 507){
        Gera_Evento = 9;
        State_Automato = 500;
   }
   if (State_Automato == 511){
        Gera_Evento = 9;
        State_Automato = 512;
   }
   if (State_Automato == 514){
        Gera_Evento = 9;
        State_Automato = 515;
   }
   if (State_Automato == 525){
        Gera_Evento = 9;
        State_Automato = 521;
   }
   if (State_Automato == 564){
        Gera_Evento = 9;
        State_Automato = 565;
   }
   if (State_Automato == 578){
        Gera_Evento = 9;
        State_Automato = 575;
   }
   if (State_Automato == 596){
        Gera_Evento = 9;
        State_Automato = 592;
   }
   if (State_Automato == 599){
        Gera_Evento = 9;
        State_Automato = 586;
   }
   if (State_Automato == 600){
        Gera_Evento = 9;
        State_Automato = 591;
   }
   if (State_Automato == 601){
        Gera_Evento = 9;
        State_Automato = 604;
   }
   if (State_Automato == 618){
        Gera_Evento = 9;
        State_Automato = 608;
   }
   if (State_Automato == 632){
        Gera_Evento = 9;
        State_Automato = 634;
   }
   if (State_Automato == 693){
        Gera_Evento = 9;
        State_Automato = 652;
   }
   if (State_Automato == 695){
        Gera_Evento = 9;
        State_Automato = 667;
   }
   if (State_Automato == 702){
        Gera_Evento = 9;
        State_Automato = 678;
   }
   if (State_Automato == 707){
        Gera_Evento = 9;
        State_Automato = 682;
   }
   if (State_Automato == 714){
        Gera_Evento = 9;
        State_Automato = 659;
   }
   if (State_Automato == 726){
        Gera_Evento = 9;
        State_Automato = 688;
   }
   if (State_Automato == 738){
        Gera_Evento = 9;
        State_Automato = 739;
   }
   if (State_Automato == 741){
        Gera_Evento = 9;
        State_Automato = 742;
   }
   if (State_Automato == 752){
        Gera_Evento = 9;
        State_Automato = 748;
   }
   if (State_Automato == 779){
        Gera_Evento = 9;
        State_Automato = 780;
   }
   if (State_Automato == 789){
        Gera_Evento = 9;
        State_Automato = 786;
   }
   if (State_Automato == 816){
        Gera_Evento = 9;
        State_Automato = 807;
   }
   if (State_Automato == 819){
        Gera_Evento = 9;
        State_Automato = 820;
   }
   if (State_Automato == 823){
        Gera_Evento = 9;
        State_Automato = 824;
   }
   if (State_Automato == 831){
        Gera_Evento = 9;
        State_Automato = 828;
   }
   if (State_Automato == 832){
        Gera_Evento = 9;
        State_Automato = 833;
   }
   if (State_Automato == 904){
        Gera_Evento = 9;
        State_Automato = 905;
   }
   if (State_Automato == 908){
        Gera_Evento = 9;
        State_Automato = 909;
   }
   if (State_Automato == 916){
        Gera_Evento = 9;
        State_Automato = 918;
   }
   if (State_Automato == 924){
        Gera_Evento = 9;
        State_Automato = 925;
   }
   if (State_Automato == 931){
        Gera_Evento = 9;
        State_Automato = 932;
   }
   if (State_Automato == 938){
        Gera_Evento = 9;
        State_Automato = 939;
   }
   if (State_Automato == 997){
        Gera_Evento = 9;
        State_Automato = 957;
   }
   if (State_Automato == 1000){
        Gera_Evento = 9;
        State_Automato = 974;
   }
   if (State_Automato == 1032){
        Gera_Evento = 9;
        State_Automato = 1033;
   }
   if (State_Automato == 1037){
        Gera_Evento = 9;
        State_Automato = 1038;
   }
   if (State_Automato == 1047){
        Gera_Evento = 9;
        State_Automato = 1048;
   }
   if (State_Automato == 1077){
        Gera_Evento = 9;
        State_Automato = 1065;
   }
   if (State_Automato == 1086){
        Gera_Evento = 9;
        State_Automato = 1073;
   }
   if (State_Automato == 1091){
        Gera_Evento = 9;
        State_Automato = 1092;
   }
   if (State_Automato == 1122){
        Gera_Evento = 9;
        State_Automato = 1104;
   }
   if (State_Automato == 1125){
        Gera_Evento = 9;
        State_Automato = 1117;
   }
   if (State_Automato == 1129){
        Gera_Evento = 9;
        State_Automato = 1116;
   }
   if (State_Automato == 1173){
        Gera_Evento = 9;
        State_Automato = 1176;
   }
   if (State_Automato == 1269){
        Gera_Evento = 9;
        State_Automato = 1192;
   }
   if (State_Automato == 1270){
        Gera_Evento = 9;
        State_Automato = 1197;
   }
   if (State_Automato == 1271){
        Gera_Evento = 9;
        State_Automato = 1208;
   }
   if (State_Automato == 1288){
        Gera_Evento = 9;
        State_Automato = 1243;
   }
   if (State_Automato == 1298){
        Gera_Evento = 9;
        State_Automato = 1247;
   }
   if (State_Automato == 1299){
        Gera_Evento = 9;
        State_Automato = 1260;
   }
   if (State_Automato == 1308){
        Gera_Evento = 9;
        State_Automato = 1207;
   }
   if (State_Automato == 1309){
        Gera_Evento = 9;
        State_Automato = 1223;
   }
   if (State_Automato == 1316){
        Gera_Evento = 9;
        State_Automato = 1228;
   }
   if (State_Automato == 1317){
        Gera_Evento = 9;
        State_Automato = 1233;
   }
   if (State_Automato == 1325){
        Gera_Evento = 9;
        State_Automato = 1242;
   }
   if (State_Automato == 1329){
        Gera_Evento = 9;
        State_Automato = 1252;
   }
   if (State_Automato == 1330){
        Gera_Evento = 9;
        State_Automato = 1259;
   }
   if (State_Automato == 1339){
        Gera_Evento = 9;
        State_Automato = 1184;
   }
   if (State_Automato == 1340){
        Gera_Evento = 9;
        State_Automato = 1222;
   }
   if (State_Automato == 1342){
        Gera_Evento = 9;
        State_Automato = 1241;
   }
   if (State_Automato == 1343){
        Gera_Evento = 9;
        State_Automato = 1258;
   }
   if (State_Automato == 1344){
        Gera_Evento = 9;
        State_Automato = 1346;
   }
   if (State_Automato == 1379){
        Gera_Evento = 9;
        State_Automato = 1353;
   }
   if (State_Automato == 1384){
        Gera_Evento = 9;
        State_Automato = 1364;
   }
   if (State_Automato == 1388){
        Gera_Evento = 9;
        State_Automato = 1368;
   }
   if (State_Automato == 1389){
        Gera_Evento = 9;
        State_Automato = 1374;
   }
   if (State_Automato == 1399){
        Gera_Evento = 9;
        State_Automato = 1363;
   }
   if (State_Automato == 1401){
        Gera_Evento = 9;
        State_Automato = 1402;
   }
   if (State_Automato == 1416){
        Gera_Evento = 9;
        State_Automato = 1418;
   }
   if (State_Automato == 1439){
        Gera_Evento = 9;
        State_Automato = 1428;
   }
   if (State_Automato == 1447){
        Gera_Evento = 9;
        State_Automato = 1423;
   }
   if (State_Automato == 1472){
        Gera_Evento = 9;
        State_Automato = 1474;
   }
   if (State_Automato == 1486){
        Gera_Evento = 9;
        State_Automato = 1478;
   }
   if (State_Automato == 1487){
        Gera_Evento = 9;
        State_Automato = 1489;
   }
   if (State_Automato == 1665){
        Gera_Evento = 9;
        State_Automato = 1501;
   }
   if (State_Automato == 1685){
        Gera_Evento = 9;
        State_Automato = 1509;
   }
   if (State_Automato == 1689){
        Gera_Evento = 9;
        State_Automato = 1535;
   }
   if (State_Automato == 1690){
        Gera_Evento = 9;
        State_Automato = 1554;
   }
   if (State_Automato == 1697){
        Gera_Evento = 9;
        State_Automato = 1562;
   }
   if (State_Automato == 1699){
        Gera_Evento = 9;
        State_Automato = 1569;
   }
   if (State_Automato == 1700){
        Gera_Evento = 9;
        State_Automato = 1574;
   }
   if (State_Automato == 1701){
        Gera_Evento = 9;
        State_Automato = 1582;
   }
   if (State_Automato == 1703){
        Gera_Evento = 9;
        State_Automato = 1588;
   }
   if (State_Automato == 1704){
        Gera_Evento = 9;
        State_Automato = 1606;
   }
   if (State_Automato == 1715){
        Gera_Evento = 9;
        State_Automato = 1617;
   }
   if (State_Automato == 1722){
        Gera_Evento = 9;
        State_Automato = 1616;
   }
   if (State_Automato == 1734){
        Gera_Evento = 9;
        State_Automato = 1639;
   }
   if (State_Automato == 1738){
        Gera_Evento = 9;
        State_Automato = 1643;
   }
   if (State_Automato == 1739){
        Gera_Evento = 9;
        State_Automato = 1654;
   }
   if (State_Automato == 1759){
        Gera_Evento = 9;
        State_Automato = 1761;
   }
   if (State_Automato == 1767){
        Gera_Evento = 9;
        State_Automato = 1768;
   }
   if (State_Automato == 1771){
        Gera_Evento = 9;
        State_Automato = 1772;
   }
   if (State_Automato == 1776){
        Gera_Evento = 9;
        State_Automato = 1777;
   }
   if (State_Automato == 1795){
        Gera_Evento = 9;
        State_Automato = 1792;
   }
   if (State_Automato == 1798){
        Gera_Evento = 9;
        State_Automato = 1800;
   }
   if (State_Automato == 1815){
        Gera_Evento = 9;
        State_Automato = 1807;
   }
   if (State_Automato == 1817){
        Gera_Evento = 9;
        State_Automato = 1818;
   }
   if (State_Automato == 1822){
        Gera_Evento = 9;
        State_Automato = 1824;
   }
   if (State_Automato == 1841){
        Gera_Evento = 9;
        State_Automato = 1838;
   }
   if (State_Automato == 1869){
        Gera_Evento = 9;
        State_Automato = 1871;
   }
   if (State_Automato == 1881){
        Gera_Evento = 9;
        State_Automato = 1875;
   }
   if (State_Automato == 1925){
        Gera_Evento = 9;
        State_Automato = 1915;
   }
   if (State_Automato == 1926){
        Gera_Evento = 9;
        State_Automato = 1920;
   }
   if (State_Automato == 1935){
        Gera_Evento = 9;
        State_Automato = 1937;
   }
   if (State_Automato == 1942){
        Gera_Evento = 9;
        State_Automato = 1943;
   }
   if (State_Automato == 1958){
        Gera_Evento = 9;
        State_Automato = 1954;
   }
   if (State_Automato == 1963){
        Gera_Evento = 9;
        State_Automato = 1953;
   }
   if (State_Automato == 1964){
        Gera_Evento = 9;
        State_Automato = 1965;
   }
   if (State_Automato == 1990){
        Gera_Evento = 9;
        State_Automato = 1993;
   }
   if (State_Automato == 2013){
        Gera_Evento = 9;
        State_Automato = 2014;
   }
   if (State_Automato == 2016){
        Gera_Evento = 9;
        State_Automato = 2017;
   }
   if (State_Automato == 2104){
        Gera_Evento = 9;
        State_Automato = 2097;
   }
   if (State_Automato == 2109){
        Gera_Evento = 9;
        State_Automato = 2096;
   }
   if (State_Automato == 2136){
        Gera_Evento = 9;
        State_Automato = 2137;
   }
   if (State_Automato == 2144){
        Gera_Evento = 9;
        State_Automato = 2141;
   }
   if (State_Automato == 2197){
        Gera_Evento = 9;
        State_Automato = 2198;
   }
   if (State_Automato == 2203){
        Gera_Evento = 9;
        State_Automato = 2204;
   }
   if (State_Automato == 2214){
        Gera_Evento = 9;
        State_Automato = 2210;
   }
   if (State_Automato == 2215){
        Gera_Evento = 9;
        State_Automato = 2217;
   }
   if (State_Automato == 2224){
        Gera_Evento = 9;
        State_Automato = 2226;
   }
   if (State_Automato == 2230){
        Gera_Evento = 9;
        State_Automato = 2231;
   }
   if (State_Automato == 2240){
        Gera_Evento = 9;
        State_Automato = 2237;
   }
   if (State_Automato == 2265){
        Gera_Evento = 9;
        State_Automato = 2250;
   }
   if (State_Automato == 2266){
        Gera_Evento = 9;
        State_Automato = 2268;
   }
   if (State_Automato == 2271){
        Gera_Evento = 9;
        State_Automato = 2274;
   }
   if (State_Automato == 2288){
        Gera_Evento = 9;
        State_Automato = 2289;
   }
   if (State_Automato == 2295){
        Gera_Evento = 9;
        State_Automato = 2297;
   }
   if (State_Automato == 2307){
        Gera_Evento = 9;
        State_Automato = 2301;
   }
   if (State_Automato == 2312){
        Gera_Evento = 9;
        State_Automato = 2315;
   }
   if (State_Automato == 2349){
        Gera_Evento = 9;
        State_Automato = 2332;
   }
   if (State_Automato == 2355){
        Gera_Evento = 9;
        State_Automato = 2324;
   }
   if (State_Automato == 2356){
        Gera_Evento = 9;
        State_Automato = 2335;
   }
   if (State_Automato == 2358){
        Gera_Evento = 9;
        State_Automato = 2340;
   }
   if (State_Automato == 2359){
        Gera_Evento = 9;
        State_Automato = 2362;
   }
   if (State_Automato == 2402){
        Gera_Evento = 9;
        State_Automato = 2389;
   }
   if (State_Automato == 2409){
        Gera_Evento = 9;
        State_Automato = 2388;
   }
   if (State_Automato == 2410){
        Gera_Evento = 9;
        State_Automato = 2412;
   }
   if (State_Automato == 2444){
        Gera_Evento = 9;
        State_Automato = 2434;
   }
   if (State_Automato == 2454){
        Gera_Evento = 9;
        State_Automato = 2456;
   }
   if (State_Automato == 2462){
        Gera_Evento = 9;
        State_Automato = 2463;
   }
   if (State_Automato == 2467){
        Gera_Evento = 9;
        State_Automato = 2468;
   }
   if (State_Automato == 2498){
        Gera_Evento = 9;
        State_Automato = 2482;
   }
   if (State_Automato == 2500){
        Gera_Evento = 9;
        State_Automato = 2492;
   }
   if (State_Automato == 2501){
        Gera_Evento = 9;
        State_Automato = 2503;
   }
   if (State_Automato == 2507){
        Gera_Evento = 9;
        State_Automato = 2508;
   }
   if (State_Automato == 2574){
        Gera_Evento = 9;
        State_Automato = 2575;
   }
   if (State_Automato == 2608){
        Gera_Evento = 9;
        State_Automato = 2582;
   }
   if (State_Automato == 2609){
        Gera_Evento = 9;
        State_Automato = 2593;
   }
   if (State_Automato == 2611){
        Gera_Evento = 9;
        State_Automato = 2597;
   }
   if (State_Automato == 2612){
        Gera_Evento = 9;
        State_Automato = 2603;
   }
   if (State_Automato == 2613){
        Gera_Evento = 9;
        State_Automato = 2616;
   }
   if (State_Automato == 2646){
        Gera_Evento = 9;
        State_Automato = 2622;
   }
   if (State_Automato == 2650){
        Gera_Evento = 9;
        State_Automato = 2652;
   }
   if (State_Automato == 2677){
        Gera_Evento = 9;
        State_Automato = 2658;
   }
   if (State_Automato == 2679){
        Gera_Evento = 9;
        State_Automato = 2662;
   }
   if (State_Automato == 2680){
        Gera_Evento = 9;
        State_Automato = 2668;
   }
   if (State_Automato == 2708){
        Gera_Evento = 9;
        State_Automato = 2711;
   }
   if (State_Automato == 2727){
        Gera_Evento = 9;
        State_Automato = 2730;
   }
   if (State_Automato == 2805){
        Gera_Evento = 9;
        State_Automato = 2743;
   }
   if (State_Automato == 2830){
        Gera_Evento = 9;
        State_Automato = 2832;
   }
   if (State_Automato == 2864){
        Gera_Evento = 9;
        State_Automato = 2865;
   }
   if (State_Automato == 2910){
        Gera_Evento = 9;
        State_Automato = 2907;
   }
   if (State_Automato == 2936){
        Gera_Evento = 9;
        State_Automato = 2938;
   }
   if (State_Automato == 2950){
        Gera_Evento = 9;
        State_Automato = 2944;
   }
   if (State_Automato == 2951){
        Gera_Evento = 9;
        State_Automato = 2952;
   }
   if (State_Automato == 2958){
        Gera_Evento = 9;
        State_Automato = 2959;
   }
   if (State_Automato == 2967){
        Gera_Evento = 9;
        State_Automato = 2969;
   }
   if (State_Automato == 2993){
        Gera_Evento = 9;
        State_Automato = 2981;
   }
   if (State_Automato == 3007){
        Gera_Evento = 9;
        State_Automato = 3008;
   }
   if (State_Automato == 3058){
        Gera_Evento = 9;
        State_Automato = 3060;
   }
   if (State_Automato == 3088){
        Gera_Evento = 9;
        State_Automato = 3069;
   }
   if (State_Automato == 3092){
        Gera_Evento = 9;
        State_Automato = 3073;
   }
   if (State_Automato == 3093){
        Gera_Evento = 9;
        State_Automato = 3079;
   }
   if (State_Automato == 3106){
        Gera_Evento = 9;
        State_Automato = 3107;
   }
   if (State_Automato == 3177){
        Gera_Evento = 9;
        State_Automato = 3178;
   }
   if (State_Automato == 3183){
        Gera_Evento = 9;
        State_Automato = 3184;
   }
   if (State_Automato == 3195){
        Gera_Evento = 9;
        State_Automato = 3192;
   }
   if (State_Automato == 3218){
        Gera_Evento = 9;
        State_Automato = 3219;
   }
   if (State_Automato == 3229){
        Gera_Evento = 9;
        State_Automato = 3230;
   }
   if (State_Automato == 3232){
        Gera_Evento = 9;
        State_Automato = 3233;
   }
   if (State_Automato == 3245){
        Gera_Evento = 9;
        State_Automato = 3247;
   }
   if (State_Automato == 3288){
        Gera_Evento = 9;
        State_Automato = 3282;
   }
   if (State_Automato == 3310){
        Gera_Evento = 9;
        State_Automato = 3300;
   }
   if (State_Automato == 3311){
        Gera_Evento = 9;
        State_Automato = 3305;
   }
   if (State_Automato == 3344){
        Gera_Evento = 9;
        State_Automato = 3345;
   }
   if (State_Automato == 3349){
        Gera_Evento = 9;
        State_Automato = 3350;
   }
   if (State_Automato == 3354){
        Gera_Evento = 9;
        State_Automato = 3355;
   }
   if (State_Automato == 3412){
        Gera_Evento = 9;
        State_Automato = 3413;
   }
   if (State_Automato == 3437){
        Gera_Evento = 9;
        State_Automato = 3427;
   }
   if (State_Automato == 3438){
        Gera_Evento = 9;
        State_Automato = 3433;
   }
   if (State_Automato == 3439){
        Gera_Evento = 9;
        State_Automato = 3440;
   }
   if (State_Automato == 3452){
        Gera_Evento = 9;
        State_Automato = 3454;
   }
   if (State_Automato == 3466){
        Gera_Evento = 9;
        State_Automato = 3460;
   }
   if (State_Automato == 3470){
        Gera_Evento = 9;
        State_Automato = 3471;
   }
   if (State_Automato == 3554){
        Gera_Evento = 9;
        State_Automato = 3504;
   }
   if (State_Automato == 3555){
        Gera_Evento = 9;
        State_Automato = 3514;
   }
   if (State_Automato == 3557){
        Gera_Evento = 9;
        State_Automato = 3536;
   }
   if (State_Automato == 3558){
        Gera_Evento = 9;
        State_Automato = 3546;
   }
   if (State_Automato == 3559){
        Gera_Evento = 9;
        State_Automato = 3560;
   }
   if (State_Automato == 3575){
        Gera_Evento = 9;
        State_Automato = 3576;
   }
   if (State_Automato == 3601){
        Gera_Evento = 9;
        State_Automato = 3598;
   }
   if (State_Automato == 3602){
        Gera_Evento = 9;
        State_Automato = 3603;
   }
   if (State_Automato == 3610){
        Gera_Evento = 9;
        State_Automato = 3607;
   }
   if (State_Automato == 3685){
        Gera_Evento = 9;
        State_Automato = 3687;
   }
   if (State_Automato == 3703){
        Gera_Evento = 9;
        State_Automato = 3697;
   }
   if (State_Automato == 3707){
        Gera_Evento = 9;
        State_Automato = 3708;
   }
   if (State_Automato == 3714){
        Gera_Evento = 9;
        State_Automato = 3715;
   }
   if (State_Automato == 3771){
        Gera_Evento = 9;
        State_Automato = 3772;
   }
   if (State_Automato == 3818){
        Gera_Evento = 9;
        State_Automato = 3819;
   }
   if (State_Automato == 3833){
        Gera_Evento = 9;
        State_Automato = 3834;
   }
   if (State_Automato == 3855){
        Gera_Evento = 9;
        State_Automato = 3856;
   }
   if (State_Automato == 3865){
        Gera_Evento = 9;
        State_Automato = 3867;
   }
   if (State_Automato == 3886){
        Gera_Evento = 9;
        State_Automato = 3887;
   }
   if (State_Automato == 3896){
        Gera_Evento = 9;
        State_Automato = 3893;
   }
   if (State_Automato == 3904){
        Gera_Evento = 9;
        State_Automato = 3907;
   }
   if (State_Automato == 3942){
        Gera_Evento = 9;
        State_Automato = 3943;
   }
   if (State_Automato == 4043){
        Gera_Evento = 9;
        State_Automato = 4044;
   }
   if (State_Automato == 4125){
        Gera_Evento = 9;
        State_Automato = 4126;
   }
   if (State_Automato == 4132){
        Gera_Evento = 9;
        State_Automato = 4133;
   }
   

}

function trans11(){    
    if (State_Automato == 741){
        Gera_Evento = 11;
        State_Automato = 24;
   }
   if (State_Automato == 767){
        Gera_Evento = 11;
        State_Automato = 60;
   }
   if (State_Automato == 779){
        Gera_Evento = 11;
        State_Automato = 21;
   }
   if (State_Automato == 784){
        Gera_Evento = 11;
        State_Automato = 35;
   }
   if (State_Automato == 785){
        Gera_Evento = 11;
        State_Automato = 39;
   }
   if (State_Automato == 789){
        Gera_Evento = 11;
        State_Automato = 44;
   }
   if (State_Automato == 790){
        Gera_Evento = 11;
        State_Automato = 56;
   }
   if (State_Automato == 792){
        Gera_Evento = 11;
        State_Automato = 66;
   }
   if (State_Automato == 793){
        Gera_Evento = 11;
        State_Automato = 70;
   }
   if (State_Automato == 795){
        Gera_Evento = 11;
        State_Automato = 74;
   }
   if (State_Automato == 797){
        Gera_Evento = 11;
        State_Automato = 79;
   }
   if (State_Automato == 798){
        Gera_Evento = 11;
        State_Automato = 82;
   }
   if (State_Automato == 802){
        Gera_Evento = 11;
        State_Automato = 20;
   }
   if (State_Automato == 818){
        Gera_Evento = 11;
        State_Automato = 69;
   }
   if (State_Automato == 823){
        Gera_Evento = 11;
        State_Automato = 279;
   }
   if (State_Automato == 827){
        Gera_Evento = 11;
        State_Automato = 284;
   }
   if (State_Automato == 831){
        Gera_Evento = 11;
        State_Automato = 289;
   }
   if (State_Automato == 832){
        Gera_Evento = 11;
        State_Automato = 293;
   }
   if (State_Automato == 843){
        Gera_Evento = 11;
        State_Automato = 275;
   }
   if (State_Automato == 848){
        Gera_Evento = 11;
        State_Automato = 283;
   }
   if (State_Automato == 849){
        Gera_Evento = 11;
        State_Automato = 292;
   }
   if (State_Automato == 870){
        Gera_Evento = 11;
        State_Automato = 402;
   }
   if (State_Automato == 873){
        Gera_Evento = 11;
        State_Automato = 404;
   }
   if (State_Automato == 878){
        Gera_Evento = 11;
        State_Automato = 406;
   }
   if (State_Automato == 879){
        Gera_Evento = 11;
        State_Automato = 408;
   }
   if (State_Automato == 887){
        Gera_Evento = 11;
        State_Automato = 443;
   }
   if (State_Automato == 1032){
        Gera_Evento = 11;
        State_Automato = 18;
   }
   if (State_Automato == 1057){
        Gera_Evento = 11;
        State_Automato = 92;
   }
   if (State_Automato == 1062){
        Gera_Evento = 11;
        State_Automato = 104;
   }
   if (State_Automato == 1063){
        Gera_Evento = 11;
        State_Automato = 110;
   }
   if (State_Automato == 1068){
        Gera_Evento = 11;
        State_Automato = 120;
   }
   if (State_Automato == 1072){
        Gera_Evento = 11;
        State_Automato = 159;
   }
   if (State_Automato == 1077){
        Gera_Evento = 11;
        State_Automato = 117;
   }
   if (State_Automato == 1082){
        Gera_Evento = 11;
        State_Automato = 126;
   }
   if (State_Automato == 1083){
        Gera_Evento = 11;
        State_Automato = 131;
   }
   if (State_Automato == 1085){
        Gera_Evento = 11;
        State_Automato = 152;
   }
   if (State_Automato == 1086){
        Gera_Evento = 11;
        State_Automato = 158;
   }
   if (State_Automato == 1090){
        Gera_Evento = 11;
        State_Automato = 149;
   }
   if (State_Automato == 1107){
        Gera_Evento = 11;
        State_Automato = 299;
   }
   if (State_Automato == 1111){
        Gera_Evento = 11;
        State_Automato = 298;
   }
   if (State_Automato == 1114){
        Gera_Evento = 11;
        State_Automato = 312;
   }
   if (State_Automato == 1115){
        Gera_Evento = 11;
        State_Automato = 314;
   }
   if (State_Automato == 1140){
        Gera_Evento = 11;
        State_Automato = 361;
   }
   if (State_Automato == 1143){
        Gera_Evento = 11;
        State_Automato = 365;
   }
   if (State_Automato == 1352){
        Gera_Evento = 11;
        State_Automato = 164;
   }
   if (State_Automato == 1382){
        Gera_Evento = 11;
        State_Automato = 184;
   }
   if (State_Automato == 1383){
        Gera_Evento = 11;
        State_Automato = 189;
   }
   if (State_Automato == 1388){
        Gera_Evento = 11;
        State_Automato = 198;
   }
   if (State_Automato == 1389){
        Gera_Evento = 11;
        State_Automato = 200;
   }
   if (State_Automato == 1398){
        Gera_Evento = 11;
        State_Automato = 180;
   }
   if (State_Automato == 1407){
        Gera_Evento = 11;
        State_Automato = 318;
   }
   if (State_Automato == 1412){
        Gera_Evento = 11;
        State_Automato = 323;
   }
   if (State_Automato == 1413){
        Gera_Evento = 11;
        State_Automato = 326;
   }
   if (State_Automato == 1416){
        Gera_Evento = 11;
        State_Automato = 401;
   }
   if (State_Automato == 1422){
        Gera_Evento = 11;
        State_Automato = 420;
   }
   if (State_Automato == 1427){
        Gera_Evento = 11;
        State_Automato = 424;
   }
   if (State_Automato == 1459){
        Gera_Evento = 11;
        State_Automato = 445;
   }
   if (State_Automato == 1471){
        Gera_Evento = 11;
        State_Automato = 449;
   }
   if (State_Automato == 1560){
        Gera_Evento = 11;
        State_Automato = 206;
   }
   if (State_Automato == 1561){
        Gera_Evento = 11;
        State_Automato = 214;
   }
   if (State_Automato == 1566){
        Gera_Evento = 11;
        State_Automato = 219;
   }
   if (State_Automato == 1567){
        Gera_Evento = 11;
        State_Automato = 224;
   }
   if (State_Automato == 1568){
        Gera_Evento = 11;
        State_Automato = 229;
   }
   if (State_Automato == 1572){
        Gera_Evento = 11;
        State_Automato = 233;
   }
   if (State_Automato == 1573){
        Gera_Evento = 11;
        State_Automato = 238;
   }
   if (State_Automato == 1580){
        Gera_Evento = 11;
        State_Automato = 271;
   }
   if (State_Automato == 1587){
        Gera_Evento = 11;
        State_Automato = 337;
   }
   if (State_Automato == 1592){
        Gera_Evento = 11;
        State_Automato = 342;
   }
   if (State_Automato == 1593){
        Gera_Evento = 11;
        State_Automato = 345;
   }
   if (State_Automato == 1601){
        Gera_Evento = 11;
        State_Automato = 336;
   }
   if (State_Automato == 1602){
        Gera_Evento = 11;
        State_Automato = 349;
   }
   if (State_Automato == 1603){
        Gera_Evento = 11;
        State_Automato = 352;
   }
   if (State_Automato == 1604){
        Gera_Evento = 11;
        State_Automato = 355;
   }
   if (State_Automato == 1610){
        Gera_Evento = 11;
        State_Automato = 371;
   }
   if (State_Automato == 1612){
        Gera_Evento = 11;
        State_Automato = 376;
   }
   if (State_Automato == 1614){
        Gera_Evento = 11;
        State_Automato = 375;
   }
   if (State_Automato == 1615){
        Gera_Evento = 11;
        State_Automato = 386;
   }
   if (State_Automato == 1622){
        Gera_Evento = 11;
        State_Automato = 370;
   }
   if (State_Automato == 1624){
        Gera_Evento = 11;
        State_Automato = 382;
   }
   if (State_Automato == 1625){
        Gera_Evento = 11;
        State_Automato = 385;
   }
   if (State_Automato == 1631){
        Gera_Evento = 11;
        State_Automato = 434;
   }
   if (State_Automato == 1633){
        Gera_Evento = 11;
        State_Automato = 438;
   }
   if (State_Automato == 1634){
        Gera_Evento = 11;
        State_Automato = 441;
   }
   if (State_Automato == 1637){
        Gera_Evento = 11;
        State_Automato = 455;
   }
   if (State_Automato == 1647){
        Gera_Evento = 11;
        State_Automato = 460;
   }
   if (State_Automato == 1651){
        Gera_Evento = 11;
        State_Automato = 459;
   }
   if (State_Automato == 1652){
        Gera_Evento = 11;
        State_Automato = 465;
   }
   if (State_Automato == 1690){
        Gera_Evento = 11;
        State_Automato = 17;
   }
   if (State_Automato == 1697){
        Gera_Evento = 11;
        State_Automato = 248;
   }
   if (State_Automato == 1698){
        Gera_Evento = 11;
        State_Automato = 257;
   }
   if (State_Automato == 1699){
        Gera_Evento = 11;
        State_Automato = 264;
   }
   if (State_Automato == 1700){
        Gera_Evento = 11;
        State_Automato = 269;
   }
   if (State_Automato == 1714){
        Gera_Evento = 11;
        State_Automato = 394;
   }
   if (State_Automato == 1721){
        Gera_Evento = 11;
        State_Automato = 393;
   }
   if (State_Automato == 1732){
        Gera_Evento = 11;
        State_Automato = 451;
   }
   if (State_Automato == 1738){
        Gera_Evento = 11;
        State_Automato = 463;
   }
   if (State_Automato == 2830){
        Gera_Evento = 11;
        State_Automato = 2834;
   }
   if (State_Automato == 3183){
        Gera_Evento = 11;
        State_Automato = 619;
   }
   if (State_Automato == 3186){
        Gera_Evento = 11;
        State_Automato = 628;
   }
   if (State_Automato == 3200){
        Gera_Evento = 11;
        State_Automato = 2857;
   }
   if (State_Automato == 3202){
        Gera_Evento = 11;
        State_Automato = 2856;
   }
   if (State_Automato == 3203){
        Gera_Evento = 11;
        State_Automato = 2872;
   }
   if (State_Automato == 3205){
        Gera_Evento = 11;
        State_Automato = 2876;
   }
   if (State_Automato == 3218){
        Gera_Evento = 11;
        State_Automato = 1331;
   }
   if (State_Automato == 3223){
        Gera_Evento = 11;
        State_Automato = 1233;
   }
   if (State_Automato == 3224){
        Gera_Evento = 11;
        State_Automato = 1252;
   }
   if (State_Automato == 3227){
        Gera_Evento = 11;
        State_Automato = 1282;
   }
   if (State_Automato == 3228){
        Gera_Evento = 11;
        State_Automato = 1294;
   }
   if (State_Automato == 3229){
        Gera_Evento = 11;
        State_Automato = 2853;
   }
   if (State_Automato == 3237){
        Gera_Evento = 11;
        State_Automato = 2865;
   }
   if (State_Automato == 3238){
        Gera_Evento = 11;
        State_Automato = 2871;
   }
   if (State_Automato == 3244){
        Gera_Evento = 11;
        State_Automato = 2881;
   }
   if (State_Automato == 3245){
        Gera_Evento = 11;
        State_Automato = 2897;
   }
   if (State_Automato == 3253){
        Gera_Evento = 11;
        State_Automato = 2870;
   }
   if (State_Automato == 3268){
        Gera_Evento = 11;
        State_Automato = 2869;
   }
   if (State_Automato == 3274){
        Gera_Evento = 11;
        State_Automato = 3001;
   }
   if (State_Automato == 3281){
        Gera_Evento = 11;
        State_Automato = 3008;
   }
   if (State_Automato == 3296){
        Gera_Evento = 11;
        State_Automato = 3022;
   }
   if (State_Automato == 3354){
        Gera_Evento = 11;
        State_Automato = 2912;
   }
   if (State_Automato == 3359){
        Gera_Evento = 11;
        State_Automato = 2916;
   }
   if (State_Automato == 3365){
        Gera_Evento = 11;
        State_Automato = 2911;
   }
   if (State_Automato == 3366){
        Gera_Evento = 11;
        State_Automato = 2920;
   }
   if (State_Automato == 3368){
        Gera_Evento = 11;
        State_Automato = 2924;
   }
   if (State_Automato == 3369){
        Gera_Evento = 11;
        State_Automato = 2928;
   }
   if (State_Automato == 3390){
        Gera_Evento = 11;
        State_Automato = 3036;
   }
   if (State_Automato == 3398){
        Gera_Evento = 11;
        State_Automato = 3099;
   }
   if (State_Automato == 3402){
        Gera_Evento = 11;
        State_Automato = 3098;
   }
   if (State_Automato == 3403){
        Gera_Evento = 11;
        State_Automato = 3117;
   }
   if (State_Automato == 3405){
        Gera_Evento = 11;
        State_Automato = 3127;
   }
   if (State_Automato == 3412){
        Gera_Evento = 11;
        State_Automato = 2844;
   }
   if (State_Automato == 3426){
        Gera_Evento = 11;
        State_Automato = 2938;
   }
   if (State_Automato == 3430){
        Gera_Evento = 11;
        State_Automato = 2944;
   }
   if (State_Automato == 3431){
        Gera_Evento = 11;
        State_Automato = 2952;
   }
   if (State_Automato == 3432){
        Gera_Evento = 11;
        State_Automato = 2969;
   }
   if (State_Automato == 3437){
        Gera_Evento = 11;
        State_Automato = 2937;
   }
   if (State_Automato == 3438){
        Gera_Evento = 11;
        State_Automato = 2968;
   }
   if (State_Automato == 3439){
        Gera_Evento = 11;
        State_Automato = 2999;
   }
   if (State_Automato == 3447){
        Gera_Evento = 11;
        State_Automato = 3060;
   }
   if (State_Automato == 3449){
        Gera_Evento = 11;
        State_Automato = 3049;
   }
   if (State_Automato == 3452){
        Gera_Evento = 11;
        State_Automato = 3095;
   }
   if (State_Automato == 3459){
        Gera_Evento = 11;
        State_Automato = 3107;
   }
   if (State_Automato == 3467){
        Gera_Evento = 11;
        State_Automato = 3116;
   }
   if (State_Automato == 3469){
        Gera_Evento = 11;
        State_Automato = 3132;
   }
   if (State_Automato == 3470){
        Gera_Evento = 11;
        State_Automato = 3158;
   }
   if (State_Automato == 3482){
        Gera_Evento = 11;
        State_Automato = 3115;
   }
   if (State_Automato == 3485){
        Gera_Evento = 11;
        State_Automato = 3138;
   }
   if (State_Automato == 3487){
        Gera_Evento = 11;
        State_Automato = 3142;
   }
   if (State_Automato == 3488){
        Gera_Evento = 11;
        State_Automato = 3145;
   }
   if (State_Automato == 3509){
        Gera_Evento = 11;
        State_Automato = 2981;
   }
   if (State_Automato == 3518){
        Gera_Evento = 11;
        State_Automato = 3069;
   }
   if (State_Automato == 3520){
        Gera_Evento = 11;
        State_Automato = 3073;
   }
   if (State_Automato == 3521){
        Gera_Evento = 11;
        State_Automato = 3079;
   }
   if (State_Automato == 3529){
        Gera_Evento = 11;
        State_Automato = 3068;
   }
   if (State_Automato == 3554){
        Gera_Evento = 11;
        State_Automato = 2843;
   }
   if (State_Automato == 3555){
        Gera_Evento = 11;
        State_Automato = 2998;
   }
   if (State_Automato == 3556){
        Gera_Evento = 11;
        State_Automato = 3114;
   }
   if (State_Automato == 3557){
        Gera_Evento = 11;
        State_Automato = 3157;
   }
   if (State_Automato == 3558){
        Gera_Evento = 11;
        State_Automato = 3166;
   }
   if (State_Automato == 3691){
        Gera_Evento = 11;
        State_Automato = 3569;
   }
   if (State_Automato == 3714){
        Gera_Evento = 11;
        State_Automato = 3566;
   }
   if (State_Automato == 3718){
        Gera_Evento = 11;
        State_Automato = 3576;
   }
   if (State_Automato == 3721){
        Gera_Evento = 11;
        State_Automato = 3587;
   }
   if (State_Automato == 3726){
        Gera_Evento = 11;
        State_Automato = 3591;
   }
   if (State_Automato == 3732){
        Gera_Evento = 11;
        State_Automato = 3593;
   }
   if (State_Automato == 3735){
        Gera_Evento = 11;
        State_Automato = 3565;
   }
   if (State_Automato == 3740){
        Gera_Evento = 11;
        State_Automato = 3582;
   }
   if (State_Automato == 3741){
        Gera_Evento = 11;
        State_Automato = 3585;
   }
   if (State_Automato == 3751){
        Gera_Evento = 11;
        State_Automato = 3637;
   }
   if (State_Automato == 3758){
        Gera_Evento = 11;
        State_Automato = 3641;
   }
   if (State_Automato == 3827){
        Gera_Evento = 11;
        State_Automato = 3598;
   }
   if (State_Automato == 3828){
        Gera_Evento = 11;
        State_Automato = 3603;
   }
   if (State_Automato == 3841){
        Gera_Evento = 11;
        State_Automato = 3644;
   }
   if (State_Automato == 3843){
        Gera_Evento = 11;
        State_Automato = 3648;
   }
   if (State_Automato == 3844){
        Gera_Evento = 11;
        State_Automato = 3652;
   }
   if (State_Automato == 3854){
        Gera_Evento = 11;
        State_Automato = 3668;
   }
   if (State_Automato == 3855){
        Gera_Evento = 11;
        State_Automato = 3670;
   }
   if (State_Automato == 3873){
        Gera_Evento = 11;
        State_Automato = 3607;
   }
   if (State_Automato == 3874){
        Gera_Evento = 11;
        State_Automato = 3619;
   }
   if (State_Automato == 3881){
        Gera_Evento = 11;
        State_Automato = 3618;
   }
   if (State_Automato == 3885){
        Gera_Evento = 11;
        State_Automato = 3617;
   }
   if (State_Automato == 3892){
        Gera_Evento = 11;
        State_Automato = 3655;
   }
   if (State_Automato == 3922){
        Gera_Evento = 11;
        State_Automato = 3564;
   }
   if (State_Automato == 3928){
        Gera_Evento = 11;
        State_Automato = 3628;
   }
   if (State_Automato == 3929){
        Gera_Evento = 11;
        State_Automato = 3631;
   }
   if (State_Automato == 3930){
        Gera_Evento = 11;
        State_Automato = 3634;
   }
   if (State_Automato == 3931){
        Gera_Evento = 11;
        State_Automato = 3636;
   }
   if (State_Automato == 3936){
        Gera_Evento = 11;
        State_Automato = 3661;
   }
   if (State_Automato == 3937){
        Gera_Evento = 11;
        State_Automato = 3664;
   }
   if (State_Automato == 3982){
        Gera_Evento = 11;
        State_Automato = 3944;
   }
   if (State_Automato == 3985){
        Gera_Evento = 11;
        State_Automato = 3949;
   }
   if (State_Automato == 4013){
        Gera_Evento = 11;
        State_Automato = 3964;
   }
   if (State_Automato == 4023){
        Gera_Evento = 11;
        State_Automato = 3955;
   }
   if (State_Automato == 4025){
        Gera_Evento = 11;
        State_Automato = 3959;
   }
   if (State_Automato == 4026){
        Gera_Evento = 11;
        State_Automato = 3962;
   }
   if (State_Automato == 4031){
        Gera_Evento = 11;
        State_Automato = 3966;
   }
   if (State_Automato == 4033){
        Gera_Evento = 11;
        State_Automato = 3971;
   }
   if (State_Automato == 4035){
        Gera_Evento = 11;
        State_Automato = 3970;
   }
   if (State_Automato == 4036){
        Gera_Evento = 11;
        State_Automato = 3974;
   }
   if (State_Automato == 4066){
        Gera_Evento = 11;
        State_Automato = 4045;
   }
   if (State_Automato == 4076){
        Gera_Evento = 11;
        State_Automato = 4047;
   }
   if (State_Automato == 4081){
        Gera_Evento = 11;
        State_Automato = 4051;
   }

}

function trans13(){    
    if (State_Automato == 10){
        Gera_Evento = 13;
        State_Automato = 12;
   }
   if (State_Automato == 16){
        Gera_Evento = 13;
        State_Automato = 17;
   }
   if (State_Automato == 31){
        Gera_Evento = 13;
        State_Automato = 32;
   }
   if (State_Automato == 37){
        Gera_Evento = 13;
        State_Automato = 38;
   }
   if (State_Automato == 103){
        Gera_Evento = 13;
        State_Automato = 104;
   }
   if (State_Automato == 109){
        Gera_Evento = 13;
        State_Automato = 110;
   }
   if (State_Automato == 116){
        Gera_Evento = 13;
        State_Automato = 117;
   }
   if (State_Automato == 119){
        Gera_Evento = 13;
        State_Automato = 120;
   }
   if (State_Automato == 134){
        Gera_Evento = 13;
        State_Automato = 126;
   }
   if (State_Automato == 156){
        Gera_Evento = 13;
        State_Automato = 152;
   }
   if (State_Automato == 157){
        Gera_Evento = 13;
        State_Automato = 158;
   }
   if (State_Automato == 194){
        Gera_Evento = 13;
        State_Automato = 184;
   }
   if (State_Automato == 195){
        Gera_Evento = 13;
        State_Automato = 189;
   }
   if (State_Automato == 205){
        Gera_Evento = 13;
        State_Automato = 206;
   }
   if (State_Automato == 227){
        Gera_Evento = 13;
        State_Automato = 219;
   }
   if (State_Automato == 228){
        Gera_Evento = 13;
        State_Automato = 229;
   }
   if (State_Automato == 236){
        Gera_Evento = 13;
        State_Automato = 233;
   }
   if (State_Automato == 237){
        Gera_Evento = 13;
        State_Automato = 238;
   }
   if (State_Automato == 274){
        Gera_Evento = 13;
        State_Automato = 276;
   }
   if (State_Automato == 297){
        Gera_Evento = 13;
        State_Automato = 299;
   }
   if (State_Automato == 307){
        Gera_Evento = 13;
        State_Automato = 304;
   }
   if (State_Automato == 335){
        Gera_Evento = 13;
        State_Automato = 337;
   }
   if (State_Automato == 369){
        Gera_Evento = 13;
        State_Automato = 371;
   }
   if (State_Automato == 381){
        Gera_Evento = 13;
        State_Automato = 375;
   }
   if (State_Automato == 384){
        Gera_Evento = 13;
        State_Automato = 386;
   }
   if (State_Automato == 448){
        Gera_Evento = 13;
        State_Automato = 445;
   }
   if (State_Automato == 495){
        Gera_Evento = 13;
        State_Automato = 496;
   }
   if (State_Automato == 498){
        Gera_Evento = 13;
        State_Automato = 500;
   }
   if (State_Automato == 520){
        Gera_Evento = 13;
        State_Automato = 521;
   }
   if (State_Automato == 529){
        Gera_Evento = 13;
        State_Automato = 526;
   }
   if (State_Automato == 530){
        Gera_Evento = 13;
        State_Automato = 532;
   }
   if (State_Automato == 541){
        Gera_Evento = 13;
        State_Automato = 537;
   }
   if (State_Automato == 570){
        Gera_Evento = 13;
        State_Automato = 571;
   }
   if (State_Automato == 574){
        Gera_Evento = 13;
        State_Automato = 575;
   }
   if (State_Automato == 590){
        Gera_Evento = 13;
        State_Automato = 592;
   }
   if (State_Automato == 643){
        Gera_Evento = 13;
        State_Automato = 645;
   }
   if (State_Automato == 651){
        Gera_Evento = 13;
        State_Automato = 652;
   }
   if (State_Automato == 655){
        Gera_Evento = 13;
        State_Automato = 656;
   }
   if (State_Automato == 658){
        Gera_Evento = 13;
        State_Automato = 660;
   }
   if (State_Automato == 666){
        Gera_Evento = 13;
        State_Automato = 667;
   }
   if (State_Automato == 670){
        Gera_Evento = 13;
        State_Automato = 671;
   }
   if (State_Automato == 673){
        Gera_Evento = 13;
        State_Automato = 674;
   }
   if (State_Automato == 677){
        Gera_Evento = 13;
        State_Automato = 678;
   }
   if (State_Automato == 681){
        Gera_Evento = 13;
        State_Automato = 682;
   }
   if (State_Automato == 687){
        Gera_Evento = 13;
        State_Automato = 689;
   }
   if (State_Automato == 715){
        Gera_Evento = 13;
        State_Automato = 697;
   }
   if (State_Automato == 729){
        Gera_Evento = 13;
        State_Automato = 696;
   }
   if (State_Automato == 747){
        Gera_Evento = 13;
        State_Automato = 748;
   }
   if (State_Automato == 753){
        Gera_Evento = 13;
        State_Automato = 755;
   }
   if (State_Automato == 785){
        Gera_Evento = 13;
        State_Automato = 786;
   }
   if (State_Automato == 798){
        Gera_Evento = 13;
        State_Automato = 799;
   }
   if (State_Automato == 802){
        Gera_Evento = 13;
        State_Automato = 803;
   }
   if (State_Automato == 839){
        Gera_Evento = 13;
        State_Automato = 840;
   }
   if (State_Automato == 843){
        Gera_Evento = 13;
        State_Automato = 844;
   }
   if (State_Automato == 849){
        Gera_Evento = 13;
        State_Automato = 851;
   }
   if (State_Automato == 924){
        Gera_Evento = 13;
        State_Automato = 917;
   }
   if (State_Automato == 946){
        Gera_Evento = 13;
        State_Automato = 943;
   }
   if (State_Automato == 955){
        Gera_Evento = 13;
        State_Automato = 957;
   }
   if (State_Automato == 972){
        Gera_Evento = 13;
        State_Automato = 974;
   }
   if (State_Automato == 988){
        Gera_Evento = 13;
        State_Automato = 979;
   }
   if (State_Automato == 990){
        Gera_Evento = 13;
        State_Automato = 982;
   }
   if (State_Automato == 1022){
        Gera_Evento = 13;
        State_Automato = 1008;
   }
   if (State_Automato == 1025){
        Gera_Evento = 13;
        State_Automato = 1011;
   }
   if (State_Automato == 1029){
        Gera_Evento = 13;
        State_Automato = 1015;
   }
   if (State_Automato == 1057){
        Gera_Evento = 13;
        State_Automato = 1058;
   }
   if (State_Automato == 1064){
        Gera_Evento = 13;
        State_Automato = 1065;
   }
   if (State_Automato == 1072){
        Gera_Evento = 13;
        State_Automato = 1073;
   }
   if (State_Automato == 1103){
        Gera_Evento = 13;
        State_Automato = 1104;
   }
   if (State_Automato == 1111){
        Gera_Evento = 13;
        State_Automato = 1108;
   }
   if (State_Automato == 1115){
        Gera_Evento = 13;
        State_Automato = 1117;
   }
   if (State_Automato == 1129){
        Gera_Evento = 13;
        State_Automato = 1126;
   }
   if (State_Automato == 1147){
        Gera_Evento = 13;
        State_Automato = 1135;
   }
   if (State_Automato == 1162){
        Gera_Evento = 13;
        State_Automato = 1156;
   }
   if (State_Automato == 1183){
        Gera_Evento = 13;
        State_Automato = 1185;
   }
   if (State_Automato == 1204){
        Gera_Evento = 13;
        State_Automato = 1192;
   }
   if (State_Automato == 1205){
        Gera_Evento = 13;
        State_Automato = 1197;
   }
   if (State_Automato == 1206){
        Gera_Evento = 13;
        State_Automato = 1208;
   }
   if (State_Automato == 1240){
        Gera_Evento = 13;
        State_Automato = 1243;
   }
   if (State_Automato == 1256){
        Gera_Evento = 13;
        State_Automato = 1247;
   }
   if (State_Automato == 1257){
        Gera_Evento = 13;
        State_Automato = 1260;
   }
   if (State_Automato == 1323){
        Gera_Evento = 13;
        State_Automato = 1277;
   }
   if (State_Automato == 1324){
        Gera_Evento = 13;
        State_Automato = 1282;
   }
   if (State_Automato == 1325){
        Gera_Evento = 13;
        State_Automato = 1290;
   }
   if (State_Automato == 1329){
        Gera_Evento = 13;
        State_Automato = 1294;
   }
   if (State_Automato == 1342){
        Gera_Evento = 13;
        State_Automato = 1289;
   }
   if (State_Automato == 1343){
        Gera_Evento = 13;
        State_Automato = 1300;
   }
   if (State_Automato == 1352){
        Gera_Evento = 13;
        State_Automato = 1353;
   }
   if (State_Automato == 1362){
        Gera_Evento = 13;
        State_Automato = 1364;
   }
   if (State_Automato == 1372){
        Gera_Evento = 13;
        State_Automato = 1368;
   }
   if (State_Automato == 1373){
        Gera_Evento = 13;
        State_Automato = 1374;
   }
   if (State_Automato == 1399){
        Gera_Evento = 13;
        State_Automato = 1385;
   }
   if (State_Automato == 1400){
        Gera_Evento = 13;
        State_Automato = 1390;
   }
   if (State_Automato == 1464){
        Gera_Evento = 13;
        State_Automato = 1455;
   }
   if (State_Automato == 1470){
        Gera_Evento = 13;
        State_Automato = 1454;
   }
   if (State_Automato == 1471){
        Gera_Evento = 13;
        State_Automato = 1461;
   }
   if (State_Automato == 1486){
        Gera_Evento = 13;
        State_Automato = 1480;
   }
   if (State_Automato == 1500){
        Gera_Evento = 13;
        State_Automato = 1501;
   }
   if (State_Automato == 1540){
        Gera_Evento = 13;
        State_Automato = 1518;
   }
   if (State_Automato == 1550){
        Gera_Evento = 13;
        State_Automato = 1509;
   }
   if (State_Automato == 1552){
        Gera_Evento = 13;
        State_Automato = 1535;
   }
   if (State_Automato == 1553){
        Gera_Evento = 13;
        State_Automato = 1554;
   }
   if (State_Automato == 1578){
        Gera_Evento = 13;
        State_Automato = 1562;
   }
   if (State_Automato == 1579){
        Gera_Evento = 13;
        State_Automato = 1569;
   }
   if (State_Automato == 1580){
        Gera_Evento = 13;
        State_Automato = 1582;
   }
   if (State_Automato == 1601){
        Gera_Evento = 13;
        State_Automato = 1588;
   }
   if (State_Automato == 1605){
        Gera_Evento = 13;
        State_Automato = 1606;
   }
   if (State_Automato == 1625){
        Gera_Evento = 13;
        State_Automato = 1617;
   }
   if (State_Automato == 1627){
        Gera_Evento = 13;
        State_Automato = 1616;
   }
   if (State_Automato == 1637){
        Gera_Evento = 13;
        State_Automato = 1639;
   }
   if (State_Automato == 1651){
        Gera_Evento = 13;
        State_Automato = 1643;
   }
   if (State_Automato == 1652){
        Gera_Evento = 13;
        State_Automato = 1654;
   }
   if (State_Automato == 1752){
        Gera_Evento = 13;
        State_Automato = 1666;
   }
   if (State_Automato == 1753){
        Gera_Evento = 13;
        State_Automato = 1691;
   }
   if (State_Automato == 1754){
        Gera_Evento = 13;
        State_Automato = 1705;
   }
   if (State_Automato == 1756){
        Gera_Evento = 13;
        State_Automato = 1724;
   }
   if (State_Automato == 1757){
        Gera_Evento = 13;
        State_Automato = 1735;
   }
   if (State_Automato == 1758){
        Gera_Evento = 13;
        State_Automato = 1740;
   }
   if (State_Automato == 1780){
        Gera_Evento = 13;
        State_Automato = 1781;
   }
   if (State_Automato == 1787){
        Gera_Evento = 13;
        State_Automato = 1788;
   }
   if (State_Automato == 1791){
        Gera_Evento = 13;
        State_Automato = 1792;
   }
   if (State_Automato == 1809){
        Gera_Evento = 13;
        State_Automato = 1811;
   }
   if (State_Automato == 1822){
        Gera_Evento = 13;
        State_Automato = 1823;
   }
   if (State_Automato == 1858){
        Gera_Evento = 13;
        State_Automato = 1859;
   }
   if (State_Automato == 1861){
        Gera_Evento = 13;
        State_Automato = 1862;
   }
   if (State_Automato == 1869){
        Gera_Evento = 13;
        State_Automato = 1870;
   }
   if (State_Automato == 1874){
        Gera_Evento = 13;
        State_Automato = 1876;
   }
   if (State_Automato == 1881){
        Gera_Evento = 13;
        State_Automato = 1882;
   }
   if (State_Automato == 1892){
        Gera_Evento = 13;
        State_Automato = 1893;
   }
   if (State_Automato == 1918){
        Gera_Evento = 13;
        State_Automato = 1920;
   }
   if (State_Automato == 1952){
        Gera_Evento = 13;
        State_Automato = 1954;
   }
   if (State_Automato == 1980){
        Gera_Evento = 13;
        State_Automato = 1982;
   }
   if (State_Automato == 1990){
        Gera_Evento = 13;
        State_Automato = 1992;
   }
   if (State_Automato == 2012){
        Gera_Evento = 13;
        State_Automato = 2009;
   }
   if (State_Automato == 2027){
        Gera_Evento = 13;
        State_Automato = 2028;
   }
   if (State_Automato == 2036){
        Gera_Evento = 13;
        State_Automato = 2032;
   }
   if (State_Automato == 2046){
        Gera_Evento = 13;
        State_Automato = 2048;
   }
   if (State_Automato == 2053){
        Gera_Evento = 13;
        State_Automato = 2054;
   }
   if (State_Automato == 2056){
        Gera_Evento = 13;
        State_Automato = 2057;
   }
   if (State_Automato == 2059){
        Gera_Evento = 13;
        State_Automato = 2060;
   }
   if (State_Automato == 2161){
        Gera_Evento = 13;
        State_Automato = 2162;
   }
   if (State_Automato == 2165){
        Gera_Evento = 13;
        State_Automato = 2166;
   }
   if (State_Automato == 2169){
        Gera_Evento = 13;
        State_Automato = 2170;
   }
   if (State_Automato == 2179){
        Gera_Evento = 13;
        State_Automato = 2181;
   }
   if (State_Automato == 2209){
        Gera_Evento = 13;
        State_Automato = 2210;
   }
   if (State_Automato == 2236){
        Gera_Evento = 13;
        State_Automato = 2237;
   }
   if (State_Automato == 2246){
        Gera_Evento = 13;
        State_Automato = 2247;
   }
   if (State_Automato == 2249){
        Gera_Evento = 13;
        State_Automato = 2251;
   }
   if (State_Automato == 2257){
        Gera_Evento = 13;
        State_Automato = 2258;
   }
   if (State_Automato == 2261){
        Gera_Evento = 13;
        State_Automato = 2262;
   }
   if (State_Automato == 2271){
        Gera_Evento = 13;
        State_Automato = 2273;
   }
   if (State_Automato == 2287){
        Gera_Evento = 13;
        State_Automato = 2281;
   }
   if (State_Automato == 2312){
        Gera_Evento = 13;
        State_Automato = 2314;
   }
   if (State_Automato == 2323){
        Gera_Evento = 13;
        State_Automato = 2325;
   }
   if (State_Automato == 2331){
        Gera_Evento = 13;
        State_Automato = 2332;
   }
   if (State_Automato == 2339){
        Gera_Evento = 13;
        State_Automato = 2341;
   }
   if (State_Automato == 2355){
        Gera_Evento = 13;
        State_Automato = 2344;
   }
   if (State_Automato == 2387){
        Gera_Evento = 13;
        State_Automato = 2390;
   }
   if (State_Automato == 2481){
        Gera_Evento = 13;
        State_Automato = 2482;
   }
   if (State_Automato == 2501){
        Gera_Evento = 13;
        State_Automato = 2502;
   }
   if (State_Automato == 2515){
        Gera_Evento = 13;
        State_Automato = 2512;
   }
   if (State_Automato == 2546){
        Gera_Evento = 13;
        State_Automato = 2539;
   }
   if (State_Automato == 2547){
        Gera_Evento = 13;
        State_Automato = 2542;
   }
   if (State_Automato == 2553){
        Gera_Evento = 13;
        State_Automato = 2550;
   }
   if (State_Automato == 2566){
        Gera_Evento = 13;
        State_Automato = 2562;
   }
   if (State_Automato == 2581){
        Gera_Evento = 13;
        State_Automato = 2582;
   }
   if (State_Automato == 2591){
        Gera_Evento = 13;
        State_Automato = 2593;
   }
   if (State_Automato == 2601){
        Gera_Evento = 13;
        State_Automato = 2597;
   }
   if (State_Automato == 2602){
        Gera_Evento = 13;
        State_Automato = 2603;
   }
   if (State_Automato == 2613){
        Gera_Evento = 13;
        State_Automato = 2615;
   }
   if (State_Automato == 2702){
        Gera_Evento = 13;
        State_Automato = 2688;
   }
   if (State_Automato == 2704){
        Gera_Evento = 13;
        State_Automato = 2692;
   }
   if (State_Automato == 2705){
        Gera_Evento = 13;
        State_Automato = 2697;
   }
   if (State_Automato == 2708){
        Gera_Evento = 13;
        State_Automato = 2710;
   }
   if (State_Automato == 2727){
        Gera_Evento = 13;
        State_Automato = 2729;
   }
   if (State_Automato == 2741){
        Gera_Evento = 13;
        State_Automato = 2743;
   }
   if (State_Automato == 2767){
        Gera_Evento = 13;
        State_Automato = 2757;
   }
   if (State_Automato == 2827){
        Gera_Evento = 13;
        State_Automato = 2811;
   }
   if (State_Automato == 2830){
        Gera_Evento = 13;
        State_Automato = 2831;
   }
   if (State_Automato == 2842){
        Gera_Evento = 13;
        State_Automato = 2843;
   }
   if (State_Automato == 2880){
        Gera_Evento = 13;
        State_Automato = 2881;
   }
   if (State_Automato == 2886){
        Gera_Evento = 13;
        State_Automato = 2887;
   }
   if (State_Automato == 2889){
        Gera_Evento = 13;
        State_Automato = 2890;
   }
   if (State_Automato == 2906){
        Gera_Evento = 13;
        State_Automato = 2907;
   }
   if (State_Automato == 2926){
        Gera_Evento = 13;
        State_Automato = 2927;
   }
   if (State_Automato == 2936){
        Gera_Evento = 13;
        State_Automato = 2937;
   }
   if (State_Automato == 2943){
        Gera_Evento = 13;
        State_Automato = 2944;
   }
   if (State_Automato == 2967){
        Gera_Evento = 13;
        State_Automato = 2968;
   }
   if (State_Automato == 2980){
        Gera_Evento = 13;
        State_Automato = 2981;
   }
   if (State_Automato == 2997){
        Gera_Evento = 13;
        State_Automato = 2998;
   }
   if (State_Automato == 3017){
        Gera_Evento = 13;
        State_Automato = 3018;
   }
   if (State_Automato == 3047){
        Gera_Evento = 13;
        State_Automato = 3049;
   }
   if (State_Automato == 3057){
        Gera_Evento = 13;
        State_Automato = 3053;
   }
   if (State_Automato == 3058){
        Gera_Evento = 13;
        State_Automato = 3059;
   }
   if (State_Automato == 3067){
        Gera_Evento = 13;
        State_Automato = 3069;
   }
   if (State_Automato == 3077){
        Gera_Evento = 13;
        State_Automato = 3073;
   }
   if (State_Automato == 3078){
        Gera_Evento = 13;
        State_Automato = 3079;
   }
   if (State_Automato == 3113){
        Gera_Evento = 13;
        State_Automato = 3114;
   }
   if (State_Automato == 3131){
        Gera_Evento = 13;
        State_Automato = 3132;
   }
   if (State_Automato == 3137){
        Gera_Evento = 13;
        State_Automato = 3138;
   }
   if (State_Automato == 3144){
        Gera_Evento = 13;
        State_Automato = 3145;
   }
   if (State_Automato == 3156){
        Gera_Evento = 13;
        State_Automato = 3157;
   }
   if (State_Automato == 3165){
        Gera_Evento = 13;
        State_Automato = 3166;
   }
   if (State_Automato == 3191){
        Gera_Evento = 13;
        State_Automato = 3192;
   }
   if (State_Automato == 3205){
        Gera_Evento = 13;
        State_Automato = 3206;
   }
   if (State_Automato == 3210){
        Gera_Evento = 13;
        State_Automato = 3211;
   }
   if (State_Automato == 3240){
        Gera_Evento = 13;
        State_Automato = 3241;
   }
   if (State_Automato == 3245){
        Gera_Evento = 13;
        State_Automato = 3246;
   }
   if (State_Automato == 3253){
        Gera_Evento = 13;
        State_Automato = 3254;
   }
   if (State_Automato == 3303){
        Gera_Evento = 13;
        State_Automato = 3305;
   }
   if (State_Automato == 3369){
        Gera_Evento = 13;
        State_Automato = 3370;
   }
   if (State_Automato == 3376){
        Gera_Evento = 13;
        State_Automato = 3377;
   }
   if (State_Automato == 3380){
        Gera_Evento = 13;
        State_Automato = 3381;
   }
   if (State_Automato == 3426){
        Gera_Evento = 13;
        State_Automato = 3427;
   }
   if (State_Automato == 3432){
        Gera_Evento = 13;
        State_Automato = 3433;
   }
   if (State_Automato == 3503){
        Gera_Evento = 13;
        State_Automato = 3504;
   }
   if (State_Automato == 3512){
        Gera_Evento = 13;
        State_Automato = 3514;
   }
   if (State_Automato == 3530){
        Gera_Evento = 13;
        State_Automato = 3522;
   }
   if (State_Automato == 3534){
        Gera_Evento = 13;
        State_Automato = 3536;
   }
   if (State_Automato == 3544){
        Gera_Evento = 13;
        State_Automato = 3540;
   }
   if (State_Automato == 3545){
        Gera_Evento = 13;
        State_Automato = 3546;
   }
   if (State_Automato == 3590){
        Gera_Evento = 13;
        State_Automato = 3591;
   }
   if (State_Automato == 3616){
        Gera_Evento = 13;
        State_Automato = 3613;
   }
   if (State_Automato == 3721){
        Gera_Evento = 13;
        State_Automato = 3723;
   }
   if (State_Automato == 3731){
        Gera_Evento = 13;
        State_Automato = 3727;
   }
   if (State_Automato == 3778){
        Gera_Evento = 13;
        State_Automato = 3779;
   }
   if (State_Automato == 3790){
        Gera_Evento = 13;
        State_Automato = 3791;
   }
   if (State_Automato == 3796){
        Gera_Evento = 13;
        State_Automato = 3797;
   }
   if (State_Automato == 3799){
        Gera_Evento = 13;
        State_Automato = 3800;
   }
   if (State_Automato == 3828){
        Gera_Evento = 13;
        State_Automato = 3830;
   }
   if (State_Automato == 3865){
        Gera_Evento = 13;
        State_Automato = 3866;
   }
   if (State_Automato == 3885){
        Gera_Evento = 13;
        State_Automato = 3882;
   }
   if (State_Automato == 3903){
        Gera_Evento = 13;
        State_Automato = 3900;
   }
   if (State_Automato == 3904){
        Gera_Evento = 13;
        State_Automato = 3906;
   }
   if (State_Automato == 4009){
        Gera_Evento = 13;
        State_Automato = 4010;
   }
   if (State_Automato == 4090){
        Gera_Evento = 13;
        State_Automato = 4091;
   }
   if (State_Automato == 4104){
        Gera_Evento = 13;
        State_Automato = 4105;
   }
   if (State_Automato == 4110){
        Gera_Evento = 13;
        State_Automato = 4111;
   }
   if (State_Automato == 4117){
        Gera_Evento = 13;
        State_Automato = 4118;
   }
}

function trans15(){    
    if (State_Automato == 2209){
        Gera_Evento = 15;
        State_Automato = 1772;
   }
   if (State_Automato == 2212){
        Gera_Evento = 15;
        State_Automato = 1777;
   }
   if (State_Automato == 2220){
        Gera_Evento = 15;
        State_Automato = 1800;
   }
   if (State_Automato == 2240){
        Gera_Evento = 15;
        State_Automato = 1781;
   }
   if (State_Automato == 2246){
        Gera_Evento = 15;
        State_Automato = 1768;
   }
   if (State_Automato == 2249){
        Gera_Evento = 15;
        State_Automato = 1796;
   }
   if (State_Automato == 2256){
        Gera_Evento = 15;
        State_Automato = 1807;
   }
   if (State_Automato == 2257){
        Gera_Evento = 15;
        State_Automato = 1810;
   }
   if (State_Automato == 2266){
        Gera_Evento = 15;
        State_Automato = 1929;
   }
   if (State_Automato == 2271){
        Gera_Evento = 15;
        State_Automato = 1938;
   }
   if (State_Automato == 2277){
        Gera_Evento = 15;
        State_Automato = 1943;
   }
   if (State_Automato == 2286){
        Gera_Evento = 15;
        State_Automato = 131;
   }
   if (State_Automato == 2287){
        Gera_Evento = 15;
        State_Automato = 1946;
   }
   if (State_Automato == 2288){
        Gera_Evento = 15;
        State_Automato = 1966;
   }
   if (State_Automato == 2292){
        Gera_Evento = 15;
        State_Automato = 152;
   }
   if (State_Automato == 2306){
        Gera_Evento = 15;
        State_Automato = 184;
   }
   if (State_Automato == 2307){
        Gera_Evento = 15;
        State_Automato = 198;
   }
   if (State_Automato == 2309){
        Gera_Evento = 15;
        State_Automato = 1982;
   }
   if (State_Automato == 2311){
        Gera_Evento = 15;
        State_Automato = 1981;
   }
   if (State_Automato == 2312){
        Gera_Evento = 15;
        State_Automato = 1994;
   }
   if (State_Automato == 2323){
        Gera_Evento = 15;
        State_Automato = 1937;
   }
   if (State_Automato == 2330){
        Gera_Evento = 15;
        State_Automato = 219;
   }
   if (State_Automato == 2331){
        Gera_Evento = 15;
        State_Automato = 1953;
   }
   if (State_Automato == 2334){
        Gera_Evento = 15;
        State_Automato = 1965;
   }
   if (State_Automato == 2338){
        Gera_Evento = 15;
        State_Automato = 233;
   }
   if (State_Automato == 2339){
        Gera_Evento = 15;
        State_Automato = 1993;
   }
   if (State_Automato == 2355){
        Gera_Evento = 15;
        State_Automato = 1936;
   }
   if (State_Automato == 2356){
        Gera_Evento = 15;
        State_Automato = 264;
   }
   if (State_Automato == 2357){
        Gera_Evento = 15;
        State_Automato = 1978;
   }
   if (State_Automato == 2358){
        Gera_Evento = 15;
        State_Automato = 1991;
   }
   if (State_Automato == 2367){
        Gera_Evento = 15;
        State_Automato = 2085;
   }
   if (State_Automato == 2370){
        Gera_Evento = 15;
        State_Automato = 2090;
   }
   if (State_Automato == 2382){
        Gera_Evento = 15;
        State_Automato = 2084;
   }
   if (State_Automato == 2384){
        Gera_Evento = 15;
        State_Automato = 2097;
   }
   if (State_Automato == 2386){
        Gera_Evento = 15;
        State_Automato = 2096;
   }
   if (State_Automato == 2387){
        Gera_Evento = 15;
        State_Automato = 2110;
   }
   if (State_Automato == 2398){
        Gera_Evento = 15;
        State_Automato = 2083;
   }
   if (State_Automato == 2407){
        Gera_Evento = 15;
        State_Automato = 2082;
   }
   if (State_Automato == 2426){
        Gera_Evento = 15;
        State_Automato = 2126;
   }
   if (State_Automato == 2439){
        Gera_Evento = 15;
        State_Automato = 2125;
   }
   if (State_Automato == 2444){
        Gera_Evento = 15;
        State_Automato = 2131;
   }
   if (State_Automato == 2467){
        Gera_Evento = 15;
        State_Automato = 1823;
   }
   if (State_Automato == 2481){
        Gera_Evento = 15;
        State_Automato = 1818;
   }
   if (State_Automato == 2490){
        Gera_Evento = 15;
        State_Automato = 1838;
   }
   if (State_Automato == 2491){
        Gera_Evento = 15;
        State_Automato = 1842;
   }
   if (State_Automato == 2495){
        Gera_Evento = 15;
        State_Automato = 1848;
   }
   if (State_Automato == 2501){
        Gera_Evento = 15;
        State_Automato = 1928;
   }
   if (State_Automato == 2511){
        Gera_Evento = 15;
        State_Automato = 2028;
   }
   if (State_Automato == 2527){
        Gera_Evento = 15;
        State_Automato = 2014;
   }
   if (State_Automato == 2546){
        Gera_Evento = 15;
        State_Automato = 2025;
   }
   if (State_Automato == 2581){
        Gera_Evento = 15;
        State_Automato = 1852;
   }
   if (State_Automato == 2586){
        Gera_Evento = 15;
        State_Automato = 1859;
   }
   if (State_Automato == 2587){
        Gera_Evento = 15;
        State_Automato = 1862;
   }
   if (State_Automato == 2590){
        Gera_Evento = 15;
        State_Automato = 1867;
   }
   if (State_Automato == 2591){
        Gera_Evento = 15;
        State_Automato = 1871;
   }
   if (State_Automato == 2596){
        Gera_Evento = 15;
        State_Automato = 1876;
   }
   if (State_Automato == 2601){
        Gera_Evento = 15;
        State_Automato = 1875;
   }
   if (State_Automato == 2608){
        Gera_Evento = 15;
        State_Automato = 1851;
   }
   if (State_Automato == 2609){
        Gera_Evento = 15;
        State_Automato = 1870;
   }
   if (State_Automato == 2611){
        Gera_Evento = 15;
        State_Automato = 1882;
   }
   if (State_Automato == 2612){
        Gera_Evento = 15;
        State_Automato = 1884;
   }
   if (State_Automato == 2634){
        Gera_Evento = 15;
        State_Automato = 2048;
   }
   if (State_Automato == 2637){
        Gera_Evento = 15;
        State_Automato = 2054;
   }
   if (State_Automato == 2638){
        Gera_Evento = 15;
        State_Automato = 2057;
   }
   if (State_Automato == 2639){
        Gera_Evento = 15;
        State_Automato = 2060;
   }
   if (State_Automato == 2640){
        Gera_Evento = 15;
        State_Automato = 2062;
   }
   if (State_Automato == 2647){
        Gera_Evento = 15;
        State_Automato = 2047;
   }
   if (State_Automato == 2656){
        Gera_Evento = 15;
        State_Automato = 2137;
   }
   if (State_Automato == 2666){
        Gera_Evento = 15;
        State_Automato = 2141;
   }
   if (State_Automato == 2687){
        Gera_Evento = 15;
        State_Automato = 2162;
   }
   if (State_Automato == 2691){
        Gera_Evento = 15;
        State_Automato = 2166;
   }
   if (State_Automato == 2695){
        Gera_Evento = 15;
        State_Automato = 2170;
   }
   if (State_Automato == 2696){
        Gera_Evento = 15;
        State_Automato = 2173;
   }
   if (State_Automato == 2705){
        Gera_Evento = 15;
        State_Automato = 2172;
   }
   if (State_Automato == 2708){
        Gera_Evento = 15;
        State_Automato = 2176;
   }
   if (State_Automato == 2719){
        Gera_Evento = 15;
        State_Automato = 2181;
   }
   if (State_Automato == 2741){
        Gera_Evento = 15;
        State_Automato = 1765;
   }
   if (State_Automato == 2749){
        Gera_Evento = 15;
        State_Automato = 1893;
   }
   if (State_Automato == 2752){
        Gera_Evento = 15;
        State_Automato = 1905;
   }
   if (State_Automato == 2755){
        Gera_Evento = 15;
        State_Automato = 1915;
   }
   if (State_Automato == 2756){
        Gera_Evento = 15;
        State_Automato = 1920;
   }
   if (State_Automato == 2764){
        Gera_Evento = 15;
        State_Automato = 1902;
   }
   if (State_Automato == 2765){
        Gera_Evento = 15;
        State_Automato = 1909;
   }
   if (State_Automato == 2766){
        Gera_Evento = 15;
        State_Automato = 1912;
   }
   if (State_Automato == 2767){
        Gera_Evento = 15;
        State_Automato = 1919;
   }
   if (State_Automato == 2776){
        Gera_Evento = 15;
        State_Automato = 2118;
   }
   if (State_Automato == 2780){
        Gera_Evento = 15;
        State_Automato = 2115;
   }
   if (State_Automato == 2781){
        Gera_Evento = 15;
        State_Automato = 2122;
   }
   if (State_Automato == 2782){
        Gera_Evento = 15;
        State_Automato = 2124;
   }
   if (State_Automato == 2788){
        Gera_Evento = 15;
        State_Automato = 2152;
   }
   if (State_Automato == 2789){
        Gera_Evento = 15;
        State_Automato = 2157;
   }
   if (State_Automato == 2795){
        Gera_Evento = 15;
        State_Automato = 2149;
   }
   if (State_Automato == 2796){
        Gera_Evento = 15;
        State_Automato = 2156;
   }
   if (State_Automato == 2799){
        Gera_Evento = 15;
        State_Automato = 2186;
   }
   if (State_Automato == 2800){
        Gera_Evento = 15;
        State_Automato = 2188;
   }
   if (State_Automato == 2807){
        Gera_Evento = 15;
        State_Automato = 2076;
   }
   if (State_Automato == 2903){
        Gera_Evento = 15;
        State_Automato = 619;
   }
   if (State_Automato == 2904){
        Gera_Evento = 15;
        State_Automato = 628;
   }
   if (State_Automato == 2915){
        Gera_Evento = 15;
        State_Automato = 2857;
   }
   if (State_Automato == 2919){
        Gera_Evento = 15;
        State_Automato = 2872;
   }
   if (State_Automato == 2936){
        Gera_Evento = 15;
        State_Automato = 1331;
   }
   if (State_Automato == 2942){
        Gera_Evento = 15;
        State_Automato = 1233;
   }
   if (State_Automato == 2943){
        Gera_Evento = 15;
        State_Automato = 1252;
   }
   if (State_Automato == 2949){
        Gera_Evento = 15;
        State_Automato = 1282;
   }
   if (State_Automato == 2950){
        Gera_Evento = 15;
        State_Automato = 1294;
   }
   if (State_Automato == 2951){
        Gera_Evento = 15;
        State_Automato = 2853;
   }
   if (State_Automato == 2963){
        Gera_Evento = 15;
        State_Automato = 2865;
   }
   if (State_Automato == 2964){
        Gera_Evento = 15;
        State_Automato = 2871;
   }
   if (State_Automato == 2966){
        Gera_Evento = 15;
        State_Automato = 2881;
   }
   if (State_Automato == 2967){
        Gera_Evento = 15;
        State_Automato = 2897;
   }
   if (State_Automato == 2973){
        Gera_Evento = 15;
        State_Automato = 2870;
   }
   if (State_Automato == 2976){
        Gera_Evento = 15;
        State_Automato = 2887;
   }
   if (State_Automato == 2977){
        Gera_Evento = 15;
        State_Automato = 2890;
   }
   if (State_Automato == 2994){
        Gera_Evento = 15;
        State_Automato = 2869;
   }
   if (State_Automato == 3032){
        Gera_Evento = 15;
        State_Automato = 3001;
   }
   if (State_Automato == 3042){
        Gera_Evento = 15;
        State_Automato = 3000;
   }
   if (State_Automato == 3044){
        Gera_Evento = 15;
        State_Automato = 3008;
   }
   if (State_Automato == 3047){
        Gera_Evento = 15;
        State_Automato = 3014;
   }
   if (State_Automato == 3052){
        Gera_Evento = 15;
        State_Automato = 3018;
   }
   if (State_Automato == 3058){
        Gera_Evento = 15;
        State_Automato = 3023;
   }
   if (State_Automato == 3066){
        Gera_Evento = 15;
        State_Automato = 3012;
   }
   if (State_Automato == 3067){
        Gera_Evento = 15;
        State_Automato = 3022;
   }
   if (State_Automato == 3077){
        Gera_Evento = 15;
        State_Automato = 3028;
   }
   if (State_Automato == 3141){
        Gera_Evento = 15;
        State_Automato = 3119;
   }
   if (State_Automato == 3150){
        Gera_Evento = 15;
        State_Automato = 3118;
   }
   if (State_Automato == 3344){
        Gera_Evento = 15;
        State_Automato = 3171;
   }
   if (State_Automato == 3349){
        Gera_Evento = 15;
        State_Automato = 3179;
   }
   if (State_Automato == 3353){
        Gera_Evento = 15;
        State_Automato = 3184;
   }
   if (State_Automato == 3354){
        Gera_Evento = 15;
        State_Automato = 3197;
   }
   if (State_Automato == 3368){
        Gera_Evento = 15;
        State_Automato = 3206;
   }
   if (State_Automato == 3376){
        Gera_Evento = 15;
        State_Automato = 3178;
   }
   if (State_Automato == 3387){
        Gera_Evento = 15;
        State_Automato = 3271;
   }
   if (State_Automato == 3412){
        Gera_Evento = 15;
        State_Automato = 3170;
   }
   if (State_Automato == 3417){
        Gera_Evento = 15;
        State_Automato = 3241;
   }
   if (State_Automato == 3426){
        Gera_Evento = 15;
        State_Automato = 3219;
   }
   if (State_Automato == 3431){
        Gera_Evento = 15;
        State_Automato = 3230;
   }
   if (State_Automato == 3432){
        Gera_Evento = 15;
        State_Automato = 3247;
   }
   if (State_Automato == 3438){
        Gera_Evento = 15;
        State_Automato = 3246;
   }
   if (State_Automato == 3444){
        Gera_Evento = 15;
        State_Automato = 3278;
   }
   if (State_Automato == 3446){
        Gera_Evento = 15;
        State_Automato = 3282;
   }
   if (State_Automato == 3451){
        Gera_Evento = 15;
        State_Automato = 3277;
   }
   if (State_Automato == 3459){
        Gera_Evento = 15;
        State_Automato = 3312;
   }
   if (State_Automato == 3479){
        Gera_Evento = 15;
        State_Automato = 3254;
   }
   if (State_Automato == 3480){
        Gera_Evento = 15;
        State_Automato = 3256;
   }
   if (State_Automato == 3481){
        Gera_Evento = 15;
        State_Automato = 3258;
   }
   if (State_Automato == 3485){
        Gera_Evento = 15;
        State_Automato = 3318;
   }
   if (State_Automato == 3487){
        Gera_Evento = 15;
        State_Automato = 3320;
   }
   if (State_Automato == 3488){
        Gera_Evento = 15;
        State_Automato = 3322;
   }
   if (State_Automato == 3492){
        Gera_Evento = 15;
        State_Automato = 3329;
   }
   if (State_Automato == 3512){
        Gera_Evento = 15;
        State_Automato = 3270;
   }
   if (State_Automato == 3520){
        Gera_Evento = 15;
        State_Automato = 3300;
   }
   if (State_Automato == 3521){
        Gera_Evento = 15;
        State_Automato = 3305;
   }
   if (State_Automato == 3528){
        Gera_Evento = 15;
        State_Automato = 3294;
   }
   if (State_Automato == 3529){
        Gera_Evento = 15;
        State_Automato = 3297;
   }
   if (State_Automato == 3530){
        Gera_Evento = 15;
        State_Automato = 3304;
   }
   if (State_Automato == 3533){
        Gera_Evento = 15;
        State_Automato = 3316;
   }
   if (State_Automato == 3534){
        Gera_Evento = 15;
        State_Automato = 3328;
   }
   if (State_Automato == 3544){
        Gera_Evento = 15;
        State_Automato = 3334;
   }
   if (State_Automato == 3558){
        Gera_Evento = 15;
        State_Automato = 3340;
   }
   if (State_Automato == 3559){
        Gera_Evento = 15;
        State_Automato = 3563;
   }
   if (State_Automato == 3606){
        Gera_Evento = 15;
        State_Automato = 3576;
   }
   if (State_Automato == 3612){
        Gera_Evento = 15;
        State_Automato = 3591;
   }
   if (State_Automato == 3627){
        Gera_Evento = 15;
        State_Automato = 3565;
   }
   if (State_Automato == 3818){
        Gera_Evento = 15;
        State_Automato = 3680;
   }
   if (State_Automato == 3821){
        Gera_Evento = 15;
        State_Automato = 3705;
   }
   if (State_Automato == 3825){
        Gera_Evento = 15;
        State_Automato = 3687;
   }
   if (State_Automato == 3827){
        Gera_Evento = 15;
        State_Automato = 3697;
   }
   if (State_Automato == 3828){
        Gera_Evento = 15;
        State_Automato = 3708;
   }
   if (State_Automato == 3833){
        Gera_Evento = 15;
        State_Automato = 3747;
   }
   if (State_Automato == 3837){
        Gera_Evento = 15;
        State_Automato = 3754;
   }
   if (State_Automato == 3841){
        Gera_Evento = 15;
        State_Automato = 3753;
   }
   if (State_Automato == 3843){
        Gera_Evento = 15;
        State_Automato = 3759;
   }
   if (State_Automato == 3852){
        Gera_Evento = 15;
        State_Automato = 3782;
   }
   if (State_Automato == 3854){
        Gera_Evento = 15;
        State_Automato = 3786;
   }
   if (State_Automato == 3855){
        Gera_Evento = 15;
        State_Automato = 3811;
   }
   if (State_Automato == 3865){
        Gera_Evento = 15;
        State_Automato = 3679;
   }
   if (State_Automato == 3871){
        Gera_Evento = 15;
        State_Automato = 3715;
   }
   if (State_Automato == 3878){
        Gera_Evento = 15;
        State_Automato = 3723;
   }
   if (State_Automato == 3886){
        Gera_Evento = 15;
        State_Automato = 3746;
   }
   if (State_Automato == 3892){
        Gera_Evento = 15;
        State_Automato = 3772;
   }
   if (State_Automato == 3897){
        Gera_Evento = 15;
        State_Automato = 3781;
   }
   if (State_Automato == 3899){
        Gera_Evento = 15;
        State_Automato = 3791;
   }
   if (State_Automato == 3904){
        Gera_Evento = 15;
        State_Automato = 3808;
   }
   if (State_Automato == 3912){
        Gera_Evento = 15;
        State_Automato = 3780;
   }
   if (State_Automato == 3915){
        Gera_Evento = 15;
        State_Automato = 3797;
   }
   if (State_Automato == 3916){
        Gera_Evento = 15;
        State_Automato = 3800;
   }
   if (State_Automato == 3928){
        Gera_Evento = 15;
        State_Automato = 3736;
   }
   if (State_Automato == 3941){
        Gera_Evento = 15;
        State_Automato = 3779;
   }
   if (State_Automato == 3954){
        Gera_Evento = 15;
        State_Automato = 3944;
   }
   if (State_Automato == 3958){
        Gera_Evento = 15;
        State_Automato = 3948;
   }
   if (State_Automato == 4002){
        Gera_Evento = 15;
        State_Automato = 3977;
   }
   if (State_Automato == 4020){
        Gera_Evento = 15;
        State_Automato = 3976;
   }
   if (State_Automato == 4025){
        Gera_Evento = 15;
        State_Automato = 3986;
   }
   if (State_Automato == 4026){
        Gera_Evento = 15;
        State_Automato = 3991;
   }
   if (State_Automato == 4029){
        Gera_Evento = 15;
        State_Automato = 3983;
   }
   if (State_Automato == 4030){
        Gera_Evento = 15;
        State_Automato = 3990;
   }
   if (State_Automato == 4035){
        Gera_Evento = 15;
        State_Automato = 3996;
   }
   if (State_Automato == 4036){
        Gera_Evento = 15;
        State_Automato = 3998;
   }
   if (State_Automato == 4076){
        Gera_Evento = 15;
        State_Automato = 4053;
   }
   if (State_Automato == 4086){
        Gera_Evento = 15;
        State_Automato = 4057;
   }
   if (State_Automato == 4114){
        Gera_Evento = 15;
        State_Automato = 4095;
   }
   
}

function trans17(){
    if (State_Automato == 10){
        Gera_Evento = 17;
        State_Automato = 14;
   }
   if (State_Automato == 23){
        Gera_Evento = 17;
        State_Automato = 24;
   }
   if (State_Automato == 34){
        Gera_Evento = 17;
        State_Automato = 35;
   }
   if (State_Automato == 37){
        Gera_Evento = 17;
        State_Automato = 39;
   }
   if (State_Automato == 43){
        Gera_Evento = 17;
        State_Automato = 44;
   }
   if (State_Automato == 58){
        Gera_Evento = 17;
        State_Automato = 60;
   }
   if (State_Automato == 65){
        Gera_Evento = 17;
        State_Automato = 66;
   }
   if (State_Automato == 68){
        Gera_Evento = 17;
        State_Automato = 70;
   }
   if (State_Automato == 73){
        Gera_Evento = 17;
        State_Automato = 74;
   }
   if (State_Automato == 78){
        Gera_Evento = 17;
        State_Automato = 79;
   }
   if (State_Automato == 108){
        Gera_Evento = 17;
        State_Automato = 95;
   }
   if (State_Automato == 109){
        Gera_Evento = 17;
        State_Automato = 97;
   }
   if (State_Automato == 135){
        Gera_Evento = 17;
        State_Automato = 136;
   }
   if (State_Automato == 145){
        Gera_Evento = 17;
        State_Automato = 142;
   }
   if (State_Automato == 205){
        Gera_Evento = 17;
        State_Automato = 164;
   }
   if (State_Automato == 261){
        Gera_Evento = 17;
        State_Automato = 184;
   }
   if (State_Automato == 262){
        Gera_Evento = 17;
        State_Automato = 189;
   }
   if (State_Automato == 267){
        Gera_Evento = 17;
        State_Automato = 198;
   }
   if (State_Automato == 268){
        Gera_Evento = 17;
        State_Automato = 200;
   }
   if (State_Automato == 282){
        Gera_Evento = 17;
        State_Automato = 284;
   }
   if (State_Automato == 288){
        Gera_Evento = 17;
        State_Automato = 289;
   }
   if (State_Automato == 291){
        Gera_Evento = 17;
        State_Automato = 293;
   }
   if (State_Automato == 311){
        Gera_Evento = 17;
        State_Automato = 308;
   }
   if (State_Automato == 348){
        Gera_Evento = 17;
        State_Automato = 318;
   }
   if (State_Automato == 433){
        Gera_Evento = 17;
        State_Automato = 420;
   }
   if (State_Automato == 454){
        Gera_Evento = 17;
        State_Automato = 445;
   }
   if (State_Automato == 495){
        Gera_Evento = 17;
        State_Automato = 484;
   }
   if (State_Automato == 503){
        Gera_Evento = 17;
        State_Automato = 488;
   }
   if (State_Automato == 523){
        Gera_Evento = 17;
        State_Automato = 515;
   }
   if (State_Automato == 545){
        Gera_Evento = 17;
        State_Automato = 547;
   }
   if (State_Automato == 643){
        Gera_Evento = 17;
        State_Automato = 565;
   }
   if (State_Automato == 658){
        Gera_Evento = 17;
        State_Automato = 581;
   }
   if (State_Automato == 669){
        Gera_Evento = 17;
        State_Automato = 586;
   }
   if (State_Automato == 670){
        Gera_Evento = 17;
        State_Automato = 591;
   }
   if (State_Automato == 684){
        Gera_Evento = 17;
        State_Automato = 604;
   }
   if (State_Automato == 686){
        Gera_Evento = 17;
        State_Automato = 608;
   }
   if (State_Automato == 687){
        Gera_Evento = 17;
        State_Automato = 634;
   }
   if (State_Automato == 718){
        Gera_Evento = 17;
        State_Automato = 603;
   }
   if (State_Automato == 720){
        Gera_Evento = 17;
        State_Automato = 614;
   }
   if (State_Automato == 725){
        Gera_Evento = 17;
        State_Automato = 628;
   }
   if (State_Automato == 726){
        Gera_Evento = 17;
        State_Automato = 633;
   }
   if (State_Automato == 750){
        Gera_Evento = 17;
        State_Automato = 742;
   }
   if (State_Automato == 762){
        Gera_Evento = 17;
        State_Automato = 764;
   }
   if (State_Automato == 802){
        Gera_Evento = 17;
        State_Automato = 780;
   }
   if (State_Automato == 846){
        Gera_Evento = 17;
        State_Automato = 824;
   }
   if (State_Automato == 848){
        Gera_Evento = 17;
        State_Automato = 828;
   }
   if (State_Automato == 849){
        Gera_Evento = 17;
        State_Automato = 833;
   }
   if (State_Automato == 883){
        Gera_Evento = 17;
        State_Automato = 871;
   }
   if (State_Automato == 892){
        Gera_Evento = 17;
        State_Automato = 888;
   }
   if (State_Automato == 955){
        Gera_Evento = 17;
        State_Automato = 899;
   }
   if (State_Automato == 962){
        Gera_Evento = 17;
        State_Automato = 902;
   }
   if (State_Automato == 964){
        Gera_Evento = 17;
        State_Automato = 905;
   }
   if (State_Automato == 970){
        Gera_Evento = 17;
        State_Automato = 909;
   }
   if (State_Automato == 971){
        Gera_Evento = 17;
        State_Automato = 911;
   }
   if (State_Automato == 972){
        Gera_Evento = 17;
        State_Automato = 913;
   }
   if (State_Automato == 981){
        Gera_Evento = 17;
        State_Automato = 918;
   }
   if (State_Automato == 989){
        Gera_Evento = 17;
        State_Automato = 922;
   }
   if (State_Automato == 990){
        Gera_Evento = 17;
        State_Automato = 925;
   }
   if (State_Automato == 1017){
        Gera_Evento = 17;
        State_Automato = 948;
   }
   if (State_Automato == 1057){
        Gera_Evento = 17;
        State_Automato = 1034;
   }
   if (State_Automato == 1063){
        Gera_Evento = 17;
        State_Automato = 1038;
   }
   if (State_Automato == 1069){
        Gera_Evento = 17;
        State_Automato = 1041;
   }
   if (State_Automato == 1071){
        Gera_Evento = 17;
        State_Automato = 1048;
   }
   if (State_Automato == 1072){
        Gera_Evento = 17;
        State_Automato = 1050;
   }
   if (State_Automato == 1089){
        Gera_Evento = 17;
        State_Automato = 1040;
   }
   if (State_Automato == 1112){
        Gera_Evento = 17;
        State_Automato = 1093;
   }
   if (State_Automato == 1114){
        Gera_Evento = 17;
        State_Automato = 1095;
   }
   if (State_Automato == 1115){
        Gera_Evento = 17;
        State_Automato = 1097;
   }
   if (State_Automato == 1500){
        Gera_Evento = 17;
        State_Automato = 1176;
   }
   if (State_Automato == 1508){
        Gera_Evento = 17;
        State_Automato = 1185;
   }
   if (State_Automato == 1515){
        Gera_Evento = 17;
        State_Automato = 1192;
   }
   if (State_Automato == 1516){
        Gera_Evento = 17;
        State_Automato = 1197;
   }
   if (State_Automato == 1517){
        Gera_Evento = 17;
        State_Automato = 1208;
   }
   if (State_Automato == 1531){
        Gera_Evento = 17;
        State_Automato = 1243;
   }
   if (State_Automato == 1533){
        Gera_Evento = 17;
        State_Automato = 1247;
   }
   if (State_Automato == 1534){
        Gera_Evento = 17;
        State_Automato = 1260;
   }
   if (State_Automato == 1540){
        Gera_Evento = 17;
        State_Automato = 1207;
   }
   if (State_Automato == 1542){
        Gera_Evento = 17;
        State_Automato = 1233;
   }
   if (State_Automato == 1543){
        Gera_Evento = 17;
        State_Automato = 1242;
   }
   if (State_Automato == 1545){
        Gera_Evento = 17;
        State_Automato = 1252;
   }
   if (State_Automato == 1546){
        Gera_Evento = 17;
        State_Automato = 1259;
   }
   if (State_Automato == 1550){
        Gera_Evento = 17;
        State_Automato = 1184;
   }
   if (State_Automato == 1551){
        Gera_Evento = 17;
        State_Automato = 1222;
   }
   if (State_Automato == 1552){
        Gera_Evento = 17;
        State_Automato = 1258;
   }
   if (State_Automato == 1553){
        Gera_Evento = 17;
        State_Automato = 1346;
   }
   if (State_Automato == 1560){
        Gera_Evento = 17;
        State_Automato = 1353;
   }
   if (State_Automato == 1568){
        Gera_Evento = 17;
        State_Automato = 1364;
   }
   if (State_Automato == 1572){
        Gera_Evento = 17;
        State_Automato = 1368;
   }
   if (State_Automato == 1573){
        Gera_Evento = 17;
        State_Automato = 1374;
   }
   if (State_Automato == 1579){
        Gera_Evento = 17;
        State_Automato = 1363;
   }
   if (State_Automato == 1580){
        Gera_Evento = 17;
        State_Automato = 1402;
   }
   if (State_Automato == 1602){
        Gera_Evento = 17;
        State_Automato = 1408;
   }
   if (State_Automato == 1628){
        Gera_Evento = 17;
        State_Automato = 1418;
   }
   if (State_Automato == 1631){
        Gera_Evento = 17;
        State_Automato = 1424;
   }
   if (State_Automato == 1633){
        Gera_Evento = 17;
        State_Automato = 1428;
   }
   if (State_Automato == 1634){
        Gera_Evento = 17;
        State_Automato = 1434;
   }
   if (State_Automato == 1636){
        Gera_Evento = 17;
        State_Automato = 1423;
   }
   if (State_Automato == 1637){
        Gera_Evento = 17;
        State_Automato = 1474;
   }
   if (State_Automato == 1651){
        Gera_Evento = 17;
        State_Automato = 1478;
   }
   if (State_Automato == 1652){
        Gera_Evento = 17;
        State_Automato = 1489;
   }
   if (State_Automato == 1677){
        Gera_Evento = 17;
        State_Automato = 1277;
   }
   if (State_Automato == 1678){
        Gera_Evento = 17;
        State_Automato = 1282;
   }
   if (State_Automato == 1688){
        Gera_Evento = 17;
        State_Automato = 1289;
   }
   if (State_Automato == 1689){
        Gera_Evento = 17;
        State_Automato = 1300;
   }
   if (State_Automato == 1699){
        Gera_Evento = 17;
        State_Automato = 1385;
   }
   if (State_Automato == 1700){
        Gera_Evento = 17;
        State_Automato = 1390;
   }
   if (State_Automato == 1728){
        Gera_Evento = 17;
        State_Automato = 1455;
   }
   if (State_Automato == 1732){
        Gera_Evento = 17;
        State_Automato = 1454;
   }
   if (State_Automato == 1733){
        Gera_Evento = 17;
        State_Automato = 1461;
   }
   if (State_Automato == 1738){
        Gera_Evento = 17;
        State_Automato = 1480;
   }
   if (State_Automato == 1743){
        Gera_Evento = 17;
        State_Automato = 1175;
   }
   if (State_Automato == 1752){
        Gera_Evento = 17;
        State_Automato = 1174;
   }
   if (State_Automato == 1753){
        Gera_Evento = 17;
        State_Automato = 1345;
   }
   if (State_Automato == 1755){
        Gera_Evento = 17;
        State_Automato = 1417;
   }
   if (State_Automato == 1756){
        Gera_Evento = 17;
        State_Automato = 1450;
   }
   if (State_Automato == 1757){
        Gera_Evento = 17;
        State_Automato = 1473;
   }
   if (State_Automato == 1758){
        Gera_Evento = 17;
        State_Automato = 1488;
   }
   if (State_Automato == 1759){
        Gera_Evento = 17;
        State_Automato = 1762;
   }
   if (State_Automato == 1795){
        Gera_Evento = 17;
        State_Automato = 1781;
   }
   if (State_Automato == 1832){
        Gera_Evento = 17;
        State_Automato = 1820;
   }
   if (State_Automato == 1833){
        Gera_Evento = 17;
        State_Automato = 1824;
   }
   if (State_Automato == 1835){
        Gera_Evento = 17;
        State_Automato = 1823;
   }
   if (State_Automato == 1847){
        Gera_Evento = 17;
        State_Automato = 1843;
   }
   if (State_Automato == 1892){
        Gera_Evento = 17;
        State_Automato = 1852;
   }
   if (State_Automato == 1899){
        Gera_Evento = 17;
        State_Automato = 1859;
   }
   if (State_Automato == 1900){
        Gera_Evento = 17;
        State_Automato = 1862;
   }
   if (State_Automato == 1911){
        Gera_Evento = 17;
        State_Automato = 1871;
   }
   if (State_Automato == 1914){
        Gera_Evento = 17;
        State_Automato = 1876;
   }
   if (State_Automato == 1925){
        Gera_Evento = 17;
        State_Automato = 1882;
   }
   if (State_Automato == 1926){
        Gera_Evento = 17;
        State_Automato = 1884;
   }
   if (State_Automato == 1986){
        Gera_Evento = 17;
        State_Automato = 1982;
   }
   if (State_Automato == 1989){
        Gera_Evento = 17;
        State_Automato = 1981;
   }
   if (State_Automato == 1990){
        Gera_Evento = 17;
        State_Automato = 1994;
   }
   if (State_Automato == 2021){
        Gera_Evento = 17;
        State_Automato = 2017;
   }
   if (State_Automato == 2031){
        Gera_Evento = 17;
        State_Automato = 2028;
   }
   if (State_Automato == 2037){
        Gera_Evento = 17;
        State_Automato = 2038;
   }
   if (State_Automato == 2075){
        Gera_Evento = 17;
        State_Automato = 2048;
   }
   if (State_Automato == 2080){
        Gera_Evento = 17;
        State_Automato = 2054;
   }
   if (State_Automato == 2081){
        Gera_Evento = 17;
        State_Automato = 2057;
   }
   if (State_Automato == 2130){
        Gera_Evento = 17;
        State_Automato = 2126;
   }
   if (State_Automato == 2148){
        Gera_Evento = 17;
        State_Automato = 2137;
   }
   if (State_Automato == 2212){
        Gera_Evento = 17;
        State_Automato = 2204;
   }
   if (State_Automato == 2246){
        Gera_Evento = 17;
        State_Automato = 2231;
   }
   if (State_Automato == 2334){
        Gera_Evento = 17;
        State_Automato = 2297;
   }
   if (State_Automato == 2338){
        Gera_Evento = 17;
        State_Automato = 2301;
   }
   if (State_Automato == 2339){
        Gera_Evento = 17;
        State_Automato = 2315;
   }
   if (State_Automato == 2356){
        Gera_Evento = 17;
        State_Automato = 2296;
   }
   if (State_Automato == 2358){
        Gera_Evento = 17;
        State_Automato = 2313;
   }
   if (State_Automato == 2439){
        Gera_Evento = 17;
        State_Automato = 2423;
   }
   if (State_Automato == 2443){
        Gera_Evento = 17;
        State_Automato = 2427;
   }
   if (State_Automato == 2444){
        Gera_Evento = 17;
        State_Automato = 2429;
   }
   if (State_Automato == 2453){
        Gera_Evento = 17;
        State_Automato = 2449;
   }
   if (State_Automato == 2481){
        Gera_Evento = 17;
        State_Automato = 2464;
   }
   if (State_Automato == 2487){
        Gera_Evento = 17;
        State_Automato = 2468;
   }
   if (State_Automato == 2491){
        Gera_Evento = 17;
        State_Automato = 2470;
   }
   if (State_Automato == 2495){
        Gera_Evento = 17;
        State_Automato = 2472;
   }
   if (State_Automato == 2496){
        Gera_Evento = 17;
        State_Automato = 2474;
   }
   if (State_Automato == 2527){
        Gera_Evento = 17;
        State_Automato = 2504;
   }
   if (State_Automato == 2529){
        Gera_Evento = 17;
        State_Automato = 2508;
   }
   if (State_Automato == 2530){
        Gera_Evento = 17;
        State_Automato = 2518;
   }
   if (State_Automato == 2541){
        Gera_Evento = 17;
        State_Automato = 2517;
   }
   if (State_Automato == 2547){
        Gera_Evento = 17;
        State_Automato = 2516;
   }
   if (State_Automato == 2741){
        Gera_Evento = 17;
        State_Automato = 2575;
   }
   if (State_Automato == 2749){
        Gera_Evento = 17;
        State_Automato = 2582;
   }
   if (State_Automato == 2753){
        Gera_Evento = 17;
        State_Automato = 2593;
   }
   if (State_Automato == 2755){
        Gera_Evento = 17;
        State_Automato = 2597;
   }
   if (State_Automato == 2756){
        Gera_Evento = 17;
        State_Automato = 2603;
   }
   if (State_Automato == 2766){
        Gera_Evento = 17;
        State_Automato = 2592;
   }
   if (State_Automato == 2768){
        Gera_Evento = 17;
        State_Automato = 2616;
   }
   if (State_Automato == 2772){
        Gera_Evento = 17;
        State_Automato = 2622;
   }
   if (State_Automato == 2782){
        Gera_Evento = 17;
        State_Automato = 2652;
   }
   if (State_Automato == 2786){
        Gera_Evento = 17;
        State_Automato = 2658;
   }
   if (State_Automato == 2788){
        Gera_Evento = 17;
        State_Automato = 2662;
   }
   if (State_Automato == 2789){
        Gera_Evento = 17;
        State_Automato = 2668;
   }
   if (State_Automato == 2795){
        Gera_Evento = 17;
        State_Automato = 2657;
   }
   if (State_Automato == 2797){
        Gera_Evento = 17;
        State_Automato = 2711;
   }
   if (State_Automato == 2799){
        Gera_Evento = 17;
        State_Automato = 2715;
   }
   if (State_Automato == 2800){
        Gera_Evento = 17;
        State_Automato = 2730;
   }
   if (State_Automato == 2815){
        Gera_Evento = 17;
        State_Automato = 2688;
   }
   if (State_Automato == 2816){
        Gera_Evento = 17;
        State_Automato = 2697;
   }
   if (State_Automato == 2824){
        Gera_Evento = 17;
        State_Automato = 2614;
   }
   if (State_Automato == 2826){
        Gera_Evento = 17;
        State_Automato = 2651;
   }
   if (State_Automato == 2827){
        Gera_Evento = 17;
        State_Automato = 2684;
   }
   if (State_Automato == 2828){
        Gera_Evento = 17;
        State_Automato = 2709;
   }
   if (State_Automato == 2829){
        Gera_Evento = 17;
        State_Automato = 2728;
   }
   if (State_Automato == 2855){
        Gera_Evento = 17;
        State_Automato = 2856;
   }
   if (State_Automato == 2875){
        Gera_Evento = 17;
        State_Automato = 2876;
   }
   if (State_Automato == 2895){
        Gera_Evento = 17;
        State_Automato = 2887;
   }
   if (State_Automato == 2896){
        Gera_Evento = 17;
        State_Automato = 2890;
   }
   if (State_Automato == 2915){
        Gera_Evento = 17;
        State_Automato = 2916;
   }
   if (State_Automato == 2919){
        Gera_Evento = 17;
        State_Automato = 2920;
   }
   if (State_Automato == 2923){
        Gera_Evento = 17;
        State_Automato = 2924;
   }
   if (State_Automato == 2926){
        Gera_Evento = 17;
        State_Automato = 2928;
   }
   if (State_Automato == 2951){
        Gera_Evento = 17;
        State_Automato = 2953;
   }
   if (State_Automato == 2963){
        Gera_Evento = 17;
        State_Automato = 2959;
   }
   if (State_Automato == 3097){
        Gera_Evento = 17;
        State_Automato = 3098;
   }
   if (State_Automato == 3113){
        Gera_Evento = 17;
        State_Automato = 3115;
   }
   if (State_Automato == 3123){
        Gera_Evento = 17;
        State_Automato = 3119;
   }
   if (State_Automato == 3126){
        Gera_Evento = 17;
        State_Automato = 3127;
   }
   if (State_Automato == 3150){
        Gera_Evento = 17;
        State_Automato = 3138;
   }
   if (State_Automato == 3154){
        Gera_Evento = 17;
        State_Automato = 3142;
   }
   if (State_Automato == 3155){
        Gera_Evento = 17;
        State_Automato = 3145;
   }
   if (State_Automato == 3209){
        Gera_Evento = 17;
        State_Automato = 3206;
   }
   if (State_Automato == 3237){
        Gera_Evento = 17;
        State_Automato = 3233;
   }
   if (State_Automato == 3244){
        Gera_Evento = 17;
        State_Automato = 3241;
   }
   if (State_Automato == 3245){
        Gera_Evento = 17;
        State_Automato = 3248;
   }
   if (State_Automato == 3268){
        Gera_Evento = 17;
        State_Automato = 3254;
   }
   if (State_Automato == 3269){
        Gera_Evento = 17;
        State_Automato = 3258;
   }
   if (State_Automato == 3326){
        Gera_Evento = 17;
        State_Automato = 3320;
   }
   if (State_Automato == 3327){
        Gera_Evento = 17;
        State_Automato = 3322;
   }
   if (State_Automato == 3337){
        Gera_Evento = 17;
        State_Automato = 3329;
   }
   if (State_Automato == 3344){
        Gera_Evento = 17;
        State_Automato = 3346;
   }
   if (State_Automato == 3354){
        Gera_Evento = 17;
        State_Automato = 3356;
   }
   if (State_Automato == 3431){
        Gera_Evento = 17;
        State_Automato = 3414;
   }
   if (State_Automato == 3432){
        Gera_Evento = 17;
        State_Automato = 3419;
   }
   if (State_Automato == 3438){
        Gera_Evento = 17;
        State_Automato = 3418;
   }
   if (State_Automato == 3459){
        Gera_Evento = 17;
        State_Automato = 3455;
   }
   if (State_Automato == 3554){
        Gera_Evento = 17;
        State_Automato = 3474;
   }
   if (State_Automato == 3557){
        Gera_Evento = 17;
        State_Automato = 3489;
   }
   if (State_Automato == 3558){
        Gera_Evento = 17;
        State_Automato = 3495;
   }
   if (State_Automato == 3640){
        Gera_Evento = 17;
        State_Automato = 3641;
   }
   if (State_Automato == 3647){
        Gera_Evento = 17;
        State_Automato = 3648;
   }
   if (State_Automato == 3650){
        Gera_Evento = 17;
        State_Automato = 3652;
   }
   if (State_Automato == 3667){
        Gera_Evento = 17;
        State_Automato = 3668;
   }
   if (State_Automato == 3751){
        Gera_Evento = 17;
        State_Automato = 3753;
   }
   if (State_Automato == 3763){
        Gera_Evento = 17;
        State_Automato = 3759;
   }
   if (State_Automato == 3778){
        Gera_Evento = 17;
        State_Automato = 3780;
   }
   if (State_Automato == 3785){
        Gera_Evento = 17;
        State_Automato = 3786;
   }
   if (State_Automato == 3805){
        Gera_Evento = 17;
        State_Automato = 3797;
   }
   if (State_Automato == 3806){
        Gera_Evento = 17;
        State_Automato = 3800;
   }
   if (State_Automato == 3833){
        Gera_Evento = 17;
        State_Automato = 3835;
   }
   if (State_Automato == 3855){
        Gera_Evento = 17;
        State_Automato = 3857;
   }
   if (State_Automato == 3892){
        Gera_Evento = 17;
        State_Automato = 3888;
   }
   if (State_Automato == 4060){
        Gera_Evento = 17;
        State_Automato = 4061;
   }
   if (State_Automato == 4090){
        Gera_Evento = 17;
        State_Automato = 4092;
   }
   if (State_Automato == 4099){
        Gera_Evento = 17;
        State_Automato = 4100;
   }
   if (State_Automato == 4123){
        Gera_Evento = 17;
        State_Automato = 4111;
   }
   if (State_Automato == 4124){
        Gera_Evento = 17;
        State_Automato = 4118;
   }
}