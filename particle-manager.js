import MathUtil from "./helpers/math-util.js";
import Particle from "./particle.js";

export default class ParticleManager {
    constructor(game, entity, particleBaseSize, pixelGroupingModifier, explosionStrength) {
        this.game = game;
        this.entity = entity;
        this.particleBaseSize = particleBaseSize;
        this.pixelGroupingAmount = pixelGroupingModifier;
        this.explosionStrength = explosionStrength;
    }

    getEntityImage() {
        let imagePathParts = this.entity.image.src.split('.')
        let imagePathParts2 = imagePathParts[imagePathParts.length - 2].split("/")
        let imageName = imagePathParts2[imagePathParts2.length - 1] 
        let data = this.game.assetLoader.enemyImageDataObjects[imageName].data
        let image = this.game.assetLoader.enemyAssets[imageName];
        image.data = data;
        return image;
    }

    createParticleExplosion() {
        let image = this.getEntityImage();
        let data = image.data;
        
        let particleSize = 2;
        let pixelGroupingAmount = 10;
        let centerX = this.entity.posX + this.entity.width / 2;
        let centerY = this.entity.posY + this.entity.height / 2;
        let imageHalfX = image.width / 2 / particleSize;
        let imageHalfY = image.height / 2 / particleSize;
        for (let y = 0; y < image.height; y += pixelGroupingAmount) {
          for (let x = 0; x < image.width; x += pixelGroupingAmount) {
              const i = (x + y * image.width) * particleSize;
              const color = `rgba(${data[i]}, ${data[i+1]}, ${data[i+2]}, ${data[i+3] / 255})`;

              const particlePosX = centerX + x / particleSize - imageHalfX;
              const particlePosY = centerY + y / particleSize - imageHalfY;

              const sizeRandomizer = MathUtil.generateRandomInteger(-particleSize+1, particleSize-1);
              const finalParticleSize = particleSize + sizeRandomizer

              const xVelAmplifyAmount = MathUtil.generateRandomNumber(-1, 1);
              const yVelAmplifyAmount = MathUtil.generateRandomNumber(-1, 1);
              const extraAmplifier = MathUtil.generateRandomInteger(1, 2);
              const velX = ((x / image.width) * this.explosionStrength) - (this.explosionStrength / 2) + xVelAmplifyAmount * extraAmplifier;
              const velY = ((y / image.height) * this.explosionStrength) - (this.explosionStrength / 2) + yVelAmplifyAmount * extraAmplifier;
      
              const particle = new Particle(this.game, particlePosX, particlePosY, finalParticleSize, finalParticleSize, 100, velX, velY, 0, color, 1);
              this.game.particles.push(particle);
            
          }
      }
    }


}