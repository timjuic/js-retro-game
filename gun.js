export default class Gun {
    constructor(fireRate, maxAmmo, automatic, damage) {
        this.fireRate = fireRate
        this.automatic = automatic
        this.remainingAmmo = maxAmmo
        this.maxAmmo = maxAmmo
        this.damage = damage
        
    }
}