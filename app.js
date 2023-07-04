import Game from "./game.js";

let resumeButton = document.querySelector(".resume-button");


let game = new Game();

resumeButton.addEventListener('click', (e) => {
    game.play();
})