import { RectangleEntity } from "./entity.js"

export default class Gun {
    constructor(game, fireRate, maxAmmo, automatic, damage) {
        this.game = game;
        this.fireRate = fireRate
        this.automatic = automatic
        this.remainingAmmo = maxAmmo
        this.maxAmmo = maxAmmo
        this.damage = damage
        
    }

    shoot() {
        let bullet = new RectangleEntity()
    }
}