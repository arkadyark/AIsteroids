var World = require('./world');
var display;
var tickNum;
var outputleft, ouputright;
var inputleft, inputright;
var sourceSupplied, gameWorld;
var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 100);
    };
    
// TODO setup who wins who loses (winner)
function init(options) {
    // TODO make sure main is hooked up properly
    display = options.display;
    tickNum = options.tickNum;
    // outputleft = options.outputleft;
    // outputright = options.outputright;
    // inputleft = options.inputleft;
    // inputright = options.inputright;
    // sourceSupplied = options.sourceSupplied;
    gameWorld = options.gameWorld;
}

function run() {
    // TODO setup winner and pause logic
    // TODO display.render(gameWorld, winner);

    tickNum++;
    display.render(gameWorld);
    tc.textContent = "Tick " + tickNum;
    //update textboxes here
    requestAnimFrame(run);
}

module.exports = {
    run: run,
    init: init
};