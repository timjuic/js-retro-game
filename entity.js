class Entity {
   constructor(game, posX, posY, velX, velY, color, image) {
      this.game = game
      this.posX = posX
      this.posY = posY
      this.velX = velX
      this.velY = velY
      this.color = color
      this.image = image
   }
}

class RectangleEntity extends Entity {
   constructor(game, posX, posY, width, height, angle, velX, velY, color, image) {
      super(game, posX, posY, velX, velY, color, image)
      this.width = width;
      this.height = height
      this.angle = angle
   }

   updatePosition() {
      this.posX = this.posX + this.velX;
      this.posY = this.posY + this.velY;
   }

   draw(canvasName) {
      let canvas = this.game.getCanvasManager().getCanvas(canvasName)
      let ctx = this.game.getCanvasManager().getContext(canvasName)
      ctx.fillStyle = this.color
      ctx.fillRect(this.posX, this.posY, this.width, this.height)
   }
}

class CircleEntity extends Entity {
   constructor(game, posX, posY, radius, velX, velY, color, image) {
      super(game, posX, posY, velX, velY, color, image)
      this.radius = radius
   }
}

export { Entity, RectangleEntity, CircleEntity }