import Enemy from "./enemies/enemy.js";
import Player from "./player.js";

export default class HealthBar {
    constructor(game, entity) {
        this.game = game;
        this.entity = entity;
        this.canvas = this.game.getCanvasManager().getCanvas('playerCanvas');
        this.baseWidth = entity.baseWidth * 0.8;
        console.log("basewidth", this.baseWidth);
        this.baseHeight = this.baseWidth / 3;
        this.width = this.baseWidth * this.canvas.width;
        console.log("width", this.width, this.canvas.width);
        this.height = this.baseHeight * this.canvas.width;
        this.outlineColor = "#800080";
        this.fillColor = "#A020F0"; 

        // Check if the entity is a valid player or enemy instance
        if (!(entity instanceof Player) && !(entity instanceof Enemy)) {
            throw new Error("HealthBar can only be used with PlayerEntity or EnemyEntity instances.");
        }
    }

    draw() {
        let ctx = this.game.getCanvasManager().getContext('playerCanvas');
        let entityCenterX = this.entity.posX + this.entity.width / 2;
        let entityBottomY = this.entity.posY + this.entity.height;

        let posX = entityCenterX - this.width / 2;
        let gapFromEntityBottom = 0.1 / 100 * this.canvas.width;
        let posY = entityBottomY + gapFromEntityBottom;
        ctx.strokeStyle = this.outlineColor;
        ctx.strokeRect(posX, posY, this.width, this.height);

        let fillWidth = (this.entity.health / this.entity.maxHealth) * this.width;

        // Draw the filled inner part
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(posX, posY, fillWidth, this.height);
    }
}
