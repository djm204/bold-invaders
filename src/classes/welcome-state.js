var WelcomeState = (function () {
    function WelcomeState(game, dt, ctx) {
    }
    WelcomeState.prototype.draw = function (game, dt, ctx) {
        var boldLogo = new Image();
        var invadersLogo = new Image();
        boldLogo.src = "../front/images/welcomeLogo.png";
        invadersLogo.src = "../front/images/invaders.png";
        var invaders = document.getElementById("invadersLogo");
        //  Clear the background.
        ctx.clearRect(0, 0, game.stateOptions.width, game.stateOptions.height);
        //Draw Text
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";
        ctx.font = "16px Arial";
        ctx.fillText("Press 'Space' to start.", game.stateOptions.width / 2, game.stateOptions.height / 2);
        //Draw Logo
        ctx.drawImage(boldLogo, ctx.canvas.width / 2 - boldLogo.width / 2, 25, 250, 125);
        ctx.drawImage(invadersLogo, ctx.canvas.width / 2 - invadersLogo.width / 4, 125, 250, 75);
    };
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