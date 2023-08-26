import MathUtil from "../helpers/math-util.js";
import Enemy from "./enemy.js";

export default class SplittingEnemy extends Enemy {
    static baseWidth = 5;
    static baseHeight = 5;
    static startingHealth = 100;
    static buffness = Enemy.calculateBuffness(SplittingEnemy.startingHealth)
    static level = 1;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color, canSplit) {
        let width = 5;
        let height = 5;
        let moveInterval = 50;
        let speed = 5;
        let health = SplittingEnemy.startingHealth;
        let damage = 10;
        let image = game.assetLoader.characters.splitting;
        super(game, wave, SplittingEnemy.level, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
        this.canSplit = canSplit;
        this.maxChildEnemiesOnDeath = 2;
        this.maxSpawnAttempts = 20;
    }

    spawnEnemies() {
        let enemiesSummoned = 0;

        for (let attempt = 0; attempt < this.maxSpawnAttempts && enemiesSummoned < this.maxChildEnemiesOnDeath; attempt++) {
            if (this.enemiesSpawned >= this.maxTotalEnemiesSpawned) return;
            let spawnRadius = Math.sqrt(this.width * this.width + this.height * this.height) * 1;
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
                    SplittingEnemy.baseWidth / 2,
                    SplittingEnemy.baseHeight / 2,
                    Math.round(this.moveInterval / 3),
                    this.speed,
                    SplittingEnemy.startingHealth / 2,
                    this.damage,
                    this.angle,
                    0,
                    0,
                    0,
                    "blue",
                    this.image]
                )) {
                enemiesSummoned++;
            }
        }
    }

    onDeath() {
        this.spawnEnemies();
        super.onDeath()
    }
}