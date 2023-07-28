import Enemy from "./enemy.js";

export default class BasicEnemy extends Enemy {
    constructor(game, posX, posY, angle, velX, velY, color, image) {
        let width = 20;
        let height = 20;
        let moveInterval = 100;
        let speed = 5;
        let health = 20;
        super(game, posX, posY, width, height, moveInterval, speed, health, angle, velX, velY, color, image);
    }
}