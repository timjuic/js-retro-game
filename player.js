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
      let width = 5 * game.settings.OBJECT_SCALE_FACTOR;
      let height = 5 * game.settings.OBJECT_SCALE_FACTOR;
      let angle = 0
      let velX = 0;
      let velY = 0;
      let color = 'blue'
      super(game, posX, posY, width, height, angle, velX, velY, color)

      this.nickname = nickname;
      this.speed = 2
      this.health = health;
      this.maxHealth = health;
      this.addGun();

      this.bulletImg = new Image()
      this.bulletImg.src = './assets/bullet.png'

      this.shootingInterval = null;

      this.game.getEventEmmiter().on('playerInput', (control, pressed) => {
        // Handle shooting depending on current gun
        console.log(control, pressed);
        if (control !== InputType.SHOOT) return;
        this.handleShoot(pressed)
        // this.shoot()
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
        let angle = MathUtil.calculateAngle(this.posX, this.posY, crosshair.aimX, crosshair.aimY)
        let distanceFromCrosshair = MathUtil.calculateDistance(this.posX, this.posY, crosshair.aimX, crosshair.aimY)
        let bulletVectorX = (crosshair.aimX - this.posX) / (distanceFromCrosshair / this.game.settings.BULLET_SPEED_MODIFIER);
        let bulletVectorY = (crosshair.aimY - this.posY) / (distanceFromCrosshair / this.game.settings.BULLET_SPEED_MODIFIER);
        
        let bullet = new RectangleEntity(this.game, this.posX, this.posY, 40, 80, angle, bulletVectorX, bulletVectorY, "blue", this.bulletImg)
        this.game.playerBullets.push(bullet);
    }

    updatePosition() {
        let inputManager = this.game.getInputManager()
         let collisionDetector = this.game.collisionDetector

        if (inputManager.pressedControls['moveUp']) {
            if (!collisionDetector.collidesWithTopBorder(this, -this.speed)) this.posY -= this.speed;
        }
        if (inputManager.pressedControls['moveRight']) {
            if (!collisionDetector.collidesWithRightBorder(this, this.speed)) this.posX += this.speed;
        }
        if (inputManager.pressedControls['moveDown']) {
            if (!collisionDetector.collidesWithBottomBorder(this, this.speed)) this.posY += this.speed;
        }
        if (inputManager.pressedControls['moveLeft']) {
            if (!collisionDetector.collidesWithLeftBorder(this, -this.speed)) this.posX -= this.speed;
        }
    }

    addGun(gun) {
        this.gun = gunsData[0]
        console.log(this.gun);
    }

    // draw() {
    //   let canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
    //   let ctx = this.game.getCanvasManager().getContext('playerCanvas')

    //   ctx.fillStyle = 'white'
    //   ctx.fillRect(0, 0, canvas.width, this.game.settings.BORDER_SIZE)
    //   ctx.fillRect(canvas.width - this.game.settings.BORDER_SIZE, 0, this.game.settings.BORDER_SIZE, canvas.height)
    //   ctx.fillRect(0, canvas.height - this.game.settings.BORDER_SIZE, canvas.width, this.game.settings.BORDER_SIZE)
    //   ctx.fillRect(0, 0, this.game.settings.BORDER_SIZE, canvas.height)

    //   ctx.fillStyle = 'blue';
    //   ctx.fillRect(this.posX, this.posY, this.width, this.height)


    // }
}


  