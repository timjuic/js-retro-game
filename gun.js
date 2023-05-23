import { RectangleEntity } from "./entity.js"

export default class Gun {
    constructor(name, fireRate, maxAmmo, automatic, damage, bulletImgPath) {
        this.name = name;
        this.fireRate = fireRate
        this.automatic = automatic
        this.remainingAmmo = maxAmmo
        this.maxAmmo = maxAmmo
        this.damage = damage
        this.bulletImg = new Image()
        this.bulletImg.src = bulletImgPath;

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
        console.log((Date.now() - this.lastShotTimestamp), this.fireRate);
        return (Date.now() - this.lastShotTimestamp) > this.fireRate;
    }

    
}