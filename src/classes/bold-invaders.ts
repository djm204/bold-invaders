import welcomeState = require('./welcome-state');
export = BoldInvaders;

class BoldInvaders {


    constructor(
        public boldOptions: BoldInvaders.GameOptions,
        public playerOptions: BoldInvaders.Player,
        public enemyOptions: BoldInvaders.Enemy,
        public gameStateOptions: BoldInvaders.GameStateOptions,
        public stateOptions: BoldInvaders.StateOptions) { }



    initialize(gameCanvas: HTMLCanvasElement) {
        this.stateOptions.gameCanvas = gameCanvas;
        gameCanvas.height = window.innerHeight / 2;
        gameCanvas.width = window.innerWidth / 2;
        this.stateOptions.height = gameCanvas.height;
        this.stateOptions.width = gameCanvas.width;

        this.stateOptions.gameBounds = {
            left: gameCanvas.width / 2 - this.boldOptions.gameWidth / 2,
            right: gameCanvas.width / 2 + this.boldOptions.gameWidth / 2,
            top: gameCanvas.height / 2 - this.boldOptions.gameHeight / 2,
            bottom: gameCanvas.height / 2 + this.boldOptions.gameHeight / 2,
        };


    }
    gameLoop(game: BoldInvaders) {
        var currentState = game.currentState();
        console.log(currentState);
        if (currentState) {
            
            //  Delta t is the time to update/draw.
            var dt = 1 / game.boldOptions.fps;
    
            //  Get the drawing context.
            var ctx = game.stateOptions.gameCanvas.getContext("2d");
            console.log(ctx);
            
            //  Update if we have an update function. Also draw
            //  if we have a draw function.
            if (currentState.update) {
                currentState.update(game, dt, ctx);
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
        this.chooseStateFunction(state);
 
        //  Set the current state.
        this.stateOptions.stateStack.pop();
        this.stateOptions.stateStack.push(state);
    }

    pushState(state: BoldInvaders.GameState) {
        //  If there's an enter function for the new state, call it.
        this.chooseStateFunction(state);
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
        setInterval(() =>{this.gameLoop(this)}, 1000 / this.boldOptions.fps);

    }

    keyDown(keyCode: number): void {
        this.stateOptions.pressedKeys[keyCode] = true;
        //  Delegate to the current state too.
        if (this.currentState() && this.currentState().keyDown) {
            this.currentState().keyDown(this, keyCode);
        }
    }

    keyUp(keyCode: number) {
        delete this.stateOptions.pressedKeys[keyCode];
        //  Delegate to the current state too.
        if (this.currentState() && this.currentState().keyUp) {
            this.currentState().keyUp(this, keyCode);
        }
    }

    chooseStateFunction(state: BoldInvaders.GameState) {
        if (this.isPlayState(state)) {
            state.enter();
        }

        if (this.isOverState(state)) {
            state.leave();
        }

        if (this.isIntroState(state)) {
            state.update();
        }
    }

    isPlayState(state: BoldInvaders.GameState): state is BoldInvaders.PlayState {
        return typeof (<BoldInvaders.PlayState>state).enter === 'function';
    }

    isOverState(state: BoldInvaders.GameState): state is BoldInvaders.OverState {
        return typeof (<BoldInvaders.OverState>state).leave === 'function';
    }

    isIntroState(state: BoldInvaders.GameState): state is BoldInvaders.IntroState {
        return typeof (<BoldInvaders.IntroState>state).update === 'function';
    }

    isWelcomeState(state: BoldInvaders.GameState): state is BoldInvaders.WelcomeState {
        return typeof (<BoldInvaders.WelcomeState>state).draw === 'function';

    }



}