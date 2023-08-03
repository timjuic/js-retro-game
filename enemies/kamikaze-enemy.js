import Explosion from "../particles/explosion.js";
import Enemy from "./enemy.js";

export default class KamikazeEnemy extends Enemy {
    static baseWidth = 3;
    static baseHeight = 3;

    constructor(game, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = 3;
        let moveInterval = 10;
        let speed = 8;
        let health = 50;
        let damage = 50;
        let image = game.assetLoader.enemyAssets.enemy1;
        super(game, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
    }


    onDeath() {
        let centerX = this.posX + this.width / 2;
        let centerY = this.posY + this.height / 2;
        let explosion = new Explosion(this.game, centerX, centerY, 0, 0, 0, 100, 6, 'rgba(255, 0, 0, 1)');
        this.game.explosions.push(explosion)
    }
}