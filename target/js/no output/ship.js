/**
 * Ship class, extends Polygon see polygon.js
 */

TURNS_BETWEEN_SHOTS = 5
MAX_BULLETS = 4

var Polygon = require('./Polygon');
var Bullet = require('./Bullet');

var Ship = Polygon.extend({

	/**
	 * Bounds for the ship
	 */
	maxX: null,
	maxY: null,

	/**
	 * Constructor
	 * 
	 * @param  {Array<number>} p  list of ship verticies
	 * @param  {Array<number>} pf list of flames verticies
	 * @param  {number}        s  scalefactor, size of ship
	 * @param  {number}        x  start x coordinate
	 * @param  {number}        y  start y coordinate
	 */
	init: function(p, pf, s, x, y) {
		this._super(p); // call super constructor

		// create, init and scale flame polygon
		this.flames = new Polygon(pf);
		this.flames.scale(s);

        this.ticksSinceLastShot = 0;

		// visual flags
		this.drawFlames = false;
		this.visible = true;

		// position vars
		this.x = x;
		this.y = y;

		// scale the ship to the specified size
		this.scale(s);

		// facing direction
		this.angle = 0;

		// velocity
		this.vel = {
			x: 0,
			y: 0
		}
	},

	/**
	 * Returns whether ship is colling with asteroid
	 * 
	 * @param  {Asteroid} astr asteroid to test
	 * @return {Boolean}       result from test
	 */
	collide: function(astr) {
		// don't test if not visible
		for (var i = 0, len = this.points.length - 2; i < len; i += 2) {
			var x = this.points[i] + this.x;
			var y = this.points[i+1] + this.y;

			if (astr != undefined && astr.hasPoint(x, y)) {
				return true;
			}
		}
		return false;
	},

	/**
	 * Returns whether ship is colling with a bullet
	 * 
	 * @param  {Asteroid} obj bullet to test
	 * @return {Boolean}       result from test
	 */
	collidebullet: function(obj) {
		// don't test if not visible
		if (!this.visible) {
			return false;
		}
		for (var i = 0, len = this.points.length - 2; i < len; i += 2) {
			var x = this.points[i] + this.x;
			var y = this.points[i+1] + this.y;

			var distance = Math.sqrt(Math.pow(obj.x-x,2) + Math.pow(obj.y-y,2));
			if (distance < 7) {
				return true;
			}
		}
		return false;
	},

	/**
	 * Create and return bullet with arguments from current
	 * direction and position
	 * 
	 * @return {Bullet} the initated bullet
	 */
	shoot: function(numBullets) {
        if (this.ticksSinceLastShot > TURNS_BETWEEN_SHOTS && numBullets < MAX_BULLETS) {
            this.ticksSinceLastShot = 0
            var b = new Bullet(this.points[0] + this.x, this.points[1] + this.y, this.angle);
            b.maxX = this.maxX;
            b.maxY = this.maxY;
            return b;
        }
	},

	/**
	 * Update the velocity of the bullet depending on facing
	 * direction
	 */
	addVel: function() {
		// length of veloctity vector estimated with pythagoras
		// theorem, i.e.
		// 		a*a + b*b = c*c
        this.vel.x = 1.5*Math.cos(this.angle);
        this.vel.y = 1.5*Math.sin(this.angle);
		this.drawFlames = true;
	},

	/**
	 * Rotate the ship and flame polygon clockwise
	 * 
	 * @param  {number} theta angle to rotate with
	 *
	 * @override Polygon.rotate
	 */
	rotate: function(theta) {
		this._super(theta);
		this.flames.rotate(theta);
		this.angle += theta;
        this.angle = this.angle;
	},

	/**
	 * Decrease velocity and update ship position
	 */
	update: function() {
        this.ticksSinceLastShot += 1;

		// update position
		this.x += this.vel.x;
		this.y += this.vel.y;

		this.vel.x *= 0.99;
		this.vel.y *= 0.99;

		// keep within bounds
		if (this.x > this.maxX) {
			this.x = 0;
		} else if (this.x < 0) {
			this.x = this.maxX;
		}
		if (this.y > this.maxY) {
			this.y = 0;
		}else if (this.y < 0) {
			this.y = this.maxY;
		}
	},

	/**
	 * Draw the ship with an augmented drawing context
	 * 
	 * @param  {context2d} ctx augmented drawing context
	 */
	draw: function(ctx) {
		if (!this.visible) {
			return;
		}
		ctx.drawPolygon(this, this.x, this.y);
		if (this.drawFlames) {
			ctx.drawPolygon(this.flames, this.x, this.y);
			this.drawFlames = false;
		}
	}
});

module.exports = Ship;
