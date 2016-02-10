var BoldInvaders = (function () {
    function BoldInvaders(gameWidth, gameHeight, fps) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.fps = fps;
    }
    return BoldInvaders;
})();
var State = (function () {
    function State(live, width, height, gameBounds, stateStack, pressedKeys, gameCanvas) {
        this.width = width;
        this.height = height;
        this.gameBounds = gameBounds;
        this.stateStack = stateStack;
        this.pressedKeys = pressedKeys;
        this.gameCanvas = gameCanvas;
    }
    return State;
})();
module.exports = BoldInvaders;
//# sourceMappingURL=bold-invaders.js.map