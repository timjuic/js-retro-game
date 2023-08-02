import CanvasManager from "./canvas-manager.js";
import CollisionDetector from "./collision-detector.js";
import settings from "./game-settings.js";
import EventEmmiter from "./helpers/event-emmiter.js";
import InputManager from "./input-manager.js";
import Player from "./player.js";
import BorderManager from "./border-manager.js";
import CrosshairManager from "./crosshair-manager.js";
import InputType from "./enums/input-type.js";
import CornerWave from "./waves/corner-wave.js";
import CornerWaveSize from "./enums/corner-wave-size.js";
import BasicEnemy from "./enemies/basic-enemy.js";
import AssetLoader from "./asset-loader.js";

const pauseModal = document.querySelector(".pause-modal");


export default class Game {
    constructor() {
        this.settings = settings
        this.events = new EventEmmiter();
        this.canvasManager = new CanvasManager(this);
        this.generateCanvases()
        this.canvasManager.loadContexts();
        this.assetLoader = new AssetLoader();
        this.borderManager = new BorderManager(this, settings.BORDER_SIZE);
        this.crosshairManager = new CrosshairManager(this)
        this.inputManager = new InputManager(this);
        this.collisionDetector = new CollisionDetector(this)
        this.level = 1;
        this.player = new Player(this, 'test', 100);
        this.enemies = []
        this.playerBullets = []
        this.enemyBullets = []
        this.particleManagers = [];
        this.player.draw('playerCanvas');
        this.isPaused = false;
        this.loopId = null;

        // Take canvas size into account and adjust entity sizes accordingly
        this.canvasManager.scaleEntities()

        setTimeout(() => {
          // new CornerWave(this, CornerWaveSize.BIG);
          // new SideWave(this, 3, Basic2Enemy);
          // new SideWave(this, 10, BasicEnemy);
          // new SideWave(this, 3, BasicEnemy);

          new CornerWave(this, 3, BasicEnemy);
        }, 1000);


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
      this.canvasManager.generateCanvas('projectileCanvas')
      this.canvasManager.generateCanvas('playerCanvas')
      this.canvasManager.generateCanvas('crosshairCanvas')
      //   this.canvasManager.generateCanvas('enemiesCanvas')
        
    }

    tick() {
        // TODO
        if (this.isPaused) return

        let playerCtx = this.getCanvasManager().getContext('playerCanvas')

        this.canvasManager.clearCanvases()
        this.borderManager.drawBorders('playerCanvas')
        this.player.updatePosition();
        this.playerBullets.forEach(bullet => bullet.updatePosition());
        this.enemies.forEach(enemy => enemy.move())
        this.particleManagers.forEach(pm => pm.particles.forEach(particle => {
          particle.updatePosition();
        }));
        this.runHitDetection()

        this.drawGameElements();
    }

    drawGameElements() {
      this.player.draw('playerCanvas')
      this.enemies.forEach(enemy => enemy.draw('playerCanvas'))

      this.playerBullets.forEach((bullet, i) => {
        if (!this.collisionDetector.isInsideCanvas(bullet)) {
            this.playerBullets.splice(i, 1);
            return;
        }
        bullet.draw("projectileCanvas");
      })

      // console.log(this.particles);
      this.particleManagers.forEach(pm => {
        pm.particles.forEach(particle => particle.draw('playerCanvas'));
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
            this.loopId = setInterval(() => this.tick(), 16);
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

    runHitDetection() {
        this.enemies.forEach((enemy, i) => {
          if (this.getCollisionDetector().collidesWithEntity(this.player, enemy)) {
            this.enemies.splice(i, 1)
          }
        })

        this.playerBullets.forEach((bullet, i) => {
          // console.log(bullet.posX, bullet.posY, bullet.angle);
          this.enemies.forEach((enemy, j) => {
            
            if (this.getCollisionDetector().collidesWithEntityRotated(bullet, enemy)) {
              // Implement ability for bullet to kill multiple enemies if its strong enough
              
              if (bullet.damage >= enemy.health) {
                this.enemies.splice(j, 1);
                enemy.particleDeath()
                if (bullet.piercing) {
                  bullet.damage -= enemy.health;
                } else this.playerBullets.splice(i, 1);
              } else {
                enemy.health -= bullet.damage;
                this.playerBullets.splice(i, 1);
                enemy.isBeingHit = true;
                let tries = 5;
                let newEnemyPosX, newEnemyPosY, validPosition = false;
                for (let i = 1; i <= tries; i++) {
                  newEnemyPosX = enemy.posX + bullet.velX * bullet.knockbackMultiplier / i;
                  newEnemyPosY = enemy.posY + bullet.velY * bullet.knockbackMultiplier / i;
                  if (this.collidesWithAnEnemy({ posX: newEnemyPosX, posY: newEnemyPosY, width: enemy.width, height: enemy.height })) {
                    continue;
                  }
                  if (!this.getCollisionDetector().isInsideCanvasBorders({ posX: newEnemyPosX, posY: newEnemyPosY, width: enemy.width, height: enemy.height }))  {
                    continue;
                  }
                  validPosition = true;
                }
                
                
                if (!validPosition) return;
                enemy.posX = newEnemyPosX;
                enemy.posY = newEnemyPosY
              }
            }
          })
        })
    }

    collidesWithAnEnemy(entity) {
      for (let enemy of this.enemies) {
        if (this.getCollisionDetector().collidesWithEntity(entity, enemy)) return true;
      }
      return false;
    }
}