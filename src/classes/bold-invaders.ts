import welcomeState = require('./welcome-state');
class BoldInvaders {


    constructor(public boldOptions: BoldInvaders.GameOptions, public stateOptions: BoldInvaders.StateOptions) { }



    initialize(gameCanvas) {
        this.stateOptions.gameCanvas = gameCanvas;
        this.stateOptions.height = gameCanvas.height;
        this.stateOptions.width = gameCanvas.width;

        this.stateOptions.gameBounds.left = gameCanvas.width / 2 - this.boldOptions.gameWidth;
        this.stateOptions.gameBounds.right = gameCanvas.width / 2 - this.boldOptions.gameWidth;
        this.stateOptions.gameBounds.top = gameCanvas.height / 2 - this.boldOptions.gameHeight;
        this.stateOptions.gameBounds.bottom = gameCanvas.height / 2 - this.boldOptions.gameHeight;

    }

    currentState() {
        return this.stateOptions.stateStack.length > 0 ? this.stateOptions.stateStack[this.stateOptions.stateStack.length - 1] : null;
    }

    moveToState(state) {
        if (this.currentState()) {

            if (this.currentState().leave) {
                this.currentState().leave(this);
            }

            this.stateOptions.stateStack.pop();
        }
        
        //  If there's an enter function for the new state, call it.
        if (state.enter) {
            state.enter(this);
        }
 
        //  Set the current state.
        this.stateOptions.stateStack.push(state);
    }

    pushState(state) {
        //  If there's an enter function for the new state, call it.
        if (state.enter) {
            state.enter(this);
        }
        //  Set the current state.
        this.stateOptions.stateStack.push(state);
    }

    popState() {
        if (this.currentState().leave) {
            this.currentState().leave(this);
        }
 
        //  Set the current state.
        this.stateOptions.stateStack.pop();

    }

    start() {
        var gameLoop = require('../modules/game-loop');
        //  Move into the 'welcome' state.
        this.moveToState(new welcomeState(this, 1 / this.boldOptions.fps, this.stateOptions.gameCanvas.getContext("2d")));
    
        //  Set the game variables.
        this.stateOptions.lives = 3;
        this.boldOptions.debugMode = /debug=true/.test(window.location.href);
    
        //  Start the game loop.
        var intervalId = setInterval(function() { gameLoop(this); }, 1000 / this.boldOptions.fps);

    }

    keyDown(keyCode): void {
        this.stateOptions.pressedKeys[keyCode] = true;
        //  Delegate to the current state too.
        if (this.currentState() && this.currentState().keyDown) {
            this.currentState().keyDown(this, keyCode);
        }
    }

    keyUp(keyCode) {
        delete this.stateOptions.pressedKeys[keyCode];
        //  Delegate to the current state too.
        if (this.currentState() && this.currentState().keyUp) {
            this.currentState().keyUp(this, keyCode);
        }
    }

}





export = BoldInvaders;