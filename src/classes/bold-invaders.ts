import levelIntroState = require('./level-intro-state');
import welcomeState = require('./welcome-state');
export = BoldInvaders;
const GAME_CANVAS_HEIGHT = 600;
const GAME_CANVAS_WIDTH = 700;

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
        gameCanvas.width = GAME_CANVAS_WIDTH;
        gameCanvas.height = GAME_CANVAS_HEIGHT;
        this.stateOptions.height = gameCanvas.height;
        this.stateOptions.width = gameCanvas.width;
        this.stateOptions.gameBounds = {
            left: gameCanvas.width / 2 - this.boldOptions.gameWidth / 2,
            right: gameCanvas.width / 2 + this.boldOptions.gameWidth / 2,
            top: gameCanvas.height / 2 - this.boldOptions.gameHeight / 1.5,
            bottom: gameCanvas.height - 100,
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
        //  Start the game loop.
        this.stateOptions.intervalId = setInterval(() => { this.gameLoop(this) }, 1000 / this.boldOptions.fps);
    }

    resetGameVariables(resetAllVariables: boolean) {
        if (!resetAllVariables) {
            //reset for level advancement
            this.boldOptions = {
                gameWidth: 400,
                gameHeight: 300,
                fps: 50,
                shipSpeed: this.boldOptions.shipSpeed,
                debugMode: this.boldOptions.debugMode,
                levelDifficultyMultiplier: .2
            };

            this.stateOptions = {
                lives: 3,
                width: this.stateOptions.width,
                height: this.stateOptions.height,
                gameBounds: {
                    left: this.stateOptions.gameBounds.left,
                    top: this.stateOptions.gameBounds.top,
                    right: this.stateOptions.gameBounds.right,
                    bottom: this.stateOptions.gameBounds.bottom
                },
                intervalId: 0,

                level: this.stateOptions.level,
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
                rocketMaxFireRate: 2,
                score: this.playerOptions.score,
                timesPlayed: this.playerOptions.timesPlayed,
                win: this.playerOptions.win
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
                ship: this.gameStateOptions.ship,
                invaders: [],
                rockets: [],
                bombs: [],
                invaderCurrentVelocity: 1,
                invaderCurrentDropDistance: 0,
                invadersAreDropping: false,
                lastRocketTime: 0,
                firstEntry: true
            }
        } else {
            // reset all variables to new game
            this.boldOptions = {
                gameWidth: 400,
                gameHeight: 300,
                fps: 50,
                shipSpeed: 220,
                debugMode: this.boldOptions.debugMode,
                levelDifficultyMultiplier: .2
            };

            this.stateOptions = {
                lives: 3,
                width: this.stateOptions.width,
                height: this.stateOptions.height,
                gameBounds: {
                    left: this.stateOptions.gameBounds.left,
                    top: this.stateOptions.gameBounds.top,
                    right: this.stateOptions.gameBounds.right,
                    bottom: this.stateOptions.gameBounds.bottom
                },
                intervalId: 0,

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
                rocketMaxFireRate: 2,
                score: 0,
                timesPlayed: 0,
                win: false
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
    }

    gameLoop(game: BoldInvaders) {
        var currentState = game.currentState();
        if (currentState) {

            if (currentState.draw) {
                currentState.draw();
            }

            if (currentState.update) {
                currentState.update();
            }
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