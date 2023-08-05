export default class Level {
    constructor(game) {
        this.game = game;
        this.waves = waves;
    }

    startLevel() {
        this.waves.forEach(wave => {
            setTimeout(() => {
                wave.startSummoningEnemies()
            }, wave.startSummoningMs);
        })
    }
}