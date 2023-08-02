import { RectangleEntity } from "../entity.js"
import MathUtil from "../helpers/math-util.js";
import ParticleManager from "../particle-manager.js";
import Particle from "../particle.js";

export default class Enemy extends RectangleEntity {
    constructor(game, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image) {
        super(game, posX, posY, width, height, angle, velX, velY, velRotation, color, image)
        this.moveInterval = moveInterval;
        this.speed = speed;
        this.health = health;
        this.damage = damage;
        this.ticksPassed = 0;
    }

    isAlive() {
      return this.health > 0;
    }

    move() {
      const randomOffset = Math.floor(Math.random() * this.moveInterval);
  
      this.ticksPassed++;
    
      if ((this.ticksPassed + randomOffset) % this.moveInterval !== 0) {
        return; // Skip moving on this tick
      }
      
        // Calculate the direction vector towards the player
        const playerX = this.game.player.posX;
        const playerY = this.game.player.posY;
      
        const dx = playerX - this.posX;
        const dy = playerY - this.posY;
      
        // Calculate the total distance to the player
        const distance = Math.sqrt(dx * dx + dy * dy);
      
        // Calculate the normalized direction vector
        const directionX = dx / distance;
        const directionY = dy / distance;
      
        // Calculate the movement amount based on speed
        const moveAmount = this.speed;
      
        // Calculate the potential new positions in both X and Y directions
        const newX = this.posX + moveAmount * directionX;
        const newY = this.posY + moveAmount * directionY;
      
        // Check for collisions with other enemies in the X direction
        let canMoveX = true;
        for (const enemy of this.game.enemies) {
          if (enemy !== this && this.game.getCollisionDetector().collidesWithEntity({ posX: newX, posY: this.posY, width: this.width, height: this.height }, enemy)) {
            canMoveX = false;
            break;
          }
        }
      
        // Check for collisions with other enemies in the Y direction
        let canMoveY = true;
        for (const enemy of this.game.enemies) {
          if (enemy !== this && this.game.getCollisionDetector().collidesWithEntity({ posX: this.posX, posY: newY, width: this.width, height: this.height }, enemy)) {
            canMoveY = false;
            break;
          }
        }
      
        if (newX < this.posX) this.lastMovedDirection = -1;
        if (newX > this.posX) this.lastMovedDirection = 1;

        // Update the enemy position based on collision detection results
        if (canMoveX) {
          this.posX = newX;
        }
      
        if (canMoveY) {
          this.posY = newY;
        }
      }
      

      onDeath() {
        let particleManager = new ParticleManager(this.game, this, 0.4, Math.round(this.game.settings.PARTICLE_AMOUNT_MODIFIER / this.width), this.width / 2);
        this.game.particleManagers.push(particleManager)
        particleManager.createParticleExplosion(); 
      };
}