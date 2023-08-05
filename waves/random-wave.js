import Enemy from "../enemies/enemy.js";
import Wave from "./wave.js";

export default class RandomWave extends Wave {
    constructor(game, startSummoningSeconds, waveSize, enemyType, delayBetweenSummonsMs) {
        super(game, startSummoningSeconds, waveSize, enemyType, delayBetweenSummonsMs)
        this.spawningFinished = true;
    }

    startSummoningEnemies() {
        this.spawnEnemiesNearBorder(this.waveSize)
        super.spawnEnemiesFromQueue();
    }

    spawnEnemiesNearBorder() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        let borderWidth = this.game.getBorderManager().getLeftBorder();
        let gapFromBorder = playerCanvas.width / 150
        
        let spawnArea = {
            minX: borderWidth + gapFromBorder,
            maxX: playerCanvas.width - borderWidth - gapFromBorder - this.enemyWidth,
            minY: borderWidth + gapFromBorder,
            maxY: playerCanvas.height - borderWidth - gapFromBorder - this.enemyHeight
          };
      
        // Generate the enemies
        for (let i = 0; i < this.waveSize; i++) {
          let x = Math.random() * (spawnArea.maxX - spawnArea.minX) + spawnArea.minX;
          let y = Math.random() * (spawnArea.maxY - spawnArea.minY) + spawnArea.minY;
      
          // Decide randomly on which side to spawn the enemy
          let side = Math.floor(Math.random() * 4);
          switch (side) {
            case 0:
              y = spawnArea.minY;
              break;
            case 1:
              x = spawnArea.maxX;
              break;
            case 2:
              y = spawnArea.maxY;
              break;
            case 3:
              x = spawnArea.minX;
              break;
          }
      
          this.spawnQueue.push({ x: x, y: y })
        //   this.createEnemy(x, y);
        }
      }
}