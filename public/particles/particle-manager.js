import MathUtil from "../helpers/math-util.js";
import Particle from "./particle.js";

export default class ParticleManager {
    constructor(game, entity, particleBaseSize, pixelGroupingModifier, explosionStrength) {
        this.game = game;
        this.entity = entity;
        this.particleBaseSize = particleBaseSize;
        this.pixelGroupingModifier = pixelGroupingModifier;
        this.explosionStrength = explosionStrength
        this.particles = [];
        this.particleClearTimer = setInterval(() => this.clearParticles(), 500);
    }

    clearParticles() {
        if (this.particles.some(particle => particle.opacity < 0.01)) {
            this.particles.length = 0;
        }
    }

    getEntityImage() {
        let imagePathParts = this.entity.image.src.split('.')
        let imagePathParts2 = imagePathParts[imagePathParts.length - 2].split("/")
        let imageName = imagePathParts2[imagePathParts2.length - 1]
        let data = this.game.assetLoader.enemyImageDataObjects[imageName].data
        let image = this.game.assetLoader.characters[imageName];
        image.data = data;
        return image;
    }

    createParticleExplosion() {
        let image = this.getEntityImage();
        let data = image.data;
        
        let centerX = this.entity.posX + this.entity.width / 2;
        let centerY = this.entity.posY + this.entity.height / 2;
        let imageHalfX = image.width * this.particleBaseSize / this.pixelGroupingModifier / 2;
        let imageHalfY = image.height * this.particleBaseSize / this.pixelGroupingModifier / 2;
        for (let y = 0; y < image.height; y += this.pixelGroupingModifier) {
          for (let x = 0; x < image.width; x += this.pixelGroupingModifier) {
              const i = (x + y * image.width) * 4;
              const color = `rgba(${data[i]}, ${data[i+1]}, ${data[i+2]}, ${data[i+3] / 255})`;

              const particlePosX = centerX + x * (this.particleBaseSize / this.pixelGroupingModifier) - imageHalfX;
              const particlePosY = centerY + y * (this.particleBaseSize / this.pixelGroupingModifier) - imageHalfY;

              const sizeRandomizer = MathUtil.generateRandomNumber(-this.particleBaseSize, this.particleBaseSize)
              const finalParticleSize = this.particleBaseSize + sizeRandomizer

              const xVelAmplifyAmount = MathUtil.generateRandomNumber(-1, 1);
              const yVelAmplifyAmount = MathUtil.generateRandomNumber(-1, 1);
              const extraAmplifier = MathUtil.generateRandomInteger(1, 2);
              const velX = ((x / image.width) * this.explosionStrength) - (this.explosionStrength / 2) + xVelAmplifyAmount * extraAmplifier;
              const velY = ((y / image.height) * this.explosionStrength) - (this.explosionStrength / 2) + yVelAmplifyAmount * extraAmplifier;
      
              const particle = new Particle(this.game, particlePosX, particlePosY, finalParticleSize, finalParticleSize, 0, velX, velY, 90, color, 1);
              this.particles.push(particle);
            
          }
      }
    }


}