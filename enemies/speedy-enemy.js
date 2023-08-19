import Enemy from "./enemy.js";

export default class SpeedyEnemy extends Enemy {
    static baseWidth = 3;
    static baseHeight = 3;
    static startingHealth = 40;
    static buffness = Enemy.calculateBuffness(SpeedyEnemy.startingHealth)
    static level = 1;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = 3;
        let moveInterval = 10;
        let speed = 8;
        let health = SpeedyEnemy.startingHealth;
        let damage = 20;
        let image = game.assetLoader.enemyAssets.speedy;
        super(game, wave, SpeedyEnemy.level, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
    }
}