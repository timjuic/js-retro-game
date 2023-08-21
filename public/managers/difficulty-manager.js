import Difficulties from '../enums/difficulties.js';
import SummonAmounts from '../enums/summon-amounts.js';

export default class DifficultyManager {
    constructor(game) {
        this.game = game;
        this.difficultyValues = Object.values(Difficulties);
        this.summonAmountsValues = Object.values(SummonAmounts);
        this.currentDifficultyIndex = 0;
        this.currentSummonAmountIndex = 0;
    }

    increaseDifficulty() {
        if (this.currentDifficultyIndex < this.difficultyValues.length - 1) {
            this.currentDifficultyIndex++;
        }
    }

    getCurrentDifficulty() {
        return this.difficultyValues[this.currentDifficultyIndex];
    }

    increaseSummonAmount() {
        if (this.currentSummonAmountIndex < this.summonAmountsValues - 1) {
            this.currentSummonAmountIndex++;
        }
    }

    getCurrentSummonAmount() {
        return this.summonAmountsValues[this.currentSummonAmountIndex];
    }

    pickDifficulty(waveNumber) {
        const difficultyKeys = Object.keys(Difficulties);
        const lastDifficultyIndex = difficultyKeys.length - 1;
        const baseIndex = Math.floor((waveNumber / this.game.settings.WAVE_DIFFICULTY_PROGRESSION_RATE) * lastDifficultyIndex);
        const randomFactor = Math.random() * 0.75 + 0.25;
        const randomizedIndex = Math.floor(baseIndex * randomFactor);
        this.currentDifficultyIndex = Math.min(randomizedIndex, lastDifficultyIndex);
        return this.difficultyValues[this.currentDifficultyIndex];
    }
    
}