import { RectangleEntity } from "./entity.js";

export default class BorderManager{
    constructor(game, thickness) {
        this.game = game
        let canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
        this.borders = {
            top: new RectangleEntity(game, 0, 0, canvas.width, thickness, 0,0,0,0, "white"),
            right: new RectangleEntity(game, canvas.width - thickness, 0, thickness, canvas.height, 0,0,0,0, "white"),
            bottom: new RectangleEntity(game, 0, canvas.height - thickness, canvas.width, thickness, 0,0,0,0, "white"),
            left: new RectangleEntity(game, 0, 0, thickness, canvas.height, 0,0,0,0, "white")
        };
    }

    getBorders() {
        return this.borders
    }

    getTopBorder() {
        let borders = this.getBorders()
        return borders.top.height
     }
  
    getRightBorder() {
        let canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
        let borders = this.getBorders()
        return canvas.width - borders.right.width
     }
  
    getBottomBorder() {
        let canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
        let borders = this.getBorders()
        return canvas.height - borders.bottom.height
     }
  
    getLeftBorder() {
        let borders = this.getBorders()
        return borders.left.width
     }

    drawBorders(canvasName) {
      let canvas = this.game.getCanvasManager().getCanvas(canvasName)
      let ctx = this.game.getCanvasManager().getContext(canvasName)
      ctx.fillStyle = this.borders.top.color
    
      let borderThickness = this.borders.top.height;
      let halfCanvasWidth = canvas.width / 2;
      let halfBorderWidth = this.borders.top.width / 2;
      ctx.fillRect(halfCanvasWidth - halfBorderWidth, 0, this.borders.top.width, borderThickness);
      ctx.fillRect(halfCanvasWidth - halfBorderWidth, canvas.height - borderThickness, this.borders.bottom.width, borderThickness);
    
      let borderHeight = canvas.height - (2 * borderThickness);
      let halfCanvasHeight = canvas.height / 2;
      let halfBorderHeight = borderHeight / 2;
      ctx.fillRect(0, halfCanvasHeight - halfBorderHeight, this.borders.left.width, borderHeight);
      ctx.fillRect(canvas.width - this.borders.right.width, halfCanvasHeight - halfBorderHeight, this.borders.right.width, borderHeight);
    }
}