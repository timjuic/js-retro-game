class Entity {
   constructor(posX, posY, velX, velY, image) {
      this.posX
      this.posY
      this.velX
      this.velY
      this.image
   }
}

class RectangleEntity extends Entity {
   constructor(posX, posY, width, height, velX, velY, image) {
      super(posX, posY, velX, velY, image)
      this.width = width;
      this.height = height

   }
}

class CircleEntity extends Entity {
   constructor(posX, posY, radius, velX, velY, image) {
      super(posX, posY, velX, velY, image)
      this.radius = radius
   }
}

export { Entity, RectangleEntity, CircleEntity }