import { CircleEntity, RectangleEntity } from "./entity.js";
import MathUtil from "./helpers/math-util.js";

export default class CollisionDetector {
   constructor(game) {
      this.game = game
      this.canvas = this.game.getCanvasManager().getCanvas('playerCanvas')
      let settings = this.game.settings
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

   isFullyInsideCanvas() {
      if (entity.posX + entity.width < 0) return false;
      if (entity.posY + entity.height < 0) return false;
      if (entity.posX > this.canvas.width) return false;
      if (entity.posY > this.canvas.height) return false;
      return true;
   }


    collidesWithEntityRotated(rect1, rect2) {
      // Helper function to get unit vector from angle (radians)
      const getUnitVectorFromAngle = (angle) => {
        return { x: Math.cos(angle), y: Math.sin(angle) };
      };
  
      // Function to project rectangle points onto an axis and find the min and max points
      const projectRectangleOntoAxis = (rectangle, axis) => {
        const points = [
          rectangle.posX,
          rectangle.posY,
          rectangle.posX + rectangle.width,
          rectangle.posY,
          rectangle.posX,
          rectangle.posY + rectangle.height,
          rectangle.posX + rectangle.width,
          rectangle.posY + rectangle.height
        ];
  
        let min = Infinity;
        let max = -Infinity;
  
        for (let i = 0; i < points.length; i += 2) {
          const x = points[i];
          const y = points[i + 1];
  
          const dotProduct = x * axis.x + y * axis.y;
          if (dotProduct < min) min = dotProduct;
          if (dotProduct > max) max = dotProduct;
        }
  
        return { min, max };
      };
  
      // Update the angle calculation as needed for the collision detection
      const rect1Angle = MathUtil.calculateAngle(rect1.posX, rect1.posY, rect1.posX + rect1.width, rect1.posY);
      const rect2Angle = MathUtil.calculateAngle(rect2.posX, rect2.posY, rect2.posX + rect2.width, rect2.posY);
  
      // Get the unit vectors from the angles
      const rect1AxisX = getUnitVectorFromAngle(rect1Angle);
      const rect1AxisY = getUnitVectorFromAngle(rect1Angle + Math.PI / 2); // Perpendicular axis
      const rect2AxisX = getUnitVectorFromAngle(rect2Angle);
      const rect2AxisY = getUnitVectorFromAngle(rect2Angle + Math.PI / 2); // Perpendicular axis
  
      // Project rectangles onto axes
      const rect1ProjectionX = projectRectangleOntoAxis(rect1, rect1AxisX);
      const rect1ProjectionY = projectRectangleOntoAxis(rect1, rect1AxisY);
      const rect2ProjectionX = projectRectangleOntoAxis(rect2, rect2AxisX);
      const rect2ProjectionY = projectRectangleOntoAxis(rect2, rect2AxisY);
  
      // Function to check if two intervals overlap
      const doIntervalsOverlap = (min1, max1, min2, max2) => {
        return !(max1 < min2 || max2 < min1);
      };
  
      // Check for overlap along each rectangle axis
      if (
        !doIntervalsOverlap(rect1ProjectionX.min, rect1ProjectionX.max, rect2ProjectionX.min, rect2ProjectionX.max) ||
        !doIntervalsOverlap(rect1ProjectionY.min, rect1ProjectionY.max, rect2ProjectionY.min, rect2ProjectionY.max)
      ) {
        return false; // No overlap found on any axis, rectangles are not overlapping
      }
  
      return true; // Overlap found on both axes, rectangles are overlapping
    }
  
  
}

