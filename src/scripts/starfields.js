var StarField = (function () {
    function StarField(numFps, canvasElem, numWidth, numHeight, numMinVelocity, numMaxVelocity, numStars, numIntervalId) {
        console.log("made it here.");
        this.fps = numFps;
        this.canvas = canvasElem;
        this.width = numWidth;
        this.height = numHeight;
        this.minVelocity = numMinVelocity;
        this.maxVelocity = numMaxVelocity;
        this.stars = numStars;
        this.intervalId = numIntervalId;
    }
    return StarField;
})();
module.exports = StarField;
//# sourceMappingURL=starfields.js.map