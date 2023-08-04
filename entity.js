import MathUtil from "./helpers/math-util.js"

class Entity {
    constructor(game, posX, posY, velX, velY, color, image) {
        this.game = game
        this.posX = posX
        this.posY = posY
        this.velX = velX
        this.velY = velY
        this.lastMovedDirection;
        this.color = color
        this.image = image
        this.opacity = 1;
    }
}

class RectangleEntity extends Entity {
    constructor(game, posX, posY, width, height, angle, velX, velY, velRotation, color, image) {
        super(game, posX, posY, velX, velY, color, image)
        let canvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        this.baseWidth = width / 100;
        this.baseHeight = height / 100;
        this.velX = this.velX * canvas.width / 800;
        this.velY = this.velY * canvas.width / 800;
        this.width = this.baseWidth * canvas.width;
        this.height = this.baseHeight * canvas.width;
        this.angle = angle;
        this.velRotation = MathUtil.degreesToRadians(velRotation);

        this.isBeingHit = false;
        this.hitMarkerTicks = 0;

    }

    updatePosition() {
        this.posX = this.posX + this.velX;
        this.posY = this.posY + this.velY;
    }

    draw(canvasName) {
        let ctx = this.game.getCanvasManager().getContext(canvasName);
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

            if (this.isBeingHit) {
                ctx.filter = 'brightness(800%)';
                ctx.drawImage(
                    this.image,
                    (this.posX) * flip,
                    (this.posY),
                    this.width * flip,
                    this.height
                );


                this.hitMarkerTicks++;
                if (this.hitMarkerTicks >= this.game.settings.HITMARKER_TICKS) {
                    this.isBeingHit = false;
                    this.hitMarkerTicks = 0;
                }
            } else {
                ctx.drawImage(
                    this.image,
                    (this.posX) * flip,
                    (this.posY),
                    this.width * flip,
                    this.height
                );
            }

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

class CircleEntity extends Entity {
    constructor(game, posX, posY, radius, velX, velY, color, image) {
        super(game, posX, posY, velX, velY, color, image)
        this.radius = radius
    }
}

export { Entity, RectangleEntity, CircleEntity }