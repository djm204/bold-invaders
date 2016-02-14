var welcomeState = require('./welcome-state');
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
        gameCanvas.width = 700;
        gameCanvas.height = 500;
        this.stateOptions.height = gameCanvas.height;
        this.stateOptions.width = gameCanvas.width;
        this.stateOptions.gameBounds = {
            left: gameCanvas.width / 2 - this.boldOptions.gameWidth / 2,
            right: gameCanvas.width / 2 + this.boldOptions.gameWidth / 2,
            top: gameCanvas.height / 2 - this.boldOptions.gameHeight / 1.5,
            bottom: gameCanvas.height,
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
        this.moveToState(new welcomeState(this, 1000 / (this.boldOptions.fps), ctx));
        //  Set the game variables.
        this.stateOptions.lives = 3;
        this.boldOptions.debugMode = /debug=true/.test(window.location.href);
        //  Start the game loop.
        this.stateOptions.intervalId = setInterval(function () { _this.gameLoop(_this); }, 1000 / this.boldOptions.fps);
    };
    BoldInvaders.prototype.tryAgain = function () {
        this.resetGameVariables();
    };
    BoldInvaders.prototype.resetGameVariables = function () {
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
            lastPauseTime: null
        };
        this.playerOptions = {
            rocketVelocity: 120,
            rocketMaxFireRate: 2
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
        //  Set the current state.
        this.stateOptions.stateStack.pop();
    };
    BoldInvaders.prototype.gameLoop = function (game) {
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
    };
    BoldInvaders.prototype.isPlayState = function (state) {
        if (this.gameStateOptions.firstEntry) {
            console.log("got to State isPlayState / it's first entry");
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