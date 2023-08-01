export default class MathUtil {
    
  static calculateAngle(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
  
    // Calculate the angle using Math.atan2 and convert to degrees
    let angleDegrees = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
  
    // Ensure the angle is within the range [0, 360)
    if (angleDegrees < 0) {
      angleDegrees += 360;
    }
  
    return angleDegrees; 
  }


  static calculateAngle(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  // Calculate the angle using Math.atan2
  const angleRadians = Math.atan2(deltaY, deltaX);

  // Add π/2 (90 degrees in radians) to the angle for a 90-degree increment
  const adjustedAngle = angleRadians + Math.PI / 2;

  return adjustedAngle;
  }
  

  
  static radiansToDegrees(angleRadians) {
    return angleRadians * (180 / Math.PI);
  }
  
  static degreesToRadians(angleDegrees) {
    return angleDegrees * (Math.PI / 180);
  }
    
  static calculateDistance(posx1, posy1, posx2, posy2) {
      var deltaX = posx2 - posx1;
      var deltaY = posy2 - posy1;
      var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      return distance;
    }

  static generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  static getRandomSign() {
    const randomNumber = Math.random();
    return randomNumber < 0.5 ? -1 : 1;
  }
}