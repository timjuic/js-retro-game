import Enemy from "./enemy.js";

export default class Basic2Enemy extends Enemy {
    constructor(game, posX, posY, angle, velX, velY, velRotation, color, image) {
        let width = 6;
        let height = 6;
        let moveInterval = 200;
        let speed = 5;
        let health = 40;
        super(game, posX, posY, width, height, moveInterval, speed, health, angle, velX, velY, velRotation, color, image);
    }
}