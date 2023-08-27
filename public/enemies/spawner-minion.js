import Enemy from "./enemy.js";

export default class SpawnerMinion extends Enemy {
    static baseWidth = 2;
    static baseHeight = 2;
    static startingHealth = 40;
    static threatRating = 2
    static level = 1;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 2;
        let height = 2;
        let moveInterval = 50;
        let speed = 5;
        let health = SpawnerMinion.startingHealth;
        let damage = 10;
        let image = game.assetLoader.characters.spawner;
        super(game, wave, SpawnerMinion.level, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
    }
}