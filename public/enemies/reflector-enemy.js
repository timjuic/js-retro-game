import Bullet from "../bullet.js";
import MathUtil from "../helpers/math-util.js";
import Enemy from "./enemy.js";

export default class ReflectorEnemy extends Enemy {
    static baseWidth = 3;
    static baseHeight = 3;
    static startingHealth = 40;
    static buffness = Enemy.calculateBuffness(ReflectorEnemy.startingHealth)
    static level = 1;

    constructor(game, wave, posX, posY, angle, velX, velY, velRotation, color) {
        let width = 3;
        let height = 3;
        let moveInterval = 50;
        let speed = 5;
        let health = ReflectorEnemy.startingHealth;
        let damage = 10;
        let image = game.assetLoader.characters.reflector;
        super(game, wave, ReflectorEnemy.level, posX, posY, width, height, moveInterval, speed, health, damage, angle, velX, velY, velRotation, color, image);
        this.reflectionChance = 0.2;
    }

    onDamaged(entity) {
        if (!(entity instanceof Bullet)) return;
        let randomChance = MathUtil.generateRandomNumber(0, 1);
        if (this.reflectionChance > randomChance) {
            if (entity.reflected) return;
            entity.reflected = true;
            let reflectedBullet = entity;
            reflectedBullet.velX = -entity.velX / 2;
            reflectedBullet.velY = -entity.velY / 2;

            reflectedBullet.angle += 180;
            if (reflectedBullet.angle >= 360) reflectedBullet.angle -= 360;
            reflectedBullet.damage = this.damage;
            reflectedBullet.image = this.game.getAssetManager().bullets.enemybullet;
            this.game.enemyBullets.push(reflectedBullet)
            return false;
        }
        return true;
    }
}