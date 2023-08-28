import Game from "./game.js";
import AssetLoader from "./managers/asset-loader.js";
import StartCanvasManager from "./start-canvas-manager.js";


let resumeButton = document.querySelector(".resume-button");
let playButton = document.querySelector('#play-button');
let landingPage = document.querySelector('#landing-page');
let deathModal = document.querySelector('#death-modal');
let howToPlayBtn = document.querySelector('#how-to-play-btn');
let howToPlayModal = document.querySelector('#how-to-play-modal');
let closeHowToPlayBtn = document.querySelector('#close-how-to-play-btn')
let game;
let startCanvasManager;
let assetLoader;

let start = Date.now();
window.onload = () => {
    let end = Date.now();
    console.log('page loaded in', end - start);
    playButton.innerHTML = 'Loading Assets...'
    assetLoader = new AssetLoader();
    assetLoader.eventEmitter.on('assetsLoaded', () => {
        startCanvasManager = new StartCanvasManager(assetLoader); 
        console.log('assets loaded in', Date.now() - end);
        playButton.disabled = false;
        playButton.innerHTML = 'Play'
    })
       
}

playButton.addEventListener('click', () => {
    landingPage.style.display = 'none';
    game = new Game(assetLoader);
})

howToPlayBtn.addEventListener('click', () => {
    howToPlayModal.style.display = 'block';
})

closeHowToPlayBtn.addEventListener('click', () => {
    howToPlayModal.style.display = 'none';
})

deathModal.addEventListener('click', () => {
    deathModal.style.display = 'none';
    location.reload();
})

resumeButton.addEventListener('click', (e) => {
    game.play();
})




