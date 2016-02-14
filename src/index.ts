import '../front/css/style.css';
import StarField = require('./classes/starfields');
import BoldInvaders = require('./classes/bold-invaders');

import StarFieldOptions = StarField.Options;
import BoldInvadersOptions = BoldInvaders.GameOptions;
import StateOptions = BoldInvaders.StateOptions;
import PlayerOptions = BoldInvaders.Player;
import EnemyOptions = BoldInvaders.Enemy;
import PlayStateOptions = BoldInvaders.GameStateOptions;

const GAME_KEYS = [37, 39, 32];


//Starfield 
var SFOptions: StarFieldOptions = {
    fps: 50,
    canvas: null,
    width: 0,
    height: 0,
    minVelocity: 15,
    maxVelocity: 30,
    starList: [],
    intervalId: 0
};

var starfield = new StarField(SFOptions);

var container = document.getElementById('container');
starfield.initialize(container);
starfield.start();


//Bold Invaders 
var BIOptions: BoldInvadersOptions = {
    gameWidth: 400,
    gameHeight: 300,
    fps: 50,
    shipSpeed: 120,
    debugMode: true,
    levelDifficultyMultiplier: .2
};

var BIStateOptions: StateOptions = {
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
    sounds: [],
    lastPauseTime: null
}

var BIPlayerOptions: PlayerOptions = {
    rocketVelocity: 120,
    rocketMaxFireRate: 2
}

var BIEnemyOptions: EnemyOptions = {
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

var BIPlayStateOptions: PlayStateOptions = {
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

var canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");

var boldInvaders = new BoldInvaders(
    BIOptions, 
    BIPlayerOptions, 
    BIEnemyOptions, 
    BIPlayStateOptions, 
    BIStateOptions
    );

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

