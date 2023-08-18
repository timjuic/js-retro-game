import Enemy from "./enemy.js";
import ShooterEnemy from "./shooting-enemy.js";

export default class PufPufEnemy extends ShooterEnemy {
    static baseWidth = 5;
    static baseHeight = 5;
    static startingHealth = 100;
    static buffness = Enemy.calculateBuffness(PufPufEnemy.startingHealth)

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 5;
        let height = 5;
        let moveInterval = 50;
        let speed = 5;
        let health = PufPufEnemy.startingHealth;
        let shootTickInterval = 200;
        let accuracy = 100;
        let damage = 10;
        let gunKnockbackMultiplier = 10;
        let image = game.assetLoader.enemyAssets.pufpuf;
        super(game, wave, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, shootTickInterval, accuracy, gunKnockbackMultiplier, color, image)
    }
}