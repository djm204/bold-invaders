var PauseState = (function () {
    function PauseState(gameState, game, dt, ctx) {
        this.gameState = gameState;
        this.game = game;
        this.dt = dt;
        this.ctx = ctx;
    }
    PauseState.prototype.keyDown = function (game, keyCode) {
        if (keyCode == 27) {
            //  Pop the pause state.
            this.game.popState();
        }
    };
    ;
    PauseState.prototype.draw = function () {
        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
        this.ctx.font = "35px Arial";
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Paused", this.game.stateOptions.width / 2, this.game.stateOptions.height / 2);
    };
    PauseState.prototype.leave = function () {
        console.log("in leave pause state");
        //move back to the last game state
        this.game.pushState(this.gameState);
        //restart the game loop
    };
    return PauseState;
})();
module.exports = PauseState;
//# sourceMappingURL=pause-state.js.map