export default class CanvasManager {
    constructor() {
        this.canvases = {}
        this.contexts = {};
        window.addEventListener('resize', () => this.resizeCanvases())
    }

    getCanvas(canvasName) {
      return this.canvases[canvasName]
    }

    getContext(canvasName) {
      return this.contexts[canvasName]
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

    loadContexts() {
        for (let [name, canvas] of Object.entries(this.canvases)) {
            this.contexts[name] = canvas.getContext('2d');
        }
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

    clearCanvases() {
        for (let [name, ctx] of Object.entries(this.contexts)) {
            ctx.clearRect(0, 0, this.canvases[name].width, this.canvases[name].height)
        }
    }


}