import Enemy from "../enemies/enemy.js";
import Wave from "./wave.js";

export default class RandomWave extends Wave {
    constructor(game, waveSize, enemyType) {
        super(game, waveSize, enemyType)
        this.spawnEnemiesNearBorder(this.waveSize)
    }

    spawnEnemiesNearBorder() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        let borderWidth = this.game.getBorderManager().getLeftBorder();
        let gapFromBorder = playerCanvas.width / 150
        console.log(borderWidth);
        
        // Define the spawn area
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
      
          this.createEnemy(x, y);
        }
      }
}