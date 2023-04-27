export default class CanvasManager {
    constructor(game) {
      this.game = game;
      this.canvases = {}
      this.contexts = {};
      this.previousCanvasWidth
      this.previousCanvasHeight
      this.newCanvasWidth
      this.newCanvasHeight
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
         this.previousCanvasWidth = canvas.width
         this.previousCanvasHeight = canvas.height

        let widthHeightRatio = 16 / 9;

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

        let widthChangedPercentage = (canvas.width - this.previousCanvasWidth) / this.previousCanvasWidth * 100
        let heightChangedPercentage = (canvas.height - this.previousCanvasHeight) / this.previousCanvasHeight * 100
        let percentChange = (widthChangedPercentage + heightChangedPercentage) / 2
        console.log("changedpercentage", widthChangedPercentage, heightChangedPercentage, percentChange);

        this.resizeGameElements(percentChange)
    }

    resizeGameElements(percentChange) {
      let canvas = this.canvases['playerCanvas']
      if (this.game.player) {
         this.game.player.width = this.game.player.width + this.game.player.width * percentChange / 100
         this.game.player.height = this.game.player.height + this.game.player.height * percentChange / 100
         this.game.player.posX = this.game.player.posX + this.game.player.posX * percentChange / 100
         this.game.player.posY = this.game.player.posY + this.game.player.posY * percentChange / 100
         console.log('playersize', this.game.player.width);
      }

      if (this.game.border) {

      }
    }

    scaleEntities() {
      let canvas = this.canvases['playerCanvas']
      this.game.player.width = this.game.player.width * canvas.width / 100
      this.game.player.height = this.game.player.height * canvas.width / 100
      // this.game.player.posX = this.game.player.posX * canvas.width / 100
      // this.game.player.posY = this.game.player.posY * canvas.height / 100
      console.log(this.game.player.width);
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