import Sides from "../enums/sides.js";
import Wave from "./wave.js";

export default class SquareWave extends Wave {
    constructor(game, waveSize) {
        super(game);
        this.waveSize = waveSize;
        this.createSquareWave(Sides.TOP);
        this.createSquareWave(Sides.RIGHT);
        this.createSquareWave(Sides.BOTTOM);
        this.createSquareWave(Sides.LEFT);
        console.log("SQUARE WAVE CALLED");
    }

     createSquareWave(side) {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        const gap = playerCanvas.width / 150;
        let borderWidth = this.game.getBorderManager().getLeftBorder();
        let distanceFromSide = playerCanvas.width / 150;
        
        let startX, startY;
        switch (side) {
          case Sides.TOP:
            startX = (playerCanvas.width - this.waveSize * (20 + gap) + gap) / 2;
            startY = borderWidth + distanceFromSide;
            break;
          case Sides.LEFT:
            startX = borderWidth + distanceFromSide;
            startY = (playerCanvas.height - this.waveSize * (20 + gap) + gap) / 2;
            break;
          case Sides.RIGHT:
            startX = playerCanvas.width - borderWidth - distanceFromSide - this.waveSize * (20 + gap) + gap;
            startY = (playerCanvas.height - this.waveSize * (20 + gap) + gap) / 2;
            break;
          case Sides.BOTTOM:
            startX = (playerCanvas.width - this.waveSize * (20 + gap) + gap) / 2;
            startY = playerCanvas.height - distanceFromSide - borderWidth - this.waveSize * (20 + gap) + gap;
            break;
          default:
            throw new Error("Invalid side provided.");
        }
        
        for (let row = 0; row < this.waveSize; row++) {
          for (let col = 0; col < this.waveSize; col++) {
            let posX, posY;
            if (side === Sides.RIGHT || side === Sides.BOTTOM) {
              // Reverse the order of enemy creation for RIGHT and BOTTOM sides
              posX = startX + col * (20 + gap);
              posY = startY + row * (20 + gap);
            } else {
              posX = startX + col * (20 + gap);
              posY = startY + row * (20 + gap);
            }
            this.createEnemy(posX, posY);
          }
        }
      }
      
      
      
    
    
    
}