export default class CanvasManager {
    constructor() {
        this.canvases = {}

    }

    generateCanvas(canvasName) {
        let gameContainer = document.getElementById('game-container');
        let newCanvas = document.createElement('canvas')
        newCanvas.id = canvasName;
        gameContainer.append(newCanvas)
        this.canvases[canvasName] = newCanvas;
    }

    
}