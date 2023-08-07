import Timer from "./helpers/timer.js";

export default class StatsManager {
    constructor(game) {
        this.game = game;
        this.timer = new Timer();
        this.enemiesKilled = 0;


        this.displaySurvivedTime();
    }

    startTimer() {
        this.timer.start();
        console.log('started');
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

        // Measure the width of the text to position it correctly
        const textWidth = ctx.measureText(text).width;

        // Set the position
        const x = canvas.width - textWidth - 10; // 10px padding from the right edge
        const y = 25; // 25px from the top, which roughly centers 20px tall text

        // Draw the text
        ctx.fillText(text, x, y);
    }
}