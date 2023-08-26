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
import SummonAmounts from './summon-amounts.js';
import Enemy from '../enemies/enemy.js';
import ReflectorEnemy from '../enemies/reflector-enemy.js';

const EnemySpawnConfig = {
    [BasicEnemy.name]: {
        [SummonAmounts.SMALL]: 10,
        [SummonAmounts.MEDIUM]: 15,
        [SummonAmounts.LARGE]: 21,
    },
    [BuffEnemy.name]: {
        [SummonAmounts.SMALL]: 10,
        [SummonAmounts.MEDIUM]: 15,
        [SummonAmounts.LARGE]: 15,
    },
    [GrowingEnemy.name]: {
        [SummonAmounts.SMALL]: 6,
        [SummonAmounts.MEDIUM]: 6,
        [SummonAmounts.LARGE]: 10,
    },
    [KamikazeEnemy.name]: {
        [SummonAmounts.SMALL]: 10,
        [SummonAmounts.MEDIUM]: 10,
        [SummonAmounts.LARGE]: 15,
    },
    [PufPufEnemy.name]: {
        [SummonAmounts.SMALL]: 6,
        [SummonAmounts.MEDIUM]: 6,
        [SummonAmounts.LARGE]: 10,
    },
    [ShieldedEnemy.name]: {
        [SummonAmounts.SMALL]: 10,
        [SummonAmounts.MEDIUM]: 10,
        [SummonAmounts.LARGE]: 15,
    },
    [SpawnerEnemy.name]: {
        [SummonAmounts.SMALL]: 3,
        [SummonAmounts.MEDIUM]: 6,
        [SummonAmounts.LARGE]: 6,
    },
    [SpeedyEnemy.name]: {
        [SummonAmounts.SMALL]: 10,
        [SummonAmounts.MEDIUM]: 15,
        [SummonAmounts.LARGE]: 21,
    },
    [TankEnemy.name]: {
        [SummonAmounts.SMALL]: 6,
        [SummonAmounts.MEDIUM]: 10,
        [SummonAmounts.LARGE]: 15,
    },
    [TeleporterEnemy.name]: {
        [SummonAmounts.SMALL]: 6,
        [SummonAmounts.MEDIUM]: 15,
        [SummonAmounts.LARGE]: 15,
    },
    [ReflectorEnemy.name]: {
        [SummonAmounts.SMALL]: 6,
        [SummonAmounts.MEDIUM]: 15,
        [SummonAmounts.LARGE]: 15,
    },
    [GrowingEnemy.name]: {
        [SummonAmounts.SMALL]: 6,
        [SummonAmounts.MEDIUM]: 15,
        [SummonAmounts.LARGE]: 15,
    },
};


const CornerWaveSizes = {
    [SummonAmounts.SMALL]: {
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
    [SummonAmounts.MEDIUM]: {
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
    [SummonAmounts.LARGE]: {
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
};

export default EnemySpawnConfig;
