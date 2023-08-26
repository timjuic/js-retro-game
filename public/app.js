import Game from "./game.js";
import AssetLoader from "./managers/asset-loader.js";
import StartCanvasManager from "./start-canvas-manager.js";


let resumeButton = document.querySelector(".resume-button");
let playButton = document.querySelector('#play-button');
let startModal = document.querySelector('#start-modal');
let deathModal = document.querySelector('#death-modal');
let tryAgain = document.querySelector('#try-again');
let game;
let startCanvasManager;
let assetLoader;

let start = Date.now();
window.onload = () => {
    let end = Date.now();
    console.log('page loaded in', end - start);
    playButton.innerHTML = 'Loading...'
    assetLoader = new AssetLoader();
    assetLoader.eventEmitter.on('assetsLoaded', () => {
        startCanvasManager = new StartCanvasManager(assetLoader); 
        console.log('assets loaded in', Date.now() - end);
        playButton.disabled = false;
        playButton.innerHTML = 'Play'
    })
       
}

playButton.addEventListener('click', () => {
    startModal.style.display = 'none';
    game = new Game(assetLoader);
})

deathModal.addEventListener('click', () => {
    deathModal.style.display = 'none';
    location.reload();
})

resumeButton.addEventListener('click', (e) => {
    game.play();
})


