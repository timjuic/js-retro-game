import Enemy from "./enemy.js";

export default class Basic2Enemy extends Enemy {
    constructor(game, posX, posY, angle, velX, velY, velRotation, color, image) {
        let width = 40;
        let height = 40;
        let moveInterval = 200;
        let speed = 5;
        let health = 40;
        super(game, posX, posY, width, height, moveInterval, speed, health, angle, velX, velY, velRotation, color, image);
    }
}