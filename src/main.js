var Display = require('./graphics');
var World = require('./world');

var controlOptions = {
    display : new Display(document.getElementById("game-canvas")),
    // Brave new world()
    gameWorld : new World()
}

controlOptions.display.render(controlOptions.gameWorld);
