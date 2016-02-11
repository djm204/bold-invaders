import boldInvaders = require('./bold-invaders');
class WelcomeState {

    constructor(game: boldInvaders, dt: number, ctx: CanvasRenderingContext2D) {
        //  Clear the background.
        ctx.clearRect(0, 0, game.stateOptions.width, game.stateOptions.height);

        ctx.font = "30px Arial";
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "center";
        ctx.textAlign = "center";
        ctx.fillText("Bold Invaders", game.stateOptions.width / 2, game.stateOptions.height / 2 - 40);
        ctx.font = "16px Arial";

        ctx.fillText("Press 'Space' to start.", game.stateOptions.width / 2, game.stateOptions.height / 2);
    }
    
   

    keyDown(game: boldInvaders, keyCode: number) {
        if (keyCode == 32) /*space*/ {
            //  Space starts the game.
            console.log("will Intro LEvel here");//game.moveToState(new LevelIntroState(game.level));
        }
    }
}

export = WelcomeState;