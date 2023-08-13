import BasicEnemy from "./enemies/basic-enemy.js";
import BuffEnemy from "./enemies/buff-enemy.js";
import TankEnemy from "./enemies/tank-enemy.js";
import SpeedyEnemy from "./enemies/speedy-enemy.js";
import Corners from "./enums/corners.js";
import Sides from "./enums/sides.js";
import CornerWave from "./waves/corner-wave.js";
import LineWave from "./waves/line-wave.js";
import RandomWave from "./waves/random-wave.js";
import SquareWave from "./waves/square-wave.js";
import Wave from "./waves/wave.js";
import SpawnerEnemy from "./enemies/spawner-enemy.js";
import KamikazeEnemy from "./enemies/kamikaze-enemy.js";
import TeleportationTrail from "./particles/teleportation-trail.js";
import TeleporterEnemy from "./enemies/teleporter-enemy.js";
import PufPufEnemy from './enemies/pufpuf-enemy.js'
import ShieldedEnemy from './enemies/shielded-enemy.js'
import ShooterEnemy from "./enemies/shooting-enemy.js";
import GrowingEnemy from "./enemies/growing-enemy.js";

let levels = [
    [
        // [SquareWave, 3, BasicEnemy, 50, Sides.TOP],
        // [CornerWave, 4, BasicEnemy, 50, Corners.UPPER_RIGHT],
        // [CornerWave, 4, BasicEnemy, 50, Corners.BOTTOM_LEFT],
        // [CornerWave, 4, BasicEnemy, 50, Corners.BOTTOM_RIGHT],
        // [CornerWave, 5, BasicEnemy, 50, Corners.UPPER_LEFT],
        // [SquareWave, 2, BuffEnemy, 50, Sides.TOP],
        // [SquareWave, 2, BuffEnemy, 50, Sides.BOTTOM],
        // [SquareWave, 2, BuffEnemy, 50, Sides.LEFT],
        // [SquareWave, 2, BuffEnemy, 50, Sides.RIGHT],
        // [SquareWave, 3, SpeedyEnemy, 0, Sides.RIGHT],
        // [SquareWave, 3, SpeedyEnemy, 0, Sides.LEFT],
        // [RandomWave, 50, SpeedyEnemy, 500],
        // [LineWave, 1, SpawnerEnemy, 1, Sides.TOP],
        // [RandomWave, 10, KamikazeEnemy, 500],
        // [CornerWave, 2, TeleporterEnemy, 50, CornerWave.UPPER_LEFT],
        // [LineWave, 2, SpawnerEnemy, 1, Sides.TOP],
        [CornerWave, 2, GrowingEnemy, 50, Corners.UPPER_LEFT],
        // [CornerWave, 2, PufPufEnemy, 50, Corners.UPPER_RIGHT],
        

    ],
]

export default levels;