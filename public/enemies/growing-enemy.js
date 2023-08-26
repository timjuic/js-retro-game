import Bullet from "../bullet.js";
import Enemy from "./enemy.js";

export default class GrowingEnemy extends Enemy {
    static baseWidth = 3;
    static baseHeight = 3;
    static startingHealth = 200;
    static buffness = Enemy.calculateBuffness(GrowingEnemy.startingHealth)
    static level = 1;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = width;
        let maxSize = 6;
        let moveInterval = 30;
        let speed = 3;
        let health = GrowingEnemy.startingHealth;
        let damage = 10;
        let image = game.assetLoader.characters.growing;
        super(game, wave, GrowingEnemy.level, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
        this.canvasRef = this.game.getCanvasManager().getCanvas('playerCanvas')
        this.maxSize = maxSize / 100 * this.canvasRef.width;
        this.relativeSizeIncrease = 0.2;
        this.speedDecrease = 0.98;
    }

    onDamaged(entity) {
        if (!(entity instanceof Bullet)) return;

        let sizeIncrease = this.relativeSizeIncrease * this.canvasRef.width / 100;
        if (this.width + sizeIncrease <= this.maxSize) {
            let tempWidth = this.width + sizeIncrease;
            let tempHeight = this.height + sizeIncrease;
            let tempSpeed = this.speed * this.speedDecrease;
            if (this.game.collidesWithAnEnemy({ posX: this.posX, posY: this.posY, width: tempWidth, height: tempHeight})) {
                return true;
            }
            this.width = tempWidth;
            this.height = tempHeight;
            this.speed = tempSpeed;
            // this.health = GrowingEnemy.startingHealth
            return false;
        }
        return true;
    }
}