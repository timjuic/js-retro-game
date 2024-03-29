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
import SplittingEnemy from '../enemies/splitting-enemy.js';
import WandererEnemy from '../enemies/wanderer-enemy.js';
import GhostEnemy from '../enemies/ghost-enemy.js';

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
    [SplittingEnemy.name]: {
        [SummonAmounts.SMALL]: 6,
        [SummonAmounts.MEDIUM]: 10,
        [SummonAmounts.LARGE]: 15,
    },
    [WandererEnemy.name]: {
        [SummonAmounts.SMALL]: 6,
        [SummonAmounts.MEDIUM]: 10,
        [SummonAmounts.LARGE]: 15,
    },
    [GhostEnemy.name]: {
        [SummonAmounts.SMALL]: 6,
        [SummonAmounts.MEDIUM]: 10,
        [SummonAmounts.LARGE]: 15,
    },
};


export default EnemySpawnConfig;
