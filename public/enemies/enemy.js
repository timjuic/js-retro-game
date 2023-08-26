import { RectangleEntity } from "../entity.js"
import HealthBar from "../healthbar.js";
import MathUtil from "../helpers/math-util.js";
import ParticleManager from "../particles/particle-manager.js";
import Particle from "../particles/particle.js";

export default class Enemy extends RectangleEntity {
    constructor(game, wave, level, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image) {
        super(game, posX, posY, width, height, angle, velX, velY, velRotation, color, image)
        this.wave = wave;
        this.level = level;
        this.moveInterval = moveInterval;
        this.speed = speed * this.game.canvas.width / this.game.settings.ENEMY_SPEED_MODIFIER * (1 + game.settings.ENEMY_SPEED_INCREASE_PER_LEVEL_PERC / 100 * (this.level - 1));
        this.health = health * (1 + game.settings.ENEMY_HEALTH_INCREASE_PER_LEVEL_PERC / 100 * (this.level - 1));
        this.maxHealth = this.health;
        this.damage = damage;
        this.ticksPassed = 0;
        this.healthBar = new HealthBar(game, this);
        
    }

    isAlive() {
      return this.health > 0;
    }

    move() {
        this.ticksPassed++;
        if (!this.wave.spawningFinished) return;
        const randomOffset = Math.floor(Math.random() * this.moveInterval);

        if ((this.ticksPassed + randomOffset) % this.moveInterval !== 0) {
            return;
        }

        const playerX = this.game.player.posX;
        const playerY = this.game.player.posY;

        const dx = playerX - this.posX;
        const dy = playerY - this.posY;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const directionX = dx / distance;
        const directionY = dy / distance;

        const moveAmount = this.speed;

        const newX = this.posX + moveAmount * directionX;
        const newY = this.posY + moveAmount * directionY;

        let canMoveX = true;
        for (const enemy of this.game.enemies) {
            if (enemy !== this && this.game.getCollisionDetector().collidesWithEntity({ posX: newX, posY: this.posY, width: this.width, height: this.height }, enemy)) {
                canMoveX = false;
                break;
            }
        }

        let canMoveY = true;
        for (const enemy of this.game.enemies) {
            if (enemy !== this && this.game.getCollisionDetector().collidesWithEntity({ posX: this.posX, posY: newY, width: this.width, height: this.height }, enemy)) {
                canMoveY = false;
                break;
            }
        }

        if (newX < this.posX) this.lastMovedDirection = -1;
        if (newX > this.posX) this.lastMovedDirection = 1;

        if (canMoveX) {
            this.posX = newX;
        }

        if (canMoveY) {
            this.posY = newY;
        }
    }


      onDeath() {
        let particleManager = new ParticleManager(this.game, this, this.width / 2);
        this.game.particleManagers.push(particleManager)
        particleManager.createParticleExplosion(); 
        this.game.soundManager.playSound('enemy_death.wav')
      };

      onDamaged() {
        return true;
      }

      static calculateBuffness(health) {
        return health / 4;
      }

      draw(ctx) {
        super.draw(ctx);
        if (!this.healthBar) return;
        this.healthBar.draw();
      }
}