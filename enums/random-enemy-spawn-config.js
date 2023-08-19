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

const RandomEnemySpawnConfig = {
    [BasicEnemy.name]: {
        [SummonAmounts.SMALL]: 30,
        [SummonAmounts.MEDIUM]: 50,
        [SummonAmounts.LARGE]: 80,
    },
    [BuffEnemy.name]: {
        [SummonAmounts.SMALL]: 15,
        [SummonAmounts.MEDIUM]: 20,
        [SummonAmounts.LARGE]: 40,
    },
    [GrowingEnemy.name]: {
        [SummonAmounts.SMALL]: 6,
        [SummonAmounts.MEDIUM]: 8,
        [SummonAmounts.LARGE]: 10,
    },
    [KamikazeEnemy.name]: {
        [SummonAmounts.SMALL]: 10,
        [SummonAmounts.MEDIUM]: 15,
        [SummonAmounts.LARGE]: 30,
    },
    [PufPufEnemy.name]: {
        [SummonAmounts.SMALL]: 5,
        [SummonAmounts.MEDIUM]: 10,
        [SummonAmounts.LARGE]: 20,
    },
    [ShieldedEnemy.name]: {
        [SummonAmounts.SMALL]: 10,
        [SummonAmounts.MEDIUM]: 20,
        [SummonAmounts.LARGE]: 40,
    },
    [SpawnerEnemy.name]: {
        [SummonAmounts.SMALL]: 3,
        [SummonAmounts.MEDIUM]: 4,
        [SummonAmounts.LARGE]: 6,
    },
    [SpeedyEnemy.name]: {
        [SummonAmounts.SMALL]: 20,
        [SummonAmounts.MEDIUM]: 40,
        [SummonAmounts.LARGE]: 80,
    },
    [TankEnemy.name]: {
        [SummonAmounts.SMALL]: 5,
        [SummonAmounts.MEDIUM]: 8,
        [SummonAmounts.LARGE]: 12,
    },
    [TeleporterEnemy.name]: {
        [SummonAmounts.SMALL]: 6,
        [SummonAmounts.MEDIUM]: 12,
        [SummonAmounts.LARGE]: 20,
    },
};

export default RandomEnemySpawnConfig;
