import Enemy from "../enemies/enemy.js";
import Sides from "../enums/sides.js";
import Wave from "./wave.js";

export default class LineWave extends Wave {
    constructor(game, startSummoningTicks, waveSize, enemyType, delayBetweenSummonsMs, summoningPosition) {
        super(game, startSummoningTicks, waveSize, enemyType, delayBetweenSummonsMs, summoningPosition);
        this.calculateDuration(this.getTotalEnemies());
        this.summoningPosition = summoningPosition;
    }

    startSummoningEnemies() {
        if (this.summoningPosition === undefined) {
            this.summoningPosition = this.getFurthestSideFromPlayer()
        }
        
        this.createLineWave(this.summoningPosition)
        super.spawnEnemiesFromQueue();
    }

    getTotalEnemies() {
        return this.waveSize;
    }

    createLineWave(side) {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        let borderGap = playerCanvas.width / 150;
        let gap = (side === Sides.TOP || side === Sides.BOTTOM) ? playerCanvas.width / this.waveSize : playerCanvas.height / this.waveSize;
        let startPos = gap / 2;  // start from the center of the gap
        let borderManager = this.game.getBorderManager();

        for (let i = 0; i < this.waveSize; i++) {
          let posX, posY;
      
          switch (side) {
            case Sides.TOP:
              posX = startPos + i * gap;
              posY = borderManager.getTopBorder() + borderGap;
              break;
            case Sides.BOTTOM:
              posX = startPos + i * gap;
              posY = borderManager.getBottomBorder() - borderGap - this.enemyHeight;  // assuming enemy height is 50
              break;
            case Sides.LEFT:
              posX = borderManager.getLeftBorder() + borderGap;
              posY = startPos + i * gap;
              break;
            case Sides.RIGHT:
              posX = borderManager.getRightBorder() - borderGap - this.enemyHeight;  // assuming enemy width is 50
              posY = startPos + i * gap;
              break;
          }
          
          this.spawnQueue.push({ x: posX, y: posY});
        //   this.createEnemy(posX, posY);
        }
      }


      getFurthestSideFromPlayer() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        let player = this.game.player

        // Calculate the distances to each side
        let distances = {
          [Sides.TOP]: player.posY,
          [Sides.BOTTOM]: playerCanvas.height - player.posY,
          [Sides.LEFT]: player.posX,
          [Sides.RIGHT]: playerCanvas.width - player.posX
        };
      
        // Find the side with the maximum distance
        let furthestSide = Sides.TOP;
        let maxDistance = distances[Sides.TOP];
      
        for (let side in distances) {
          if (distances[side] > maxDistance) {
            maxDistance = distances[side];
            furthestSide = side;
          }
        }
      
        return furthestSide;
      }
}