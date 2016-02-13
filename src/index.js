require('../front/css/style.css');
var StarField = require('./classes/starfields');
var BoldInvaders = require('./classes/bold-invaders');
var GAME_KEYS = [37, 39, 32];
//Starfield 
var SFOptions = {
    fps: 30,
    canvas: null,
    width: 0,
    height: 0,
    minVelocity: 15,
    maxVelocity: 30,
    starList: null,
    intervalId: 0
};
var starfield = new StarField(SFOptions);
var container = document.getElementById('container');
starfield.initialize(container);
starfield.start();
//Bold Invaders 
var BIOptions = {
    gameWidth: 400,
    gameHeight: 400,
    fps: 50,
    shipSpeed: 120,
    debugMode: false,
    levelDifficultyMultiplier: 0.2
};
var BIStateOptions = {
    lives: 3,
    width: 0,
    height: 0,
    gameBounds: { left: 0, top: 0, right: 0, bottom: 0 },
    intervalId: 0,
    score: 0,
    level: 1,
    stateStack: [],
    pressedKeys: [],
    gameCanvas: null,
    sounds: []
};
var BIPlayerOptions = {
    rocketVelocity: 120,
    rocketMaxFireRate: 2
};
var BIEnemyOptions = {
    bombRate: 0.05,
    bombMinVelocity: 50,
    bombMaxVelocity: 60,
    invaderInitialVelocity: 25,
    invaderAcceleration: 0,
    invaderDropDistance: 20,
    invaderRanks: 5,
    invaderFiles: 10,
    pointsPerInvader: 5
};
var BIPlayStateOptions = {
    ship: null,
    invaders: [],
    rockets: [],
    bombs: [],
    invaderCurrentVelocity: 0,
    invaderCurrentDropDistance: 0,
    invadersAreDropping: false,
    lastRocketTime: 0
};
var canvas = document.getElementById("gameCanvas");
var boldInvaders = new BoldInvaders(BIOptions, BIPlayerOptions, BIEnemyOptions, BIPlayStateOptions, BIStateOptions);
boldInvaders.initialize(canvas);
boldInvaders.start();
window.addEventListener("keydown", function keydown(e) {
    var keyCode = e.which || e.keyCode;
    //  Supress further processing of left/right/space (37/29/32)
    if (keyCode == 37 || keyCode == 39 || keyCode == 32) {
        e.preventDefault();
    }
    boldInvaders.keyDown(keyCode);
});
window.addEventListener("keyup", function keydown(e) {
    var keyCode = e.which || e.keyCode;
    boldInvaders.keyUp(keyCode);
});
console.log(boldInvaders.boldOptions.fps);
//# sourceMappingURL=index.js.map