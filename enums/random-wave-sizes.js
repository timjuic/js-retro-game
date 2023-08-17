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

const RandomWaveSizes = {
    [Difficulties.VERY_EASY]: {
        [BasicEnemy.name]: 20,
        [BuffEnemy.name]: 10,
        [GrowingEnemy.name]: 3,
        [KamikazeEnemy.name]: 5,
        [PufPufEnemy.name]: 0,
        [ShieldedEnemy.name]: 5,
        [SpawnerEnemy.name]: 0,
        [SpeedyEnemy.name]: 10,
        [TankEnemy.name]: 5,
        [TeleporterEnemy.name]: 3,
    },
    [Difficulties.EASY]: {
        [BasicEnemy.name]: 30,
        [BuffEnemy.name]: 15,
        [GrowingEnemy.name]: 6,
        [KamikazeEnemy.name]: 10,
        [PufPufEnemy.name]: 5,
        [ShieldedEnemy.name]: 10,
        [SpawnerEnemy.name]: 3,
        [SpeedyEnemy.name]: 20,
        [TankEnemy.name]: 5,
        [TeleporterEnemy.name]: 6,
    },
    [Difficulties.MEDIUM]: {
        [BasicEnemy.name]: 50,
        [BuffEnemy.name]: 20,
        [GrowingEnemy.name]: 8,
        [KamikazeEnemy.name]: 15,
        [PufPufEnemy.name]: 10,
        [ShieldedEnemy.name]: 20,
        [SpawnerEnemy.name]: 4,
        [SpeedyEnemy.name]: 40,
        [TankEnemy.name]: 8,
        [TeleporterEnemy.name]: 12,
    },
    [Difficulties.HARD]: {
        [BasicEnemy.name]: 80,
        [BuffEnemy.name]: 40,   
        [GrowingEnemy.name]: 10,
        [KamikazeEnemy.name]: 30,
        [PufPufEnemy.name]: 20,
        [ShieldedEnemy.name]: 40,
        [SpawnerEnemy.name]: 6,
        [SpeedyEnemy.name]: 80,
        [TankEnemy.name]: 12,
        [TeleporterEnemy.name]: 20,
    },
    [Difficulties.VERY_HARD]: {
        [BasicEnemy.name]: 150,
        [BuffEnemy.name]: 60,
        [GrowingEnemy.name]: 15,
        [KamikazeEnemy.name]: 50,
        [PufPufEnemy.name]: 30,
        [ShieldedEnemy.name]: 60,
        [SpawnerEnemy.name]: 10,
        [SpeedyEnemy.name]: 120,
        [TankEnemy.name]: 15,
        [TeleporterEnemy.name]: 40,
    },
};

export default RandomWaveSizes;
