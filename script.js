const html = document.querySelector("html");

const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const playBtn = document.getElementById("start-pause");
const buttons = document.querySelectorAll(".app__card-button");
const startPauseBtn = document.querySelector("#start-pause");
const timer = document.querySelector(".app__card-timer");
const appImage = document.querySelector(".app__image");
const appText = document.querySelector(".app__title");
const startPauseBtnText = document.querySelector("#start-pause span");
const startPauseBtnImg = document.querySelector(".app__card-primary-butto-icon");
const screenTimer = document.querySelector("#timer");

const musicInput = document.querySelector("#alternar-musica");
const music = new Audio("/sons/luna-rise-part-one.mp3");
const playSound = new Audio("/sons/play.wav");
const pauseSound = new Audio("/sons/pause.mp3");
const finishSound = new Audio("/sons/beep.mp3");
music.loop = true;

let elapsedTimerInSeconds = 1500;
let intervaloId = null;
let duracaoFoco = 1500; 
let duracaoDescansoCurto = 300; 
let duracaoDescansoLongo = 900; 

focoBtn.addEventListener("click", () => {
    elapsedTimerInSeconds = 1500;
    showTimer();
    contextoChanger("foco");
    focoBtn.classList.add("active");
})

curtoBtn.addEventListener("click", () => {
    elapsedTimerInSeconds = 300;
    showTimer();
    contextoChanger("descanso-curto");
    curtoBtn.classList.add("active");
})

longoBtn.addEventListener("click", () => {
    elapsedTimerInSeconds = 900;
    showTimer();
    contextoChanger("descanso-longo");
    longoBtn.classList.add("active");
})

function contextoChanger (contexto) {
    buttons.forEach ((btn) => {
        btn.classList.remove("active");
    })
    html.setAttribute("data-contexto", contexto);
    appImage.setAttribute("src", `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            appText.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `    
            break;

        case "descanso-curto":
            appText.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `             
            break;

        case "descanso-longo":
             appText.innerHTML = `
                Hora de voltar à superfície,<br>
                <strong class="app__title-strong">Faça uma pausa longa</strong>
            `            
            break;                
        default:
            break;
    }
}

musicInput.addEventListener("change", () => {
    if(music.paused){
        music.play();
    } else {
        music.pause();
    }
})

const timerDecreaser = () => {
    if(elapsedTimerInSeconds <= 0){
        finishSound.play();
        alert("Acabou o tempo!");
        timerClear();        
        return;
    }
    elapsedTimerInSeconds -= 1;
    showTimer();
}

function startOrPause () {
    if(intervaloId){
        pauseSound.play()
        startPauseBtnText.textContent ="Começar";
        startPauseBtnImg.setAttribute("src", "/imagens/play_arrow.png");        
        timerClear();        
        return;
    }
    startPauseBtnText.textContent ="Pausar";
    startPauseBtnImg.setAttribute("src", "/imagens/pause.png");
    playSound.play();
    intervaloId = setInterval(timerDecreaser, 1000)
}

startPauseBtn.addEventListener("click", startOrPause);

function timerClear() {
    clearInterval(intervaloId);
    intervaloId = null
}

function showTimer() {
    let time = new Date(elapsedTimerInSeconds*1000);
    let formatedTime = time.toLocaleTimeString('pt-br', {minute:"2-digit", second:"2-digit"});
    screenTimer.innerHTML = `${formatedTime}`;
}

showTimer();