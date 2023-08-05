import BasicEnemy from "../enemies/basic-enemy.js";
import Enemy from "../enemies/enemy.js";

export default class Wave {
    constructor(game, startSummoningSeconds, waveSize, enemyType, delayBetweenSummonsMs) {
        this.game = game;
        this.startSummoningMs = startSummoningSeconds * 1000;
        this.waveSize = waveSize;
        this.enemyType = enemyType;
        let canvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        this.enemyWidth = enemyType.baseWidth * canvas.width / 100;
        this.enemyHeight = enemyType.baseHeight * canvas.width / 100;
        this.spawnQueue = [];
        this.delayBetweenSummonsMs = delayBetweenSummonsMs;
        this.spawningFinished = false;
    }

    createEnemy(x, y, wave) {
        let newEnemy = new this.enemyType(
          this.game,
          wave,
          x,
          y,
          0,
          0,
          0,
          0,
          "blue"
        );

        for (const enemy of this.game.enemies) {
            if (this.game.getCollisionDetector().collidesWithEntity(newEnemy, enemy)) return;
        }
        if (this.game.getCollisionDetector().collidesWithEntity(newEnemy, this.game.player)) return;
        
      
        this.game.enemies.push(newEnemy);
      }

      spawnEnemiesFromQueue() {
        let spawnInterval = setInterval(() => {
            if (this.spawnQueue.length > 0) {
                let enemyPos = this.spawnQueue.shift();
    
                this.createEnemy(enemyPos.x, enemyPos.y, this);
            }
            else {
                clearInterval(spawnInterval);
                this.spawningFinished = true;
            }
        }, this.delayBetweenSummonsMs);
    }
}