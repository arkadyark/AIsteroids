// AI that just stands still

function getMove(myShip, otherShip, myBullets, otherBullets, asteroids) {
    return {
        forward : Math.random() > 0.5,
        fire : Math.random() > 0.5,
        rotateLeft : Math.random() > 0.5,
        rotateRight : Math.random() > 0.5
    }
}
