import BasicEnemy from "../enemies/basic-enemy.js";
import BuffEnemy from "../enemies/buff-enemy.js";
import TankEnemy from "../enemies/tank-enemy.js";
import SpeedyEnemy from "../enemies/speedy-enemy.js";
import SpawnerEnemy from "../enemies/spawner-enemy.js";
import KamikazeEnemy from "../enemies/kamikaze-enemy.js";
import TeleporterEnemy from "../enemies/teleporter-enemy.js";
import PufPufEnemy from '../enemies/pufpuf-enemy.js'
import ShieldedEnemy from '../enemies/shielded-enemy.js'
import Difficulties from "./difficulties.js";

const EnemyChances = {
    [Difficulties.VERY_EASY]: {
        BasicEnemy: 40,
        BuffEnemy: 20,
        SpeedyEnemy: 20,
        TankEnemy: 5,
        SpawnerEnemy: 0,
        KamikazeEnemy: 0,
        TeleporterEnemy: 0,
        PufPufEnemy: 1000000,
        ShieldedEnemy: 0,
    },
    [Difficulties.EASY]: {
        BasicEnemy: 30,
        BuffEnemy: 15,
        SpeedyEnemy: 15,
        TankEnemy: 5,
        SpawnerEnemy: 10,
        KamikazeEnemy: 0,
        TeleporterEnemy: 0,
        PufPufEnemy: 0,
        ShieldedEnemy: 5,
    },
    [Difficulties.MEDIUM]: {
        BasicEnemy: 20,
        BuffEnemy: 20,
        SpeedyEnemy: 20,
        TankEnemy: 10,
        SpawnerEnemy: 10,
        KamikazeEnemy: 5,
        TeleporterEnemy: 5,
        PufPufEnemy: 0,
        ShieldedEnemy: 5,
    },
    [Difficulties.HARD]: {
        BasicEnemy: 15,
        BuffEnemy: 15,
        SpeedyEnemy: 15,
        TankEnemy: 15,
        SpawnerEnemy: 10,
        KamikazeEnemy: 10,
        TeleporterEnemy: 10,
        PufPufEnemy: 5,
        ShieldedEnemy: 5,
    },
    [Difficulties.VERY_HARD]: {
        BasicEnemy: 5,
        BuffEnemy: 5,
        SpeedyEnemy: 10,
        TankEnemy: 15,
        SpawnerEnemy: 15,
        KamikazeEnemy: 15,
        TeleporterEnemy: 15,
        PufPufEnemy: 10,
        ShieldedEnemy: 5,
    },
};

export default EnemyChances;