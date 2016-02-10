import '../front/css/style.css';
import StarField = require('./scripts/starfields');
import BoldInvaders = require('./scripts/bold-invaders');

var starfield = new StarField(30, null, 0, 0, 15, 30, 100, null, 0);

var container = document.getElementById('container');
starfield.initialize(container);
starfield.start();

var boldInvaders = new BoldInvaders(400, 400, 50);

console.log(boldInvaders.fps);

