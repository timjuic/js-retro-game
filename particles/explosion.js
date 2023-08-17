import { CircleEntity } from "../entity.js";

export default class Explosion extends CircleEntity {
    constructor(game, posX, posY, radius, velX, velY, maxSize, spreadSpeed, damage, color) {
        super(game, posX, posY, radius, velX, velY, color)
        this.damage = damage;
        this.playerAffected = false;
        this.maxSize = maxSize;
        this.spreadSpeed = spreadSpeed;
        this.fadeSpeed = 8;
        this.opacity = 1;
    }

    didDamageToPlayer() {
        return this.playerAffected;
    }

    update() {
        if (this.radius < this.maxSize) {
            this.radius += this.spreadSpeed;
            this.spreadSpeed *= 0.98;
        }
    
        if (this.isFinished()) {
            console.log(this.spreadSpeed);
            this.opacity -= this.fadeSpeed / this.maxSize / 4; // This will create a fade out effect
        }

        if (this.isFinished() && !this.isVisible()) {
            this.game.explosions = this.game.explosions.filter(explosion => explosion !== this);
        }
    }

    draw(ctx) {
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