import Enemy from "../enemies/enemy.js";
import Wave from "./wave.js";

export default class RandomWave extends Wave {
    constructor(game, startSummoningTicks, waveSize, enemyType, delayBetweenSummonsMs) {
        super(game, startSummoningTicks, waveSize, enemyType, delayBetweenSummonsMs)
        this.spawningFinished = true;
        this.calculateDuration(this.getTotalEnemies());
    }

    startSummoningEnemies() {
        this.spawnEnemiesNearBorder(this.waveSize)
        super.spawnEnemiesFromQueue();
    }

    getTotalEnemies() {
        return this.waveSize;
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
      
        for (let i = 0; i < this.waveSize; i++) {
          let x = Math.random() * (spawnArea.maxX - spawnArea.minX) + spawnArea.minX;
          let y = Math.random() * (spawnArea.maxY - spawnArea.minY) + spawnArea.minY;
      
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
        }
      }
}