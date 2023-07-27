import Enemy from "./enemies/enemy.js";
import WaveType from "./enums/wave-type.js";

export default class Wave {
    constructor(game, waveType, enemyType) {
        this.game = game;
        if (waveType === WaveType.CORNER_SMALL) {
            this.createSmallCornerWave(enemyType)
        } else if (waveType === WaveType.CORNER_MEDIUM) {

        }  else if (waveType === WaveType.CORNER_BIG) {
            
        } else if (waveType === WaveType.SIDE) {

        }

        console.log(this.game.enemies);
    }

    createSmallCornerWave() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        let cornerX = playerCanvas.width / 50;
        let cornerY = playerCanvas.width / 50;
        let gap = playerCanvas.width / 130;
      
        // Loop to create 3 rows of enemies
        for (let row = 0; row < 3; row++) {
          let posX = cornerX;
          let posY = cornerY + row * (gap + 50);
      
          // Loop to create enemies in each row
          for (let col = 0; col < 3 - row; col++) {
            let newEnemy = new Enemy(
              this.game,
              posX + col * (gap + 50),
              posY,
              50,
              50,
              50,
              5,
              100,
              0,
              0,
              0,
              "blue"
              /* other enemy attributes */
            );
            
            this.game.enemies.push(newEnemy);
          }
        }
      }




}