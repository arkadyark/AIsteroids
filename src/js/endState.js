/**
 * EndState class, called when game is over
 */
var EndState = State.extend({

	/**
	 * Constructor
	 * 
	 * @param  {Game} game manager for the state
	 */
	init: function(game) {
		this._super(game); // call super constructor

		this.hasEnterName = false; // internal stage flag
		this.nick = "no name";
		this.score = game.stateVars.score;

		// get and init inputfiled from DOM
		this.namefield = document.getElementById("namefield");
		this.namefield.value = this.nick;
		this.namefield.focus();
		this.namefield.select();
	},

	/**
	 * @override State.handleInputs
	 *
	 * @param  {InputHandeler} input keeps track of all pressed keys
	 */
	handleInputs: function(input) {
        if (input.isPressed("spacebar")) {
            // change the game state
            this.game.nextState = States.MENU;
        }
	},

	/**
	 * @override State.update
	 */
	update: function() {
	},

	/**
	 * @override State.render
	 * 
	 * @param  {context2d} ctx augmented drawing context
	 */
	render: function(ctx) {
		ctx.clearAll();
        // TODO - display winner
        ctx.vectorText("Thank you for playing", 4, null, 100);
        ctx.vectorText("nick", 2, null, 180);
        ctx.vectorText(this.nick, 3, null, 220);
        ctx.vectorText(this.score, 3, null, 300);
	}
});
