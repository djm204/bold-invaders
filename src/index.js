require('../front/css/style.css');
var StarField = require('./scripts/starfields');
var BoldInvaders = require('./scripts/bold-invaders');
var SFOptions = { fps: 30, canvas: null, width: 0, height: 0, minVelocity: 15, maxVelocity: 30, starList: null, intervalId: 0 };
var starfield = new StarField(SFOptions);
var container = document.getElementById('container');
starfield.initialize(container);
starfield.start();
var boldInvaders = new BoldInvaders(400, 400, 50, 3, 0, 0, 0, 0, 0, 0, [], [], null);
console.log(boldInvaders.fps);
//# sourceMappingURL=index.js.map