import BasicEnemy from "./enemies/basic-enemy.js";
import MathUtil from "./helpers/math-util.js";
import CanvasManager from "./managers/canvas-manager.js";

export default class StartCanvasManager {
    constructor(assetLoader) {
        this.assetLoader = assetLoader;
        this.startCanvas = document.getElementById('start-canvas');
        this.ctx = this.startCanvas.getContext('2d');
        this.canvasManager = new CanvasManager(this, 'fullScreen');
        this.canvasManager.canvases['start-canvas'] = this.startCanvas;
        this.canvasManager.contexts['start-canvas'] = this.ctx;

        this.canvasManager.resizeCanvases();
        this.createDisplayEnemies()
        this.canvasManager.eventEmmiter.on('resized', this.createDisplayEnemies.bind(this))
        window.addEventListener('mousemove', (event) => this.moveEntities(event));

    }

    moveEntities(event) {
        this.ctx.clearRect(0, 0, this.startCanvas.width, this.startCanvas.height)
        this.enemies.forEach(enemy => {
            enemy.move(event);
            enemy.draw(this.ctx);
        })
    }

    createDisplayEnemies() {
        this.enemies = [];
        let dummyGameObj = {}
        dummyGameObj.assetLoader = this.assetLoader;
        this.enemies.push(new StartScreenEntity(50, 20, 40, 40, 0, 1, 1, this.assetLoader.characters.basic))
        this.enemies.push(new StartScreenEntity(300, 600, 40, 40, 0, 1, 1, this.assetLoader.characters.basic))
        this.enemies.push(new StartScreenEntity(700, 130, 40, 40, -30, 1, 1, this.assetLoader.characters.basic))
        this.enemies.push(new StartScreenEntity(200, 100, 50, 50, 10, 1, 1, this.assetLoader.characters.speedy))
        this.enemies.push(new StartScreenEntity(400, 40, 70, 70, -10, 1, 1, this.assetLoader.characters.spawner))
        this.enemies.push(new StartScreenEntity(600, 500, 40, 40, 10, 1, 1, this.assetLoader.characters.tank))
        this.enemies.push(new StartScreenEntity(850, 630, 80, 80, 0, 1, 1, this.assetLoader.characters.tank))
        this.enemies.push(new StartScreenEntity(70, 400, 40, 40, 10, 1, 1, this.assetLoader.characters.teleporter))
        this.enemies.push(new StartScreenEntity(500, 600, 40, 40, -30, 1, 1, this.assetLoader.characters.teleporter))
        this.enemies.push(new StartScreenEntity(20, 550, 60, 60, -30, 1, 1, this.assetLoader.characters.kamikaze))
        this.enemies.push(new StartScreenEntity(150, 680, 40, 40, 0, 1, 1, this.assetLoader.characters.buff))
        this.enemies.push(new StartScreenEntity(900, 400, 60, 60, 0, 1, 1, this.assetLoader.characters.pufpuf))
        this.enemies.push(new StartScreenEntity(1400, 100, 50, 50, -20, 1, 1, this.assetLoader.characters.basic));
        this.enemies.push(new StartScreenEntity(1300, 300, 60, 60, 30, 1, 1, this.assetLoader.characters.basic));
        this.enemies.push(new StartScreenEntity(1100, 150, 40, 40, -10, 1, 1, this.assetLoader.characters.basic));
        this.enemies.push(new StartScreenEntity(700, 200, 45, 45, 0, 1, 1, this.assetLoader.characters.speedy));
        this.enemies.push(new StartScreenEntity(1200, 400, 60, 60, 20, 1, 1, this.assetLoader.characters.spawner));
        this.enemies.push(new StartScreenEntity(1000, 550, 50, 50, -15, 1, 1, this.assetLoader.characters.tank));
        this.enemies.push(new StartScreenEntity(950, 680, 75, 75, 10, 1, 1, this.assetLoader.characters.teleporter));
        this.enemies.push(new StartScreenEntity(270, 300, 60, 60, 0, 1, 1, this.assetLoader.characters.buff));
        this.enemies.push(new StartScreenEntity(750, 600, 40, 40, -5, 1, 1, this.assetLoader.characters.buff));
        this.enemies.push(new StartScreenEntity(1100, 650, 70, 70, 35, 1, 1, this.assetLoader.characters.pufpuf));

        this.enemies.forEach(enemy => enemy.draw(this.ctx))
    }
}


class StartScreenEntity {
    constructor(posX, posY, width, height, angle, movingModifier, movingDirection, image) {
        this.posX = posX;
        this.posY = posY;
        this.originalPosX = posX;
        this.originalPosY = posY;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.movingModifier = MathUtil.generateRandomNumber(0.001, 0.03);
        this.movingDirection = MathUtil.getRandomSign();
        this.image = image;
    }

    move(event) {
        this.posX = this.originalPosX + event.clientX * this.movingDirection * this.movingModifier;
        this.posY = this.originalPosY + event.clientY * this.movingDirection * this.movingModifier
    }

    draw(ctx) {
        ctx.globalAlpha = this.opacity;
        ctx.save();

        let centerX = this.posX + this.width / 2;
        let centerY = this.posY + this.height / 2;

        ctx.translate(centerX, centerY);
        ctx.rotate(MathUtil.degreesToRadians(this.angle));
        ctx.translate(-centerX, -centerY);

        if (this.image !== undefined) {
            let flip;
            if (this.lastMovedDirection !== undefined) {
                flip = this.lastMovedDirection * -1;
            } else {
                flip = this.velX > 0 ? 1 : -1;
            }

            ctx.scale(flip, 1);

            ctx.drawImage(
                this.image,
                (this.posX) * flip,
                (this.posY),
                this.width * flip,
                this.height
            );

        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(
                this.posX,
                this.posY,
                this.width,
                this.height
            );
        }

        ctx.restore();
    }
}