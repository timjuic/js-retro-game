import Enemy from "./enemy.js";

export default class BasicEnemy extends Enemy {
    static baseWidth = 3;
    static baseHeight = 3;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = 3;
        let moveInterval = 50;
        let speed = 5;
        let health = 50;
        let damage = 10;
        let image = game.assetLoader.enemyAssets.enemy1;
        super(game, wave, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
    }
}