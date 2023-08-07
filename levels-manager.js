export default class LevelManager {
    constructor(game, levelsData) {
        this.game = game;
        this.level = 1;
        this.levelsData = levelsData;
    }

    nextLevel() {
        this.level++;
    }

    startCurrentLevel() {
        let currentLevelData = this.levelsData[this.level-1];
        currentLevelData.forEach(data => {
            let waveType = data.splice(0, 1)[0];
            let wave = new waveType(this.game, ...data)
            setTimeout(() => {
                wave.startSummoningEnemies(data.splice(data.length-1, 1)[0])
            }, wave.startSummoningMs);
        })
        
    }
}