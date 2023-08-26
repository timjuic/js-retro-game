import Gun from "./gun.js";

export default class QuantumBeamerGun extends Gun {
    constructor(game) {
        let bulletWidth = 1.5;
        let bulletHeight = 4;
        let fireRate = 150;
        let automatic = true;
        let damage = 80;
        let grains = 1;
        let accuracy = 20;
        let piercing = true;
        let knockbackMultiplier = 1;
        let bulletImage = game.getAssetManager().bullets.bullet3;
        super(game, bulletWidth, bulletHeight, fireRate, automatic, damage, grains, accuracy,piercing, knockbackMultiplier, bulletImage) 
    }
}