EPSILON = 0.03;
BULLET_SPEED = 5;

function getMove(myShip, otherShip, myBullets, otherBullets, asteroids) {
    // Insert your AI implementation here! You can see your output in 
    // the browser's console, and use the javascript debugger.
    distance = Math.sqrt(Math.pow(myShip.y - otherShip.y, 2) + 
                        Math.pow(myShip.x - otherShip.x, 2))
    projected = {x : otherShip.x + otherShip.vel.x*(distance/BULLET_SPEED),
                 y : otherShip.y + otherShip.vel.y*(distance/BULLET_SPEED)}
    
    theta = (Math.atan((myShip.y - projected.y)/(myShip.x - projected.x)) + Math.PI*2) % Math.PI*2

    if (Math.abs(myShip.angle - theta) < EPSILON) {
        return {fire : true}
    }
    
    if (myShip.angle > theta) {
        return {rotateLeft : true};
    } else {
        return {rotateRight : true};
    }
    
}