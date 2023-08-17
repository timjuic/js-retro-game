import Sides from "../enums/sides.js";
import Wave from "./wave.js";

export default class SquareWave extends Wave {
    constructor(game, startSummoningTicks, waveSize, enemyType, delayBetweenSummonsMs, summoningPosition) {
        super(game, startSummoningTicks, waveSize, enemyType, delayBetweenSummonsMs, summoningPosition);
        this.summoningPosition = summoningPosition;
        this.calculateDuration(this.getTotalEnemies());
    }

    startSummoningEnemies() {
        if (this.summoningPosition === undefined) {
            this.summoningPosition = this.getFurthestSideFromPlayer()
        }
        
        this.createSquareWave(this.summoningPosition)
        super.spawnEnemiesFromQueue();
    }

    getTotalEnemies() {
        return this.waveSize;
    }

     createSquareWave(side) {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        const gap = playerCanvas.width / 150;
        let borderWidth = this.game.getBorderManager().getLeftBorder();
        let distanceFromSide = playerCanvas.width / 150;
        let gridSize = Math.sqrt(this.waveSize);
        
        let startX, startY;
        switch (side) {
          case Sides.TOP:
            startX = (playerCanvas.width - gridSize * (this.enemyWidth + gap) + gap) / 2;
            startY = borderWidth + distanceFromSide;
            break;
          case Sides.LEFT:
            startX = borderWidth + distanceFromSide;
            startY = (playerCanvas.height - gridSize * (this.enemyHeight + gap) + gap) / 2;
            break;
          case Sides.RIGHT:
            startX = playerCanvas.width - borderWidth - distanceFromSide - this.enemyWidth;
            startY = (playerCanvas.height - gridSize * (this.enemyHeight + gap) + gap) / 2;
            break;
          case Sides.BOTTOM:
            startX = (playerCanvas.width - gridSize * (this.enemyWidth + gap) + gap) / 2;
            startY = playerCanvas.height - distanceFromSide - borderWidth - this.enemyHeight;
            break;
          default:
            throw new Error("Invalid side provided.");
        }
        
        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            let posX, posY;
            if (side === Sides.RIGHT) {
              posX = startX - col * (this.enemyWidth + gap);
              posY = startY + row * (this.enemyHeight + gap);
            } else if (side === Sides.BOTTOM) {
                posX = startX + col * (this.enemyWidth + gap);
                posY = startY - row * (this.enemyHeight + gap);
            } else {
              posX = startX + col * (this.enemyWidth + gap);
              posY = startY + row * (this.enemyHeight + gap);
            }
            this.spawnQueue.push({ x: posX, y: posY});
          }
        }
      }
      
      
      
      getFurthestSideFromPlayer() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        let player = this.game.player

        let distances = {
          [Sides.TOP]: player.posY,
          [Sides.BOTTOM]: playerCanvas.height - player.posY,
          [Sides.LEFT]: player.posX,
          [Sides.RIGHT]: playerCanvas.width - player.posX
        };
      
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