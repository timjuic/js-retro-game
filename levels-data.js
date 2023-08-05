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

let levels = [
    [
        [CornerWave, 1, 4, BasicEnemy, 50, Corners.UPPER_LEFT],
        [CornerWave, 5, 4, BasicEnemy, 50, Corners.UPPER_RIGHT],
        [CornerWave, 8, 4, BasicEnemy, 50, Corners.BOTTOM_LEFT],
        [CornerWave, 8, 4, BasicEnemy, 50, Corners.BOTTOM_RIGHT],
        [CornerWave, 12, 5, BasicEnemy, 50, Corners.UPPER_LEFT],
        [SquareWave, 18, 2, BuffEnemy, 50, Sides.TOP],
        [SquareWave, 20, 2, BuffEnemy, 50, Sides.BOTTOM],
        [RandomWave, 23, 3, TankEnemy, 100],
        [SquareWave, 30, 3, SpeedyEnemy, 100, Sides.RIGHT],
        [SquareWave, 30, 3, SpeedyEnemy, 100, Sides.LEFT],
        [RandomWave, 35, 20, SpeedyEnemy, 400],
        [CornerWave, 48, 1, SpawnerEnemy, 1, Corners.UPPER_LEFT],
        [RandomWave, 55, 10, KamikazeEnemy, 500],
        [CornerWave, 60, 2, TeleporterEnemy, 50, CornerWave.UPPER_LEFT],
        [LineWave, 65, 2, SpawnerEnemy, 1, Sides.TOP],
        
    ],
    [
        
    ]
]

export default levels;