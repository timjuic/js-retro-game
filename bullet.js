import { RectangleEntity } from "./entity.js";
import MathUtil from "./helpers/math-util.js";

export default class Bullet extends RectangleEntity {
    constructor(game, posX, posY, width, height, angle, velX, velY, velRotation, damage, piercing, knockbackMultiplier, color, image) {
        super(game, posX, posY, width, height, angle, velX, velY, velRotation, color, image)
        this.damage = damage;
        this.piercing = piercing;
        this.knockbackMultiplier = knockbackMultiplier;
    }

    draw(canvasName) {
        let ctx = this.game.getCanvasManager().getContext(canvasName);
      
        ctx.save();
          
        let centerX = this.posX + this.width / 2;
        let centerY = this.posY + this.height / 2;
          
        ctx.translate(centerX, centerY);
        ctx.rotate(MathUtil.degreesToRadians(this.angle));
        ctx.translate(-centerX, -centerY);

        if (this.image !== undefined) {
            let bulletScale = 2;

            // Calculate the new dimensions after scaling
            let scaledWidth = this.width * bulletScale;
            let scaledHeight = this.height * bulletScale * 2;

            // Calculate the position to keep the image centered within the rectangle
            let centerX = this.posX + this.width / 2;
            let centerY = this.posY + this.height;
            let scaledPosX = centerX - scaledWidth / 2;

            // Ensure the scaledPosY is within the front side boundary
            let scaledPosY = centerY - scaledHeight;
            if (scaledPosY < this.posY - 10) {
                scaledPosY = this.posY - 10;
            }

            ctx.drawImage(this.image, scaledPosX, scaledPosY, scaledWidth, scaledHeight);
          
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(
              this.posX,
              this.posY,
              this.width,
              this.height
            );
        }
         
        ctx.restore();
      }
}