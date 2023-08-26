import { RectangleEntity } from "../entity.js"

export default class Gun {
    constructor(game, bulletWidth, bulletHeight, fireRate, automatic, damage, grainsAmount, accuracy, piercing, knockbackMultiplier, bulletImg) {
        this.game = game
        this.bulletWidth = bulletWidth;
        this.bulletHeight = bulletHeight;
        this.fireRate = fireRate
        this.automatic = automatic
        // this.remainingAmmo = maxAmmo
        // this.maxAmmo = maxAmmo
        this.damage = damage
        this.grains = grainsAmount;
        this.accuracy = accuracy
        this.piercing = piercing;
        this.knockbackMultiplier = knockbackMultiplier;
        this.bulletImg = bulletImg;
        this.lastShotTimestamp = null;
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