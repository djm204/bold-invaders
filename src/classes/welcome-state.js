var levelIntroState = require('./level-intro-state');
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
        //Draw Logo
        setTimeout(function () {
            ctx.drawImage(boldLogo, ctx.canvas.width / 2 - boldLogo.width / 2, 25, 250, 125);
        }, 300);
        setTimeout(function () {
            ctx.drawImage(invadersLogo, ctx.canvas.width / 2 - invadersLogo.width / 4, 125, 250, 75);
        }, 1300);
        setTimeout(function () {
            ctx.fillText("Press 'Space' to start.", game.stateOptions.width / 2, game.stateOptions.height / 2);
        }, 2000);
    };
    WelcomeState.prototype.keyDown = function (game, keyCode) {
        if (keyCode == 32) {
            //  Space starts the game.  
            game.moveToState(new levelIntroState(game, 1 / (game.boldOptions.fps), game.stateOptions.gameCanvas.getContext("2d")));
            var intervalId = setInterval(function () {
                game.gameLoop(game);
            }, 1000);
        }
    };
    return WelcomeState;
})();
module.exports = WelcomeState;
//# sourceMappingURL=welcome-state.js.map