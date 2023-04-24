export default class Player {
    constructor(game, nickname, health) {
        this.game = game;
        this.nickname = nickname;
        this.width = 20;
        this.height = 20;
        this.health = health;
        this.maxHealth = health;
        this.posX; 
        this.posY;
        this.velX;
        this.velY;
        this.gun

    }

    updatePosition() {
        
    }

    draw() {
        let canvas = this.game.canvasManager.canvases['playerCanvas']
        let ctx = this.game.canvasManager.contexts['playerCanvas']
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, this.width, 0, 2 * Math.PI);
        ctx.fill();
        
    }
}