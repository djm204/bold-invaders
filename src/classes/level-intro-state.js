var GameState = require('./game-state');
var LevelIntroState = (function () {
    function LevelIntroState(game, gameState) {
        this.game = game;
        this.gameState = gameState;
    }
    LevelIntroState.prototype.draw = function () {
        var ctx = this.game.stateOptions.gameCanvas.getContext("2d");
        if (this.game.stateOptions.countDownMessage == null) {
            this.game.stateOptions.countDownMessage = 3;
        }
        if (this.game.playerOptions.win) {
        }
        //  Clear the background.
        ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
        ctx.font = "36px Arial";
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Level " + this.game.stateOptions.level, this.game.stateOptions.width / 2, this.game.stateOptions.height / 2);
        ctx.font = "24px Arial";
        ctx.fillText("Ready in " + this.game.stateOptions.countDownMessage, this.game.stateOptions.width / 2, this.game.stateOptions.height / 2 + 36);
    };
    LevelIntroState.prototype.update = function () {
        //  Update the countDown.
        if (this.game.stateOptions.countDown == null) {
            this.game.stateOptions.countDown = 3; // countDown from 3 secs
        }
        if (this.game.stateOptions.countDown <= 2) {
            this.game.stateOptions.countDownMessage = 2;
        }
        if (this.game.stateOptions.countDown <= 1) {
            this.game.stateOptions.countDownMessage = 1;
        }
        if (this.game.stateOptions.countDown <= 0) {
            //  Move to the next level, popping this state.
            this.game.playerOptions.win = false;
            this.game.moveToState(new GameState(this.game, this));
        }
        this.draw();
        this.game.stateOptions.countDown -= .03;
    };
    return LevelIntroState;
})();
module.exports = LevelIntroState;
//# sourceMappingURL=level-intro-state.js.map