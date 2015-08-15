var Display = require('./graphics');
var World = require('./world');
var control = require('./control');

var controlOptions = {
    display : new Display(document.getElementById("game-canvas")),
    // Brave new world()
    gameWorld : new World(),
    tickNum : 0
}

controlOptions.display.render(controlOptions.gameWorld);
control.init(controlOptions);
control.run();