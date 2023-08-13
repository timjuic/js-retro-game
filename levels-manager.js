export default class LevelManager {
    constructor(game, levelsData) {
        this.game = game;
        this.level = 1;
        this.levelsData = levelsData;
        this.waves = [];
        this.wavesPassed = 0;
    }

    nextLevel() {
        this.level++;
    }

    startCurrentLevel() {
        let currentLevelData = this.levelsData[this.level-1];
        let waveSpawnTick = 0;
        currentLevelData.forEach(data => {
            let waveType = data.splice(0, 1)[0];
            // console.log(waveSpawnTick);
            let wave = new waveType(this.game, waveSpawnTick, ...data)
            this.waves.push(wave);
            waveSpawnTick += wave.tickDuration;

            // setTimeout(() => {
            //     wave.startSummoningEnemies(requestedSummonPosition)
            // }, wave.startSummoningMs);
        })
        
    }

    checkForUpcomingWaves() {
        this.waves.forEach((wave, i) => {
            // console.log(this.game.ticksElapsed, wave.startSummoningTicks);
            if (this.game.ticksElapsed >= wave.startSummoningTicks) {
                // console.log("summoning");
                wave.startSummoningEnemies();
                this.waves.splice(i, 1);
                this.wavesPassed++;

            }
        })
        
    }
}