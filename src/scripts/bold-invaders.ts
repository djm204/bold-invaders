class BoldInvaders {


    constructor(public options: BoldInvaders.GameOptions) { }



    initialize(gameCanvas) {

        this.options.state.height = gameCanvas.height;
        this.options.state.width = gameCanvas.width;

        this.options.state.gameBounds.left = gameCanvas.width / 2 - this.options.config.gameWidth;
        this.options.state.gameBounds.right = gameCanvas.width / 2 - this.options.config.gameWidth;
        this.options.state.gameBounds.top = gameCanvas.height / 2 - this.options.config.gameHeight;
        this.options.state.gameBounds.bottom = gameCanvas.height / 2 - this.options.config.gameHeight;

    }

    currentState() {
        return this.options.state.stateStack.length > 0 ? this.options.state.stateStack[this.options.state.stateStack.length - 1] : null;
    }

    moveToState(state) {
        if (this.currentState()) {

            if (this.currentState().leave) {
                this.currentState().leave(game);
            }

            this.options.state.stateStack.pop();
        }
        
        //  If there's an enter function for the new state, call it.
        if (state.enter) {
            state.enter(game);
        }
 
        //  Set the current state.
        this.options.state.stateStack.push(state);
    }

    pushState(state) {
        //  If there's an enter function for the new state, call it.
        if (state.enter) {
            state.enter(game);
        }
        //  Set the current state.
        this.options.state.stateStack.push(state);
    }
    
    popState() {
        if(this.currentState().leave) {
            this.currentState().leave(game);
        }
 
        //  Set the current state.
        this.options.state.stateStack.pop();

    }
    
    start(){
        //  Move into the 'welcome' state.
        this.moveToState(new WelcomeState());
    
        //  Set the game variables.
        this.options.state.lives = 3;
        this.options.config.debugMode = /debug=true/.test(window.location.href);
    
        //  Start the game loop.
        var game = this;
        var intervalId = setInterval(function () { gameLoop(game);}, 1000 / this.options.config.fps);
 
    }

}





export = BoldInvaders;