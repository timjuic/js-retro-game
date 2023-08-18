import WaveGenerator from "../wave-generator.js";

export default class LevelManager {
    constructor(game) {
        this.game = game;
        this.level = 1;
        this.waves = [];
        this.wavesPassed = 0;
        this.waveGenerator = new WaveGenerator(this.game);
    }

    nextLevel() {
        this.level++;
    }

    startCurrentLevel() {
        let wavesToGenerate = 1000;
        let generatedWaveData = [];
        for (let i = 0; i < wavesToGenerate; i++) {
            let waveData = this.waveGenerator.generateNextWave();
            generatedWaveData.push(waveData)
        }
        let waveSpawnTick = 0;
        generatedWaveData.forEach(data => {
            let waveType = data.splice(0, 1)[0];
            let wave = new waveType(this.game, waveSpawnTick, ...data)
            this.waves.push(wave);
            waveSpawnTick += wave.tickDuration;
        })
    }

    checkForUpcomingWaves() {
        if (this.game.ticksElapsed % 20 !== 0) return;
        this.waves.forEach((wave, i) => {
            if (this.game.ticksElapsed >= wave.startSummoningTicks) {
                wave.startSummoningEnemies();
                this.waves.splice(i, 1);
                this.wavesPassed++;

            } else {
                
            }
        })
        
    }
}