import CanvasManager from "./managers/canvas-manager.js";
import CollisionDetector from "./collision-detector.js";
import settings from "./game-settings.js";
import EventEmmiter from "./helpers/event-emmiter.js";
import InputManager from "./managers/input-manager.js";
import Player from "./player.js";
import BorderManager from "./managers/border-manager.js";
import CrosshairManager from "./managers/crosshair-manager.js";
import InputType from "./enums/input-type.js";
import RandomWave from "./waves/random-wave.js"
import SquareWave from "./waves/square-wave.js"
import CornerWave from "./waves/corner-wave.js";
import CornerWaveSize from "./enums/corner-wave-sizes.js";
import BasicEnemy from "./enemies/basic-enemy.js";
import BuffEnemy from "./enemies/buff-enemy.js";
import AssetLoader from "./managers/asset-loader.js";
import SpawnerEnemy from "./enemies/spawner-enemy.js";
import SpeedyEnemy from "./enemies/speedy-enemy.js";
import PufPufEnemy from "./enemies/pufpuf-enemy.js";
import KamikazeEnemy from "./enemies/kamikaze-enemy.js";
import MathUtil from "./helpers/math-util.js";
import LineWave from "./waves/line-wave.js";
import ShieldedEnemy from "./enemies/shielded-enemy.js";
import TeleporterEnemy from "./enemies/teleporter-enemy.js";
import ShooterEnemy from "./enemies/shooting-enemy.js";
import LevelManager from "./managers/levels-manager.js";
import levelsData from "./levels-data.js";
import SoundManager from "./managers/sound-manager.js";
import StatsManager from "./managers/stats-manager.js";

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
        this.levelManager = new LevelManager(this, levelsData)
        this.soundManager = new SoundManager(this);
        this.statsManager = new StatsManager(this);
        this.canvas = this.canvasManager.getCanvas('playerCanvas');
        this.player = new Player(this, 'test', 500);
        this.enemies = []
        this.playerBullets = []
        this.enemyBullets = []
        this.particleManagers = [];
        this.particles = [];
        this.explosions = [];
        this.player.draw('playerCanvas');
        this.isPaused = false;
        this.loopId = null;
        this.ticksElapsed = 0;

        // Take canvas size into account and adjust entity sizes accordingly
        this.canvasManager.scaleEntities()

        this.levelManager.startCurrentLevel();


        this.play()
        this.activatePauseListener();
    }

    getAssetManager() {
        return this.assetLoader;
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
    }

    tick() {
        if (this.isPaused) return

        this.levelManager.checkForUpcomingWaves();

        this.canvasManager.clearCanvases()
        this.borderManager.drawBorders('playerCanvas')
        this.player.updatePosition();
        this.playerBullets.forEach(bullet => bullet.updatePosition());
        this.enemyBullets.forEach(bullet => bullet.updatePosition());
        this.enemies.forEach(enemy => enemy.move())
        this.enemies.forEach(enemy => {
            if (enemy.canShoot) enemy.runShootAbility();
        })
        this.runHitDetection()

        this.explosions.forEach(explosion => explosion.update())
        this.particleManagers.forEach(pm => pm.particles.forEach(particle => {
            particle.updatePosition();
        }));
        this.particles.forEach(particle => particle.update())

        this.drawGameElements();
        this.ticksElapsed++;
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

        this.enemyBullets.forEach((bullet, i) => {
            if (!this.collisionDetector.isInsideCanvas(bullet)) {
                this.enemyBullets.splice(i, 1);
                return;
            }
            bullet.draw("projectileCanvas");
        })

        this.explosions.forEach(explosion => explosion.draw(this.canvasManager.contexts.projectileCanvas))
        this.particles.forEach(particle => particle.draw(this.canvasManager.contexts.playerCanvas))

        this.particleManagers.forEach(pm => {
            pm.particles.forEach(particle => particle.draw('playerCanvas'));
        })
        this.statsManager.displaySurvivedTime()
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
            this.loopId = setInterval(() => this.tick(), this.settings.TICK_DURATION_MS);
            if (!this.statsManager.timer.isStarted()) {
                this.statsManager.startTimer();
            } else {
                this.statsManager.unpauseTimer();
            }
        }
    }

    pause() {
        if (!this.isPaused) {
            this.isPaused = true;
            clearInterval(this.loopId)
            this.loopId = null;
            pauseModal.style.display = 'flex'
            this.statsManager.pauseTimer();
        }
    }

    runHitDetection() {
        // Collision with enemies
        this.enemies.forEach((enemy, i) => {
            if (this.player.isDead()) return;
            if (this.getCollisionDetector().collidesWithEntity(this.player, enemy)) {
                if (enemy.damage < this.player.health) {
                    this.player.health -= enemy.damage;
                    this.player.isBeingHit = true;
                    enemy.onDeath();
                    this.enemies.splice(i, 1)
                } else {
                    if (!this.player.isDead()) {
                        this.player.health = 0;
                        this.player.onDeath()
                    }
                }
            }
        })

        // Collision with enemy bullets
        this.enemyBullets.forEach((bullet, i) => {
            if (this.player.isDead()) return;
            if (this.getCollisionDetector().collidesWithEntity(bullet, this.player)) {
                if (this.player.health > bullet.damage) {
                    this.player.health -= bullet.damage;
                    this.player.isBeingHit = true;
                    this.enemyBullets.splice(i, 1);
                } else {
                    this.player.health = 0;
                    this.player.onDeath();
                }
            }
        })

        // Collisions with explosions
        this.explosions.forEach((explosion, i) => {
            if (this.player.isDead()) return;
            if (explosion.didDamageToPlayer()) return;
            if (this.getCollisionDetector().collidesWidthCircularEntity(this.player, explosion)) {
                explosion.playerAffected = true;
                if (this.player.health > explosion.damage) {
                    this.player.health -= explosion.damage;
                    this.player.isBeingHit = true;
                } else {
                    this.player.health = 0;
                    this.player.onDeath();
                }
            }
        })

        // collision player bullets with enemies
        this.playerBullets.forEach((bullet, i) => {
            this.enemies.forEach((enemy, j) => {
                if (this.getCollisionDetector().collidesWithEntity(bullet, enemy)) {
                    this.handleEnemyHit(bullet, enemy, i, j)
                }
            })
        })
    }

    handleEnemyHit(bullet, enemy, i, j) {
        if (bullet.damage >= enemy.health) {
            enemy.health = 0;
            enemy.onDeath();
            this.enemies.splice(j, 1);
            if (bullet.piercing) {
                bullet.damage -= enemy.health;
            } else this.playerBullets.splice(i, 1);
        } else {
            this.playerBullets.splice(i, 1);
            let successfullyDamaged = enemy.onDamaged(bullet);
            if (!successfullyDamaged) return;
            enemy.health -= bullet.damage;
            enemy.isBeingHit = true;

            let tries = 5;
            let newEnemyPosX, newEnemyPosY, validPosition = false;
            let enemyDiameter = MathUtil.calculateDiameterOfEntity(enemy);
            for (let i = 1; i <= tries; i++) {
                newEnemyPosX = enemy.posX + bullet.velX * bullet.knockbackMultiplier / enemyDiameter / i * this.canvas.width / 100;
                newEnemyPosY = enemy.posY + bullet.velY * bullet.knockbackMultiplier / enemyDiameter / i * this.canvas.width / 100;
                if (this.collidesWithAnEnemy({ posX: newEnemyPosX, posY: newEnemyPosY, width: enemy.width, height: enemy.height })) {
                    continue;
                }
                if (!this.getCollisionDetector().isInsideCanvasBorders({ posX: newEnemyPosX, posY: newEnemyPosY, width: enemy.width, height: enemy.height })) {
                    continue;
                }
                validPosition = true;
            }


            if (!validPosition) return;
            enemy.posX = newEnemyPosX;
            enemy.posY = newEnemyPosY
        }
    }

    collidesWithAnEnemy(entity) {
        for (let enemy of this.enemies) {
            if (this.getCollisionDetector().collidesWithEntity(entity, enemy)) return true;
        }
        return false;
    }


    
    showDeathScreen() {
        // Update the time survived in the modal
        const timeElement = document.querySelector("#survival-time span");
        timeElement.textContent = this.statsManager.getTimeSurvivedFormatted();
    
        // Display the modal
        const modal = document.getElementById("death-modal");
        modal.style.display = "block";
    }
    
    closeModal() {
        const modal = document.getElementById("death-modal");
        modal.style.display = "none";
        // Possibly restart the game or navigate to main menu
    }
    
    
    
    
    
    
}