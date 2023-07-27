import Enemy from "./enemies/enemy.js";
import Sides from "./enums/sides.js";

export default class SideWave {
    constructor(game, waveSize) {
        this.game = game;

        let side = this.getFurthestSideFromPlayer()
        this.createLineWave(waveSize, side)
    }

    createLineWave(numEnemies, side) {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        let borderGap = playerCanvas.width / 150;
        let gap = (side === Sides.TOP || side === Sides.BOTTOM) ? playerCanvas.width / numEnemies : playerCanvas.height / numEnemies;
        let startPos = gap / 2;  // start from the center of the gap
        let borderManager = this.game.getBorderManager();

        for (let i = 0; i < numEnemies; i++) {
          let posX, posY;
      
          switch (side) {
            case Sides.TOP:
              posX = startPos + i * gap;
              posY = borderManager.getTopBorder() + borderGap;
              break;
            case Sides.BOTTOM:
              posX = startPos + i * gap;
              posY = borderManager.getBottomBorder() - borderGap - 20;  // assuming enemy height is 50
              break;
            case Sides.LEFT:
              posX = borderManager.getLeftBorder() + borderGap;
              posY = startPos + i * gap;
              break;
            case Sides.RIGHT:
              posX = borderManager.getRightBorder() - borderGap - 20;  // assuming enemy width is 50
              posY = startPos + i * gap;
              break;
          }
      
          this.createEnemy(posX, posY);
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

      createEnemy(x, y) {
        let newEnemy = new Enemy(
          this.game,
          x,
          y,
          20,
          20,
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