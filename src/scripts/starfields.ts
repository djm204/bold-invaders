var starfield = STARFIELD;

var starfieldOptions: STARFIELD.Options ={
    canvas : null,
    fps : 30,
    width : 0,
    height : 0,
    minVelocity : 15,
    maxVelocity : 30,
    stars : 100,
    intervalId : 0
}




starfield.init(starfieldOptions);


console.log(starfield);