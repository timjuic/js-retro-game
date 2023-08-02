import Sides from "../enums/sides.js";
import Wave from "./wave.js";

export default class SquareWave extends Wave {
    constructor(game, waveSize, enemyType) {
        super(game, waveSize, enemyType);

        let side = this.getFurthestSideFromPlayer()
        this.createSquareWave(side)
    }

     createSquareWave(side) {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        const gap = playerCanvas.width / 150;
        let borderWidth = this.game.getBorderManager().getLeftBorder();
        let distanceFromSide = playerCanvas.width / 150;
        
        let startX, startY;
        switch (side) {
          case Sides.TOP:
            startX = (playerCanvas.width - this.waveSize * (this.enemyWidth + gap) + gap) / 2;
            startY = borderWidth + distanceFromSide;
            break;
          case Sides.LEFT:
            startX = borderWidth + distanceFromSide;
            startY = (playerCanvas.height - this.waveSize * (this.enemyHeight + gap) + gap) / 2;
            break;
          case Sides.RIGHT:
            startX = playerCanvas.width - borderWidth - distanceFromSide - this.waveSize * (this.enemyWidth + gap) + gap;
            startY = (playerCanvas.height - this.waveSize * (this.enemyHeight + gap) + gap) / 2;
            break;
          case Sides.BOTTOM:
            startX = (playerCanvas.width - this.waveSize * (this.enemyWidth + gap) + gap) / 2;
            startY = playerCanvas.height - distanceFromSide - borderWidth - this.waveSize * (this.enemyHeight + gap) + gap;
            break;
          default:
            throw new Error("Invalid side provided.");
        }
        
        for (let row = 0; row < this.waveSize; row++) {
          for (let col = 0; col < this.waveSize; col++) {
            let posX, posY;
            if (side === Sides.RIGHT || side === Sides.BOTTOM) {
              // Reverse the order of enemy creation for RIGHT and BOTTOM sides
              posX = startX + col * (this.enemyWidth + gap);
              posY = startY + row * (this.enemyHeight + gap);
            } else {
              posX = startX + col * (this.enemyWidth + gap);
              posY = startY + row * (this.enemyHeight + gap);
            }
            this.createEnemy(posX, posY);
          }
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