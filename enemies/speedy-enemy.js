import Enemy from "./enemy.js";

export default class BasicEnemy extends Enemy {
    static baseWidth = 3;
    static baseHeight = 3;

    constructor(game, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = 3;
        let moveInterval = 10;
        let speed = 8;
        let health = 50;
        let image = game.assetLoader.enemyAssets.enemy1;
        super(game, posX, posY, width, height, moveInterval, speed, health, angle, velX, velY, velRotation, color, image);
    }
}