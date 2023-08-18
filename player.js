import Bullet from "./bullet.js";
import Gun from "./gun.js";
import { CircleEntity, RectangleEntity } from "./entity.js";
import gunsData from "./guns-data.js";
import MathUtil from "./helpers/math-util.js";
import InputType from "./enums/input-type.js";
import ParticleManager from "./particles/particle-manager.js";
import HealthBar from "./healthbar.js";

export default class Player extends RectangleEntity {
    constructor(game, nickname, health) {
        let playerCanvas = game.getCanvasManager().getCanvas('playerCanvas')
        let posX = playerCanvas.width / 2;
        let posY = playerCanvas.height / 2;
        let width = 4
        let height = 7
        let angle = 0
        let velX = 0;
        let velY = 0;
        let color = 'blue'
        let image = game.assetLoader.enemyAssets.player;
        super(game, posX, posY, width, height, angle, velX, velY, 0, color, image)

        this.nickname = nickname;
        this.speed = 4 * this.game.canvas.width / 800;
        this.health = health;
        this.maxHealth = health;
        this.lastMovedDirection = 1;
        this.addGun();
        this.bulletImg = this.game.assetLoader.bulletAssets.bullet;

        this.shootingInterval = null;

        this.game.getEventEmmiter().on('playerInput', (control, pressed) => {
            if (control !== InputType.SHOOT) return;
            this.handleShoot(pressed)
        })
        this.healthBar = new HealthBar(game, this);
    }

    handleShoot(pressed) {
        if (!this.gun) {
            console.log("You cant shoot, you dont have a gun!");
            return;
        }

        if (this.gun.isAutomatic()) {
            if (pressed) this.startShooting();
            else this.stopShooting();
        } else {
            if (this.gun.canShoot()) this.shoot();
        }
    }

    startShooting() {
        if (this.shootingInterval !== null) return;
        if (this.game.isPaused) return;

        if (this.gun.canShoot()) this.shoot(); // Initial shot
        this.shootingInterval = setInterval(() => {
            this.shoot();
        }, this.gun.getFireRate());
    }

    stopShooting() {
        clearInterval(this.shootingInterval);
        this.shootingInterval = null;
    }

    shoot() {
        if (this.isDead()) return;
        this.gun.saveShotTimestamp();
        let crosshair = this.game.getCrosshair();
        let grainsAmount = this.gun.getGrainsAmount();

        let centerX = this.posX + this.width / 2
        let centerY = this.posY + this.height / 2

        this.game.soundManager.playSound('blaster.wav')
        if (grainsAmount === 1) {
            this.createBullet(this, crosshair, centerX, centerY);
        } else {
            for (let i = 0; i < grainsAmount; i++) {
                this.createBullet(this, crosshair, centerX, centerY);
            }
        }
    }

    updatePosition() {
        if (this.isDead()) return;
        let inputManager = this.game.getInputManager()
        let collisionDetector = this.game.collisionDetector

        if (inputManager.pressedControls['moveUp']) {
            if (!collisionDetector.collidesWithTopBorder(this, -this.speed)) this.posY -= this.speed;
        }
        if (inputManager.pressedControls['moveRight']) {
            if (!collisionDetector.collidesWithRightBorder(this, this.speed)) {
                this.posX += this.speed;
                this.lastMovedDirection = 1;
            }
        }
        if (inputManager.pressedControls['moveDown']) {
            if (!collisionDetector.collidesWithBottomBorder(this, this.speed)) this.posY += this.speed;
        }
        if (inputManager.pressedControls['moveLeft']) {
            if (!collisionDetector.collidesWithLeftBorder(this, -this.speed)) {
                this.posX -= this.speed;
                this.lastMovedDirection = -1;
            }
        }
    }

    addGun(gun) {
        this.gun = gunsData[0]
        this.gun.addToGame(this.game);
    }

    onDeath() {
        let particleManager = new ParticleManager(this.game, this, 0.4, Math.round(this.game.settings.PARTICLE_AMOUNT_MODIFIER / this.width / 4), this.width / 2);
        this.game.particleManagers.push(particleManager)
        particleManager.createParticleExplosion();
        this.game.player.opacity = 0;

        setTimeout(() => {
            this.game.pause();
            this.game.showDeathScreen();    
        }, 2000);
    };


    isDead() {
        return this.health <= 0;
    }

    createBullet(entity, crosshair, centerX, centerY) {
        let deviationX = MathUtil.generateRandomInteger(0, entity.gun.accuracy);
        let deviationY = MathUtil.generateRandomInteger(0, entity.gun.accuracy);
        let directionX = MathUtil.getRandomSign();
        let directionY = MathUtil.getRandomSign();
        let playerDistanceFromCrosshair = MathUtil.calculateDistance(centerX, centerY, crosshair.aimX, crosshair.aimY);
        let grainTargetPointX = crosshair.aimX + directionX * deviationX * playerDistanceFromCrosshair / 1000;
        let grainTargetPointY = crosshair.aimY + directionY * deviationY * playerDistanceFromCrosshair / 1000;
    
    
        let grainAngle = MathUtil.calculateAngle(centerX, centerY, grainTargetPointX, grainTargetPointY);
        let grainDistanceFromCrosshair = MathUtil.calculateDistance(centerX, centerY, grainTargetPointX, grainTargetPointY)
        let grainVectorX = (grainTargetPointX - centerX) / (grainDistanceFromCrosshair / entity.game.settings.BULLET_SPEED_MODIFIER);
        let grainVectorY = (grainTargetPointY - centerY) / (grainDistanceFromCrosshair / entity.game.settings.BULLET_SPEED_MODIFIER);
    
        let bullet = new Bullet(entity.game, centerX - 7, centerY - 7, 1, 1, grainAngle, grainVectorX, grainVectorY, 0, entity.gun.damage, entity.gun.piercing, entity.gun.knockbackMultiplier, "blue", entity.bulletImg)
        entity.game.playerBullets.push(bullet);
    }

    draw() {
        super.draw();
        this.healthBar.draw();
    }
}
