export default class CanvasManager {
    constructor() {
        this.canvases = {}
        window.addEventListener('resize', () => this.resizeCanvases())
    }

    generateCanvas(canvasName) {
        let gameContainer = document.getElementById('game-container');
        let newCanvas = document.createElement('canvas')
        newCanvas.id = canvasName;
        newCanvas.className = 'game-canvas';
        
        this.resizeCanvas(newCanvas)

        gameContainer.append(newCanvas)
        this.canvases[canvasName] = newCanvas;
    }

    resizeCanvas(canvas) {
        let widthHeightRatio = 16 / 9;
        let previousWidth = canvas.width;
        let previousHeight = canvas.height;

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        
        let isWidthLarger = windowWidth / windowHeight > 16 / 9
        if (isWidthLarger) {
            canvas.width = windowHeight * 16 / 9
            canvas.height = windowHeight
        } else {
            canvas.width = windowWidth
            canvas.height = windowWidth * 9 / 16
        }
    }

    resizeCanvases() {
        Array.from(Object.values(this.canvases)).forEach(canvas => {
            this.resizeCanvas(canvas)
        })
    }


}