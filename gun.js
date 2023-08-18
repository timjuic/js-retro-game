import { RectangleEntity } from "./entity.js"

export default class Gun {
    constructor(name, fireRate, maxAmmo, automatic, damage, grainsAmount, accuracy, piercing, knockbackMultiplier) {
        this.name = name;
        this.fireRate = fireRate
        this.automatic = automatic
        this.remainingAmmo = maxAmmo
        this.maxAmmo = maxAmmo
        this.damage = damage
        this.grains = grainsAmount;
        this.accuracy = accuracy
        this.piercing = piercing;
        this.knockbackMultiplier = knockbackMultiplier;
        // this.bulletImg = game.getAssetManager().bullets.bullet;
        // this.bulletImg.src = bulletImgPath;
        this.lastShotTimestamp = null;
    }

    addToGame(game) {
        console.log(game);
        this.game = game;
        this.bulletImg = game.getAssetManager().bulletAssets.bullet
    }

    isAutomatic() {
        return this.automatic;
    }

    getFireRate() {
        return this.fireRate;
    }

    saveShotTimestamp() {
        this.lastShotTimestamp = Date.now();
    }

    canShoot() {
        return (Date.now() - this.lastShotTimestamp) > this.fireRate;
    }

    getGrainsAmount() {
        return this.grains;
    }

    
}