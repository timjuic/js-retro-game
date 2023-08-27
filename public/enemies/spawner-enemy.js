import MathUtil from "../helpers/math-util.js";
import BasicEnemy from "./basic-enemy.js";
import Enemy from "./enemy.js";
import SpawnerMinion from "./spawner-minion.js";

export default class SpawnerEnemy extends Enemy {
    static baseWidth = 6;
    static baseHeight = 6;
    static startingHealth = 400;
    static threatRating = 4
    static level = 1;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 6;
        let height = 6;
        let moveInterval = 50;
        let speed = 5;
        let health = SpawnerEnemy.startingHealth;
        let damage = 100;
        let spawnIntervalMs = 2000;
        let image = game.assetLoader.characters.spawner;
        super(game, wave, SpawnerEnemy.level, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
        this.enemiesSpawned = 0;
        this.minSpawns = 2;
        this.maxSpawns = 3;
        this.maxSpawnAttempts = 20;
        this.maxTotalEnemiesSpawned = 8;

        let spawnEnemiesInterval = setInterval(() => {
            if (this.health <= 0) {
                clearInterval(spawnEnemiesInterval)
                return;
            }
            this.spawnEnemies()
        }, spawnIntervalMs);

        setTimeout(() => {
            if (!this.game.enemies.includes(this)) clearInterval(spawnEnemiesInterval)
        }, 500);
    }

    spawnEnemies() {
        let enemiesSpawnedInBatch = 0;
        let allowedSummons = MathUtil.generateRandomInteger(this.minSpawns, this.maxSpawns);

        for (let attempt = 0; attempt < this.maxSpawnAttempts && enemiesSpawnedInBatch < allowedSummons; attempt++) {
            if (this.enemiesSpawned >= this.maxTotalEnemiesSpawned) return;
            let spawnRadius = Math.sqrt(this.width * this.width + this.height * this.height) * 2;
            let angle = Math.random() * Math.PI * 2;
            let distance = Math.random() * spawnRadius;
            let spawnX = this.posX + Math.cos(angle) * distance;
            let spawnY = this.posY + Math.sin(angle) * distance;

            if (this.game.createEnemy([
                this.game, 
                this.wave,
                this.level,
                spawnX,
                spawnY,
                SpawnerEnemy.baseWidth / 2,
                SpawnerEnemy.baseHeight / 2,
                Math.round(this.moveInterval / 2),
                this.speed,
                40,
                this.damage / 4,
                this.angle,
                0,
                0,
                0,
                "blue",
                this.image]
            )) {
                this.enemiesSpawned++;
                enemiesSpawnedInBatch++;
            }
        }
    }
}