/**
 * AsteroidSize constant, probably a bad place to declare it
 */
var AsteroidSize = 8;

/**
 * GameState class, celled when game start, handle game updating and
 * rendering
 */
var GameState = State.extend({

	/**
	 * Constructor
	 * 
	 * @param  {Game} game manager for the state
	 */
	init: function(game) {
		this._super(game);

		// store canvas dimensions for later use
		this.canvasWidth = game.canvas.ctx.width;
		this.canvasHeight = game.canvas.ctx.height;

		// create ship objects
		this.player1 = new Ship(Points.SHIP, Points.FLAMES, 2, 0, 0);
		this.player1.maxX = this.canvasWidth;
		this.player1.maxY = this.canvasHeight;

		this.player2 = new Ship(Points.SHIP, Points.FLAMES, 2, 0, 0);
		this.player2.maxX = this.canvasWidth;
		this.player2.maxY = this.canvasHeight;

		// score and lives variables
		this.lifep1 = 1;
		this.lifep2 = 1;
		
		this.gameOver = false;

		this.score = 0;
		this.lvl = 0;

		// create lifepolygon and rotate 45° counter clockwise
		this.lifepolygon = new Polygon(Points.SHIP);
		this.lifepolygon.scale(1.5);
		this.lifepolygon.rotate(-Math.PI/2);

		// generate asteroids and set ship position
		this.generateLvl();
	},

	/**
	 * Create and initiate asteroids and bullets
	 */
	generateLvl: function() {
		// calculate the number of asteroid to create
		var num = Math.round(10*Math.atan(this.lvl/25)) + 3;

		// set ship position
		this.player1.x = this.canvasWidth/2;
		this.player1.y = this.canvasHeight/2;

		this.player2.x = this.canvasWidth/3;
		this.player2.y = this.canvasHeight/3;

		// init bullet array
		this.p1bullets = [];
		this.p2bullets = [];

		// dynamically create asteroids and push to array
		this.asteroids = [];
		for (var i = 0; i < num; i++) {
			// choose asteroid polygon randomly
			var n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));

			// set position close to edges of canvas
			var x = 0, y = 0;
			if (Math.random() > 0.5) {
				x = Math.random() * this.canvasWidth;
			} else {
				y = Math.random() * this.canvasHeight;
			}
			// actual creating of asteroid
			var astr = new Asteroid(Points.ASTEROIDS[n], AsteroidSize, x, y);
			astr.maxX = this.canvasWidth;
			astr.maxY = this.canvasHeight;
			// push to array
			this.asteroids.push(astr);
		}
	},

	/**
	 * @override State.handleInputs
	 * 
	 * @param  {InputHandeler} input keeps track of all pressed keys
	 */
	handleInputs: function(input) {
		// only update ship orientations and velocities if they're visible
		if (!this.player1.visible && !this.player2.visible) {
			if (input.isPressed("spacebar")) {
				// change state if game over
				if (this.gameOver) {
		//TODO //			if(lifep1 == 1) {}
		//			else if(lifep2 == 1) {}
					this.game.nextState = States.END;
					this.game.stateVars.score = this.score;
					return;
				}
				this.player1.visible = true;
				this.player2.visible = true;
			}
			return;
		}

		if (input.isDown("right")) {
			this.player1.rotate(0.06);
			this.player2.rotate(0.06);
		}
		if (input.isDown("left")) {
			this.player1.rotate(-0.06);
			this.player2.rotate(-0.06);
		}
		if (input.isDown("up")) {
			this.player1.addVel();
			this.player2.addVel();
		}

		if (input.isPressed("spacebar")) {
			this.p1bullets.push(this.player1.shoot());
			this.p2bullets.push(this.player2.shoot());
		}
	},

	/**
	 * @override State.update
	 */
	update: function() {
		// check if bullets hits another ship
		// TODO figure out why this doesn't work
		/*
		var length = this.p2bullets.length;
		for (var j = 0; j < length; j++) {
			var b = this.p2bullets[j];
			console.log("fired");
			
			if (this.player1.hasPoint(b.x, b.y)) {
				console.log("hit p1");
				this.p2bullets.splice(j, 1);
				length--;
				j--;

				this.lifep1--;
				if (this.lifep1 <= 0) {
					this.gameOver = true;
				}
				this.player1.visible = false;
			}
		}

		length = this.p1bullets.length;
		for (var j = 0; j < length; j++) {
			var b = this.p1bullets[j];
			
			if (this.player2.hasPoint(b.x, b.y)) {
				console.log("hit p2");
				this.p1bullets.splice(j, 1);
				length--;
				j--;

				this.lifep2--;
				if (this.lifep2 <= 0) {
					this.gameOver = true;
				}
				this.player2.visible = false;
			}
		}
		*/

		// iterate thru and update all asteroids
		for (var i = 0, len = this.asteroids.length; i < len; i++) {
			var a = this.asteroids[i];
			a.update();

			// if ship collids reset position and decrement lives
			if (this.player1.collide(a)) {
				this.player1.x = this.canvasWidth/2;
				this.player1.y = this.canvasHeight/2;
				this.player1.vel = {
					x: 0,
					y: 0
				}
				this.lifep1--;
				if (this.lifep1 <= 0) {
					this.gameOver = true;
				}
				this.player1.visible = false;
			}

			if (this.player2.collide(a)) {
				this.player2.x = this.canvasWidth/3;
				this.player2.y = this.canvasHeight/3;
				this.player2.vel = {
					x: 0,
					y: 0
				}
				this.lifep2--;
				if (this.lifep2 <= 0) {
					this.gameOver = true;
				}
				this.player2.visible = false;
			}

			// check if bullets hits the current asteroid
			for (var j = 0, len2 = this.p1bullets.length; j < len2; j++) {
				var b = this.p1bullets[j];
				
				if (a.hasPoint(b.x, b.y)) {
					this.p1bullets.splice(j, 1);
					len2--;
					j--;

					// update score depending on asteroid size
					switch (a.size) {
						case AsteroidSize:
							this.score += 20;
							break;
						case AsteroidSize/2:
							this.score += 50;
							break;
						case AsteroidSize/4:
							this.score += 100;
							break;
					}

					// if asteroid splitted twice, then remove
					// else split in half
					if (a.size > AsteroidSize/4) {
						for (var k = 0; k < 2; k++) {
							var n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));

							var astr = new Asteroid(Points.ASTEROIDS[n], a.size/2, a.x, a.y);
							astr.maxX = this.canvasWidth;
							astr.maxY = this.canvasHeight;

							this.asteroids.push(astr);
							len++;
						}
					}
					this.asteroids.splice(i, 1);
					len--;
					i--;
				}
			}
			for (var j = 0, len2 = this.p2bullets.length; j < len2; j++) {
				var b = this.p2bullets[j];
				
				if (a.hasPoint(b.x, b.y)) {
					this.p2bullets.splice(j, 1);
					len2--;
					j--;

					// update score depending on asteroid size
					switch (a.size) {
						case AsteroidSize:
							this.score += 20;
							break;
						case AsteroidSize/2:
							this.score += 50;
							break;
						case AsteroidSize/4:
							this.score += 100;
							break;
					}

					// if asteroid splitted twice, then remove
					// else split in half
					if (a.size > AsteroidSize/4) {
						for (var k = 0; k < 2; k++) {
							var n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));

							var astr = new Asteroid(Points.ASTEROIDS[n], a.size/2, a.x, a.y);
							astr.maxX = this.canvasWidth;
							astr.maxY = this.canvasHeight;

							this.asteroids.push(astr);
							len++;
						}
					}
					this.asteroids.splice(i, 1);
					len--;
					i--;
				}
			}
		}

		// iterate thru and update all bullets
		for (var i = 0, len = this.p1bullets.length; i < len; i++) {
			var b = this.p1bullets[i];
			b.update();

			// remove bullet if removeflag is setted
			if (b.shallRemove) {
				this.p1bullets.splice(i, 1);
				len--;
				i--;
			}
		}

		for (var i = 0, len = this.p2bullets.length; i < len; i++) {
			var b = this.p2bullets[i];
			b.update();

			// remove bullet if removeflag is setted
			if (b.shallRemove) {
				this.p2bullets.splice(i, 1);
				len--;
				i--;
			}
		}

		// update ship
		this.player1.update();
		this.player2.update();

		// check if lvl completed
		if (this.asteroids.length === 0) {
			this.lvl++;
			this.generateLvl();
		}
	},

	/**
	 * @override State.render
	 * 
	 * @param  {context2d} ctx augmented drawing context
	 */
	render: function(ctx) {
		ctx.clearAll();
		// draw score and extra lives
		// TODO delete this next block of code
		ctx.vectorText(this.score, 3, 35, 15);
		for (var i = 0; i < this.lifep1; i++) {
			ctx.drawPolygon(this.lifepolygon, 40+15*i, 50);
		}


		// draw all asteroids and bullets
		for (var i = 0, len = this.asteroids.length; i < len; i++) {
			this.asteroids[i].draw(ctx);
		}
		for (var i = 0, len = this.p1bullets.length; i < len; i++) {
			this.p1bullets[i].draw(ctx);
		}
		for (var i = 0, len = this.p2bullets.length; i < len; i++) {
			this.p2bullets[i].draw(ctx);
		}
		// draw game over messege
		if (this.gameOver) {
			ctx.vectorText("Game Over", 4, null, null);
		}
		// draw ship
		this.player1.draw(ctx);
		this.player2.draw(ctx);
	}
});