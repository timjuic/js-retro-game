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
        

        this.resizeGameElements(percentChange)
    }

    resizeGameElements(percentChange) {
      let canvas = this.canvases['playerCanvas']
      if (this.game.player) {
         this.resizeEntity(this.game.player, percentChange)
      }

      if (this.game.borderManager) {
        let gameBorders = this.game.borderManager.getBorders()
        Array.from(Object.values(gameBorders)).forEach(border => {
            this.resizeEntity(border, percentChange)
        })
      }

      if (this.game.playerBullets) {
        this.game.playerBullets.forEach(bulletEntity => {
            this.resizeEntity(bulletEntity, percentChange);
        })
      }

      if (this.game.crosshairManager) {

      }
    }

    resizeEntity(entity, percentChange) {
        entity.width = entity.width + entity.width * percentChange / 100
        entity.height = entity.height + entity.height * percentChange / 100
        entity.posX = entity.posX + entity.posX * percentChange / 100
        entity.posY = entity.posY + entity.posY * percentChange / 100
    }

    scaleEntities() { // Scaling entities according to starting screen size
      let canvas = this.canvases['playerCanvas']
      this.scaleEntity(canvas, this.game.player)
      
      let gameBorders = this.game.borderManager.getBorders()
      Array.from(Object.values(gameBorders)).forEach(border => {
        this.scaleEntity(canvas, border)
      })      
    }

    scaleEntity(canvas, entity) {
        entity.width = entity.width * canvas.width / 100
        entity.height = entity.height * canvas.width / 100
    }

    resizeCanvases() {
      this.game.pause();
        Array.from(Object.values(this.canvases)).forEach(canvas => {
            this.resizeCanvas(canvas)
        })
        this.game.drawGameElements();
    }

    clearCanvases() {
        for (let [name, ctx] of Object.entries(this.contexts)) {
          if (name === "crosshairCanvas") continue;
            ctx.clearRect(0, 0, this.canvases[name].width, this.canvases[name].height)
        }
    }
}