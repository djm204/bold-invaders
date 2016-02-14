import levelIntroState = require('./level-intro-state');
import welcomeState = require('./welcome-state');
export = BoldInvaders;

class BoldInvaders {


    constructor(
        public boldOptions: BoldInvaders.GameOptions,
        public playerOptions: BoldInvaders.Player,
        public enemyOptions: BoldInvaders.Enemy,
        public gameStateOptions: BoldInvaders.GameStateOptions,
        public stateOptions: BoldInvaders.StateOptions
    ) { }



    initialize(gameCanvas: HTMLCanvasElement) {
        this.stateOptions.gameCanvas = gameCanvas;
        gameCanvas.width = 700;
        gameCanvas.height = 600;

        this.stateOptions.height = gameCanvas.height;
        this.stateOptions.width = gameCanvas.width;

        this.stateOptions.gameBounds = {
            left: gameCanvas.width / 2 - this.boldOptions.gameWidth / 2,
            right: gameCanvas.width / 2 + this.boldOptions.gameWidth / 2,
            top: gameCanvas.height / 2 - this.boldOptions.gameHeight / 1.5,
            bottom: gameCanvas.height-100,
        };



    }


    moveToState(state) {
        if (this.currentState()) {



            this.stateOptions.stateStack.pop();
        }

        this.chooseStateFunction(state);
 
        //  Set the current state.
        this.stateOptions.stateStack.pop();
        this.stateOptions.stateStack.push(state);
    }

    start() {
        var canvas = this.stateOptions.gameCanvas;
        var ctx = canvas.getContext("2d");
        //  Move into the 'welcome' state.
        this.moveToState(new welcomeState(this, ctx));
    
        //  Set the game variables.
        this.stateOptions.lives = 3;
        this.boldOptions.debugMode = /debug=true/.test(window.location.href);
        //  Start the game loop.
        this.stateOptions.intervalId = setInterval(() => { this.gameLoop(this) }, 1000 / this.boldOptions.fps);

    }

    tryAgain() {
        this.resetGameVariables();

    }

    resetGameVariables() {
        
        // rest config 
        this.boldOptions = {
            gameWidth: 400,
            gameHeight: 300,
            fps: 50,
            shipSpeed: 120,
            debugMode: true,
            levelDifficultyMultiplier: .2
        };

        this.stateOptions = {
            lives: 3,
            width: 0,
            height: 0,
            gameBounds: { left: 0, top: 0, right: 0, bottom: 0 },
            intervalId: 0,
            score: 0,
            level: 1,
            stateStack: [],
            pressedKeys: [],
            gameCanvas: this.stateOptions.gameCanvas,
            sounds: [],
            lastPauseTime: null,
            countDown: 3,
            countDownMessage: 3
        }

        this.playerOptions = {
            rocketVelocity: 120,
            rocketMaxFireRate: 2
        }

        this.enemyOptions = {
            bombRate: 0.05,
            bombMinVelocity: 50,
            bombMaxVelocity: 50,
            invaderInitialVelocity: 25,
            invaderAcceleration: 0,
            invaderDropDistance: 20,
            invaderRanks: 5,
            invaderFiles: 10,
            pointsPerInvader: 5
        }

        this.gameStateOptions = {
            ship: null,
            invaders: [],
            rockets: [],
            bombs: [],
            invaderCurrentVelocity: 1,
            invaderCurrentDropDistance: 0,
            invadersAreDropping: false,
            lastRocketTime: 0,
            firstEntry: true
        }



    }


    currentState() {
        return this.stateOptions.stateStack.length > 0 ? this.stateOptions.stateStack[this.stateOptions.stateStack.length - 1] : null;
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

    }

    gameLoop(game: BoldInvaders) {
        var currentState = game.currentState();
        if (currentState) {
            
            //  Delta t is the time to update/draw.
            var dt = 1 / game.boldOptions.fps;
    
            //  Get the drawing context.
            var ctx = game.stateOptions.gameCanvas.getContext("2d");

            if (currentState.draw) {
                currentState.draw();
            }
            if (currentState.update) {
                currentState.update();
            }
            
            //  Update if we have an update function. Also draw
            //  if we have a draw function.
          
        }
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

            if (this.gameStateOptions.firstEntry) {
                console.log("got to State Enter");

                state.enter();

            }
            else {
                state.update();

            }
        }

        if (this.isOverState(state)) {
            state.leave();
        }

        if (this.isIntroState(state)) {
            state.update();
        }

        if (this.isWelcomeState(state)) {
            state.draw();
        }
    }


    isPlayState(state: BoldInvaders.GameState): state is BoldInvaders.PlayState {
        if (this.gameStateOptions.firstEntry) {
            console.log("got to State isPlayState / it's first entry");

            return typeof (<BoldInvaders.PlayState>state).enter === 'function';

        }
        else {
            return typeof (<BoldInvaders.PlayState>state).update === 'function';


        }
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