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
        stars : number;
        starList: Array<Star>;
        intervalId : any;
    }
       
    export interface StarOptions {
        x: number;
        y: number;
        size: number;
        velocity: number;
    }
    
    export class Star implements StarOptions{
        x: number;
        y: number;
        size: number;
        velocity: number;
    }
}