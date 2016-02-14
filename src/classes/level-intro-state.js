var GameState = require('./game-state');
var LevelIntroState = (function () {
    function LevelIntroState(level, game, dt, ctx) {
        this.level = level;
        this.game = game;
        this.dt = dt;
        this.ctx = ctx;
    }
    LevelIntroState.prototype.draw = function () {
        if (this.countDownMessage == null) {
            this.countDownMessage = 3;
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
        this.ctx.fillText("Ready in " + this.countDownMessage, this.game.stateOptions.width / 2, this.game.stateOptions.height / 2 + 36);
    };
    LevelIntroState.prototype.update = function () {
        //  Update the countdown.
        if (this.countdown == null) {
            this.countdown = 3; // countdown from 3 secs
        }
        if (this.countdown <= 2) {
            this.countDownMessage = 2;
        }
        if (this.countdown <= 1) {
            this.countDownMessage = 1;
        }
        if (this.countdown <= 0) {
            //  Move to the next level, popping this state.
            this.game.moveToState(new GameState(this.game));
            console.log("counted to zero");
        }
        console.log(this.countdown + " message: " + this.countDownMessage);
        this.draw();
        this.countdown -= .03;
    };
    return LevelIntroState;
})();
module.exports = LevelIntroState;
//# sourceMappingURL=level-intro-state.js.map