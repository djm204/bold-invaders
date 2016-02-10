var StarField = (function () {
    function StarField(numFps, canvasElem, numWidth, numHeight, numMinVelocity, numMaxVelocity, numStars, numIntervalId) {
        console.log("made it here.");
        this.fps = numFps;
    }
    return StarField;
})();
module.exports = new StarField(30, null, 0, 0, 15, 30, 100, 0);
//# sourceMappingURL=starfields.js.map