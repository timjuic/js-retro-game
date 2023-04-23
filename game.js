import CanvasManager from "./canvas-manager.js";
import EventEmmiter from "./helpers/event-emmiter.js";
import InputManager from "./input-manager.js";

export default class Game {
    constructor() {
        this.events = new EventEmmiter();
        this.canvasManager = new CanvasManager(this);
        this.inputManager = new InputManager(this);
        this.generateCanvases()
        // Generate the level
        // Instantiate and show the player
        // Start the game loop
        console.log(this);
    }


    generateCanvases() {
        this.canvasManager.generateCanvas('playerCanvas')
        this.canvasManager.generateCanvas('enemiesCanvas')
        this.canvasManager.generateCanvas('projectileCanvas')
    }

    tick() {
        // TODO

        // Calculate game logic
        // Update all element positions
        // Draw elements on canvas
    }

    play() {

    }

    pause() {

    }

}