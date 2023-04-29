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
         this.resizeEntity(this.game.player, percentChange)
         console.log('playersize', this.game.player.width);
      }

      if (this.game.borders) {
        let gameBorders = this.game.borders.getBorders()
        Array.from(Object.values(gameBorders)).forEach(border => {
            this.resizeEntity(border, percentChange)
        })
      }
    }

    resizeEntity(entity, percentChange) {
        console.log(entity);
        entity.width = entity.width + entity.width * percentChange / 100
        entity.height = entity.height + entity.height * percentChange / 100
        entity.posX = entity.posX + entity.posX * percentChange / 100
        entity.posY = entity.posY + entity.posY * percentChange / 100
    }

    scaleEntities() { // Scaling entities according to starting screen size
      let canvas = this.canvases['playerCanvas']
      this.scaleEntity(canvas, this.game.player)
      
      let gameBorders = this.game.borders.getBorders()
      Array.from(Object.values(gameBorders)).forEach(border => {
        this.scaleEntity(canvas, border)
    })
      
      console.log(this.game.player.width);
    }

    scaleEntity(canvas, entity) {
        entity.width = entity.width * canvas.width / 100
        entity.height = entity.height * canvas.width / 100
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