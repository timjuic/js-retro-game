import CanvasManager from "./canvas-manager.js";
import EventEmmiter from "./helpers/event-emmiter.js";
import InputManager from "./input-manager.js";
import Player from "./player.js";

export default class Game {
    constructor() {
        this.events = new EventEmmiter();
        this.canvasManager = new CanvasManager(this);
        this.inputManager = new InputManager(this);
        this.generateCanvases()
        this.canvasManager.loadContexts();
        this.level = 1;
        this.player = new Player(this, 'test', 100);
        this.player.draw();
        this.isPaused = false;
        this.loopId = null;
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
        if (this.isPaused) return

        this.canvasManager.clearCanvases()
        // Calculate game logic
        // Update all element positions
        // Draw elements on canvas

         
    }

    play() {
        if (this.isPaused) {
            this.isPaused = false;
            this.loopId = setInterval(() => this.tick(), 20);
        }
    }

    pause() {
        if (!this.isPaused) {
            this.isPaused = true;
            clearInterval(this.loopId)
            this.loopId = null;
        }
    }

}