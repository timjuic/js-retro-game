import Gun from "./gun.js";

export default class IoniserGun extends Gun {
    constructor(game) {
        let bulletWidth = 1;
        let bulletHeight = 2;
        let fireRate = 60;
        let automatic = true;
        let damage = 20;
        let grains = 1;
        let accuracy = 70;
        let piercing = false;
        let knockbackMultiplier = 0.5;
        let bulletImage = game.getAssetManager().bullets.bullet1;
        super(game, bulletWidth, bulletHeight, fireRate, automatic, damage, grains, accuracy,piercing, knockbackMultiplier, bulletImage) 
    }
}