import BasicEnemy from "./enemies/basic-enemy.js";
import BuffEnemy from "./enemies/buff-enemy.js";
import GrowingEnemy from "./enemies/growing-enemy.js";
import KamikazeEnemy from "./enemies/kamikaze-enemy.js";
import PufPufEnemy from "./enemies/pufpuf-enemy.js";
import ShieldedEnemy from "./enemies/shielded-enemy.js";
import SpawnerEnemy from "./enemies/spawner-enemy.js";
import SpeedyEnemy from "./enemies/speedy-enemy.js";
import TankEnemy from "./enemies/tank-enemy.js";
import TeleporterEnemy from "./enemies/teleporter-enemy.js";

class EnemyRegistry {
    constructor() {
        this.registry = {};
        this.registerEnemies();
    }

    registerEnemies() {
        this.registerEnemyClass('BasicEnemy', BasicEnemy);
        this.registerEnemyClass('BuffEnemy', BuffEnemy);
        this.registerEnemyClass('TankEnemy', TankEnemy);
        // this.registerEnemyClass('BasicEnemy', GrowingEnemy);
        this.registerEnemyClass('KamikazeEnemy', KamikazeEnemy);
        this.registerEnemyClass('PufPufEnemy', PufPufEnemy);
        this.registerEnemyClass('ShieldedEnemy', ShieldedEnemy);
        this.registerEnemyClass('SpawnerEnemy', SpawnerEnemy);
        this.registerEnemyClass('SpeedyEnemy', SpeedyEnemy);
        this.registerEnemyClass('TankEnemy', TankEnemy);
        this.registerEnemyClass('TeleporterEnemy', TeleporterEnemy);
    }

    registerEnemyClass(className, enemyClass) {
        this.registry[className] = enemyClass;
    }

    getEnemyClassByName(className) {
        return this.registry[className];
    }
}

const enemyRegistry = new EnemyRegistry();
export default enemyRegistry;