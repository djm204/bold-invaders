import boldInvaders = require('./bold-invaders');
import PlayState = require('./play-state');
export = LevelIntroState;

class LevelIntroState {
    countdown: number;
    countDownMessage: number;
    
    constructor(public game: boldInvaders, public dt: number, public ctx: CanvasRenderingContext2D) { 
     
    }
        

    draw() {
        if(this.countDownMessage === undefined){
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
    
    }

    update() {

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
            this.game.moveToState(new PlayState(this.game));
            console.log("counted to zero");
        }
        console.log(this.countdown +" message: " + this.countDownMessage);
        this.draw();
        this.countdown -= 1;
        
    }

}