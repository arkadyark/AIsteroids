/**
 * MenuState class, set on game start
 */
var State = require('./state.js');
var Points = require('./points.js');
var Asteroid = require('./asteroid.js');
var AsteroidSize = 8;

var MenuState = State.extend({

	/**
	 * Constructor
	 * 
	 * @param  {Game} game manager for the state
	 */
	init: function(game) {
		this._super(game); // call super construtor

		this.canvasWidth = game.width;
		this.canvasHeight = game.height;

		// create and initiate background asteroids
		var num = Math.random()*5 + 5;
		this.asteroids = [];
		for (var i = 0; i < num; i++) {
			// choose asteroid polygon randomly
			var n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));

			// set position
			var x = Math.random() * this.canvasWidth;
			var y = Math.random() * this.canvasHeight;

			// set size of asteroid
			var s = [1, 2, 4][Math.round(Math.random() * 2)]

			// actual creation of asteroid
			var astr = new Asteroid(Points.ASTEROIDS[n], AsteroidSize/s, x, y);
			astr.maxX = this.canvasWidth;
			astr.maxY = this.canvasHeight;
			// push to array
			this.asteroids.push(astr);
		}
	},

	/**
	 * @override State.update
	 */
	update: function() {
		// update all asteroids
		for (var i = 0, len = this.asteroids.length; i < len; i++) {
			this.asteroids[i].update();
		}
	},

	/**
	 * @override State.render
	 * 
	 * @param  {context2d} ctx augmented drawing context
	 */
	render: function(ctx) {
		/// Leave this here in order to satisfy the requirements for extending a class.
	}
});

module.exports = MenuState;