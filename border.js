import { RectangleEntity } from "./entity.js";

export default class Border{
    constructor(game, thickness) {
        this.game = game
        let canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
        this.borders = {
            top: new RectangleEntity(game, 0, 0, canvas.width, thickness, 0,0,0, "white"),
            right: new RectangleEntity(game, canvas.width - thickness, 0, thickness, canvas.height, 0,0,0, "white"),
            bottom: new RectangleEntity(game, 0, canvas.height - thickness, canvas.width, thickness, 0,0,0, "white"),
            left: new RectangleEntity(game, 0, 0, thickness, canvas.height, 0,0,0, "white")
        };
    }

    getBorders() {
        return this.borders
    }

    draw(canvasName) {
        Array.from(Object.values(this.borders)).forEach(border => border.draw(canvasName));
    }
}