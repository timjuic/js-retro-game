import { RectangleEntity } from "./entity.js";
import MathUtil from "./helpers/math-util.js";

export default class Bullet extends RectangleEntity {
    constructor(game, posX, posY, width, height, angle, velX, velY, velRotation, damage, piercing, knockbackMultiplier, color, image) {
        super(game, posX, posY, width, height, angle, velX, velY, velRotation, color, image)
        this.damage = damage;
        this.piercing = piercing;
        this.damageDone = false;
        this.knockbackMultiplier = knockbackMultiplier;
    }

    draw(ctx) {      
        ctx.save();
          
        let centerX = this.posX + this.width / 2;
        let centerY = this.posY + this.width / 2;
          
        // ctx.translate(centerX, centerY);
        // ctx.rotate(MathUtil.degreesToRadians(this.angle));
        // ctx.translate(-centerX, -centerY);

        if (this.image !== undefined) {
            let scaledWidth = this.width * this.game.settings.BULLET_SIZE_MODIFIER;
            let scaledHeight = this.height * this.game.settings.BULLET_SIZE_MODIFIER;

            let centerX = this.posX + this.width / 2;
            let centerY = this.posY + this.width;
            let scaledPosX = centerX - scaledWidth / 2;

            let scaledPosY = centerY - scaledHeight;
            if (scaledPosY < this.posY - scaledHeight / 3) {
                scaledPosY = this.posY - scaledHeight / 3;
            }

            ctx.drawImage(this.image, scaledPosX, scaledPosY, scaledWidth, scaledHeight);
          
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(
              this.posX,
              this.posY,
              this.width,
              this.width
            );
        }

        ctx.fillStyle = this.color;
            ctx.fillRect(
              this.posX,
              this.posY,
              this.width,
              this.width
            );
         
        ctx.restore();
      }
}