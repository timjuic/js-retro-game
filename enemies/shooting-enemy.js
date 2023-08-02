import Bullet from "../bullet.js";
import MathUtil from "../helpers/math-util.js";
import Enemy from "./enemy.js";

export default class ShooterEnemy extends Enemy {
    constructor(game, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, shootTickInterval, accuracy, gunKnockbackMultiplier, color, image) {
        if (new.target === ShooterEnemy) {
            throw new Error("Cannot create an instance of ShooterEnemy. Please choose its child implementation")
        }

        super(game, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
        this.canShoot = true;
        this.shootTickInterval = shootTickInterval;
        this.accuracy = accuracy;
        this.gunKnockbackMultiplier = gunKnockbackMultiplier;
        this.shootTickCounter = 0;
    }

    runShootAbility() {
        const randomOffset = MathUtil.generateRandomInteger(1, this.shootTickInterval)

        this.shootTickCounter++;
        if ((this.shootTickCounter + randomOffset) % this.shootTickInterval === 0) {
            this.createBullet(this, this.game.player);
            this.shootTickCounter = 0;
        }
    }

    createBullet(entity, targetEntity) {
        let centerX = this.posX + this.width / 2;
        let centerY = this.posY + this.height / 2;
        let targetX = targetEntity.posX + targetEntity.width / 2;
        let targetY = targetEntity.posY + targetEntity.height / 2;
        let deviationX = MathUtil.generateRandomInteger(-this.accuracy, this.accuracy);
        let deviationY = MathUtil.generateRandomInteger(-this.accuracy, this.accuracy);
        let distanceFromTarget = MathUtil.calculateDistance(centerX, centerY, targetX, targetY);
        let grainTargetPointX = targetX + deviationX * distanceFromTarget / 1000;
        let grainTargetPointY = targetY + deviationY * distanceFromTarget / 1000;
    
        let grainAngle = MathUtil.calculateAngle(centerX, centerY, grainTargetPointX, grainTargetPointY);
        let grainDistanceFromTarget = MathUtil.calculateDistance(centerX, centerY, grainTargetPointX, grainTargetPointY)
        let grainVectorX = (grainTargetPointX - centerX) / (grainDistanceFromTarget / entity.game.settings.BULLET_SPEED_MODIFIER);
        let grainVectorY = (grainTargetPointY - centerY) / (grainDistanceFromTarget / entity.game.settings.BULLET_SPEED_MODIFIER);
    
        let bullet = new Bullet(entity.game, centerX - 7, centerY - 7, 1, 1, grainAngle, grainVectorX, grainVectorY, 0, entity.damage, false, entity.gunKnockbackMultiplier, "blue", this.game.assetLoader.bulletAssets.enemybullet)
        entity.game.enemyBullets.push(bullet);
    }
}