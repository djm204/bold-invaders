var Star = require('./star');
var StarField = (function () {
    function StarField(numFps, canvasElem, width, height, minVelocity, maxVelocity, stars, intervalId) {
        this.fps = numFps;
        this.canvas = canvasElem;
        this.width = width;
        this.height = height;
        this.minVelocity = minVelocity;
        this.maxVelocity = maxVelocity;
        this.stars = stars;
        this.intervalId = intervalId;
    }
    StarField.prototype.initialize = function (div) {
        var containerDiv = div;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        window.addEventListener('resize', function resize(event) {
            //resize
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            //redraw
            this.draw();
        });
        //create the canvas
        var newCanvas = document.createElement('canvas');
        div.appendChild(newCanvas);
        this.canvas = newCanvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    };
    StarField.prototype.update = function (starList) {
        var dt = 1 / this.fps;
        for (var i = 0; i < starList.length; i++) {
            var star = starList[i];
            star.y += dt * star.velocity;
            //  If the star has moved from the bottom of the screen, spawn it at the top.
            if (star.y > this.height) {
                this.stars[i] = new Star(Math.random() * this.width, 0, Math.random() * 3 + 1, (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
            }
        }
    };
    StarField.prototype.start = function () {
        var _this = this;
        //	Create the stars.
        var starList = new Array(this.stars);
        for (var i = 0; i < this.stars; i++) {
            starList[i] = new Star(Math.random() * this.width, Math.random() * this.height, Math.random() * 3 + 1, (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
        }
        //	Start the timer.
        this.intervalId = setInterval(function () {
            _this.update(starList);
            _this.draw(starList);
        }, 1000 / this.fps);
    };
    StarField.prototype.draw = function (starList) {
        //  Get the drawing context.
        var ctx = this.canvas.getContext("2d");
        // Draw the background.
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, this.width, this.height);
        //  Draw stars.
        ctx.fillStyle = '#ffffff';
        for (var i = 0; i < this.stars; i++) {
            var star = starList[i];
            ctx.fillRect(star.x, star.y, star.size, star.size);
        }
    };
    StarField.prototype.ownThisShit = function () {
        console.log("You Are Going to OWN this shit.");
    };
    return StarField;
})();
module.exports = StarField;
//# sourceMappingURL=starfields.js.map