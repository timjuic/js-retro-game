export default class Player {
    constructor(game, nickname, health) {
        this.game = game;
        this.nickname = nickname;
        this.width = 20;
        this.height = 20;
        this.speed = 2
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
        if (inputManager.pressedControls['moveUp']) this.posY -= this.speed;
        if (inputManager.pressedControls['moveRight']) this.posX += this.speed;
        if (inputManager.pressedControls['moveDown']) this.posY += this.speed;
        if (inputManager.pressedControls['moveLeft']) this.posX -= this.speed;
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