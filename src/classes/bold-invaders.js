var welcomeState = require('./welcome-state');
var GAME_CANVAS_HEIGHT = 600;
var GAME_CANVAS_WIDTH = 700;
var BoldInvaders = (function () {
    function BoldInvaders(boldOptions, playerOptions, enemyOptions, gameStateOptions, stateOptions) {
        this.boldOptions = boldOptions;
        this.playerOptions = playerOptions;
        this.enemyOptions = enemyOptions;
        this.gameStateOptions = gameStateOptions;
        this.stateOptions = stateOptions;
    }
    BoldInvaders.prototype.initialize = function (gameCanvas) {
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
    };
    BoldInvaders.prototype.moveToState = function (state) {
        if (this.currentState()) {
            this.stateOptions.stateStack.pop();
        }
        this.chooseStateFunction(state);
        //  Set the current state.
        this.stateOptions.stateStack.pop();
        this.stateOptions.stateStack.push(state);
    };
    BoldInvaders.prototype.start = function () {
        var _this = this;
        var canvas = this.stateOptions.gameCanvas;
        var ctx = canvas.getContext("2d");
        //  Move into the 'welcome' state.
        this.moveToState(new welcomeState(this, ctx));
        //  Set the game variables.
        this.stateOptions.lives = 3;
        //  Start the game loop.
        this.stateOptions.intervalId = setInterval(function () { _this.gameLoop(_this); }, 1000 / this.boldOptions.fps);
    };
    BoldInvaders.prototype.resetGameVariables = function (resetAllVariables) {
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
            };
            this.playerOptions = {
                rocketVelocity: 120,
                rocketMaxFireRate: 2,
                score: this.playerOptions.score,
                timesPlayed: this.playerOptions.timesPlayed,
                win: this.playerOptions.win
            };
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
            };
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
            };
        }
        else {
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
            };
            this.playerOptions = {
                rocketVelocity: 120,
                rocketMaxFireRate: 2,
                score: 0,
                timesPlayed: 0,
                win: false
            };
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
            };
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
            };
        }
    };
    BoldInvaders.prototype.currentState = function () {
        return this.stateOptions.stateStack.length > 0 ? this.stateOptions.stateStack[this.stateOptions.stateStack.length - 1] : null;
    };
    BoldInvaders.prototype.pushState = function (state) {
        //  If there's an enter function for the new state, call it.
        this.chooseStateFunction(state);
        //  Set the current state.
        this.stateOptions.stateStack.push(state);
    };
    BoldInvaders.prototype.popState = function () {
        if (this.currentState().leave) {
            this.currentState().leave(this);
        }
    };
    BoldInvaders.prototype.gameLoop = function (game) {
        var currentState = game.currentState();
        if (currentState) {
            if (currentState.draw) {
                currentState.draw();
            }
            if (currentState.update) {
                currentState.update();
            }
        }
    };
    BoldInvaders.prototype.keyDown = function (keyCode) {
        this.stateOptions.pressedKeys[keyCode] = true;
        //  Delegate to the current state too.
        if (this.currentState() && this.currentState().keyDown) {
            this.currentState().keyDown(this, keyCode);
        }
    };
    BoldInvaders.prototype.keyUp = function (keyCode) {
        delete this.stateOptions.pressedKeys[keyCode];
        //  Delegate to the current state too.
        if (this.currentState() && this.currentState().keyUp) {
            this.currentState().keyUp(this, keyCode);
        }
    };
    BoldInvaders.prototype.chooseStateFunction = function (state) {
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
    };
    BoldInvaders.prototype.isPlayState = function (state) {
        if (this.gameStateOptions.firstEntry) {
            return typeof state.enter === 'function';
        }
        else {
            return typeof state.update === 'function';
        }
    };
    BoldInvaders.prototype.isOverState = function (state) {
        return typeof state.leave === 'function';
    };
    BoldInvaders.prototype.isIntroState = function (state) {
        return typeof state.update === 'function';
    };
    BoldInvaders.prototype.isWelcomeState = function (state) {
        return typeof state.draw === 'function';
    };
    return BoldInvaders;
})();
module.exports = BoldInvaders;
//# sourceMappingURL=bold-invaders.js.map