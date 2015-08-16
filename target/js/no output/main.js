var MenuState = require('./menuState.js');
var GameState = require('./gameState.js');
var EndState = require('./endState.js');
var InputHandeler = require('./input.js');

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
        // these are input handellers - public important members used for update and rendering
        this.inputs = [];
        
        // TODO check that 626 is the width and 480 is the height in 626, 480. store canvas dimensions for later use
        this.width = 626; 
        this.height = 480;

        // declate variables used for managing states
        this.currentState = null;
        this.stateVars = {
            score: 0
        }
        this.nextState = States.MENU;
    },

    /**
     * Starts and runs the game. This is run after init
     */
    run: function(submission, AIsubmission) {
        while (true) {
            if (this.nextState !== States.NO_CHANGE) {
                switch(this.nextState) {
                    case States.MENU:
                        this.currentState = new MenuState(this);
                        this.startGame(submission, AIsubmission);
                        this.currentState = new GameState(this);
                        break;
                    case States.GAME:
                        this.currentState = new GameState(this);
                        break;
                    case States.END:
                        this.currentState = new EndState(this);
                        break;
                }
                this.nextState = States.NO_CHANGE;
            }

            if (this.currentState instanceof GameState) {
                // update and render active state
                for (var i = 0; i < this.inputs.length; i++) {
                    this.inputs[i].updateInputs(this.currentState.getClientGameState())
                    this.currentState.handleInputs(this.inputs[i])
                }
            }

            this.currentState.update();

            if (this.currentState.gameOver) {
                this.outcome = this.currentState.gameData.outcome;
                this.nextState = States.END;
                // TODO test this while true method (used instead of animate since no canvas).THIS IS WHERE THE FUNCTION WILL EXIT
                return this.outcome;
            }
        }
    },

    startGame : function(submission, AIsubmission) {
        self = this;

        self.inputs = [new InputHandeler(submission, 1),
                new InputHandeler(AIsubmission, 2)];
        self.nextState = States.GAME;
    }
});

module.exports = Game;
