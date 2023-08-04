import Bullet from "../bullet.js";
import TeleportationTrail from "../particles/teleportation-trail.js";
import Enemy from "./enemy.js";

export default class TeleporterEnemy extends Enemy {
    static baseWidth = 3;
    static baseHeight = 3;
    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = 3;
        let moveInterval = 10;
        let speed = 8;
        let health = 50;
        let damage = 50;
        let image = game.assetLoader.enemyAssets.enemy1;
        super(game, wave, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image)
        this.maxTeleportTimes = 5;
        this.timesTeleported = 0;
        this.maxTeleportDistance = this.width * 4;
    }

    onDamaged(entity) {
        if (!(entity instanceof Bullet)) return;
    
        let teleported = false;
        const oldPosX = this.posX;
        const oldPosY = this.posY;
    
        if (this.timesTeleported < this.maxTeleportTimes) {
            for (let i = 0; i < 10; i++) { // tries 10 times to find a safe spot
                const angle = Math.random() * Math.PI * 2; // Random angle
                const distance = Math.random() * this.maxTeleportDistance; // Random distance
                const newPosX = this.posX + Math.cos(angle) * distance;
                const newPosY = this.posY + Math.sin(angle) * distance;
    
                if (this.#isSafeLocation(newPosX, newPosY)) {
                    this.posX = newPosX;
                    this.posY = newPosY;
                    this.timesTeleported++;
                    teleported = true;
                    break;
                }
            }
        }
    
        if (teleported) {
            this.createDash(oldPosX, oldPosY, this.posX, this.posY);
            return false;
        }
        return true;
    }

    createDash(oldPosX, oldPosY, newPosX, newPosY) {
        const distance = Math.sqrt((newPosX - oldPosX) ** 2 + (newPosY - oldPosY) ** 2);
        const framesCount = Math.floor(distance / 5); // One frame per 5 pixels
        const opacityStep = 1 / framesCount;
    
        for (let i = 0; i < framesCount; i++) {
            const t = i / (framesCount - 1);
            const posX = oldPosX + t * (newPosX - oldPosX);
            const posY = oldPosY + t * (newPosY - oldPosY);
            const opacity = 1 - t * opacityStep;
    
            const trail = new TeleportationTrail(this.game, this, posX, posY, TeleporterEnemy.baseWidth, TeleporterEnemy.baseHeight, 0, 0, 0, 0, 0.4, "blue", this.image);
            this.game.particles.push(trail);
        }
    }
    
    

    #isSafeLocation(posX, posY) {
        let cd = this.game.getCollisionDetector();
        let thisEntity = { posX: posX, posY: posY, width: this.width, height: this.height, angle: 0, }
        let isInsideCanvas = cd.isInsideCanvasBorders(thisEntity);
        let collidesWithEnemy = this.game.enemies.some(enemy => cd.collidesWithEntity(thisEntity, enemy));
        let collidesWithBullet = this.game.playerBullets.some(bullet => cd.collidesWithEntityRotated(thisEntity, bullet));
        let collidesWithPlayer = cd.collidesWithEntity(thisEntity, this.game.player)
        if (isInsideCanvas && !collidesWithBullet && !collidesWithEnemy && !collidesWithPlayer) return true;
        return false;
    }
}