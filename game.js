import CanvasManager from "./canvas-manager.js";

export default class Game {
    constructor() {
        this.canvasManager = new CanvasManager();
        this.generateCanvases()
        console.log(this);
    }


    generateCanvases() {
        this.canvasManager.generateCanvas('playerCanvas')
        this.canvasManager.generateCanvas('enemiesCanvas')
        this.canvasManager.generateCanvas('projectileCanvas')
    }

}