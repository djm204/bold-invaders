import boldInvaders = require('./bold-invaders');
export = GameOverState;
class GameOverState {

    constructor(
        public gameState: BoldInvaders.IntroState,
        public game: boldInvaders,
        public dt: number,
        public ctx: CanvasRenderingContext2D) { }

    draw() {
        //Draw the gameover logos
        var gameOverLogo = new Image();
        gameOverLogo.src = "images/2gameOverLogo.png";
       
        //  Clear the background.
        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);

        this.ctx.drawImage(gameOverLogo, this.ctx.canvas.width / 2 - gameOverLogo.width / 2, 0, 325, 325);
        this.ctx.font = "26px Arial";
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textBaseline = "center";
        this.ctx.textAlign = "center";
        this.ctx.fillText("You scored: " + this.game.playerOptions.score, this.game.stateOptions.width / 2, this.game.stateOptions.height * .66);
        this.ctx.fillText("Highest level: " + this.game.stateOptions.level, this.game.stateOptions.width / 2, this.game.stateOptions.height * .72);
        this.ctx.fillText("Press 'Space' to play again.", this.game.stateOptions.width / 2, this.game.stateOptions.height * .92);
    }

    keyDown(game: boldInvaders, keyCode: number) {
        if (keyCode == 32) /*space*/ {
            game.playerOptions.timesPlayed++;
            game.resetGameVariables(true);
            game.pushState(this.gameState);
        }
    }
}