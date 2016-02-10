require('../front/css/style.css');
var StarField = require('./scripts/starfields');
var engine = new StarField(30, null, 0, 0, 15, 30, 100, 0);
var container = document.getElementById('container');
engine.initialize(container);
engine.start();
console.log(engine.ownThisShit());
//# sourceMappingURL=index.js.map