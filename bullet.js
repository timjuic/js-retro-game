import { RectangleEntity } from "./entity.js";
import MathUtil from "./helpers/math-util.js";

export default class Bullet extends RectangleEntity {
    constructor(game, posX, posY, width, height, angle, velX, velY, damage, color, image) {
        super(game, posX, posY, width, height, angle, velX, velY, color, image)
        this.damage = damage;
    }

    draw(canvasName) {
        let ctx = this.game.getCanvasManager().getContext(canvasName);
      
        ctx.save(); // Save the current state of the canvas
          
        let centerX = this.posX + this.width / 2;
        let centerY = this.posY + this.height / 2;
          
        ctx.translate(centerX, centerY);
        ctx.rotate(this.angle);
        ctx.translate(-centerX, -centerY);
        
        if (this.image !== undefined) {
            ctx.drawImage(
                this.image,
                this.posX,
                this.posY,
                this.width,
                this.height
            );
          
        } else {
          ctx.fillStyle = this.color;
          ctx.fillRect(
            this.posX,
            this.posY,
            this.width,
            this.height
          );
        }
         
        ctx.restore(); // Restore the original state of the canvas
      }
}