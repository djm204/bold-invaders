var BoldInvaders = (function () {
    function BoldInvaders(options) {
        this.options = options;
    }
    BoldInvaders.prototype.initialize = function (gameCanvas) {
        this.options.height = gameCanvas.height;
        this.options.width = gameCanvas.width;
        this.options.leftGameBounds = gameCanvas.width / 2 - this.options.gameWidth;
        this.options.rightGameBounds = gameCanvas.width / 2 - this.options.gameWidth;
        this.options.topGameBounds = gameCanvas.height / 2 - this.options.gameHeight;
        this.options.bottomGameBounds = gameCanvas.height / 2 - this.options.gameHeight;
    };
    BoldInvaders.prototype.currentState = function () {
        return this.options.stateStack.length > 0 ? this.options.stateStack[this.options.stateStack.length - 1] : null;
    };
    BoldInvaders.prototype.moveToState = function (state) {
        if (this.currentState()) {
            if (this.currentState().leave) {
                this.currentState().leave(game);
            }
            this.options.stateStack.pop();
        }
        //  If there's an enter function for the new state, call it.
        if (state.enter) {
            state.enter(game);
        }
        //  Set the current state.
        this.options.stateStack.push(state);
    };
    BoldInvaders.prototype.pushState = function (state) {
        //  If there's an enter function for the new state, call it.
        if (state.enter) {
            state.enter(game);
        }
        //  Set the current state.
        this.options.stateStack.push(state);
    };
    BoldInvaders.prototype.popState = function () {
        if (this.currentState().leave) {
            this.currentState().leave(game);
        }
        //  Set the current state.
        this.options.stateStack.pop();
    };
    BoldInvaders.prototype.start = function () {
        //  Move into the 'welcome' state.
        this.moveToState(new WelcomeState());
        //  Set the game variables.
        this.options.lives = 3;
        this.options.debugMode = /debug=true/.test(window.location.href);
        //  Start the game loop.
        var game = this;
        this.intervalId = setInterval(function () { gameLoop(game); }, 1000 / this.config.fps);
    };
    return BoldInvaders;
})();
module.exports = BoldInvaders;
//# sourceMappingURL=bold-invaders.js.map