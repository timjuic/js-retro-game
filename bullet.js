import { RectangleEntity } from "./entity.js";

export default class Bullet extends RectangleEntity {
    constructor(game, posX, posY, width, height, angle, velX, velY, damage, color, image) {
        super(game, posX, posY, width, height, angle, velX, velY, color, image)
        this.damage = damage;
    }
}