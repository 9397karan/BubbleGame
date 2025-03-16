let gameDiv = document.getElementById("game-div");
let timeDiv = document.getElementById("time");
let mainBtn = document.getElementById("mainBtn");
let isOpen = true;
let container = document.getElementById("container");
let overlay = document.getElementById("overlay");
let timer = 10;
let score = 0;
let target = 0;
let bubbleSound=new Audio('bubble.mp3')
let gameStartSound=new Audio('start.wav')
let gameOverSound=new Audio('gameover.mp3')
let backgroundSound=new Audio('mixkit-kidding-around-9.mp3')
var audio = document.getElementById("myaudio");
backgroundSound.play()  
audio.volume = 0.4;

function startGame() {
  gameStartSound.play()
    loadBoard();
    timer = 10;
    score = 0;
    target = 0;
    isOpen = false;
    generateTarget();
    openMenuAndClose();
    timeDisplay();
}
mainBtn.addEventListener('click', startGame);

function openMenuAndClose() {
    if (isOpen) {
        container.style.display = 'none';
        overlay.style.display = 'block';
        document.getElementById('scoreTitle').textContent = `Score: ${score}`;
    } else {
        overlay.style.display = 'none';
        container.style.display = 'block';
    }
}

function loadBoard() {
    gameDiv.innerHTML = ""; 
    for (let i = 0; i < 50; i++) {
        let btn = document.createElement("button");
        btn.classList.add("game-btn");
        let text = Math.floor(Math.random() * 10);
        btn.textContent = text;
        gameDiv.appendChild(btn);
    }
}

function generateTarget() {
    target = Math.floor(Math.random() * 10);
    console.log(target);
    document.getElementById("target").innerHTML = `Target: ${target}`;
    timer = 10; 
}

function timeDisplay() {
    let id = setInterval(function () {
        if (timer > 0) {
            timeDiv.textContent = `Time left: ${timer}s`;
            timeDiv.style.color = timer < 5 ? "red" : "white";
            timer--;
        } else {
            clearInterval(id);
            timeDiv.textContent = `Time's up`;
            document.getElementById("target").innerHTML = "Game Over";
            isOpen = true;
            setTimeout(()=>{
              openMenuAndClose()
              gameOverSound.play()
            }, 2000);
        }
    }, 1000);
}

gameDiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("game-btn")) {
        let selectedBtn = e.target.textContent;
        bubbleSound.play()
        checkResult(selectedBtn);
    }
});

function checkResult(num) {
    if (parseInt(num) === target) {  
        score += 10;
        document.getElementById('score').textContent = `Total Score: ${score}`;
        generateTarget();
        loadBoard()
    }else{
      isOpen=true
      openMenuAndClose()
      gameOverSound.play()
    }
}
