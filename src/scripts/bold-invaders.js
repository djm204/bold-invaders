var BoldInvaders = (function () {
    function BoldInvaders(gameWidth, gameHeight, fps, lives, width, height, leftGameBounds, topGameBounds, rightGameBounds, bottomGameBounds, stateStack, pressedKeys, gameCanvas) {
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
    BoldInvaders.prototype.initialize = function (gameCanvas) {
        this.height = gameCanvas.height;
        this.width = gameCanvas.width;
        this.leftGameBounds = gameCanvas.width / 2 - this.gameWidth;
        this.rightGameBounds = gameCanvas.width / 2 - this.gameWidth;
        this.topGameBounds = gameCanvas.height / 2 - this.gameHeight;
        this.bottomGameBounds = gameCanvas.height / 2 - this.gameHeight;
    };
    BoldInvaders.prototype.currentState = function () {
        return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
    };
    BoldInvaders.prototype.moveToState = function (state) {
        /* if (this.currentState()) {
             
             if(this.currentState().leave){
                 this.currentState().leave(game);
             }
             
             this.stateStack.pop();
         }*/
    };
    return BoldInvaders;
})();
module.exports = BoldInvaders;
//# sourceMappingURL=bold-invaders.js.map