import Bullet from "../bullet.js";
import ShieldParticle from "../particles/shield-particle.js";
import Enemy from "./enemy.js";

export default class ShieldedEnemy extends Enemy {
    static baseWidth = 4;
    static baseHeight = 4;
    static startingHealth = 50;
    static buffness = Enemy.calculateBuffness(ShieldParticle.startingHealth)

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = 3;
        let moveInterval = 10;
        let speed = 8;
        let health = ShieldedEnemy.startingHealth;
        let damage = 50;
        let image = game.assetLoader.enemyAssets.enemy1;
        super(game, wave, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image)
        this.hasShieldActive = false;
    }

    onDamaged(entity) {
        if (!(entity instanceof Bullet)) return true;
    
        let isSideHit = false;
        let side = 0; // 0: left, 1: right
    
        if (entity.angle > 45 && entity.angle < 135) {
            isSideHit = true; // Side hit
            side = 1;
        }
        if (entity.angle < 315 && entity.angle > 225) {
            isSideHit = true;
        }
    
        if (isSideHit) {
            if (!this.hasShieldActive) {
                const shield = new ShieldParticle(this.game, this, this.posX + this.width / 2, this.posY + this.height / 2, this.width, 0, 0, side, 'rgba(173, 216, 230, 0.5)');
                this.game.particles.push(shield);
            }
            
            this.hasShieldActive = true;
            return false; // Block the damage
        } else {
            return true; // Allow the damage
        }
    }
}