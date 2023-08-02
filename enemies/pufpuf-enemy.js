import ShooterEnemy from "./shooting-enemy.js";

export default class PufPufEnemy extends ShooterEnemy {
    static baseWidth = 6;
    static baseHeight = 4;

    constructor(game, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 6;
        let height = 4;
        let moveInterval = 50;
        let speed = 5;
        let health = 100;
        let shootTickInterval = 200;
        let accuracy = 100;
        let damage = 10;
        let gunKnockbackMultiplier = 10;
        let image = game.assetLoader.enemyAssets.enemy1;
        super(game, posX, posY, width, height, moveInterval, speed, health, angle, velX, velY, velRotation, shootTickInterval, accuracy, damage, gunKnockbackMultiplier, color, image)
    }
}