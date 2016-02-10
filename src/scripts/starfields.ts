class StarField implements STARFIELD.Options {
    fps: number;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    minVelocity: number;
    maxVelocity: number;
    stars: Array<number>;
    intervalId: any;

    constructor(numFps: number,
        canvasElem: HTMLCanvasElement,
        numWidth: number,
        numHeight: number,
        numMinVelocity: number,
        numMaxVelocity: number,
        numStars: Array<number>,
        numIntervalId: number) {
        console.log("made it here.");
        
        this.fps = numFps;
        this.canvas = canvasElem;
        this.width = numWidth;
        this.height = numHeight;
        this.minVelocity = numMinVelocity;
        this.maxVelocity = numMaxVelocity;
        this.stars = numStars;
        this.intervalId = numIntervalId;

    }

    start() {
        //	Create the stars.
        var starAmount = [];
        for(var i=0; i < this.stars.length; i++) {
            starAmount[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
            (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
        }
        this.stars = starAmount;;

        var self = this;
        //	Start the timer.
        this.intervalId = setInterval(function() {
            self.update();
            self.draw();	
        }, 1000 / this.fps);
    }

}


export = StarField;