require('../front/css/style.css');
var StarField = require('./classes/starfields');
var BoldInvaders = require('./classes/bold-invaders');
//Starfield 
var SFOptions = { fps: 30, canvas: null, width: 0, height: 0, minVelocity: 15, maxVelocity: 30, starList: null, intervalId: 0 };
var starfield = new StarField(SFOptions);
var container = document.getElementById('container');
starfield.initialize(container);
starfield.start();
//Bold Invaders 
var BIOptions = {
    gameWidth: 0,
    gameHeight: 0,
    fps: 50,
    shipSpeed: 120,
    debugMode: false,
    levelDifficultyMultiplier: 0.2
};
var BIStateOptions = {
    lives: 3,
    width: 500,
    height: 500,
    gameBounds: { left: 0, top: 0, right: 0, bottom: 0 },
    intervalId: 0,
    score: 0,
    level: 1,
    stateStack: [],
    pressedKeys: [],
    gameCanvas: null,
    sounds: []
};
var canvas = document.getElementById("gameCanvas");
var boldInvaders = new BoldInvaders(BIOptions, BIStateOptions);
boldInvaders.initialize(canvas);
boldInvaders.start();
window.addEventListener("keydown", function keydown(e) {
    var keycode = e.which || e.keyCode;
    //  Supress further processing of left/right/space (37/29/32)
    if (keycode == 37 || keycode == 39 || keycode == 32) {
        e.preventDefault();
    }
    boldInvaders.keyDown(keycode);
});
window.addEventListener("keyup", function keydown(e) {
    var keycode = e.which || e.keyCode;
    boldInvaders.keyUp(keycode);
});
console.log(boldInvaders.boldOptions.fps);
//# sourceMappingURL=index.js.map