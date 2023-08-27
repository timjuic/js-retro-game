import MathUtil from "../helpers/math-util.js";
import Enemy from "./enemy.js";

export default class WandererEnemy extends Enemy {
    static baseWidth = 3;
    static baseHeight = 4;
    static startingHealth = 60;
    static buffness = Enemy.calculateBuffness(WandererEnemy.startingHealth)
    static level = 1;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = 4;
        let moveInterval = 2;
        let speed = 3;
        let health = WandererEnemy.startingHealth;
        let damage = 20;
        let image = game.assetLoader.characters.wanderer;
        super(game, wave, WandererEnemy.level, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
        this.movingTargetX;
        this.movingTargetY;
        this.reTargetMovingDestination();

        const retargetMinMs = 600;
        const retargetMaxMs = 1500;
        
        this.retargetInterval = setInterval(() => {
            this.reTargetMovingDestination();
        }, MathUtil.generateRandomInteger(retargetMinMs, retargetMaxMs));
    }

    reTargetMovingDestination() {
        let startX = this.game.getBorderManager().getLeftBorder();
        let endX = this.game.getBorderManager().getRightBorder() - this.width;
        this.movingTargetX = MathUtil.generateRandomInteger(startX, endX) 
        let startY = this.game.getBorderManager().getTopBorder();
        let endY = this.game.getBorderManager().getBottomBorder() - this.height;
        this.movingTargetY = MathUtil.generateRandomInteger(startY, endY);
    }

    move() {
        let reachedDestinationX = this.game.canvas.width / 100;
        let reachedDestinationY = this.game.canvas.height / 100;
        if (Math.abs(this.posX - this.movingTargetX) < reachedDestinationX && Math.abs(this.posY - this.movingTargetY) < reachedDestinationY) return;;
        super.move({ posX: this.movingTargetX, posY: this.movingTargetY });
    }


}