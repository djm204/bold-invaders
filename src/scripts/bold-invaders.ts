class BoldInvaders {


    constructor(public boldOptions: BoldInvaders.GameOptions, public stateOptions: BoldInvaders.State) { }



    initialize(gameCanvas) {

        this.stateOptions.height = gameCanvas.height;
        this.stateOptions.width = gameCanvas.width;

        this.stateOptions.gameBounds.left = gameCanvas.width / 2 - this.boldOptions.gameWidth;
        this.stateOptions.gameBounds.right = gameCanvas.width / 2 - this.boldOptions.gameWidth;
        this.stateOptions.gameBounds.top = gameCanvas.height / 2 - this.boldOptions.gameHeight;
        this.stateOptions.gameBounds.bottom = gameCanvas.height / 2 - this.boldOptions.gameHeight;

    }

    currentState() {
        return this.stateOptions.stateStack.length > 0 ? this.stateOptions.stateStack[this.stateOptions.stateStack.length - 1] : null;
    }

    moveToState(state) {
       /* if (this.currentState()) {

            if (this.currentState().leave) {
                this.currentState().leave(game);
            }

            this.stateOptions.stateStack.pop();
        }
        
        //  If there's an enter function for the new state, call it.
        if (state.enter) {
            state.enter(game);
        }
 
        //  Set the current state.
        this.stateOptions.stateStack.push(state);*/
    }

    pushState(state) {
      /*  //  If there's an enter function for the new state, call it.
        if (state.enter) {
            state.enter(game);
        }
        //  Set the current state.
        this.stateOptions.stateStack.push(state);*/
    }
    
    popState() {
       /* if(this.currentState().leave) {
            this.currentState().leave(game);
        }
 
        //  Set the current state.
        this.stateOptions.stateStack.pop();*/

    }
    
    start(){
      /*  //  Move into the 'welcome' state.
        this.moveToState(new WelcomeState());*/
    
        //  Set the game variables.
        this.stateOptions.lives = 3;
        this.boldOptions.debugMode = /debug=true/.test(window.location.href);
    
        //  Start the game loop.
        var game = this;
        /*var intervalId = setInterval(function () { gameLoop(game);}, 1000 / this.boldOptions.fps);*/
 
    }

}





export = BoldInvaders;