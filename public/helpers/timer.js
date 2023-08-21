export default class Timer {
    constructor() {
        this.startTimestamp = null;
        this.pausedTimestamp = null;
        this.totalPausedDuration = 0;
    }

    start() {
        this.startTimestamp = Date.now();
    }

    pause() {
        this.pausedTimestamp = Date.now();
    }

    unpause() {
        if (this.pausedTimestamp) {
            this.totalPausedDuration += Date.now() - this.pausedTimestamp;
            this.pausedTimestamp = null;
        }
    }

    isStarted() {
        return this.startTimestamp !== null;
    }


    getDuration() {
        if (!this.startTimestamp) {
            return 0;
        }
        const currentDuration = Date.now() - this.startTimestamp;
        return currentDuration - this.totalPausedDuration;
    }

    getTimeFormatted() {
        const duration = this.getDuration();
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        const formatted = [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');

        return formatted;
    }
}