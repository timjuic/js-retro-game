import Enemy from "../enemies/enemy.js";
import Corners from "../enums/corners.js";
import Wave from "./wave.js";

export default class CornerWave extends Wave {
    constructor(game, startSummoningTicks, waveSize, enemyType, delayBetweenSummonsMs, durationInTicks, summoningPosition) {
        super(game, startSummoningTicks, waveSize, enemyType, delayBetweenSummonsMs, durationInTicks);
        this.borderWidth = this.game.getBorderManager().getLeftBorder();
        this.gapFromBorder = playerCanvas.width / 150
        this.summoningPosition = summoningPosition
        // this.calculateDuration(this.getTotalEnemies());
    }

    startSummoningEnemies() {
        if (this.summoningPosition === undefined) {
            this.summoningPosition = this.getPossibleCorner();
        }

        if (this.summoningPosition === Corners.UPPER_LEFT) this.createTopLeftWave(this.waveSize);
        else if (this.summoningPosition === Corners.UPPER_RIGHT) this.createTopRightWave(this.waveSize);
        else if (this.summoningPosition === Corners.BOTTOM_LEFT) this.createBottomLeftWave(this.waveSize);
        else if (this.summoningPosition === Corners.BOTTOM_RIGHT) this.createBottomRightWave(this.waveSize);
        super.spawnEnemiesFromQueue();
    }

    getTotalEnemies() {
        return this.waveSize;
    }

    calculateRowsForEnemies(totalEnemies) {
        return (-1 + Math.sqrt(1 + 8 * totalEnemies)) / 2;
    }

    calculateColumnsForEnemies(totalEnemies) {
        return Math.ceil((-1 + Math.sqrt(1 + 8 * totalEnemies)) / 2);
    }

    createTopLeftWave() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');

        let [startX, startY] = this.getStartingPosition(Corners.UPPER_LEFT);

        let gap = playerCanvas.width / 130;
        let numCols = this.calculateColumnsForEnemies(this.waveSize)
        let elementNumber = 1;

        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row <= col && elementNumber <= this.waveSize; row++) {
                let actualRow = row;
                let actualCol = col - row;

                this.spawnQueue.push({ x: startX + actualCol * (gap + this.enemyWidth), y: startY + actualRow * (gap + this.enemyHeight) })
                elementNumber++;
            }
        }
    }

    createTopRightWave() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');

        let [startX, startY] = this.getStartingPosition(Corners.UPPER_RIGHT);

        let gap = playerCanvas.width / 130;
        let numCols = this.calculateColumnsForEnemies(this.waveSize)
        let elementNumber = 1;

        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row <= col && elementNumber <= this.waveSize; row++) {
                let actualRow = row;
                let actualCol = col - row;

                this.spawnQueue.push({ x: startX - actualCol * (gap + this.enemyWidth), y: startY + actualRow * (gap + this.enemyHeight) })
                elementNumber++;
            }
        }
    }




    createBottomLeftWave() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');

        let [startX, startY] = this.getStartingPosition(Corners.BOTTOM_LEFT);

        let gap = playerCanvas.width / 130;
        let numCols = this.calculateColumnsForEnemies(this.waveSize)
        let elementNumber = 1;

        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row <= col && elementNumber <= this.waveSize; row++) {
                let actualRow = row;
                let actualCol = col - row;

                this.spawnQueue.push({ x: startX + actualCol * (gap + this.enemyWidth), y: startY - actualRow * (gap + this.enemyHeight) })
                elementNumber++;
            }
        }
    }


    createBottomRightWave() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');

        let [startX, startY] = this.getStartingPosition(Corners.BOTTOM_RIGHT);

        let gap = playerCanvas.width / 130;
        let numCols = this.calculateColumnsForEnemies(this.waveSize)
        let elementNumber = 1;

        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row <= col && elementNumber <= this.waveSize; row++) {
                let actualRow = row;
                let actualCol = col - row;

                this.spawnQueue.push({ x: startX - actualCol * (gap + this.enemyWidth), y: startY - actualRow * (gap + this.enemyHeight) })
                elementNumber++;
            }
        }
    }


    getPossibleCorner() {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        const distanceTopLeft = Math.sqrt(Math.pow(this.game.player.posX, 2) + Math.pow(this.game.player.posY, 2));
        const distanceTopRight = Math.sqrt(Math.pow(playerCanvas.width - this.game.player.posX, 2) + Math.pow(this.game.player.posY, 2));
        const distanceBottomLeft = Math.sqrt(Math.pow(this.game.player.posX, 2) + Math.pow(playerCanvas.height - this.game.player.posY, 2));
        const distanceBottomRight = Math.sqrt(Math.pow(playerCanvas.width - this.game.player.posX, 2) + Math.pow(playerCanvas.height - this.game.player.posY, 2));

        if (distanceTopLeft >= distanceTopRight && distanceTopLeft >= distanceBottomLeft && distanceTopLeft >= distanceBottomRight) {
            return Corners.UPPER_LEFT
        } else if (distanceTopRight >= distanceTopLeft && distanceTopRight >= distanceBottomLeft && distanceTopRight >= distanceBottomRight) {
            return Corners.UPPER_RIGHT
        } else if (distanceBottomLeft >= distanceTopLeft && distanceBottomLeft >= distanceTopRight && distanceBottomLeft >= distanceBottomRight) {
            return Corners.BOTTOM_LEFT
        } else {
            return Corners.BOTTOM_RIGHT
        }
    }

    getStartingPosition(corner) {
        let playerCanvas = this.game.getCanvasManager().getCanvas('playerCanvas');

        if (corner === Corners.UPPER_LEFT) {
            return [this.borderWidth + this.gapFromBorder, this.borderWidth + this.gapFromBorder];
        } else if (corner === Corners.UPPER_RIGHT) {
            return [playerCanvas.width - this.borderWidth - this.gapFromBorder - this.enemyWidth, this.borderWidth + this.gapFromBorder];

        } else if (corner === Corners.BOTTOM_LEFT) {
            return [this.borderWidth + this.gapFromBorder, playerCanvas.height - this.borderWidth - this.gapFromBorder - this.enemyHeight];
        } else if (corner === Corners.BOTTOM_RIGHT) {
            return [playerCanvas.width - this.borderWidth - this.gapFromBorder - this.enemyWidth, playerCanvas.height - this.borderWidth - this.gapFromBorder - this.enemyHeight];
        }
    }
}