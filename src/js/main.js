/**
 * Enum type of existing states
 */
var States = {
    NO_CHANGE: 0,
    MENU: 1,
    GAME: 2,
    END: 3
}

/**
 * Game class, manages, update and render states
 */
var Game = Class.extend({

    /**
     * Constructor
     */
    init: function() {
        // public important members used for update and rendering
        this.canvas = new Canvas(626, 480);
        this.inputs = [];

        // set stroke style to white, since canvas has black
        // bacground
        this.canvas.ctx.strokeStyle = "#fff";

        // declate variables used for managing states
        this.currentState = null;
        this.stateVars = {
            score: 0
        }
        this.nextState = States.MENU;
    },

    /**
     * Starts and runs the game
     */
    run: function() {
        var self = this;

        this.canvas.animate(function() {
            // change and initiate states when needed0
            if (self.nextState !== States.NO_CHANGE) {
                switch(self.nextState) {
                    case States.MENU:
                        self.currentState = new MenuState(self);
                    break;
                    case States.GAME:
                        self.currentState = new GameState(self);
                    break;
                    case States.END:
                        self.currentState = new EndState(self);
                    break;
                }
                self.nextState = States.NO_CHANGE;
            }

            if (self.inputs != undefined) {
                // update and render active state
                for (var i = 0; i < self.inputs.length; i++) {
                    self.inputs[i].updateInputs(self.currentState.getClientGameState())
                    self.currentState.handleInputs(self.inputs[i])
                }
            }

            self.currentState.update();
            self.currentState.render(self.canvas.ctx);
        });
    },

    startGame : function() {
        this.inputs = 
            [new InputHandeler(editor.getValue(), 1),
                new InputHandeler(editor.getValue(), 2)]
                this.nextState = States.GAME;
    }
});
