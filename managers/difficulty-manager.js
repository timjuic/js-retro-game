import Difficulties from '../enums/difficulties.js';
import SummonAmounts from '../enums/summon-amounts.js';

export default class DifficultyManager {
    constructor() {
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
}