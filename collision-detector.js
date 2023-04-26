import { CircleEntity, RectangleEntity } from "./entity.js";

export default class CollisionDetector {
   constructor(game) {
      this.game = game
      this.canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
      let settings = this.game.settings
      console.log(settings);
      this.topBorder = settings.BORDER_SIZE
      this.rightBorder = this.canvas.width - settings.BORDER_SIZE
      this.bottomBorder = this.canvas.height - settings.BORDER_SIZE
      this.leftBorder = settings.BORDER_SIZE
   }

   collidesWithTopBorder(entity, velocity = 0) {
      if (entity instanceof RectangleEntity) {
         console.log(entity.posY + velocity,  this.topBorder);
         return entity.posY + velocity < this.topBorder
      }
   }

   collidesWithRightBorder(entity, velocity = 0) {
      if (entity instanceof RectangleEntity) {
         console.log(entity.posX + entity.width + velocity, this.rightBorder);
         return entity.posX + entity.width + velocity > this.rightBorder
      }
   }

   collidesWithBottomBorder(entity, velocity = 0) {
      if (entity instanceof RectangleEntity) {
         console.log(entity.posY + entity.height, this.bottomBorder);
         return entity.posY + entity.height + velocity > this.bottomBorder
      }
   }

   collidesWithLeftBorder(entity, velocity = 0) {
      if (entity instanceof RectangleEntity) {
         console.log(entity.posX + velocity, this.leftBorder);
         return entity.posX + velocity < this.leftBorder
      }
   }
}