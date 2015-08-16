var express = require('express')
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');

var Class = require('./target/js/lib/class.js');
var Game = require('./target/js/no output/main.js');

var app = express();

LEARNING_RATE = 0.001;
NUM_GAMES = 100;
moves = ['fire', 'forward', 'rotateLeft', 'rotateRight'];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/target'))

app.post('/gameFinished', function(req, res) {
    var data = JSON.parse(req.body);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got data. Thanks!');
});

app.post('/submission', function(req, res) {
    res.send('Received');
    fs.readFile('./weights.json', {encoding : 'utf8'}, function(err, data) {tryUpdateWeights(data, req.body)});
});

tryUpdateWeights = function(data, submission) {
    var data = JSON.parse(data);
    var originalWinRate = parseFloat(data.winRate);
    var weights = data.weights
    randomWeights = {}
    for (var weight in weights) {
        randomWeights[weight] = {};
        for (var i = 0; i < moves.length; i++) {
            randomWeights[weight][moves[i]] = parseFloat(weights[weight][moves[i]]) + (Math.random() - 0.5)*LEARNING_RATE;
        }
    }
    fs.readFile('./target/strategies/smarty.js', {encoding : 'utf8'}, function(err, data) {
        var AIString = 'var weights = ' + randomWeights + ';' + data;
        var winRate = 0;
        for (var i = 0; i < NUM_GAMES; i++) {
            winRate += playGame(AIString, submission);
        }
        winRate = winRate / NUM_GAMES;
        if (winRate > originalWinRate) {
            var newData = {winRate : winRate, weights : randomWeights}
            fs.writeFile('./weights.json', JSON.stringify(newData), function() {});
        }
    });
}

playGame = function(AIString, submission) {
    // play a game between sub1 and sub2 without rendering
    // create, initiate and run game
    var game = new Game();
    console.log(submission);
    // TODO not sure how to return from run... should I just return from the break;?
    var outcome = game.run(submission, AIString);
    return outcome;
}

app.listen(8000);
