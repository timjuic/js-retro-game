import CollisionDetector from "./collision-detector";

export default class Player {
    constructor(game, nickname, health) {
        this.game = game;
        this.nickname = nickname;
        this.width = 2 * this.game.objectScaleFactor
        this.height = 2 * this.game.objectScaleFactor
        this.speed = 2
        console.log(this.height);
        this.health = health;
        this.maxHealth = health;
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas')
        console.log(playerCanvas);
        this.posX = playerCanvas.width / 2;
        this.posY = playerCanvas.height / 2
        this.velX;
        this.velY;
        this.gun

    }

    updatePosition() {
        let inputManager = this.game.getInputManager()
        let canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
        if (inputManager.pressedControls['moveUp']) {
            if (!CollisionDetector.collidesWithTopBorder(this)) this.posY -= this.speed;
        }
        if (inputManager.pressedControls['moveRight']) {
            if (!CollisionDetector.collidesWithRightBorder(this)) this.posX += this.speed;
        }
        if (inputManager.pressedControls['moveDown']) {
            if (!CollisionDetector.collidesWithBottomBorder(this)) this.posY += this.speed;
        }
        if (inputManager.pressedControls['moveLeft']) {
            if (!CollisionDetector.collidesWithLeftBorder(this)) this.posX -= this.speed;
        }
    }

    draw() {
      let canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
      let ctx = this.game.getCanvasManager().getContext('playerCanvas')

      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(this.posX, this.posY, this.width, 0, 2 * Math.PI);
      ctx.fill();
      // ctx.stroke()
        
    }
}