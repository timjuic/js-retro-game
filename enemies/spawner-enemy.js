import BasicEnemy from "./basic-enemy.js";
import Enemy from "./enemy.js";

export default class SpawnerEnemy extends Enemy {
    static baseWidth = 6;
    static baseHeight = 6;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 6;
        let height = 6;
        let moveInterval = 50;
        let speed = 5;
        let health = 900;
        let damage = 100;
        let spawnIntervalMs = 2000;
        let image = game.assetLoader.enemyAssets.enemy1;
        super(game, wave, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
        this.numEnemiesToSpawn = 5;
        this.maxSpawnAttempts = 20;
        this.maxTotalEnemiesSpawned = 30;

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
        let enemiesSpawned = 0;
    
        for (let attempt = 0; attempt < this.maxSpawnAttempts && enemiesSpawned < this.numEnemiesToSpawn; attempt++) {
            // generate a random position near the parent entity
            let spawnRadius = Math.sqrt(this.width*this.width + this.height*this.height) * 2;
            let angle = Math.random() * Math.PI * 2; // random angle
            let distance = Math.random() * spawnRadius; // random distance within spawnRadius
            let spawnX = this.posX + Math.cos(angle) * distance;
            let spawnY = this.posY + Math.sin(angle) * distance;
    
            if(this.createEnemy(BasicEnemy, spawnX, spawnY)) {
                enemiesSpawned++;
            }
        }
    }
    
    createEnemy(enemyType, x, y) {
          let newEnemy = new enemyType(
            this.game,
            this.wave,
            x,
            y,
            0,
            0,
            0,
            0,
            "blue"
          );
  
          for (const enemy of this.game.enemies) {
              if (this.game.getCollisionDetector().collidesWithEntity(newEnemy, enemy)) {
                return false;
              }
          }
          if (this.game.getCollisionDetector().collidesWithEntity(newEnemy, this.game.player)) return false;
          if (!this.game.getCollisionDetector().isInsideCanvasBorders(newEnemy)) return false;
          
        
          this.game.enemies.push(newEnemy);
          return true
        }
    
}