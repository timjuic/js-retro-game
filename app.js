import Game from "./game.js";

let resumeButton = document.querySelector(".resume-button");
let playButton = document.querySelector('#play-button');
let startModal = document.querySelector('#start-modal');
let deathModal = document.querySelector('#death-modal');
let tryAgain = document.querySelector('#try-again');
let game;

playButton.addEventListener('click', () => {
    startModal.style.display = 'none';
    game = new Game();
})

deathModal.addEventListener('click', () => {
    deathModal.style.display = 'none';
    location.reload();
})


resumeButton.addEventListener('click', (e) => {
    game.play();
})