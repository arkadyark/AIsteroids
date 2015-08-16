var fs = require('fs');

var moves = {'forward' : '', 'fire' : '', rotateLeft : '', rotateRight : ''};

// Make copy
fs.writeFileSync('weights-' + Date.now() + '.json', fs.readFileSync('weights.json'));

var data = JSON.parse(fs.readFileSync('weights.json', {encoding : 'utf8'}))
data.winRate = 0;
for (var weight in data.weights) {
    for (var moveType in moves) {
        data.weights[weight][moveType] = 0;
    }
}
fs.writeFile('weights.json', JSON.stringify(data));