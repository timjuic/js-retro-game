import Difficulties from '../enums/difficulties.js';

export default class DifficultyManager {
    constructor() {
        this.difficultyValues = Object.values(Difficulties);
        this.currentDifficultyIndex = 1;
    }

    increaseDifficulty() {
        if (this.currentDifficultyIndex < this.difficultyValues.length - 1) {
            this.currentDifficultyIndex++;
        }
    }

    getCurrentDifficulty() {
        return this.difficultyValues[this.currentDifficultyIndex];
    }
}