import boldInvaders = require('./bold-invaders');
class WelcomeState {

    constructor(game: boldInvaders, dt: number, ctx: CanvasRenderingContext2D) {
        
        var boldLogo = new Image();
        var invadersLogo = new Image();
        
        invadersLogo.src = "../front/images/invaders.png";
        
        
        boldLogo.src = "../front/images/welcomeLogo.png";
        var invaders = document.getElementById("invadersLogo");
        //  Clear the background.
        ctx.clearRect(0, 0, game.stateOptions.width, game.stateOptions.height);

        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";
        
        
        ctx.font = "16px Arial";

        ctx.fillText("Press 'Space' to start.", game.stateOptions.width / 2, game.stateOptions.height / 2);
        ctx.drawImage(boldLogo, ctx.canvas.width / 2, 25, 250, 125);
        ctx.drawImage(invadersLogo, ctx.canvas.width / 2, 125, 250, 75);
        
       
}
    
   

    keyDown(game: boldInvaders, keyCode: number) {
        if (keyCode == 32) /*space*/ {
            //  Space starts the game.
            console.log("will Intro LEvel here");//game.moveToState(new LevelIntroState(game.level));
        }
    }
}

export = WelcomeState;