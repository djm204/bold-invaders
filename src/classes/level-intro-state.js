var LevelIntroState = (function () {
    function LevelIntroState(game, dt, ctx) {
    }
    LevelIntroState.prototype.draw = function (game, dt, ctx) {
        if (this.countDownMessage === undefined) {
            this.countDownMessage = 3;
        }
        console.log(ctx);
        //  Clear the background.
        ctx.clearRect(0, 0, game.stateOptions.width, game.stateOptions.height);
        ctx.font = "36px Arial";
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Level " + game.stateOptions.level, game.stateOptions.width / 2, game.stateOptions.height / 2);
        ctx.font = "24px Arial";
        ctx.fillText("Ready in " + this.countDownMessage, game.stateOptions.width / 2, game.stateOptions.height / 2 + 36);
    };
    LevelIntroState.prototype.update = function (game, dt, ctx) {
        console.log("Got HEre l-intro update");
        //  Update the countdown.
        if (this.countdown === undefined) {
            this.countdown = 3; // countdown from 3 secs
        }
        if (this.countdown === 2) {
            this.countDownMessage = 2;
        }
        if (this.countdown === 1) {
            this.countDownMessage = 1;
        }
        if (this.countdown <= 0) {
            //  Move to the next level, popping this state.
            //game.moveToState(new PlayState(game.config, this.level));
            console.log("counted to zero");
        }
        console.log(this.countdown + " message: " + this.countDownMessage);
        this.draw(game, dt, ctx);
        this.countdown -= 1;
    };
    return LevelIntroState;
})();
module.exports = LevelIntroState;
//# sourceMappingURL=level-intro-state.js.map