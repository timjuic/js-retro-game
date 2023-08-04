import Enemy from "../enemies/enemy.js";
import Corners from "../enums/corners.js";
import WaveType from "../enums/wave-type.js";
import Wave from "./wave.js";

export default class CornerWave extends Wave {
    constructor(game, waveSize, enemyType) {
        super(game, waveSize, enemyType);
        this.borderWidth = this.game.getBorderManager().getLeftBorder();
        this.gapFromBorder = playerCanvas.width / 150
      
        let corner = this.getPossibleCorner();
        if (corner === Corners.UPPER_LEFT) this.createTopLeftWave(waveSize);
        else if (corner === Corners.UPPER_RIGHT) this.createTopRightWave(waveSize);
        else if (corner === Corners.BOTTOM_LEFT) this.createBottomLeftWave(waveSize);
        else if (corner === Corners.BOTTOM_RIGHT) this.createBottomRightWave(waveSize);
        super.spawnEnemiesFromQueue();
    }

    createTopLeftWave() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        
        let [startX, startY] = this.getStartingPosition(Corners.UPPER_LEFT);
      
        let gap = playerCanvas.width / 130;
      
        // Loop to create 3 rows of enemies
        for (let row = 0; row < this.waveSize; row++) {
          let posY = startY + row * (gap + this.enemyHeight);
      
          // Loop to create enemies in each row
          for (let col = 0; col < this.waveSize - row; col++) {
            this.spawnQueue.push( { x: startX + col * (gap + this.enemyWidth), y: posY })
            // this.createEnemy(, posY);
          }
        }
      }

      createTopRightWave() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        
        let [startX, startY] = this.getStartingPosition(Corners.UPPER_RIGHT);
      
        let gap = playerCanvas.width / 130;
      
        // Loop to create 3 rows of enemies
        for (let row = 0; row < this.waveSize; row++) {
          let posY = startY + row * (gap + this.enemyHeight);
      
          // Loop to create enemies in each row
          for (let col = 0; col < this.waveSize - row; col++) {
            // Start creating enemies from the corner and go further to the left
            let posX = startX - col * (gap + this.enemyWidth);
            // this.createEnemy(posX, posY);
            this.spawnQueue.push( { x: posX, y: posY })
          }
        }
      }
      
      

      createBottomLeftWave() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        
        let [startX, startY] = this.getStartingPosition(Corners.BOTTOM_LEFT);
      
        let gap = playerCanvas.width / 130;
      
        // Loop to create 3 rows of enemies, starting from the bottom row
        for (let row = this.waveSize - 1; row >= 0; row--) {
          // Start creating enemies from the corner and move upwards
          let posY = startY - (this.waveSize - 1 - row) * (gap + this.enemyHeight);
      
          // Loop to create enemies in each row
          for (let col = 0; col <= row; col++) {
            // this.createEnemy(startX + col * (gap + this.enemyWidth), posY);
            this.spawnQueue.push({ x: startX + col * (gap + this.enemyWidth), y: posY })
          }
        }
      }
      

      createBottomRightWave() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        
        let [startX, startY] = this.getStartingPosition(Corners.BOTTOM_RIGHT);
      
        let gap = playerCanvas.width / 130;
      
        // Loop to create 3 rows of enemies, starting from the bottom row
        for (let row = this.waveSize - 1; row >= 0; row--) {
          // Start creating enemies from the corner and move upwards
          let posY = startY - (this.waveSize - 1 - row) * (gap + this.enemyHeight);
      
          // Loop to create enemies in each row
          for (let col = 2; col >= 2 - row; col--) {
            // Start creating enemies from the corner and move to the left
            let posX = startX - (2 - col) * (gap + this.enemyWidth);
            // this.createEnemy(posX, posY);
            this.spawnQueue.push({ x: posX, y: posY })
          }
        }
      }
      
      


    getPossibleCorner() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        let cornerX, cornerY;
        // Calculate the distances from player to each corner
        const distanceTopLeft = Math.sqrt(Math.pow(this.game.player.posX, 2) + Math.pow(this.game.player.posY, 2));
        const distanceTopRight = Math.sqrt(Math.pow(playerCanvas.width - this.game.player.posX, 2) + Math.pow(this.game.player.posY, 2));
        const distanceBottomLeft = Math.sqrt(Math.pow(this.game.player.posX, 2) + Math.pow(playerCanvas.height - this.game.player.posY, 2));
        const distanceBottomRight = Math.sqrt(Math.pow(playerCanvas.width - this.game.player.posX, 2) + Math.pow(playerCanvas.height - this.game.player.posY, 2));
      
        if (distanceTopLeft >= distanceTopRight && distanceTopLeft >= distanceBottomLeft && distanceTopLeft >= distanceBottomRight) {
          return Corners.UPPER_LEFT
        } else if (distanceTopRight >= distanceTopLeft && distanceTopRight >= distanceBottomLeft && distanceTopRight >= distanceBottomRight) {
          return Corners.UPPER_RIGHT
        } else if (distanceBottomLeft >= distanceTopLeft && distanceBottomLeft >= distanceTopRight && distanceBottomLeft >= distanceBottomRight) {
          return Corners.BOTTOM_LEFT
        } else {
          return Corners.BOTTOM_RIGHT
        }
    }

    getStartingPosition(corner) {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
      
        if (corner === Corners.UPPER_LEFT) {
          return [this.borderWidth + this.gapFromBorder, this.borderWidth + this.gapFromBorder];
        } else if (corner === Corners.UPPER_RIGHT) {
          return [playerCanvas.width - this.borderWidth - this.gapFromBorder - this.enemyWidth, this.borderWidth + this.gapFromBorder];
        
        } else if (corner === Corners.BOTTOM_LEFT) {
          return [this.borderWidth + this.gapFromBorder, playerCanvas.height - this.borderWidth - this.gapFromBorder - this.enemyHeight];
        } else if (corner === Corners.BOTTOM_RIGHT) {
          return [playerCanvas.width - this.borderWidth - this.gapFromBorder - this.enemyWidth, playerCanvas.height - this.borderWidth - this.gapFromBorder - this.enemyHeight];
        }
      }
}