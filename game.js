import CanvasManager from "./canvas-manager.js";
import CollisionDetector from "./collision-detector.js";
import settings from "./game-settings.js";
import EventEmmiter from "./helpers/event-emmiter.js";
import InputManager from "./input-manager.js";
import Player from "./player.js";
import BorderManager from "./border-manager.js";
import CrosshairManager from "./crosshair-manager.js";
import InputType from "./enums/input-type.js";
import Wave from "./corner-wave.js";
import WaveType from "./enums/wave-type.js";
import CornerWave from "./corner-wave.js";
import CornerWaveSize from "./enums/corner-wave-size.js";
import SideWave from "./side-wave.js";

const pauseModal = document.querySelector(".pause-modal");


export default class Game {
    constructor() {
        this.settings = settings
        this.events = new EventEmmiter();
        this.canvasManager = new CanvasManager(this);
        this.generateCanvases()
        this.canvasManager.loadContexts();
        this.borderManager = new BorderManager(this, settings.BORDER_SIZE);
        this.crosshairManager = new CrosshairManager(this)
        this.inputManager = new InputManager(this);
        this.collisionDetector = new CollisionDetector(this)
        this.level = 1;
        this.player = new Player(this, 'test', 100);
        this.enemies = []
        this.playerBullets = []
        this.enemyBullets = []
        this.player.draw('playerCanvas');
        this.isPaused = false;
        this.loopId = null;

        // Take canvas size into account and adjust entity sizes accordingly
        this.canvasManager.scaleEntities()

        setTimeout(() => {
          // new CornerWave(this, CornerWaveSize.BIG);
          new SideWave(this, 3);
        }, 1000);

        // Generate the level
        // Instantiate and show the player
        // Start the game loop
        this.play()
        this.activatePauseListener();
    }


    getInputManager() {
      return this.inputManager;
    }
    getEventEmmiter() {
      return this.events;
    }
    getCanvasManager() {
      return this.canvasManager;
    }
    getBorderManager() {
      return this.borderManager;
    }
    getCrosshair() {
      return this.crosshairManager;
    }
    getCollisionDetector() {
      return this.collisionDetector;
    }


    generateCanvases() {
        this.canvasManager.generateCanvas('playerCanvas')
        this.canvasManager.generateCanvas('crosshairCanvas')
      //   this.canvasManager.generateCanvas('enemiesCanvas')
        this.canvasManager.generateCanvas('projectileCanvas')
    }

    tick() {
        // TODO
        if (this.isPaused) return

        let playerCtx = this.getCanvasManager().getContext('playerCanvas')

        this.canvasManager.clearCanvases()
        this.borderManager.drawBorders('playerCanvas')
        this.player.updatePosition()
        this.enemies.forEach(enemy => enemy.move())

        this.drawGameElements();
    }

    drawGameElements() {
      this.player.draw('playerCanvas')
      this.enemies.forEach(enemy => enemy.draw('playerCanvas'))

      this.playerBullets.forEach((bullet, i) => {
        bullet.updatePosition()
        if (!this.collisionDetector.isInsideCanvas(bullet)) {
            this.playerBullets.splice(i, 1);
            return;
        }
        bullet.draw("projectileCanvas");
      })
    }

    activatePauseListener() {
      this.getEventEmmiter().on('playerInput', (control, pressed) => {
        if (control !== InputType.TOGGLEPAUSE) return;
        if (!pressed) return;
        this.togglePause();
      })
    }

    togglePause() {
      if (this.isPaused || !this.loopId) {
        this.play();
      } else {
        this.pause();
      }
    }

    play() {
        if (this.isPaused || !this.loopId) {
            this.isPaused = false;
            pauseModal.style.display = 'none'
            this.loopId = setInterval(() => this.tick(), 2);
        }
    }

    pause() {
        if (!this.isPaused) {
            this.isPaused = true;
            clearInterval(this.loopId)
            this.loopId = null;
            pauseModal.style.display = 'flex'
        }
    }
}