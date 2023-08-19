import WaveGenerator from "./wave-generator.js";

export default class LevelManager {
    constructor(game) {
        this.game = game;
        this.level = 1;
        this.waves = [];
        this.wavesPassed = 0;
        this.waveGenerator = new WaveGenerator(this.game);
        this.waveSpawnTick = 0;
    }

    nextLevel() {
        this.level++;
    }

    getWavesPassed() {
        return this.wavesPassed;
    }

    startCurrentLevel() {
        // let wavesToGenerate = 1000;
        // let generatedWaveData = [];
        // for (let i = 0; i < wavesToGenerate; i++) {
        //     let waveData = this.waveGenerator.generateNextWave();
        //     generatedWaveData.push(waveData)
        // }
        // let waveSpawnTick = 0;
        // generatedWaveData.forEach(data => {
        //     let waveType = data.splice(0, 1)[0];
        //     let wave = new waveType(this.game, waveSpawnTick, ...data)
        //     this.waves.push(wave);
        //     waveSpawnTick += wave.tickDuration;
        // })
    }

    prepareNextWave() {
        let start = Date.now();
        let generatedWaveData = this.waveGenerator.generateNextWave();
        let waveType = generatedWaveData.splice(0, 1)[0];
        let wave = new waveType(this.game, this.waveSpawnTick, ...generatedWaveData);
        this.waves.push(wave);
        this.waveSpawnTick += wave.tickDuration;
        let end = Date.now();
        console.log(`wave prepared in ${end - start} ms`);
        console.log(wave);
    }

    checkForUpcomingWaves() {
        if (this.game.ticksElapsed % 20 !== 0) return;

        if (this.waves.length === 0) this.prepareNextWave();

        this.waves.forEach((wave, i) => {
            if (this.game.ticksElapsed >= wave.startSummoningTicks) {
                wave.startSummoningEnemies();
                this.waves.splice(i, 1);
                this.wavesPassed++;
                this.game.getStatsManager().increaseBeatenWave(wave.enemyType.name)
                let newEnemyLevel = Math.floor(this.game.getStatsManager().getBeatenWaves(wave.enemyType.name) / this.game.settings.INCREASE_ENEMY_LVL_EVERY_X_WAVES_OF_TYPE) + 1;
                wave.enemyType.level = newEnemyLevel;
            } else {
                
            }
        })
        
    }
}