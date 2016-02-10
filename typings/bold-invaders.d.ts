declare module 'starfield' {
    export = STARFIELD;
}

declare namespace STARFIELD {
    function init(options: Options): void;
    function start(o: Options);
    
    
    
    export interface Options{
        fps : number;
        canvas : HTMLCanvasElement;
        width : number
        height : number
        minVelocity : number;
        maxVelocity : number;
<<<<<<< HEAD
        stars : number;
        starList: Array<Star>;
        intervalId : any;
    }
       
    export interface StarOptions {
        x: number;
        y: number;
        size: number;
        velocity: number;
=======
        stars : Array<number>;
        intervalId : number;
>>>>>>> 26a997897f5110f42a30eb7168e82c96269e6b8b
    }
    
    export class Star implements StarOptions{
        x: number;
        y: number;
        size: number;
        velocity: number;
    }
}