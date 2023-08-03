import { CircleEntity } from "../entity.js";

export default class ShieldParticle extends CircleEntity {
    constructor(game, parentEntity, posX, posY, radius, velX, velY, side, color) {
        super(game, posX, posY, radius, velX, velY, color)
        this.parentEntity = parentEntity;
        this.side = side; // 0: left, 1: right
        this.ticksVisible = 0;
        this.maxTicks = 50;
        this.shieldIconSize = 15;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
    
        // Calculate the center of the enemy
        let centerX = this.parentEntity.posX + this.parentEntity.width / 2;
        let centerY = this.parentEntity.posY + this.parentEntity.height / 2;
    
        // Move to the center of the enemy
        ctx.moveTo(centerX, centerY);
    
        // Determine start and end angles based on the side
        let startAngle, endAngle;
        if (this.side === 1) { // Left side
            startAngle = (180 - 45) * Math.PI / 180; 
            endAngle = (270 - 45) * Math.PI / 180;
        } else { // Right side
            startAngle = (0 - 45) * Math.PI / 180; 
            endAngle = (90 - 45) * Math.PI / 180;
        }
    
        // Draw a path to the edge of the circle and around the circle
        ctx.arc(centerX, centerY, this.radius, startAngle, endAngle);
    
        // Draw a path back to the center of the enemy
        ctx.lineTo(centerX, centerY);
    
        ctx.fillStyle = 'rgba(135,206,235,0.5)'; // Light Blue
        ctx.fill();
        ctx.restore();
        

        this.ticksVisible++;

        if (this.ticksVisible >= this.maxTicks) {
            this.game.particles = this.game.particles.filter(particle => particle !== this);
            this.parentEntity.hasShieldActive = false;
        }
    }
    
}