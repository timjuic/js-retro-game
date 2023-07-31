import BasicEnemy from "../enemies/basic-enemy.js";
import Enemy from "../enemies/enemy.js";

export default class Wave {
    constructor(game, waveSize, enemyType) {
        this.game = game;
        this.waveSize = waveSize;
        this.enemyType = enemyType;
        this.enemyDummy = new enemyType(game);
    }

    createEnemy(x, y) {
      console.log("before !!!!!!");
        let newEnemy = new this.enemyType(
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