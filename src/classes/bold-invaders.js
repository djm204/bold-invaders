var welcomeState = require('./welcome-state');
var BoldInvaders = (function () {
    function BoldInvaders(boldOptions, stateOptions) {
        this.boldOptions = boldOptions;
        this.stateOptions = stateOptions;
    }
    BoldInvaders.prototype.initialize = function (gameCanvas) {
        this.stateOptions.gameCanvas = gameCanvas;
        console.log(gameCanvas.height);
        gameCanvas.height = window.innerHeight / 2 + window.innerHeight / 7;
        gameCanvas.width = window.innerWidth / 2 + window.innerWidth / 7;
        this.stateOptions.height = gameCanvas.height;
        this.stateOptions.width = gameCanvas.width;
    };
    BoldInvaders.prototype.gameLoop = function (game) {
        var currentState = game.currentState();
        if (currentState) {
            //  Delta t is the time to update/draw.
            var dt = 1 / game.boldOptions.fps;
            //  Get the drawing context.
            var ctx = game.stateOptions.gameCanvas.getContext("2d");
            //  Update if we have an update function. Also draw
            //  if we have a draw function.
            if (currentState.update) {
                currentState.update(game, dt);
            }
            if (currentState.draw) {
                currentState.draw(game, dt, ctx);
            }
        }
    };
    BoldInvaders.prototype.currentState = function () {
        return this.stateOptions.stateStack.length > 0 ? this.stateOptions.stateStack[this.stateOptions.stateStack.length - 1] : null;
    };
    BoldInvaders.prototype.moveToState = function (state) {
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
    };
    BoldInvaders.prototype.pushState = function (state) {
        //  If there's an enter function for the new state, call it.
        if (state.enter) {
            state.enter(this);
        }
        //  Set the current state.
        this.stateOptions.stateStack.push(state);
    };
    BoldInvaders.prototype.popState = function () {
        if (this.currentState().leave) {
            this.currentState().leave(this);
        }
        //  Set the current state.
        this.stateOptions.stateStack.pop();
    };
    BoldInvaders.prototype.start = function () {
        var canvas = this.stateOptions.gameCanvas;
        var ctx = canvas.getContext("2d");
        //  Move into the 'welcome' state.
        this.moveToState(new welcomeState(this, 1 / (this.boldOptions.fps), ctx));
        //  Set the game variables.
        this.stateOptions.lives = 3;
        this.boldOptions.debugMode = /debug=true/.test(window.location.href);
        //  Start the game loop.
        var intervalId = setInterval(this.gameLoop(this), 1000 / this.boldOptions.fps);
    };
    BoldInvaders.prototype.keyDown = function (keyCode) {
        this.stateOptions.pressedKeys[keyCode] = true;
        //  Delegate to the current state too.
        if (this.currentState() && this.currentState().keyDown) {
            this.currentState().keyDown(this, keyCode);
        }
    };
    BoldInvaders.prototype.keyUp = function (keyCode) {
        delete this.stateOptions.pressedKeys[keyCode];
        //  Delegate to the current state too.
        if (this.currentState() && this.currentState().keyUp) {
            this.currentState().keyUp(this, keyCode);
        }
    };
    return BoldInvaders;
})();
module.exports = BoldInvaders;
//# sourceMappingURL=bold-invaders.js.map