import Enemy from "./enemies/enemy.js";
import Corners from "./enums/corners.js";
import WaveType from "./enums/wave-type.js";

export default class CornerWave {
    constructor(game, waveSize, enemyType) {
        this.game = game;
        let corner = this.getPossibleCorner();
        if (corner === Corners.UPPER_LEFT) this.createTopLeftWave(waveSize);
        else if (corner === Corners.UPPER_RIGHT) this.createTopRightWave(waveSize);
        else if (corner === Corners.BOTTOM_LEFT) this.createBottomLeftWave(waveSize);
        else if (corner === Corners.BOTTOM_RIGHT) this.createBottomRightWave(waveSize);


        console.log(this.game.enemies);
    }

    createTopLeftWave(waveSize) {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        
        let [startX, startY] = this.getStartingPosition(Corners.UPPER_LEFT);
      
        let gap = playerCanvas.width / 130;
      
        // Loop to create 3 rows of enemies
        for (let row = 0; row < waveSize; row++) {
          let posY = startY + row * (gap + 50);
      
          // Loop to create enemies in each row
          for (let col = 0; col < waveSize - row; col++) {
            this.createEnemy(startX + col * (gap + 50), posY);
          }
        }
      }

      createTopRightWave(waveSize) {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        
        let [startX, startY] = this.getStartingPosition(Corners.UPPER_RIGHT);
      
        let gap = playerCanvas.width / 130;
      
        // Loop to create 3 rows of enemies
        for (let row = 0; row < waveSize; row++) {
          let posY = startY + row * (gap + 50);
      
          // Loop to create enemies in each row
          for (let col = 0; col < waveSize - row; col++) {
            // Start creating enemies from the corner and go further to the left
            let posX = startX - col * (gap + 50);
            this.createEnemy(posX, posY);
          }
        }
      }
      
      
      

      createBottomLeftWave(waveSize) {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        
        let [startX, startY] = this.getStartingPosition(Corners.BOTTOM_LEFT);
      
        let gap = playerCanvas.width / 130;
      
        // Loop to create 3 rows of enemies, starting from the bottom row
        for (let row = waveSize - 1; row >= 0; row--) {
          // Start creating enemies from the corner and move upwards
          let posY = startY - (waveSize - 1 - row) * (gap + 50);
      
          // Loop to create enemies in each row
          for (let col = 0; col <= row; col++) {
            this.createEnemy(startX + col * (gap + 50), posY);
          }
        }
      }
      

      createBottomRightWave(waveSize) {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        
        let [startX, startY] = this.getStartingPosition(Corners.BOTTOM_RIGHT);
      
        let gap = playerCanvas.width / 130;
      
        // Loop to create 3 rows of enemies, starting from the bottom row
        for (let row = waveSize - 1; row >= 0; row--) {
          // Start creating enemies from the corner and move upwards
          let posY = startY - (waveSize - 1 - row) * (gap + 50);
      
          // Loop to create enemies in each row
          for (let col = 2; col >= 2 - row; col--) {
            // Start creating enemies from the corner and move to the left
            let posX = startX - (2 - col) * (gap + 50);
            this.createEnemy(posX, posY);
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
          return [playerCanvas.width / 100, playerCanvas.width / 100];
        } else if (corner === Corners.UPPER_RIGHT) {
          return [playerCanvas.width - playerCanvas.width / 100, playerCanvas.width / 100];
        
        } else if (corner === Corners.BOTTOM_LEFT) {
          return [playerCanvas.width / 100, playerCanvas.height - playerCanvas.width / 100];
        } else if (corner === Corners.BOTTOM_RIGHT) {
          return [playerCanvas.width - playerCanvas.width / 100, playerCanvas.height - playerCanvas.width / 100];
        }
      }

      createEnemy(x, y) {
        let newEnemy = new Enemy(
          this.game,
          x,
          y,
          50,
          50,
          50,
          5,
          100,
          0,
          0,
          0,
          "blue"
        );
      
        this.game.enemies.push(newEnemy);
      }
}