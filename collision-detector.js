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
         let distanceFromBorder = entity.posY - this.topBorder
         if (distanceFromBorder >= Math.abs(velocity)) return false
         if (distanceFromBorder > 0) entity.posY += -distanceFromBorder
         return true
      }
   }

   collidesWithRightBorder(entity, velocity = 0) {
      if (entity instanceof RectangleEntity) {
         let distanceFromBorder = this.canvas.width - this.game.settings.BORDER_SIZE - (entity.posX + entity.width)
         if (distanceFromBorder >= Math.abs(velocity)) return false
         if (distanceFromBorder > 0) entity.posX += distanceFromBorder
         return true
      }
   }

   collidesWithBottomBorder(entity, velocity = 0) {
      if (entity instanceof RectangleEntity) {
         let distanceFromBorder = this.canvas.height - settings.BORDER_SIZE - (entity.posY + entity.height)
         if (distanceFromBorder >= Math.abs(velocity)) return false
         if (distanceFromBorder > 0) entity.posY += distanceFromBorder
         return true
      }
   }

   collidesWithLeftBorder(entity, velocity = 0) {
      if (entity instanceof RectangleEntity) {
         let distanceFromBorder = entity.posX - this.leftBorder
         if (distanceFromBorder >= Math.abs(velocity)) return false
         if (distanceFromBorder > 0) entity.posX -= distanceFromBorder
         return true
      }
   }
}