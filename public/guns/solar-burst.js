import Gun from "./gun.js";

export default class SolarBurstGun extends Gun {
    constructor(game) {
        let bulletWidth = 1;
        let bulletHeight = 3;
        let fireRate = 100;
        let automatic = true;
        let damage = 3;
        let grains = 5;
        let accuracy = 180;
        let piercing = false;
        let knockbackMultiplier = 8;
        let bulletImage = game.getAssetManager().bullets.bullet2;
        super(game, bulletWidth, bulletHeight, fireRate, automatic, damage, grains, accuracy,piercing, knockbackMultiplier, bulletImage) 
    }
}