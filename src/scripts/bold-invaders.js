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
    return BoldInvaders;
})();
module.exports = BoldInvaders;
//# sourceMappingURL=bold-invaders.js.map