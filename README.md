# AIsteroids
Asteroids AI, on steroids.
http://aisteroids.azurewebsites.net/

##Stationary Aiming Algorithm
The following algorithm can be used as input to the AIsteroids code window:

`var epsilonBound = 0.03; // in rads
function getMove(myShip, otherShip, myBullets, otherBullets, asteroids) { 
    var y = otherShip.y - myShip.y;
    var x = otherShip.x - myShip.x;
    
    // making it between 0 and 2 pi instead of -pi and pi
    var theta = (Math.atan(y/x) + Math.PI*2) % Math.PI*2;
    
    if (Math.abs(myShip.angle - theta) <= epsilonBound) {
        return {
            fire : true
        }
    }           
    
    if (myShip.angle > theta) {
        return {
            rotateLeft : true
        }
    } else {
        return {
            rotateRight : true
        }
    }
}`