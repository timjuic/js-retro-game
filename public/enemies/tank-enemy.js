import Enemy from "./enemy.js";

export default class TankEnemy extends Enemy {
    static baseWidth = 5;
    static baseHeight = 5;
    static startingHealth = 200;
    static threatRating = 2
    static level = 1;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 5;
        let height = 5;
        let moveInterval = 200;
        let speed = 5;
        let health = TankEnemy.startingHealth;
        let damage = 20;
        let image = game.assetLoader.characters.tank;
        super(game, wave, TankEnemy.level, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
    }
}