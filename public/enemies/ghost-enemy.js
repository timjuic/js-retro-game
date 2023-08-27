import WaveTypes from "../enums/wave-types.js";
import Enemy from "./enemy.js";

export default class GhostEnemy extends Enemy {
    static baseWidth = 3;
    static baseHeight = 3;
    static startingHealth = 40;
    static threatRating = 2
    static level = 1;
    static possibleWaveTypes = [WaveTypes.RANDOM_WAVE]

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = 3;
        let moveInterval = 1;
        let speed = 1;
        let health = GhostEnemy.startingHealth;
        let damage = 10;
        let image = game.assetLoader.characters.ghost;
        super(game, wave, GhostEnemy.level, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
        this.opacity = 0.5;
    }


    move(targetLocation) {
        this.ticksPassed++;
        if (!this.wave.spawningFinished) return;
        const randomOffset = Math.floor(Math.random() * this.moveInterval);

        if ((this.ticksPassed + randomOffset) % this.moveInterval !== 0) {
            return;
        }

        if (targetLocation !== undefined) {
            var targetX = targetLocation.posX;
            var targetY = targetLocation.posY;
        } else {
            var targetX = this.game.player.posX;
            var targetY = this.game.player.posY;
        }
        
        const dx = targetX - this.posX;
        const dy = targetY - this.posY;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const directionX = dx / distance;
        const directionY = dy / distance;

        const moveAmount = this.speed;

        const newX = this.posX + moveAmount * directionX;
        const newY = this.posY + moveAmount * directionY;


        if (newX < this.posX) this.lastMovedDirection = -1;
        if (newX > this.posX) this.lastMovedDirection = 1;
        this.posX = newX;
        this.posY = newY;
    }
}