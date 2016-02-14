var levelIntroState = require('./level-intro-state');
var WelcomeState = (function () {
    function WelcomeState(game, ctx) {
        this.game = game;
        this.ctx = ctx;
    }
    WelcomeState.prototype.draw = function () {
        var boldLogo = new Image();
        var invadersLogo = new Image();
        boldLogo.src = "images/welcomeLogo.png";
        invadersLogo.src = "images/invaders.png";
        var invaders = document.getElementById("invadersLogo");
        //  Clear the background.
        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
        //Draw Text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textBaseline = "bottom";
        this.ctx.textAlign = "center";
        this.ctx.font = "16px Arial";
        //Draw Logo
        this.ctx.drawImage(boldLogo, this.ctx.canvas.width / 2 - boldLogo.width / 2, 25, 250, 125);
        this.ctx.drawImage(invadersLogo, this.ctx.canvas.width / 2 - invadersLogo.width / 4, 125, 250, 75);
        this.ctx.fillText("A BOLD interpretation of a cult classic.", this.game.stateOptions.width / 2, this.game.stateOptions.height * .46);
        this.ctx.fillText("Press 'Space' to start.", this.game.stateOptions.width / 2, this.game.stateOptions.height);
        this.ctx.fillText("Move: <left> and <right> keys", this.game.stateOptions.width / 2, this.game.stateOptions.height * .55);
        this.ctx.fillText("Shoot: spacebar", this.game.stateOptions.width / 2, this.game.stateOptions.height * .59);
    };
    WelcomeState.prototype.keyDown = function (game, keyCode) {
        if (keyCode == 32) {
            //  Space starts the game.  
            game.moveToState(new levelIntroState(this.game.stateOptions.level, game, this.ctx));
        }
    };
    return WelcomeState;
})();
module.exports = WelcomeState;
//# sourceMappingURL=welcome-state.js.map