module.exports = (game) =>{
    var currentState = game.CurrentState(); 
    
    if(currentState){
        
        //  Delta t is the time to update/draw.
        var dt = 1 / game.config.fps;
 
        //  Get the drawing context.
        var ctx = game.gameCanvas.getContext("2d");
		
        //  Update if we have an update function. Also draw
        //  if we have a draw function.
        if(currentState.update) {
            currentState.update(game, dt);
        }
        if(currentState.draw) {
            currentState.draw(game, dt, ctx);
        }
    }
}