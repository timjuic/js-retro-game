import Enemy from "./enemy.js";

export default class BasicEnemy extends Enemy {
    static baseWidth = 3;
    static baseHeight = 3;
    static startingHealth = 40;
    static threatRating = 2
    static level = 1;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = 3;
        let moveInterval = 50;
        let speed = 5;
        let health = BasicEnemy.startingHealth;
        let damage = 10;
        let image = game.assetLoader.characters.basic;
        super(game, wave, BasicEnemy.level, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
    }
}