import EventEmmiter from "../helpers/event-emmiter.js";
import Player from "../player.js";

export default class CanvasManager {
    constructor(game, resizeBehavior = 'aspectRatio') {
      this.game = game;
      this.eventEmmiter = new EventEmmiter();
      this.resizeBehavior = resizeBehavior;
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
      const delay = 50;

      const resizeFunction = () => {
          clearTimeout(resizeTimer);

          resizeTimer = setTimeout(() => {
              this.resizeCanvases();
              this.eventEmmiter.emit('resized')
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
            ctx.imageSmoothingEnabled = 'false';
            this.contexts[name] = ctx;
        }
    }

    resizeCanvas(canvas) {
        this.previousCanvasWidth = canvas.width;
        this.previousCanvasHeight = canvas.height;

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        if (this.resizeBehavior === 'aspectRatio') {
            let widthHeightRatio = 16 / 9;
            let isWidthLarger = windowWidth / windowHeight > widthHeightRatio;

            if (isWidthLarger) {
                canvas.width = windowHeight * widthHeightRatio;
                canvas.height = windowHeight;
            } else {
                canvas.width = windowWidth;
                canvas.height = windowWidth / widthHeightRatio;
            }
        } else if (this.resizeBehavior === 'fullScreen') {
            canvas.width = windowWidth;
            canvas.height = windowHeight;
        }

        this.newCanvasWidth = canvas.width;
        this.newCanvasHeight = canvas.height;
    }

    resizeGameElements() {
      if (this.game.player) {
         this.resizeEntity(this.game.player)
      }

      if (this.game.borderManager) {
        let gameBorders = this.game.borderManager.getBorders()
        Array.from(Object.values(gameBorders)).forEach(border => {
            this.resizeEntity(border)
        })
      }

      if (this.game.enemies) {
        this.game.enemies.forEach(enemy => {
            this.resizeEntity(enemy);
          })
      }

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

    resizeCanvases() {
    //   this.game.pause();
        Array.from(Object.values(this.canvases)).forEach(canvas => {
            this.resizeCanvas(canvas)
        })
        this.resizeGameElements()
        // this.game.drawGameElements();
    }

    clearCanvases() {
        for (let [name, ctx] of Object.entries(this.contexts)) {
          if (name === "crosshairCanvas" || name === 'backgroundCanvas') continue;
            ctx.clearRect(0, 0, this.canvases[name].width, this.canvases[name].height)
        }
    }

    drawBackground() {
        this.contexts['backgroundCanvas'].drawImage(this.game.getAssetManager().other.background, 0, 0, this.game.canvas.width, this.game.canvas.height);
    }
}