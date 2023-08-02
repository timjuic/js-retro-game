import { CircleEntity } from "./entity.js";

export default class Explosion extends CircleEntity {
    constructor(game, posX, posY, radius, velX, velY, maxSize, spreadSpeed, color) {
        super(game, posX, posY, radius, velX, velY, color)
        this.maxSize = maxSize;
        this.spreadSpeed = spreadSpeed;
        this.opacity = 1;
        console.log(this.color);
    }

    update() {
        if (this.radius < this.maxSize) {
            this.radius += this.spreadSpeed;
            this.spreadSpeed *= 0.98;
        }
    
        if (this.isFinished()) {
            this.opacity -= this.spreadSpeed / this.maxSize / 4; // This will create a fade out effect
        }

        if (this.isFinished() && !this.isVisible()) {
            console.log('Removed it');
            console.log(this.game.explosions.length);
            this.game.explosions = this.game.explosions.filter(explosion => explosion !== this);
            console.log(this.game.explosions.length);
        }
    }

    draw(ctx) {
        console.log('drawring it');
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    
        const gradient = ctx.createRadialGradient(this.posX, this.posY, 0, this.posX, this.posY, this.radius);
        gradient.addColorStop(0, `rgba(150, 0, 0, 0)`);
        gradient.addColorStop(1, `rgba(150, 0, 0, ${this.opacity})`);
    
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
    }

    isFinished() {
        return this.radius >= this.maxSize;
    }

    isVisible() {
        return this.opacity > 0;
    }
}