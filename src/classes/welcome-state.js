var levelIntroState = require('./level-intro-state');
var WelcomeState = (function () {
    function WelcomeState(game, ctx) {
        this.game = game;
        this.ctx = ctx;
        this.introMusic = new Audio("sounds/introMusic.mp3"); // buffers automatically when created
    }
    WelcomeState.prototype.draw = function () {
        var boldLogo = new Image();
        var invadersLogo = new Image();
        boldLogo.src = "images/welcomeLogo.png";
        invadersLogo.src = "images/invaders.png";
        //  Clear the background.
        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
        //Draw Text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textBaseline = "bottom";
        this.ctx.textAlign = "center";
        this.ctx.font = "16px Arial";
        this.ctx.fillText("A BOLD interpretation of a cult classic.", this.game.stateOptions.width / 2, this.game.stateOptions.height * .40);
        this.ctx.fillText("Help the Bold team destroy blocks of buggy code before production!", this.game.stateOptions.width / 2, this.game.stateOptions.height * .50);
        this.ctx.fillText("Move: <left> and <right> keys", this.game.stateOptions.width / 2, this.game.stateOptions.height * .72);
        this.ctx.fillText("Shoot: SpaceBar", this.game.stateOptions.width / 2, this.game.stateOptions.height * .76);
        this.ctx.fillText("Pause: <Esc> key", this.game.stateOptions.width / 2, this.game.stateOptions.height * .80);
        this.ctx.fillText("Press 'Space' to start.", this.game.stateOptions.width / 2, this.game.stateOptions.height);
        //Draw Logo        
        this.ctx.drawImage(boldLogo, this.ctx.canvas.width / 2 - boldLogo.width / 2, 25, 250, 125);
        this.ctx.drawImage(invadersLogo, this.ctx.canvas.width / 2 - invadersLogo.width / 4, 125, 250, 75);
        this.introMusic.volume = .05;
        this.introMusic.play();
    };
    WelcomeState.prototype.keyDown = function (game, keyCode) {
        if (keyCode == 32) {
            //  Space starts the game.             
            var options = { level: 1, countDown: 3, countDownMessage: 3, ctx: this.ctx };
            this.introMusic.pause();
            game.moveToState(new levelIntroState(game));
        }
    };
    return WelcomeState;
})();
module.exports = WelcomeState;
//# sourceMappingURL=welcome-state.js.map