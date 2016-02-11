class BoldInvaders implements BoldInvaders.Options {
    gameWidth: number;
    gameHeight: number;
    fps: number

    lives: number;
    width: number;
    height: number;
    leftGameBounds: number; topGameBounds: number; rightGameBounds: number; bottomGameBounds: number;
    stateStack: Array<any>;
    pressedKeys: Array<number>;
    gameCanvas: HTMLCanvasElement;

    constructor(gameWidth: number,
        gameHeight: number,
        fps: number,
        lives: number,
        width: number,
        height: number,
        leftGameBounds: number,
        topGameBounds: number,
        rightGameBounds: number,
        bottomGameBounds: number,
        stateStack: Array<any>,
        pressedKeys: Array<any>,
        gameCanvas: HTMLCanvasElement) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.fps = fps;
            this.lives = lives;
            this.width = width;
            this.height = height;
            this.leftGameBounds = leftGameBounds;
            this.rightGameBounds = rightGameBounds;
            this.topGameBounds = topGameBounds;
            this.bottomGameBounds = bottomGameBounds;
            this.stateStack = stateStack;
            this.pressedKeys = pressedKeys;
            this.gameCanvas = gameCanvas;
    }



    initialize(gameCanvas) {

        this.height = gameCanvas.height;
        this.width = gameCanvas.width;

        this.leftGameBounds = gameCanvas.width / 2 - this.gameWidth;
        this.rightGameBounds = gameCanvas.width / 2 - this.gameWidth;
        this.topGameBounds = gameCanvas.height / 2 - this.gameHeight;
        this.bottomGameBounds = gameCanvas.height / 2 - this.gameHeight;

    }

    currentState() {
        return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
    }

    moveToState(state) {
       /* if (this.currentState()) {
            
            if(this.currentState().leave){
                this.currentState().leave(game);
            }
            
            this.stateStack.pop();
        }*/
    }

}





export = BoldInvaders;