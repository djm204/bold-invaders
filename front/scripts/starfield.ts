import starfield = require('starfield');

var starfieldOptions: starfield.Options;

starfieldOptions.canvas = null;
starfieldOptions.fps = 30;
starfieldOptions.width = 0;
starfieldOptions.height = 0;
starfieldOptions.minVelocity = 15;
starfieldOptions.maxVelocity = 30;
starfieldOptions.stars = 100;
starfieldOptions.intervalId = 0;


starfield.init(starfieldOptions);