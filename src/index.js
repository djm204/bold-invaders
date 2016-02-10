require('../front/css/style.css');
var StarField = require('./scripts/starfields');
var BoldInvaders = require('./scripts/bold-invaders');
var starfield = new StarField(30, null, 0, 0, 15, 30, 100, null, 0);
var container = document.getElementById('container');
starfield.initialize(container);
starfield.start();
var boldInvaders = new BoldInvaders(400, 400, 50);
console.log(boldInvaders.fps);
//# sourceMappingURL=index.js.map