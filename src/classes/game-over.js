var levelIntroState = require('./level-intro-state');
var GameOverState = (function () {
    function GameOverState(game, dt, ctx) {
        this.game = game;
        this.dt = dt;
        this.ctx = ctx;
    }
    GameOverState.prototype.draw = function () {
        //  Clear the background.
        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textBaseline = "center";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Over!", this.game.stateOptions.width / 2, this.game.stateOptions.height / 2 - 40);
        this.ctx.font = "16px Arial";
        this.ctx.fillText("You scored " + this.game.stateOptions.score + " and got to level " + this.game.stateOptions.level, this.game.stateOptions.width / 2, this.game.stateOptions.height / 2);
        this.ctx.font = "16px Arial";
        this.ctx.fillText("Press 'Space' to play again.", this.game.stateOptions.width / 2, this.game.stateOptions.height / 2 + 40);
    };
    GameOverState.prototype.keyDown = function (game, keyCode) {
        if (keyCode == 32) {
            game.stateOptions.lives = 3;
            game.stateOptions.score = 0;
            game.stateOptions.level = 1;
            game.moveToState(new levelIntroState(1, game, 1 / (game.boldOptions.fps), this.ctx));
        }
    };
    return GameOverState;
})();
module.exports = GameOverState;
//# sourceMappingURL=game-over.js.map