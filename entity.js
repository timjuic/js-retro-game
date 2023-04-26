class Entity {
   constructor(posX, posY, velX, velY, image) {
      this.posX = posX
      this.posY = posY
      this.velX = velX
      this.velY = velY
      this.image = image
   }
}

class RectangleEntity extends Entity {
   constructor(posX, posY, width, height, angle, velX, velY, image) {
      super(posX, posY, velX, velY, image)
      this.width = width;
      this.height = height
      this.angle = angle
   }
}

class CircleEntity extends Entity {
   constructor(posX, posY, radius, velX, velY, image) {
      super(posX, posY, velX, velY, image)
      this.radius = radius
   }
}

export { Entity, RectangleEntity, CircleEntity }