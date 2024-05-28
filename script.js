const htmlContext = document.querySelector("html");
const focusBtn = document.querySelector(".app__card-button--foco");
const shortBtn = document.querySelector(".app__card-button--curto");
const longBtn = document.querySelector(".app__card-button--longo");
const img = document.querySelector(".app__image");
const appTitle = document.querySelector(".app__title");
const listButtons = [longBtn, shortBtn, focusBtn];
const musicBtn = document.querySelector("#alternar-musica");
const musics = new Audio("/sons/luna-rise-part-one.mp3");
const btnStart = document.querySelector("#start-pause");
const btnStartImage = document.querySelector(".app__card-primary-butto-icon");
const timeClass = document.querySelector(".app__card-timer-seconds");
const songBeep = new Audio("/sons/beep.mp3");
const songPause = new Audio("/sons/pause.mp3");
const songPlay = new Audio("/sons/play.wav");
let isBtnActivity = false;
let intervalId;
musics.loop = true;
let timeCurrentSeconds = 5



const initcountTimer = () => {
    intervalId = setInterval(() => {
        timeCurrentSeconds -= 1;
        console.log(timeCurrentSeconds)
        timeClass.innerHTML = `${timeCurrentSeconds}`
        if (timeCurrentSeconds <= 0) {
            clearInterval(intervalId);
            songBeep.play();
        }
    }, 1000)
}

const pauseBtn = () => {
    btnStartImage.setAttribute("src", "./imagens/play_arrow.png");
    clearInterval(intervalId);
    timeCurrentSeconds = 5
    isBtnActivity = !isBtnActivity;
}

const playBtn = () => {
    btnStartImage.setAttribute("src", "./imagens/pause.png");
    initcountTimer();
    isBtnActivity = !isBtnActivity;
}


const updateStateButtons = () => {
    if (isBtnActivity) {
        pauseBtn()
        songPause.play()
        songBeep.pause()
    } else {
        playBtn()
        songPlay.play()
    }
};


btnStart.addEventListener("click", updateStateButtons)
musicBtn.addEventListener('change', (e) => {
    if (e.target.checked) {
        musics.currentTime = 0;
        musics.play();
    } else {
        musics.pause();
    }
}
)

focusBtn.addEventListener("click", () => {
    updateStates(focusBtn, "foco");
})

shortBtn.addEventListener("click", () => {
    updateStates(shortBtn, "descanso-curto")
})

longBtn.addEventListener("click", () => {
    updateStates(longBtn, "descanso-longo")
})



function updateStates(button, contexto) {
    htmlContext.setAttribute("data-contexto", contexto);
    img.setAttribute("src", `./imagens/${contexto}.png`);
    listButtons.forEach((btn) => {
        if (btn === button) {
            button.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    })

    switch (contexto) {
        case "foco":
            appTitle.innerHTML = `
            Hora de focar,<br>
            <strong class="app__title-strong">Mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto":
            appTitle.innerHTML = `
            Descanso curto,<br>
            <strong class="app__title-strong">Calma.</strong>
            `;
            break;
        case "descanso-longo":
            appTitle.innerHTML = `
            Hora de voltar para superfice,<br>
            <strong class="app__title-strong">Respira.</strong>
            `;
            break;
        default:
            break;
    }
}
