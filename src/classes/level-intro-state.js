var LevelIntroState = (function () {
    function LevelIntroState(game, level, dt, ctx) {
        var countdownMessage = 3;
        //  Clear the background.
        ctx.clearRect(0, 0, game.stateOptions.width, game.stateOptions.height);
        ctx.font = "36px Arial";
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Level " + level, game.stateOptions.width / 2, game.stateOptions.height / 2);
        ctx.font = "24px Arial";
        ctx.fillText("Ready in " + countdownMessage, game.stateOptions.width / 2, game.stateOptions.height / 2 + 36);
    }
    LevelIntroState.prototype.draw = function (game, dt, ctx, level) {
    };
    return LevelIntroState;
})();
module.exports = LevelIntroState;
//# sourceMappingURL=level-intro-state.js.map