import { CircleEntity, RectangleEntity } from "./entity.js";

export default class Player extends RectangleEntity {
    constructor(game, nickname, health) {
      let playerCanvas = game.getCanvasManager().getCanvas('playerCanvas')
      let posX = playerCanvas.width / 2;
      let posY = playerCanvas.height / 2;
      let width = 2 * game.settings.OBJECT_SCALE_FACTOR;
      let height = 2 * game.settings.OBJECT_SCALE_FACTOR;
      let angle = 0
      let velX = 0;
      let velY = 0;
      console.log(posX);
      super(posX, posY, width, height, angle, velX, velY)
      console.log(this.posX);

      this.game = game;
      this.nickname = nickname;
      this.speed = 2
      this.health = health;
      this.maxHealth = health;
      this.gun

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

    draw() {
      let canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
      let ctx = this.game.getCanvasManager().getContext('playerCanvas')

      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, 10)
      ctx.fillRect(canvas.width - 10, 0, 10, canvas.height)
      ctx.fillRect(0, canvas.height - 10, canvas.width, 10)
      ctx.fillRect(0, 0, 10, canvas.height)

      ctx.fillStyle = 'blue';
      ctx.fillRect(this.posX, this.posY, this.width, this.height)


    }
}