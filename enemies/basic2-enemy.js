import Enemy from "./enemy.js";

export default class Basic2Enemy extends Enemy {
    static baseWidth = 6;
    static baseHeight = 6;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color, image) {
        let width = 6;
        let height = 6;
        let moveInterval = 200;
        let speed = 5;
        let health = 60;
        let damage = 20;
        super(game, wave, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
    }
}