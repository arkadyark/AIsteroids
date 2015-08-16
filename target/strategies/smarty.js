// AI that just stands still

WEIGHTS = {}

function getMove(myShip, otherShip, myBullets, otherBullets, asteroids) {
    move = {
        forward : false,
        fire : false,
        rotateLeft : false,
        rotateRight : false
    }

    for (moveType : move) {
        var probability = 
            weights.['myShip-x'][moveType]*myShip.x + 
            weights.['myShip-y'][moveType]*myShip.y +
            weights.['myShip-angle'][moveType]*myShip.angle +
            weights.['myShip-vel-x'][moveType]*myShip.vel.x +
            weights.['myShip-vel-y'][moveType]*myShip.vel.y +
            weights.['otherShip-x'][moveType]*otherShip.x + 
            weights.['otherShip-y'][moveType]*otherShip.y +
            weights.['otherShip-angle'][moveType]*otherShip.angle +
            weights.['otherShip-vel-x'][moveType]*otherShip.vel.x +
            weights.['otherShip-vel-y'][moveType]*otherShip.vel.y +
            (myBullets[0] ? weights['myBullets-0-x'][moveType]*myBullets[0].x : 0) + 
            (myBullets[1] ? weights['myBullets-1-x'][moveType]*myBullets[1].x : 0) + 
            (myBullets[2] ? weights['myBullets-2-x'][moveType]*myBullets[2].x : 0) + 
            (myBullets[3] ? weights['myBullets-3-x'][moveType]*myBullets[3].x : 0) + 
            (myBullets[4] ? weights['myBullets-4-x'][moveType]*myBullets[4].x : 0) + 
            (myBullets[0] ? weights['myBullets-0-y'][moveType]*myBullets[0].x : 0) + 
            (myBullets[1] ? weights['myBullets-1-y'][moveType]*myBullets[1].x : 0) + 
            (myBullets[2] ? weights['myBullets-2-y'][moveType]*myBullets[2].x : 0) + 
            (myBullets[3] ? weights['myBullets-3-y'][moveType]*myBullets[3].x : 0) + 
            (myBullets[4] ? weights['myBullets-4-y'][moveType]*myBullets[4].x : 0) + 
            (otherBullets[0] ? weights['otherBullets-0-x'][moveType]*otherBullets[0].x : 0) + 
            (otherBullets[1] ? weights['otherBullets-1-x'][moveType]*otherBullets[1].x : 0) + 
            (otherBullets[2] ? weights['otherBullets-2-x'][moveType]*otherBullets[2].x : 0) + 
            (otherBullets[3] ? weights['otherBullets-3-x'][moveType]*otherBullets[3].x : 0) + 
            (otherBullets[4] ? weights['otherBullets-4-x'][moveType]*otherBullets[4].x : 0) + 
            (otherBullets[0] ? weights['otherBullets-0-y'][moveType]*otherBullets[0].x : 0) + 
            (otherBullets[1] ? weights['otherBullets-1-y'][moveType]*otherBullets[1].x : 0) + 
            (otherBullets[2] ? weights['otherBullets-2-y'][moveType]*otherBullets[2].x : 0) + 
            (otherBullets[3] ? weights['otherBullets-3-y'][moveType]*otherBullets[3].x : 0) + 
            (otherBullets[4] ? weights['otherBullets-4-y'][moveType]*otherBullets[4].x : 0) + 
            (asteroids[0].x ? weights['asteroids-0-x'][moveType]*asteroids[0].x : 0) + 
            (asteroids[1].x ? weights['asteroids-1-x'][moveType]*asteroids[1].x : 0) + 
            (asteroids[2].x ? weights['asteroids-2-x'][moveType]*asteroids[2].x : 0) + 
            (asteroids[3].x ? weights['asteroids-3-x'][moveType]*asteroids[3].x : 0) + 
            (asteroids[4].x ? weights['asteroids-4-x'][moveType]*asteroids[4].x : 0) + 
            (asteroids[5].x ? weights['asteroids-5-x'][moveType]*asteroids[5].x : 0) + 
            (asteroids[6].x ? weights['asteroids-6-x'][moveType]*asteroids[6].x : 0) + 
            (asteroids[7].x ? weights['asteroids-7-x'][moveType]*asteroids[7].x : 0) + 
            (asteroids[8].x ? weights['asteroids-8-x'][moveType]*asteroids[8].x : 0) + 
            (asteroids[9].x ? weights['asteroids-9-x'][moveType]*asteroids[9].x : 0) + 
            (asteroids[0].y ? weights['asteroids-0-y'][moveType]*asteroids[0].y : 0) + 
            (asteroids[1].y ? weights['asteroids-1-y'][moveType]*asteroids[1].y : 0) + 
            (asteroids[2].y ? weights['asteroids-2-y'][moveType]*asteroids[2].y : 0) + 
            (asteroids[3].y ? weights['asteroids-3-y'][moveType]*asteroids[3].y : 0) + 
            (asteroids[4].y ? weights['asteroids-4-y'][moveType]*asteroids[4].y : 0) + 
            (asteroids[5].y ? weights['asteroids-5-y'][moveType]*asteroids[5].y : 0) + 
            (asteroids[6].y ? weights['asteroids-6-y'][moveType]*asteroids[6].y : 0) + 
            (asteroids[7].y ? weights['asteroids-7-y'][moveType]*asteroids[7].y : 0) + 
            (asteroids[8].y ? weights['asteroids-8-y'][moveType]*asteroids[8].y : 0) + 
            (asteroids[9].y ? weights['asteroids-9-y'][moveType]*asteroids[9].y : 0) + 
            (asteroids[0].size ? weights['asteroids-0-size'][moveType]*asteroids[0].size : 0) + 
            (asteroids[1].size ? weights['asteroids-1-size'][moveType]*asteroids[1].size : 0) + 
            (asteroids[2].size ? weights['asteroids-2-size'][moveType]*asteroids[2].size : 0) + 
            (asteroids[3].size ? weights['asteroids-3-size'][moveType]*asteroids[3].size : 0) + 
            (asteroids[4].size ? weights['asteroids-4-size'][moveType]*asteroids[4].size : 0) + 
            (asteroids[5].size ? weights['asteroids-5-size'][moveType]*asteroids[5].size : 0) + 
            (asteroids[6].size ? weights['asteroids-6-size'][moveType]*asteroids[6].size : 0) + 
            (asteroids[7].size ? weights['asteroids-7-size'][moveType]*asteroids[7].size : 0) + 
            (asteroids[8].size ? weights['asteroids-8-size'][moveType]*asteroids[8].size : 0) + 
            (asteroids[9].size ? weights['asteroids-9-size'][moveType]*asteroids[9].size : 0)

        move[moveType] = Math.random() > probability;
    }

    return move;
}
