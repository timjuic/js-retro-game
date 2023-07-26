import Bullet from "./bullet.js";
import Gun from "./gun.js";
import { CircleEntity, RectangleEntity } from "./entity.js";
import gunsData from "./guns-data.js";
import MathUtil from "./helpers/math-util.js";
import InputType from "./enums/input-type.js";

export default class Player extends RectangleEntity {
    constructor(game, nickname, health) {
      let playerCanvas = game.getCanvasManager().getCanvas('playerCanvas')
      let posX = playerCanvas.width / 2;
      let posY = playerCanvas.height / 2;
      let width = 5 / 100 // Percentage of the canvas width. Canvas width is appended later in canvas-manager
      let height = 5 / 100
      let angle = 0
      let velX = 0;
      let velY = 0;
      let color = 'blue'
      let image = new Image()
      image.src = './assets/enemy1.png'
      super(game, posX, posY, width, height, angle, velX, velY, color, image)

      this.nickname = nickname;
      this.speed = 1
      this.health = health;
      this.maxHealth = health;
      this.lastMovedDirection = 1;
      this.addGun();

      this.bulletImg = new Image()
      this.bulletImg.src = './assets/bullet.png'

      this.shootingInterval = null;

      this.game.getEventEmmiter().on('playerInput', (control, pressed) => {
        if (control !== InputType.SHOOT) return;
        this.handleShoot(pressed)
      })
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
        this.gun.saveShotTimestamp();
        let crosshair = this.game.getCrosshair();
        let grainsAmount = this.gun.getGrainsAmount();

        let centerX = this.posX + this.width / 2
        let centerY = this.posY + this.height / 2
        console.log(centerX, centerY);

        if (grainsAmount === 1) {
            createBullet(this, crosshair, centerX, centerY);
        } else {
            for (let i = 0; i < grainsAmount; i++) {
                createBullet(this, crosshair, centerX, centerY);
            }
        }
        
    }

    updatePosition() {
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
        console.log(this.gun);
    }

}


function createBullet(entity, crosshair, centerX, centerY) {
    let deviationX = MathUtil.generateRandomNumber(0, entity.gun.accuracy);
    let deviationY = MathUtil.generateRandomNumber(0, entity.gun.accuracy);
    let directionX = MathUtil.getRandomSign();
    let directionY = MathUtil.getRandomSign();
    let grainTargetPointX = crosshair.aimX + directionX * deviationX;
    let grainTargetPointY = crosshair.aimY + directionY * deviationY;

    let grainAngle = MathUtil.calculateAngle(centerX, centerY, grainTargetPointX, grainTargetPointY);
    let grainDistanceFromCrosshair = MathUtil.calculateDistance(centerX, centerY, grainTargetPointX, grainTargetPointY)
    let grainVectorX = (grainTargetPointX - centerX) / (grainDistanceFromCrosshair / entity.game.settings.BULLET_SPEED_MODIFIER);
    let grainVectorY = (grainTargetPointY - centerY) / (grainDistanceFromCrosshair / entity.game.settings.BULLET_SPEED_MODIFIER);
    let bullet = new Bullet(entity.game, centerX, centerY, 40, 80, grainAngle, grainVectorX, grainVectorY, entity.gun.damage, "blue", entity.bulletImg)
    entity.game.playerBullets.push(bullet);
}