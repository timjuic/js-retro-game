export default class MathUtil {
    
    static calculateAngle(posx1, posy1, posx2, posy2) {
        var deltaX = posx2 - posx1;
        var deltaY = posy2 - posy1;
        var angleRadians = Math.atan2(deltaY, deltaX);
        var angleDegrees = angleRadians * (180 / Math.PI);
      
        // Adjust angle to be between 0 and 359 degrees
        var adjustedAngle = (angleDegrees + 90 + 360) % 360;
        return adjustedAngle;
      }
    
    static calculateDistance(posx1, posy1, posx2, posy2) {
        var deltaX = posx2 - posx1;
        var deltaY = posy2 - posy1;
        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        return distance;
      }
}