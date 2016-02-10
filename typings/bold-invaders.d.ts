declare module 'starfield' {
    export = STARFIELD;
}

declare namespace STARFIELD {
    function init(options: Options): void;
    
    
    interface Options{
        fps : number;
        canvas : HTMLCanvasElement;
        width : number
        height : number
        minVelocity : number;
        maxVelocity : number;
        stars : number;
        intervalId : number;
    }
    
}