import '../front/css/style.css';
import StarField = require('./scripts/starfields');
import BoldInvaders = require('./scripts/bold-invaders');

import StarFieldOptions = StarField.Options;
import BoldInvadersOptions = BoldInvaders.Options;

var BIOptions: BoldInvadersOptions = {gameWidth: 400, gameHeight: 400, fps: 50, lives: 3, 
    width: 0, height: 0, leftGameBounds: 0, topGameBounds:0, rightGameBounds: 0, bottomGameBounds: 0, stateStack: null, 
    pressedKeys: null, gameCanvas: null};

var SFOptions: StarFieldOptions = {fps: 30, canvas: null, width: 0, height: 0, minVelocity: 15, maxVelocity: 30, starList: null, intervalId: 0};


var starfield = new StarField(SFOptions);

var container = document.getElementById('container');
starfield.initialize(container);
starfield.start();

var boldInvaders = new BoldInvaders(BIOptions);

console.log(boldInvaders.options.fps);

