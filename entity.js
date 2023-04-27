class Entity {
   constructor(posX, posY, velX, velY, color, image) {
      this.posX = posX
      this.posY = posY
      this.velX = velX
      this.velY = velY
      this.color = color
      this.image = image
   }
}

class RectangleEntity extends Entity {
   constructor(posX, posY, width, height, angle, velX, velY, color, image) {
      super(posX, posY, velX, velY, color, image)
      this.width = width;
      this.height = height
      this.angle = angle
   }

   draw() {
      ctx.fillStyle = this.color
      ctx.fillRect(0, 0, canvas.width, this.height)
      ctx.fillRect(canvas.width - this.width, 0, this.width, canvas.height)
      ctx.fillRect(0, canvas.height - this.height, canvas.width, this.height)
      ctx.fillRect(0, 0, this.width, canvas.height)
   }
}

class CircleEntity extends Entity {
   constructor(posX, posY, radius, velX, velY, color, image) {
      super(posX, posY, velX, velY, color, image)
      this.radius = radius
   }
}

export { Entity, RectangleEntity, CircleEntity }