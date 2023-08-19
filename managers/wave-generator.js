import BasicEnemy from "../enemies/basic-enemy.js";
import Difficulties from "../enums/difficulties.js";
import WaveTypes from "../enums/wave-types.js";
import DifficultyManager from "./difficulty-manager.js";
import EnemyChances from "../enums/enemy-summon-chances.js";
import enemyRegistry from "../enemy-class-registry.js";
import CornerWave from "../waves/corner-wave.js";
import EnemySpawnConfig from "../enums/enemy-spawn-config.js";
import SquareWave from "../waves/square-wave.js";
import RandomWave from "../waves/random-wave.js";
import RandomEnemySpawnConfig from "../enums/random-enemy-spawn-config.js";
import Corners from "../enums/corners.js";
import MathUtil from "../helpers/math-util.js";
import Sides from "../enums/sides.js";
import LineWave from "../waves/line-wave.js";
import LineWaveSizes from "../enums/line-wave-sizes.js";

export default class WaveGenerator {
    constructor(game) {
        this.game = game;
        this.difficultyManager = new DifficultyManager();
    }

    pickWaveType() {
        const waveTypeKeys = Object.keys(WaveTypes);
        const randomIndex = Math.floor(Math.random() * waveTypeKeys.length);
        const randomWaveTypeKey = waveTypeKeys[randomIndex];
        
        return WaveTypes[randomWaveTypeKey];
    }

    pickEnemy() {
        const currentDifficulty = this.difficultyManager.getCurrentDifficulty();
        const enemyChances = EnemyChances[currentDifficulty];
        
        const totalWeight = Object.values(enemyChances).reduce((sum, weight) => sum + weight, 0);
        const randomValue = Math.random() * totalWeight;

        let accumulatedWeight = 0;
        for (const enemyClassName in enemyChances) {
            accumulatedWeight += enemyChances[enemyClassName];
            if (randomValue <= accumulatedWeight) {
                return enemyRegistry.getEnemyClassByName(enemyClassName);
            }
        }

        const randomEnemyClassName = Object.keys(enemyChances)[Object.keys(enemyChances).length - 1];
        return enemyRegistry.getEnemyClassByName(randomEnemyClassName)
    }

    getEnemySpawnAmount(waveType, enemyType) {
        let currentSummonAmount = this.difficultyManager.getCurrentSummonAmount();
        if (waveType === CornerWave) {
            return EnemySpawnConfig[enemyType.name][currentSummonAmount];
        } else if (waveType === SquareWave) {
            return EnemySpawnConfig[enemyType.name][currentSummonAmount];
        } else if (waveType === RandomWave) {
            return RandomEnemySpawnConfig[enemyType.name][currentSummonAmount];
        } else if (waveType === LineWave) {
            return LineWaveSizes[currentSummonAmount]
        }
    }

    getEnemySpawnDelay(waveType, enemyAmount) {
        if (waveType === CornerWave || waveType === SquareWave || waveType === LineWave) {
            return 50;
        } else if (waveType === RandomWave) {
            if (enemyAmount > 10) {
                return 500;
            } else return 10;
        }
        return 50;
    }

    getSummonPosition(waveType) {
        if (waveType === CornerWave) {
            const cornerValues = Object.values(Corners);
            const randomIndex = MathUtil.generateRandomInteger(0, cornerValues.length);
            return cornerValues[randomIndex];
        } else if (waveType === SquareWave || waveType === LineWave) {
            const sideValues = Object.values(Sides);
            const randomIndex = MathUtil.generateRandomInteger(0, sideValues.length);
            return sideValues[randomIndex];
        }
    }

    generateNextWave() {
        let waveType = this.pickWaveType();
        let enemyType = this.pickEnemy();
        let enemyAmount = this.getEnemySpawnAmount(waveType, enemyType);
        let summonDelay = this.getEnemySpawnDelay(waveType, enemyAmount);
        let summonPosition = this.getSummonPosition(waveType);

        return [waveType, enemyAmount, enemyType, summonDelay, summonPosition]
    }
}