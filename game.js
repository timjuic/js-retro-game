import CanvasManager from "./canvas-manager.js";
import CollisionDetector from "./collision-detector.js";
import settings from "./game-settings.js";
import EventEmmiter from "./helpers/event-emmiter.js";
import InputManager from "./input-manager.js";
import Player from "./player.js";
import BorderManager from "./border-manager.js";

export default class Game {
    constructor() {
        this.settings = settings
        this.events = new EventEmmiter();
        this.canvasManager = new CanvasManager(this);
        this.generateCanvases()
        this.canvasManager.loadContexts();
        this.borderManager = new BorderManager(this, settings.BORDER_SIZE);
        this.inputManager = new InputManager(this);
        this.collisionDetector = new CollisionDetector(this)
        this.level = 1;
        this.player = new Player(this, 'test', 100);
        this.entities = []
        this.player.draw('playerCanvas');
        this.isPaused = false;
        this.loopId = null;

        // Take canvas size into account and adjust entity sizes accordingly
        this.canvasManager.scaleEntities()

        // Generate the level
        // Instantiate and show the player
        // Start the game loop
        console.log(this);
        this.play()
    }


    getInputManager() {
      return this.inputManager;
    }

    getCanvasManager() {
      return this.canvasManager;
    }

    getBorderManager() {
      return this.borderManager;
    }

    generateCanvases() {
        this.canvasManager.generateCanvas('playerCanvas')
      //   this.canvasManager.generateCanvas('enemiesCanvas')
      //   this.canvasManager.generateCanvas('projectileCanvas')
    }

    tick() {
        // TODO
        if (this.isPaused) return

        let playerCtx = this.getCanvasManager().getContext('playerCanvas')

        this.canvasManager.clearCanvases()
        this.borderManager.drawBorders('playerCanvas')
        this.player.updatePosition()
        this.player.draw('playerCanvas')

         
    }

    play() {
        if (this.isPaused || !this.loopId) {
            this.isPaused = false;
            this.loopId = setInterval(() => this.tick(), 2);
        }
    }

    pause() {
        if (!this.isPaused) {
            this.isPaused = true;
            clearInterval(this.loopId)
            this.loopId = null;
        }
    }

    // Resizes game elements to keep proportion to the canvas size
    resizeGameElements() {
      
    }

}