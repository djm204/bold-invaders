import '../front/css/style.css';
import StarField = require('./scripts/starfields');
import BoldInvaders = require('./scripts/bold-invaders');

var engine = new StarField(30, null, 0, 0, 15, 30, 100, null, 0);

var container = document.getElementById('container');
engine.initialize(container);
engine.start();

console.log(engine.ownThisShit());
