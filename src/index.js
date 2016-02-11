require('../front/css/style.css');
var StarField = require('./scripts/starfields');
var BoldInvaders = require('./scripts/bold-invaders');
var BIOptions = {
    gameWidth: 400,
    gameHeight: 300,
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
    stateStack: null,
    pressedKeys: null,
    gameCanvas: null,
    sounds: null
};
var SFOptions = { fps: 30, canvas: null, width: 0, height: 0, minVelocity: 15, maxVelocity: 30, starList: null, intervalId: 0 };
var starfield = new StarField(SFOptions);
var container = document.getElementById('container');
starfield.initialize(container);
starfield.start();
var boldInvaders = new BoldInvaders(BIOptions, BIStateOptions);
console.log(boldInvaders.boldOptions.fps);
//# sourceMappingURL=index.js.map