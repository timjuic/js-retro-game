import WaveGenerator from "../wave-generator.js";

export default class LevelManager {
    constructor(game, levelsData) {
        this.game = game;
        this.level = 1;
        this.levelsData = levelsData;
        this.waves = [];
        this.wavesPassed = 0;
        this.waveGenerator = new WaveGenerator(this.game);
    }

    nextLevel() {
        this.level++;
    }

    startCurrentLevel() {
        let wavesToGenerate = 50;
        let generatedWaveData = [];
        for (let i = 0; i < wavesToGenerate; i++) {
            let waveData = this.waveGenerator.generateNextWave();
            generatedWaveData.push(waveData)
            console.log('waveType' ,waveData[0]);
            console.log('amount' ,waveData[1]);
            console.log('type', waveData[2]);
            console.log('delay', waveData[3]);
        }
        console.log(generatedWaveData);
        // let currentLevelData = this.levelsData[this.level-1];
        let waveSpawnTick = 0;
        generatedWaveData.forEach(data => {
            let waveType = data.splice(0, 1)[0];
            let wave = new waveType(this.game, waveSpawnTick, ...data)
            this.waves.push(wave);
            waveSpawnTick += wave.tickDuration;
        })
        console.log(this.waves);
        
    }

    checkForUpcomingWaves() {
        if (this.game.ticksElapsed % 20 !== 0) return;
        console.log('checking');
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