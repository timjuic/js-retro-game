import Enemy from "./enemy.js";

export default class SpawnerMinion extends Enemy {
    static baseWidth = 2;
    static baseHeight = 2;
    static startingHealth = 40;
    static buffness = Enemy.calculateBuffness(SpawnerMinion.startingHealth)

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 2;
        let height = 2;
        let moveInterval = 50;
        let speed = 5;
        let health = SpawnerMinion.startingHealth;
        let damage = 10;
        let image = game.assetLoader.enemyAssets.spawner;
        super(game, wave, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
    }
}