import Enemy from "./enemy.js";

export default class BuffEnemy extends Enemy {
    static baseWidth = 4;
    static baseHeight = 4;
    static startingHealth = 80;
    static buffness = Enemy.calculateBuffness(BuffEnemy.startingHealth)

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 4;
        let height = 4;
        let moveInterval = 200;
        let speed = 5;
        let health = BuffEnemy.startingHealth;
        let damage = 20;
        let image = game.assetLoader.enemyAssets.enemy1;
        super(game, wave, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
    }
}