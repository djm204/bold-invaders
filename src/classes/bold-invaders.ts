import welcomeState = require('./welcome-state');
class BoldInvaders {


    constructor(public boldOptions: BoldInvaders.GameOptions, public stateOptions: BoldInvaders.StateOptions) { }



    initialize(gameCanvas) {
        this.stateOptions.gameCanvas = gameCanvas;

        console.log(gameCanvas.height);
        gameCanvas.height = window.innerHeight / 2;
        gameCanvas.width = window.innerWidth / 2;
        this.stateOptions.height = gameCanvas.height;
        this.stateOptions.width = gameCanvas.width;


    }
    gameLoop(game) {
        var currentState = game.currentState();

        if (currentState) {
            
            //  Delta t is the time to update/draw.
            var dt = 1 / game.boldOptions.fps;
    
            //  Get the drawing context.
            var ctx = game.stateOptions.gameCanvas.getContext("2d");
            
            //  Update if we have an update function. Also draw
            //  if we have a draw function.
            if (currentState.update) {
                currentState.update(game, dt);
            }
            if (currentState.draw) {
                currentState.draw(game, dt, ctx);
            }
        }
    }

    currentState() {
        return this.stateOptions.stateStack.length > 0 ? this.stateOptions.stateStack[this.stateOptions.stateStack.length - 1] : null;
    }

    moveToState(state) {
        if (this.currentState()) {

            if (this.currentState().leave) {
                this.currentState().leave(this);
            }

            this.stateOptions.stateStack.pop();
        }
        
        //  If there's an enter function for the new state, call it.
        if (state.enter) {
            state.enter(this);
        }
 
        //  Set the current state.
        this.stateOptions.stateStack.push(state);
    }

    pushState(state) {
        //  If there's an enter function for the new state, call it.
        if (state.enter) {
            state.enter(this);
        }
        //  Set the current state.
        this.stateOptions.stateStack.push(state);
    }

    popState() {
        if (this.currentState().leave) {
            this.currentState().leave(this);
        }
 
        //  Set the current state.
        this.stateOptions.stateStack.pop();

    }

    start() {
        var canvas = this.stateOptions.gameCanvas;
        var ctx = canvas.getContext("2d");
        //  Move into the 'welcome' state.
        this.moveToState(new welcomeState(this, 1 / (this.boldOptions.fps), ctx));
    
        //  Set the game variables.
        this.stateOptions.lives = 3;
        this.boldOptions.debugMode = /debug=true/.test(window.location.href);
        //  Start the game loop.
        var intervalId = setInterval(this.gameLoop(this), 1000 / this.boldOptions.fps);

    }

    keyDown(keyCode): void {
        this.stateOptions.pressedKeys[keyCode] = true;
        //  Delegate to the current state too.
        if (this.currentState() && this.currentState().keyDown) {
            this.currentState().keyDown(this, keyCode);
        }
    }

    keyUp(keyCode) {
        delete this.stateOptions.pressedKeys[keyCode];
        //  Delegate to the current state too.
        if (this.currentState() && this.currentState().keyUp) {
            this.currentState().keyUp(this, keyCode);
        }
    }



}





export = BoldInvaders;