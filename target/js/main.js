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

        this.playerSubmission;

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
                        self.sendGameData(self.currentState);
                        self.currentState = new EndState(self);
                    break;
                }
                self.nextState = States.NO_CHANGE;
            }

            if (self.currentState instanceof GameState) {
                // update and render active state
                for (var i = 0; i < self.inputs.length; i++) {
                    self.inputs[i].updateInputs(self.currentState.getClientGameState())
                    self.currentState.handleInputs(self.inputs[i])
                }
            }

            self.currentState.update();
            self.currentState.render(self.canvas.ctx);

            if (self.currentState.gameOver) {
                self.nextState = States.END;
            }
        });
    },

    startGame : function() {
        self = this;
        self.playerSubmission = editor.getValue();
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                getWeights=new XMLHttpRequest();
                getWeights.onreadystatechange=function() {
                    if (getWeights.readyState==4 && getWeights.status==200) {
                        self.inputs = 
                            [new InputHandeler(self.playerSubmission, 1),
                                new InputHandeler('var weights = ' + JSON.stringify(JSON.parse(getWeights.responseText).weights) + ';' + xmlhttp.responseText, 2)]
                                self.nextState = States.GAME;
                    }
                }
                getWeights.open("GET", "strategies/weights.json", true);
                getWeights.send();
            }
        }
        xmlhttp.open("GET", "strategies/smarty.js", true);
        xmlhttp.send()
    },

    sendGameData : function(gameState) {
        if (gameState.gameData.outcome <= 0) {
            // If AI lost
   //         xmlhttp=new XMLHttpRequest();
 //          xmlhttp.open("POST", "submission", true);
  //         xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
//           xmlhttp.send(encodeURIComponent(self.playerSubmission));
        }
    }
});
