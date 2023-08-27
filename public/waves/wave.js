import BasicEnemy from "../enemies/basic-enemy.js";
import Enemy from "../enemies/enemy.js";
import MathUtil from "../helpers/math-util.js";
import RandomWave from "./random-wave.js";

export default class Wave {
    constructor(game, startSummoningTicks, waveSize, enemyType, delayBetweenSummonsMs, durationInTicks) {
        this.game = game;
        this.startSummoningTicks = startSummoningTicks;
        this.waveSize = waveSize;
        this.enemyType = enemyType;
        let canvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        this.enemyWidth = enemyType.baseWidth * canvas.width / 100;
        this.enemyHeight = enemyType.baseHeight * canvas.width / 100;
        this.spawnQueue = [];
        this.delayBetweenSummonsMs = delayBetweenSummonsMs;
        this.spawningFinished = false;
        this.tickDuration = durationInTicks;
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


    // calculateDuration(amountOfEnemies) {
    //     let spawnDurationTicks, buffnessExtra;
    //     if (this instanceof RandomWave) {
    //         spawnDurationTicks = Math.ceil(this.delayBetweenSummonsMs * amountOfEnemies / this.game.settings.TICK_DURATION_MS);
    //         buffnessExtra = amountOfEnemies / this.delayBetweenSummonsMs * this.enemyType.buffness;
    //     } else {
    //         spawnDurationTicks = Math.ceil(this.delayBetweenSummonsMs * amountOfEnemies / this.game.settings.TICK_DURATION_MS);
    //         buffnessExtra = amountOfEnemies * this.enemyType.buffness;
    //     }


    //     this.tickDuration = spawnDurationTicks + buffnessExtra + this.game.settings.INITIAL_DELAY_BETWEEN_WAVES_TICKS;
    // }
}