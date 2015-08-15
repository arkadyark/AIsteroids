/**
 * InputHandeler class, listen for keypresses and keeps state of
 * monitored keys
 */
var InputHandeler = Class.extend({

	/**
	 * Constructor
	 * 
	 * @param  {object} keys keys to monitor
	 */
	init: function(submission) {
		// declare private fields
		this.move = {forward : false, fire : false, rotateLeft : false, rotateRight : false};
        eval(submission);
        this.getMove = getMove
		var self = this;
	},

    updateInputs : function(gameState) {
        try {
            var move = this.getMove(gameState.ship, gameState.bullets, gameState.asteroids) || {};
        } catch (e) {
            console.error(e)
            var move = {};
        }
        this.move.forward = move.forward || false;
        this.move.fire = move.fire || false;
        this.move.rotateRight = move.rotateRight || false;
        this.move.rotateLeft = move.rotateLeft || false;
    }
});
