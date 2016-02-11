declare namespace StarField {

    export interface Options {
        fps: number;
        canvas: HTMLCanvasElement;
        width: number
        height: number
        minVelocity: number;
        maxVelocity: number;
        starList: Array<Star>;
        intervalId: any;
    }

    export interface Star {
        x: number;
        y: number;
        size: number;
        velocity: number;
    }
}

declare namespace BoldInvaders {

    export interface GameOptions {
        
        config:{
            bombRate: number,
            bombMinVelocity: number,
            bombMaxVelocity: number,
            invaderInitialVelocity: number,
            invaderAcceleration: number,
            invaderDropDistance: number,
            rocketVelocity: number,
            rocketMaxFireRate: number
            gameWidth: number,
            gameHeight: number,
            fps: number,
            debugMode: boolean,
            invaderRanks: number,
            invaderFiles: number,
            shipSpeed: number,
            levelDifficultyMultiplier: number,
            pointsPerInvader: number
        };
       state: {
            lives : number,
            width : number,
            height : number,
            gameBounds : {left: number, top: number, right: number, bottom: number},
            intervalId : number,
            score : number,
            level : number,

            //  The state stack.
            stateStack : Array<State>,

            //  Input/output
            pressedKeys : Array<number>,
            gameCanvas :  HTMLCanvasElement,

            //  All sounds.
            sounds : Array<Sounds>,
       }
        
        
    }
    
 

}