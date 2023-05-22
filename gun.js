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
    }
}