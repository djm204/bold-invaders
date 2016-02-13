var levelIntroState = require('./level-intro-state');
var GameOverState = (function () {
    function GameOverState(game, dt, ctx) {
        this.game = game;
        this.dt = dt;
        this.ctx = ctx;
    }
    GameOverState.prototype.draw = function () {
        var gameOverLogo = new Image();
        var trollFaceObama = new Image();
        gameOverLogo.src = "images/welcomeLogo.png";
        trollFaceObama.src = "images/invaders.png";
        var invaders = document.getElementById("trollFaceObama");
        //  Clear the background.
        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
        //Draw Text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textBaseline = "bottom";
        this.ctx.textAlign = "center";
        this.ctx.font = "16px Arial";
        //Draw Logo
        this.ctx.drawImage(gameOverLogo, this.ctx.canvas.width / 2 - gameOverLogo.width / 2, 25, 250, 125);
        this.ctx.drawImage(trollFaceObama, this.ctx.canvas.width / 2 - trollFaceObama.width / 4, 125, 250, 75);
        this.ctx.fillText("A BOLD interpretation of a cult classic.", this.game.stateOptions.width / 2, this.game.stateOptions.height * .46);
        this.ctx.fillText("Press 'Space' to start.", this.game.stateOptions.width / 2, this.game.stateOptions.height);
        this.ctx.fillText("Move: <left> and <right> keys", this.game.stateOptions.width / 2, this.game.stateOptions.height * .55);
        this.ctx.fillText("Shoot: spacebar", this.game.stateOptions.width / 2, this.game.stateOptions.height * .59);
    };
    GameOverState.prototype.keyDown = function (game, keyCode) {
        if (keyCode == 32) {
            //  Space starts the game.  
            game.moveToState(new levelIntroState(game, 1 / (game.boldOptions.fps), game.stateOptions.gameCanvas.getContext("2d")));
            var intervalId = setInterval(function () {
                game.gameLoop(game);
            }, 1000);
        }
    };
    return GameOverState;
})();
module.exports = GameOverState;
//# sourceMappingURL=game-over.js.map