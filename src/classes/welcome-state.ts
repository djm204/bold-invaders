import boldInvaders = require('./bold-invaders');
import levelIntroState = require('./level-intro-state');
export = WelcomeState;
class WelcomeState {

    constructor(game: boldInvaders, dt: number, ctx: CanvasRenderingContext2D) { }
    
    draw(game, dt, ctx){
        var boldLogo = new Image();
        var invadersLogo = new Image();
        boldLogo.src = "images/welcomeLogo.png";
        invadersLogo.src = "images/invaders.png";


        var invaders = document.getElementById("invadersLogo");
        //  Clear the background.
        ctx.clearRect(0, 0, game.stateOptions.width, game.stateOptions.height);

        //Draw Text
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";
        ctx.font = "16px Arial";
        
        //Draw Logo
        
    setTimeout(function() {
        ctx.drawImage(boldLogo, ctx.canvas.width / 2 - boldLogo.width / 2, 25, 250, 125);
    }, 300);
    
    setTimeout(function() {
        ctx.drawImage(invadersLogo, ctx.canvas.width / 2 - invadersLogo.width / 4, 125, 250, 75);
    }, 1300);
    
    setTimeout(function() {
        ctx.fillText("Press 'Space' to start.", game.stateOptions.width / 2, game.stateOptions.height / 2);
    }, 2000);
        

    }



    keyDown(game: boldInvaders,keyCode: number) {
        if (keyCode == 32) /*space*/ {
            //  Space starts the game.  
            game.moveToState(new levelIntroState(game, 1 / (game.boldOptions.fps), game.stateOptions.gameCanvas.getContext("2d")));
            var intervalId = setInterval(function(){
                game.gameLoop(game)}, 1000 );

        }
    }
}