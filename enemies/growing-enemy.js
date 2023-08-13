import Bullet from "../bullet.js";
import Enemy from "./enemy.js";

export default class GrowingEnemy extends Enemy {
    static baseWidth = 3;
    static baseHeight = 3;
    static startingHealth = 200;
    static buffness = Enemy.calculateBuffness(GrowingEnemy.startingHealth)

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = width;
        let maxSize = 6;
        let moveInterval = 50;
        let speed = 0;
        let health = GrowingEnemy.startingHealth;
        let damage = 10;
        let image = game.assetLoader.enemyAssets.enemy1;
        super(game, wave, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
        this.canvasRef = this.game.getCanvasManager().getCanvas('playerCanvas')
        this.maxSize = maxSize / 100 * this.canvasRef.width;
        this.relativeSizeIncrease = 0.2;
        this.speedDecrease = 0.98;
    }

    onDamaged(entity) {
        if (!(entity instanceof Bullet)) return;

        let sizeIncrease = this.relativeSizeIncrease * this.canvasRef.width / 100;
        console.log(sizeIncrease);
        if (this.width + sizeIncrease <= this.maxSize) {
            this.width += sizeIncrease;
            this.height += sizeIncrease;
            this.speed *= this.speedDecrease;
            console.log("SPEED", this.speed);
            this.health = GrowingEnemy.startingHealth
        }
        return true;
    }
}