import Enemy from "./enemy.js";

export default class BasicEnemy extends Enemy {
    constructor(game, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 20;
        let height = 20;
        let moveInterval = 50;
        let speed = 5;
        let health = 200;
        let image = game.assetLoader.enemyAssets.enemy1;
        super(game, posX, posY, width, height, moveInterval, speed, health, angle, velX, velY, velRotation, color, image);
    }
}