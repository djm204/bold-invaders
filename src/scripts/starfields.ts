class StarField implements STARFIELD.Options {
    fps: number;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    minVelocity: number;
    maxVelocity: number;
    stars: number;
    intervalId: number;

    constructor(numFps: number,
        canvasElem: HTMLCanvasElement,
        numWidth: number,
        numHeight: number,
        numMinVelocity: number,
        numMaxVelocity: number,
        numStars: number,
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



}


export = StarField;