import Player from "../player.js";

export default class CanvasManager {
    constructor(game) {
      this.game = game;
      this.canvases = {}
      this.contexts = {};
      this.previousCanvasWidth
      this.previousCanvasHeight
      this.newCanvasWidth
      this.newCanvasHeight
      this.activateResizeHandler();
    }

    activateResizeHandler() {
      let resizeTimer;
      const delay = 50; // The debounce delay in milliseconds

      const resizeFunction = () => {
          // Clear the previous resize timer
          clearTimeout(resizeTimer);

          // Start a new timer for the current resize event
          resizeTimer = setTimeout(() => {
              this.resizeCanvases();
          }, delay);
      };

      window.addEventListener('resize', resizeFunction);
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
        newCanvas.style.imageRendering = "pixelated";
        
        this.resizeCanvas(newCanvas)

        gameContainer.append(newCanvas)
        this.canvases[canvasName] = newCanvas;
    }

    loadContexts() {
        for (let [name, canvas] of Object.entries(this.canvases)) {
            let ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = 'false'
            this.contexts[name] = ctx;
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

        this.newCanvasWidth = canvas.width;
        this.newCanvasHeight = canvas.height;
    }

    resizeGameElements() {
      let canvas = this.canvases['playerCanvas']
      if (this.game.player) {
         this.resizeEntity(this.game.player)
      }

      if (this.game.borderManager) {
        let gameBorders = this.game.borderManager.getBorders()
        Array.from(Object.values(gameBorders)).forEach(border => {
            this.resizeEntity(border)
        })
      }

      this.game.enemies.forEach(enemy => {
        this.resizeEntity(enemy);
      })

      if (this.game.playerBullets) {
        this.game.playerBullets.forEach(bulletEntity => {
            this.resizeEntity(bulletEntity);
        })
      }

      if (this.game.crosshairManager) {
        this.resizeEntity(this.game.getCrosshair())
      }
    }

    resizeEntity(entity) {
        let widthPercentage = entity.baseWidth;
        let heightPercentage = entity.baseHeight;
        let xPosPercentage = entity.posX / this.previousCanvasWidth;
        let yPosPercentage = entity.posY / this.previousCanvasHeight;
        let xVelPercentage = entity.velX / this.previousCanvasWidth;
        let yVelPercentage = entity.velY / this.previousCanvasHeight;
        if (entity.speed) var speedPercentage = entity.speed / this.previousCanvasWidth;
        if (entity.healthBar) var healthBarPercentage = entity.healthBar.width / this.previousCanvasWidth;
        
        entity.width = (this.newCanvasWidth * widthPercentage);
        entity.height = (this.newCanvasWidth * heightPercentage);
        entity.posX = (this.newCanvasWidth * xPosPercentage);
        entity.posY = (this.newCanvasHeight  * yPosPercentage);
        entity.velX = (this.newCanvasWidth * xVelPercentage);
        entity.velY = (this.newCanvasHeight  * yVelPercentage);
        if (entity.speed) entity.speed = this.newCanvasWidth * speedPercentage
        if (entity.healthBar) {
            entity.healthBar.width = this.newCanvasWidth * healthBarPercentage;
            entity.healthBar.height = entity.healthBar.width / 3;
        }
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
        entity.width = entity.baseWidth * canvas.width;
        entity.height = entity.baseHeight * canvas.width
    }

    resizeCanvases() {
      this.game.pause();
        Array.from(Object.values(this.canvases)).forEach(canvas => {
            this.resizeCanvas(canvas)
        })
        this.game.drawGameElements();
        this.resizeGameElements()
    }

    clearCanvases() {
        for (let [name, ctx] of Object.entries(this.contexts)) {
          if (name === "crosshairCanvas") continue;
            ctx.clearRect(0, 0, this.canvases[name].width, this.canvases[name].height)
        }
    }
}