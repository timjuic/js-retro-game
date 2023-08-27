import BasicEnemy from "./enemies/basic-enemy.js";
import BuffEnemy from "./enemies/buff-enemy.js";
import GhostEnemy from "./enemies/ghost-enemy.js";
import GrowingEnemy from "./enemies/growing-enemy.js";
import KamikazeEnemy from "./enemies/kamikaze-enemy.js";
import PufPufEnemy from "./enemies/pufpuf-enemy.js";
import ReflectorEnemy from "./enemies/reflector-enemy.js";
import ShieldedEnemy from "./enemies/shielded-enemy.js";
import SpawnerEnemy from "./enemies/spawner-enemy.js";
import SpeedyEnemy from "./enemies/speedy-enemy.js";
import SplittingEnemy from "./enemies/splitting-enemy.js";
import TankEnemy from "./enemies/tank-enemy.js";
import TeleporterEnemy from "./enemies/teleporter-enemy.js";
import WandererEnemy from "./enemies/wanderer-enemy.js";

class EnemyRegistry {
    constructor() {
        this.registry = {};
        this.registerEnemies();
    }

    registerEnemies() {
        this.registerEnemyClass('BasicEnemy', BasicEnemy);
        this.registerEnemyClass('BuffEnemy', BuffEnemy);
        this.registerEnemyClass('TankEnemy', TankEnemy);
        this.registerEnemyClass('GrowingEnemy', GrowingEnemy);
        this.registerEnemyClass('KamikazeEnemy', KamikazeEnemy);
        this.registerEnemyClass('PufPufEnemy', PufPufEnemy);
        this.registerEnemyClass('ShieldedEnemy', ShieldedEnemy);
        this.registerEnemyClass('SpawnerEnemy', SpawnerEnemy);
        this.registerEnemyClass('SpeedyEnemy', SpeedyEnemy);
        this.registerEnemyClass('TeleporterEnemy', TeleporterEnemy);
        this.registerEnemyClass('ReflectorEnemy', ReflectorEnemy);
        this.registerEnemyClass('SplittingEnemy', SplittingEnemy);
        this.registerEnemyClass('WandererEnemy', WandererEnemy)
        this.registerEnemyClass('GhostEnemy', GhostEnemy)
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