import CanvasManager from "./canvas-manager.js";
import EventEmmiter from "./event-emmiter.js";
import InputManager from "./input-manager.js";

export default class Game {
    constructor() {
        this.events = new EventEmmiter();
        this.canvasManager = new CanvasManager(this);
        this.inputManager = new InputManager(this);
        this.generateCanvases()
        console.log(this);
    }


    generateCanvases() {
        this.canvasManager.generateCanvas('playerCanvas')
        this.canvasManager.generateCanvas('enemiesCanvas')
        this.canvasManager.generateCanvas('projectileCanvas')
    }

}