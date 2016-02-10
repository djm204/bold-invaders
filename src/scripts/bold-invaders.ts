class BoldInvaders implements BOLDINVADERS.Options {
    config: {
        gameWidth: number,
        gameHeight: number,
        fps: number
    };
    lives: number;
    width: number;
    height: number;
    gameBounds: any;
    stateStack: Array<any>;
    pressedKeys: Array<number>;
    gameCanvas: HTMLCanvasElement;

    constructor(gameWidth: number, 
        gameHeight: number, 
        fps: number,
        lives: number,
        width: number,
        height: number,
        gameBounds: any,
        stateStack: Array<any>,
        pressedKeys: Array<any>,
        gameCanvas: HTMLCanvasElement) {
            this.config.gameWidth = gameWidth;
            this.config.gameHeight = gameHeight;
            this.config.fps = fps;
            this.lives = lives;
            this.width = width;
            this.height = height;
            this.gameBounds = gameBounds;
            this.stateStack = stateStack;
            this.pressedKeys = pressedKeys;
            this.gameCanvas = gameCanvas;
    }
    
    currentState() {
        return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
    }

}


    


export = BoldInvaders;