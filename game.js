import CanvasManager from "./canvas-manager.js";
import CollisionDetector from "./collision-detector.js";
import settings from "./game-settings.js";
import EventEmmiter from "./helpers/event-emmiter.js";
import InputManager from "./input-manager.js";
import Player from "./player.js";

export default class Game {
    constructor() {
        this.settings = settings
        this.events = new EventEmmiter();
        this.canvasManager = new CanvasManager(this);
        this.generateCanvases()
        this.canvasManager.loadContexts();
        
        this.inputManager = new InputManager(this);
        this.collisionDetector = new CollisionDetector(this)
        this.level = 1;
        this.player = new Player(this, 'test', 100);
        this.entities = []
        this.player.draw();
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

    generateCanvases() {
        this.canvasManager.generateCanvas('playerCanvas')
      //   this.canvasManager.generateCanvas('enemiesCanvas')
      //   this.canvasManager.generateCanvas('projectileCanvas')
    }

    tick() {
        // TODO
        if (this.isPaused) return

        
        this.canvasManager.clearCanvases()
        this.player.updatePosition()
        this.player.draw()
        // Calculate game logic
        // Update all element positions
        // Draw elements on canvas

         
    }

    play() {
        if (this.isPaused || !this.loopId) {
            this.isPaused = false;
            this.loopId = setInterval(() => this.tick(), 10);
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