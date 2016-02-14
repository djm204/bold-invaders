var GameState = require('./game-state');
var LevelIntroState = (function () {
    function LevelIntroState(game, ctx) {
        this.game = game;
        this.ctx = ctx;
    }
    LevelIntroState.prototype.draw = function () {
        if (this.game.stateOptions.countDownMessage == null) {
            this.game.stateOptions.countDownMessage = 3;
        }
        console.log(this.ctx);
        //  Clear the background.
        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
        this.ctx.font = "36px Arial";
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Level " + this.game.stateOptions.level, this.game.stateOptions.width / 2, this.game.stateOptions.height / 2);
        this.ctx.font = "24px Arial";
        this.ctx.fillText("Ready in " + this.game.stateOptions.countDownMessage, this.game.stateOptions.width / 2, this.game.stateOptions.height / 2 + 36);
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
            this.game.moveToState(new GameState(this.game, this));
            console.log("counted to zero");
        }
        console.log(this.game.stateOptions.countDown + " message: " + this.game.stateOptions.countDownMessage);
        this.draw();
        this.game.stateOptions.countDown -= .03;
    };
    return LevelIntroState;
})();
module.exports = LevelIntroState;
//# sourceMappingURL=level-intro-state.js.map