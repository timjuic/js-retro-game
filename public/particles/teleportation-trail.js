import { Entity, RectangleEntity } from "../entity.js";

export default class TeleportationTrail extends RectangleEntity {
    constructor(game, parentEntity, posX, posY, width, height, angle, velX, velY, velRotation, opacity, color, image) {
        super(game, posX, posY, width, height, angle, velX, velY, velRotation, color, image);
        this.parentEntity = parentEntity;
        this.opacity = opacity;
        this.image = parentEntity.image;
        this.fadeSpeed = 0.02;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        ctx.restore();
    }

    update() {
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0) {
            const index = this.game.particles.indexOf(this);
            if (index > -1) {
                this.game.particles.splice(index, 1);
            }
        }
    }
}