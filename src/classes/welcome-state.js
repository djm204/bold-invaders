var WelcomeState = (function () {
    function WelcomeState(game, dt, ctx) {
        //  Clear the background.
        ctx.clearRect(0, 0, game.stateOptions.width, game.stateOptions.height);
        ctx.font = "30px Arial";
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "center";
        ctx.textAlign = "center";
        ctx.fillText("Bold Invaders", game.stateOptions.width / 2, game.stateOptions.height / 2 - 40);
        ctx.font = "16px Arial";
        ctx.fillText("Press 'Space' to start.", game.stateOptions.width / 2, game.stateOptions.height / 2);
    }
    WelcomeState.prototype.keyDown = function (game, keyCode) {
        if (keyCode == 32) {
            //  Space starts the game.
            console.log("will Intro LEvel here"); //game.moveToState(new LevelIntroState(game.level));
        }
    };
    return WelcomeState;
})();
module.exports = WelcomeState;
//# sourceMappingURL=welcome-state.js.map