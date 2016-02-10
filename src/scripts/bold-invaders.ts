class BoldInvaders implements BOLDINVADERS.Options {
    gameWidth: number;
    gameHeight: number;
    fps: number;

    constructor(gameWidth: number, gameHeight: number, fps: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.fps = fps;
    }

}

class State {
    lives: number;
    width: number;
    height: number;
    gameBounds: any;
    stateStack: Array<State>;
    pressedKeys: Array<any>;
    gameCanvas: HTMLCanvasElement;
    
    constructor(live: number, 
        width: number, 
        height: number, 
        gameBounds: any, 
        stateStack: Array<State>, 
        pressedKeys: Array<any>, 
        gameCanvas: HTMLCanvasElement){
            this.width = width;
            this.height = height;
            this.gameBounds = gameBounds;
            this.stateStack = stateStack;
            this.pressedKeys = pressedKeys;
            this.gameCanvas = gameCanvas;
        
    }
}

export = BoldInvaders;