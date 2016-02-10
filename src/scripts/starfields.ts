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

    }



}


module.exports = new StarField(30, null, 0, 0, 15, 30, 100, 0);
