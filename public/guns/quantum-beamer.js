import Gun from "./gun.js";

export default class QuantumBeamerGun extends Gun {
    constructor(game) {
        let bulletWidth = 1.5;
        let bulletHeight = 4;
        let fireRate = 120;
        let automatic = true;
        let damage = 30;
        let grains = 1;
        let accuracy = 20;
        let piercing = false;
        let knockbackMultiplier = 1;
        let bulletImage = game.getAssetManager().bullets.bullet3;
        super(game, bulletWidth, bulletHeight, fireRate, automatic, damage, grains, accuracy,piercing, knockbackMultiplier, bulletImage) 
    }
}