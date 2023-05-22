import Bullet from "./bullet.js";
import Gun from "./gun.js";
import { CircleEntity, RectangleEntity } from "./entity.js";

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
      this.gun

      this.game.getEventEmmiter().on('playerInput', (control, pressed) => {
        this.shoot()
      })

    }

    shoot() {
        // this.gun.shoot()
        let crosshair = this.game.getCrosshair();
        let angle = calculateAngle(this.posX, this.posY, crosshair.aimX, crosshair.aimY)
        console.log(angle);
        let bullet = new RectangleEntity(this.game, this.posX, this.posY, 20, 40, 0, 10, 10, "blue")
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
        this.gun = new Gun(this.game, 50, 100, true, 100);
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


function calculateAngle(posx1, posy1, posx2, posy2) {
    var deltaX = posx2 - posx1;
    var deltaY = posy1 - posy2; // Subtract posy2 from posy1
    var radians = Math.atan2(deltaY, deltaX);
    var degrees = radians * (180 / Math.PI);
  
    // Ensure the angle is positive and within the range of 0-359 degrees
    if (degrees < 0) {
      degrees += 360;
    }
  
    return degrees;
  }