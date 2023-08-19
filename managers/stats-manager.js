import enemyRegistry from "../enemy-class-registry.js";
import Timer from "../helpers/timer.js";

export default class StatsManager {
    constructor(game) {
        this.game = game;
        this.timer = new Timer();
        this.enemiesKilled = 0;
        this.wavesBeaten = {};
        Array.from(Object.keys(enemyRegistry.registry)).forEach(enemyName => {
            this.wavesBeaten[enemyName] = 0;
        })        


        this.displaySurvivedTime();
    }

    increaseBeatenWave(enemyType) {
        this.wavesBeaten[enemyType]++;
    }

    getBeatenWaves(enemyType) {
        return this.wavesBeaten[enemyType];
    }

    startTimer() {
        this.timer.start();
    }

    pauseTimer() {
        this.timer.pause();
    }

    unpauseTimer() {
        this.timer.unpause();
    }

    getGameDuration() {
        return this.timer.getDuration();
    }

    getTimeSurvivedFormatted() {
        return this.timer.getTimeFormatted();
    }

    displaySurvivedTime() {
        let canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
        const ctx = this.game.getCanvasManager().getContext('playerCanvas')
        const text = `Time Survived: ${this.getTimeSurvivedFormatted()}`;

        ctx.font = "18px Arial";
        ctx.fillStyle = "white";

        const textWidth = ctx.measureText(text).width;

        const x = canvas.width - textWidth - 10;
        const y = 25;

        ctx.fillText(text, x, y);
    }
}