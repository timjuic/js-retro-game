import { RectangleEntity } from "../entity.js";
import MathUtil from "../helpers/math-util.js";

export default class Particle extends RectangleEntity {
    constructor(game, posX, posY, width, height, angle, velX, velY, velRotation, color, opacity, image) {
        super(game, posX, posY, width, height, angle, velX, velY, velRotation, color, image)
        this.opacity = opacity;
        this.decay = MathUtil.generateRandomNumber(0.8, 0.95);
    }

    draw(canvasName) {
        let ctx = this.game.getCanvasManager().getContext(canvasName);
    
        ctx.save();
          
        let centerX = this.posX + this.width / 2;
        let centerY = this.posY + this.height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate(this.angle);
        ctx.translate(-centerX, -centerY);

        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        ctx.globalAlpha = 1;
        
         
        ctx.restore(); // Restore the original state of the canvas
    }

    updatePosition() {
        this.velX *= this.decay;
        this.velY *= this.decay;
        this.velRotation *= this.decay;
        this.posX += this.velX;
        this.posY += this.velY;
        this.angle += this.velRotation;  
        
        if (Math.abs(this.velX) < 0.01) {
            this.opacity *= 0.9;
        }
    }
}