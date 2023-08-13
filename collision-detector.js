import { CircleEntity, RectangleEntity } from "./entity.js";
import MathUtil from "./helpers/math-util.js";

export default class CollisionDetector {
   constructor(game) {
      this.game = game
      this.canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
   }

   #getTopBorder() {
      let borders = this.game.getBorderManager().getBorders()
      return borders.top.height
   }

   #getRightBorder() {
      let borders = this.game.getBorderManager().getBorders()
      return this.canvas.width - borders.right.width
   }

   #getBottomBorder() {
      let borders = this.game.getBorderManager().getBorders()
      return this.canvas.height - borders.bottom.height
   }

   #getLeftBorder() {
      let borders = this.game.getBorderManager().getBorders()
      return borders.left.width
   }

   collidesWithTopBorder(entity, velocity = 0) {
      if (entity instanceof RectangleEntity) {
         let distanceFromBorder = entity.posY - this.#getTopBorder()
         if (distanceFromBorder >= Math.abs(velocity)) return false
         if (distanceFromBorder > 0) entity.posY += -distanceFromBorder
         return true
      }
   }

   collidesWithRightBorder(entity, velocity = 0) {
      if (entity instanceof RectangleEntity) {
         let distanceFromBorder = this.#getRightBorder() - (entity.posX + entity.width)
         if (distanceFromBorder >= Math.abs(velocity)) return false
         if (distanceFromBorder > 0) entity.posX += distanceFromBorder
         return true
      }
   }

   collidesWithBottomBorder(entity, velocity = 0) {
      if (entity instanceof RectangleEntity) {
         let distanceFromBorder = this.#getBottomBorder() - (entity.posY + entity.height)
         if (distanceFromBorder >= Math.abs(velocity)) return false
         if (distanceFromBorder > 0) entity.posY += distanceFromBorder
         return true
      }
   }

   collidesWithLeftBorder(entity, velocity = 0) {
      if (entity instanceof RectangleEntity) {
         let distanceFromBorder = entity.posX - this.#getLeftBorder()
         if (distanceFromBorder >= Math.abs(velocity)) return false
         if (distanceFromBorder > 0) entity.posX -= distanceFromBorder
         return true
      }
   }

   collidesWithEntity(entity1, entity2) {
      return (
         entity1.posX < entity2.posX + entity2.width &&
         entity1.posX + entity1.width > entity2.posX &&
         entity1.posY < entity2.posY + entity2.height &&
         entity1.posY + entity1.height > entity2.posY
      );
    }
    

   isInsideCanvas(entity) {
      if (entity.posX < 0) return false;
      if (entity.posY < 0) return false;
      if (entity.posX + entity.width > this.canvas.width) return false;
      if (entity.posY + entity.height > this.canvas.height) return false;
      return true;
   }

   isInsideCanvasBorders(entity) {
      if (entity.posX < this.#getLeftBorder()) return false;
      if (entity.posY < this.#getTopBorder()) return false;
      if (entity.posX + entity.width > this.#getRightBorder()) return false;
      if (entity.posY + entity.height > this.#getBottomBorder()) return false;
      return true;
   }

   isFullyInsideCanvas(entity) {
      if (entity.posX + entity.width < 0) return false;
      if (entity.posY + entity.height < 0) return false;
      if (entity.posX > this.canvas.width) return false;
      if (entity.posY > this.canvas.height) return false;
      return true;
   }
}

