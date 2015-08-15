// maybe require stuff
var player = require('./player');

function World() {
	this.map = ; // TODO make a map
	this.p1 = new player.Player("p1", this.map.p1, this); // TODO make player one
	// TODO make player two and handle that code
	this.step = function () {
		this.p1.step();
		return 0;
	}
}

module.exports = {
	World: World
};