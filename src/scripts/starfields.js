var STAR_LIMIT = 100;
var StarField = (function () {
    function StarField(options) {
        this.options = options;
        this.fps = options.fps;
        this.canvas = options.canvas;
        this.width = options.width;
        this.height = options.height;
        this.minVelocity = options.minVelocity;
        this.maxVelocity = options.maxVelocity;
        this.starList = options.starList;
        this.intervalId = options.intervalId;
    }
    StarField.prototype.initialize = function (div) {
        var _this = this;
        var containerDiv = div;
        this.starList = [];
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        window.addEventListener('resize', function (event) {
            //resize
            _this.width = window.innerWidth;
            _this.height = window.innerHeight;
            _this.canvas.width = _this.width;
            _this.canvas.height = _this.height;
            //redraw
            _this.draw();
        });
        //create the canvas
        var newCanvas = document.createElement('canvas');
        div.appendChild(newCanvas);
        this.canvas = newCanvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    };
    StarField.prototype.update = function () {
        var dt = 1 / this.fps;
        for (var i = 0; i < STAR_LIMIT; i++) {
            var star = this.starList[i];
            star.y += dt * star.velocity;
            //  If the star has moved from the bottom of the screen, spawn it at the top.
            if (star.y > this.height) {
                var newStar = {
                    x: Math.random() * this.width,
                    y: 0,
                    size: Math.random() * 3 + 1,
                    velocity: (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity
                };
                this.starList.push(newStar);
            }
        }
    };
    StarField.prototype.start = function () {
        var _this = this;
        //	Create the stars.
        for (var i = 0; i < STAR_LIMIT; i++) {
            var newStar = {
                x: Math.random() * this.width,
                y: 0,
                size: Math.random() * 3 + 1,
                velocity: (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity
            };
            this.starList.push(newStar);
        }
        //	Start the timer.
        this.intervalId = setInterval(function () {
            _this.update();
            _this.draw();
        }, 1000 / this.fps);
    };
    StarField.prototype.draw = function () {
        //  Get the drawing context.
        var ctx = this.canvas.getContext("2d");
        // Draw the background.
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, this.width, this.height);
        //  Draw stars.
        ctx.fillStyle = '#ffffff';
        for (var i = 0; i < this.starList.length; i++) {
            var star = this.starList[i];
            ctx.fillRect(star.x, star.y, star.size, star.size);
        }
    };
    return StarField;
})();
module.exports = StarField;
//# sourceMappingURL=starfields.js.map