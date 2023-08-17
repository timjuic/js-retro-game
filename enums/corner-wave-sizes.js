import Difficulties from './difficulties.js';
import BasicEnemy from "../enemies/basic-enemy.js";
import BuffEnemy from "../enemies/buff-enemy.js";
import GrowingEnemy from "../enemies/growing-enemy.js";
import KamikazeEnemy from "../enemies/kamikaze-enemy.js";
import PufPufEnemy from "../enemies/pufpuf-enemy.js";
import ShieldedEnemy from "../enemies/shielded-enemy.js";
import SpawnerEnemy from "../enemies/spawner-enemy.js";
import SpeedyEnemy from "../enemies/speedy-enemy.js";
import TankEnemy from "../enemies/tank-enemy.js";
import TeleporterEnemy from "../enemies/teleporter-enemy.js";

const CornerWaveSizes = {
    [Difficulties.VERY_EASY]: {
        [BasicEnemy.name]: 6,
        [BuffEnemy.name]: 6,
        [GrowingEnemy.name]: 3,
        [KamikazeEnemy.name]: 6,
        [PufPufEnemy.name]: 3,
        [ShieldedEnemy.name]: 6,
        [SpawnerEnemy.name]: 1,
        [SpeedyEnemy.name]: 6,
        [TankEnemy.name]: 3,
        [TeleporterEnemy.name]: 3,
    },
    [Difficulties.EASY]: {
        [BasicEnemy.name]: 10,
        [BuffEnemy.name]: 10,
        [GrowingEnemy.name]: 6,
        [KamikazeEnemy.name]: 10,
        [PufPufEnemy.name]: 6,
        [ShieldedEnemy.name]: 10,
        [SpawnerEnemy.name]: 3,
        [SpeedyEnemy.name]: 10,
        [TankEnemy.name]: 6,
        [TeleporterEnemy.name]: 6,
    },
    [Difficulties.MEDIUM]: {
        [BasicEnemy.name]: 15,
        [BuffEnemy.name]: 15,
        [GrowingEnemy.name]: 6,
        [KamikazeEnemy.name]: 10,
        [PufPufEnemy.name]: 6,
        [ShieldedEnemy.name]: 10,
        [SpawnerEnemy.name]: 6,
        [SpeedyEnemy.name]: 15,
        [TankEnemy.name]: 10,
        [TeleporterEnemy.name]: 15,
    },
    [Difficulties.HARD]: {
        [BasicEnemy.name]: 21,
        [BuffEnemy.name]: 15,
        [GrowingEnemy.name]: 10,
        [KamikazeEnemy.name]: 15,
        [PufPufEnemy.name]: 10,
        [ShieldedEnemy.name]: 15,
        [SpawnerEnemy.name]: 6,
        [SpeedyEnemy.name]: 21,
        [TankEnemy.name]: 15,
        [TeleporterEnemy.name]: 15,
    },
    [Difficulties.VERY_HARD]: {
        [BasicEnemy.name]: 28,
        [BuffEnemy.name]: 28,
        [GrowingEnemy.name]: 15,
        [KamikazeEnemy.name]: 21,
        [PufPufEnemy.name]: 15,
        [ShieldedEnemy.name]: 21,
        [SpawnerEnemy.name]: 6,
        [SpeedyEnemy.name]: 28,
        [TankEnemy.name]: 15,
        [TeleporterEnemy.name]: 21,
    },
};

export default CornerWaveSizes;
