var PauseState = (function () {
    function PauseState(game, dt, ctx) {
        this.game = game;
        this.dt = dt;
        this.ctx = ctx;
    }
    PauseState.prototype.keyDown = function (keyCode) {
        if (keyCode == 27) {
            //  Pop the pause state.
            this.game.popState();
        }
    };
    ;
    PauseState.prototype.draw = function () {
        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
        this.ctx.font = "14px Arial";
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Paused", this.game.stateOptions.width / 2, this.game.stateOptions.height / 2);
    };
    return PauseState;
})();
module.exports = PauseState;
//# sourceMappingURL=pause-state.js.map