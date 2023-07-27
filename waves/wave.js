import Enemy from "../enemies/enemy.js";

export default class Wave {
    constructor(game) {
        this.game = game;
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

        for (const enemy of this.game.enemies) {
            if (this.game.getCollisionDetector().collidesWithEntity(newEnemy, enemy)) return;
        }
        if (this.game.getCollisionDetector().collidesWithEntity(newEnemy, this.game.player)) return;
        
      
        this.game.enemies.push(newEnemy);
      }
}