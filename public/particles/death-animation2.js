import { RectangleEntity } from "../entity";

export default class DeathAnimation2 {
    constructor(game, entity) {
        this.game = game;
        this.entity = entity;
        this.upperImage;
        this.lowerImage;
        this.sparks = [];
    }

    start() {
        this.upperImage = new RectangleEntity(this.game, this.entity.posX, this.entity.posY, this.entity.width, this.entity.height / 2, 0, -1, -3, 0, 'blue', this.entity.image)
        this.upperImage = new RectangleEntity(this.game, this.entity.posX, this.entity.posY, this.entity.width, this.entity.height / 2, 0, -1, -3, 0, 'blue', this.entity.image)
    }

    update() {

    }

    draw() {

    }
}