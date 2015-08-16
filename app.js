var express = require('express')
var http = require('http');
var stringify = require('csv-stringify');

var app = express();

app.use(express.static(__dirname + '/target'))

app.post('/gameFinished', function(req, res) {
    var data = JSON.parse(req.body);
    var csvOutput = [
        ['outcome',
         'move-fire', 'move-forward', 'move-rotateLeft', 'move-rotateRight',
         'myShip-x', 'myShip-y', 'myShip-angle', 'myShip-vel-x', 'myShip-vel-y',
         'otherShip-x', 'otherShip-y', 'otherShip-angle', 'otherShip-vel-x', 'otherShip-vel-y',
         'myBullets-1-x', 'myBullets-1-y',
         'myBullets-2-x', 'myBullets-2-y',
         'myBullets-3-x', 'myBullets-3-y',
         'myBullets-4-x', 'myBullets-4-y',
         'myBullets-5-x', 'myBullets-5-y',
         'otherBullets-1-x', 'otherBullets-1-y',
         'otherBullets-2-x', 'otherBullets-2-y',
         'otherBullets-3-x', 'otherBullets-3-y',
         'otherBullets-4-x', 'otherBullets-4-y',
         'otherBullets-5-x', 'otherBullets-5-y',
         'asteroid-1-x', 'asteroid-1-y', 'asteroid-1-size',
         'asteroid-2-x', 'asteroid-2-y', 'asteroid-2-size',
         'asteroid-3-x', 'asteroid-3-y', 'asteroid-3-size',
         'asteroid-4-x', 'asteroid-4-y', 'asteroid-4-size',
         'asteroid-5-x', 'asteroid-5-y', 'asteroid-5-size',
         'asteroid-6-x', 'asteroid-6-y', 'asteroid-6-size',
         'asteroid-7-x', 'asteroid-7-y', 'asteroid-7-size',
         'asteroid-8-x', 'asteroid-8-y', 'asteroid-8-size',
         'asteroid-9-x', 'asteroid-9-y', 'asteroid-9-size',
         'asteroid-10-x', 'asteroid-10-y', 'asteroid-10-size']
    ];

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got data. Thanks!');
});

app.listen(8000);
