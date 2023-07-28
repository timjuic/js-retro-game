import BasicEnemy from "../enemies/basic-enemy.js";
import Enemy from "../enemies/enemy.js";

export default class Wave {
    constructor(game) {
        this.game = game;
    }

    createEnemy(x, y) {
        let newEnemy = new BasicEnemy(
          this.game,
          x,
          y,
          0,
          0,
          0,
          "blue"
        );

        for (const enemy of this.game.enemies) {
            if (this.game.getCollisionDetector().collidesWithEntity(newEnemy, enemy)) return;
        }
        if (this.game.getCollisionDetector().collidesWithEntity(newEnemy, this.game.player)) return;
        
      
        this.game.enemies.push(newEnemy);
      }
}