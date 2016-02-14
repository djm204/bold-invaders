import boldInvaders = require('./bold-invaders');
export = GameOverState;
class GameOverState {

    constructor(
        public gameState: BoldInvaders.IntroState, 
        public game: boldInvaders, 
        public dt: number, 
        public ctx: CanvasRenderingContext2D) { }
    
    draw(){
        //  Clear the background.
    this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);

    this.ctx.font="30px Arial";
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textBaseline="center"; 
    this.ctx.textAlign="center"; 
    this.ctx.fillText("Game Over!", this.game.stateOptions.width / 2, this.game.stateOptions.height/2 - 40); 
    this.ctx.font="16px Arial";
    this.ctx.fillText("You scored " + this.game.playerOptions.score + " and got to level " + this.game.stateOptions.level, this.game.stateOptions.width / 2, this.game.stateOptions.height/2);
    this.ctx.font="16px Arial";
    this.ctx.fillText("Press 'Space' to play again.", this.game.stateOptions.width / 2, this.game.stateOptions.height/2 + 40);   
        
    }



    keyDown(game: boldInvaders,keyCode: number) {
        if (keyCode == 32) /*space*/ {
            game.playerOptions.timesPlayed++;
            game.resetGameVariables(true);
            console.log(this.gameState);
            game.pushState(this.gameState);
           

        }
        
    }
}