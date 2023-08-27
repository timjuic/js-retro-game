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
        this.difficultyManager = new DifficultyManager(game);
        this.previousWaveDuration;
    }

    pickWaveType(enemyType) {
        if (enemyType.possibleWaveTypes && enemyType.possibleWaveTypes.length > 0) {
            return enemyType.possibleWaveTypes[Math.floor(Math.random() * enemyType.possibleWaveTypes.length)];
        }

        const waveTypeKeys = Object.keys(WaveTypes);
        const randomIndex = Math.floor(Math.random() * waveTypeKeys.length);
        var randomWaveTypeKey = waveTypeKeys[randomIndex];

        return WaveTypes[randomWaveTypeKey];
    }

    pickEnemy() {
        this.difficultyManager.pickDifficulty(this.game.getLevelManager().getWavesPassed());
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

    getEnemySpawnDelay(waveType, enemyAmount, enemyType) {
        if (waveType === CornerWave || waveType === SquareWave || waveType === LineWave) {
            return 50;
        } else if (waveType === RandomWave) {
            return enemyType.scaleThreatRating();
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

    calculateWaveDuration(waveType, enemyType, enemyAmount, summonDelay) {
        let spawnDurationTicks;
        if (waveType === RandomWave && this.previousWaveDuration !== 0) {
            spawnDurationTicks = Math.ceil(2 * summonDelay * enemyAmount / this.game.settings.TICK_DURATION_MS);
            return spawnDurationTicks;
        } else {
            let doubleWaveRandomNumber = MathUtil.generateRandomNumber(0, 1);
            if (doubleWaveRandomNumber > 0.8) return 0;
            spawnDurationTicks = Math.ceil(summonDelay * enemyAmount / this.game.settings.TICK_DURATION_MS);
        }

        console.log(spawnDurationTicks, this.game.settings.TICK_DURATION_MS, enemyType.name, enemyAmount);
        return spawnDurationTicks + this.game.settings.INITIAL_DELAY_BETWEEN_WAVES_TICKS;
    }

    generateNextWave() {
        let enemyType = this.pickEnemy();
        let waveType = this.pickWaveType(enemyType);
        let enemyAmount = this.getEnemySpawnAmount(waveType, enemyType);
        let summonDelay = this.getEnemySpawnDelay(waveType, enemyAmount, enemyType);
        let waveDurationTicks = this.calculateWaveDuration(waveType, enemyType, enemyAmount, summonDelay);
        let summonPosition = this.getSummonPosition(waveType);
        this.previousWaveDuration = waveDurationTicks;
        console.log(waveDurationTicks);

        return [waveType, enemyAmount, enemyType, summonDelay, waveDurationTicks, summonPosition]
    }
}