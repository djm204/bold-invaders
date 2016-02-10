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
    StarField.prototype.start = function () {
        /*  //	Create the stars.
          var starAmount = [];
          for(var i=0; i < this.stars.length; i++) {
              starAmount[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
              (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
          }
          this.stars = starAmount;
  
          var self = this;
          //	Start the timer.
          this.intervalId = setInterval(function() {
              self.update();
              self.draw();
          }, 1000 / this.fps);*/
    };
    StarField.prototype.draw = function () {
    };
    StarField.prototype.update = function () {
    };
    StarField.prototype.ownThisShit = function () {
        console.log("You Are Going to OWN this shit.");
    };
    return StarField;
})();
module.exports = StarField;
//# sourceMappingURL=starfields.js.map