var STAR_LIMIT = 100;
var StarField = (function () {
    function StarField(options) {
        this.options = options;
    }
    StarField.prototype.initialize = function (div) {
        var _this = this;
        var containerDiv = div;
        this.options.starList = [];
        this.options.width = window.innerWidth;
        this.options.height = window.innerHeight;
        window.addEventListener('resize', function (event) {
            //resize
            _this.options.width = window.innerWidth;
            _this.options.height = window.innerHeight;
            _this.options.canvas.width = _this.options.width;
            _this.options.canvas.height = _this.options.height;
            //redraw
            _this.draw();
        });
        //create the canvas
        var newCanvas = document.createElement('canvas');
        div.appendChild(newCanvas);
        this.options.canvas = newCanvas;
        this.options.canvas.width = this.options.width;
        this.options.canvas.height = this.options.height;
    };
    StarField.prototype.update = function () {
        var dt = 1 / this.options.fps;
        for (var i = 0; i < STAR_LIMIT; i++) {
            var star = this.options.starList[i];
            star.y += dt * star.velocity;
            //  If the star has moved from the bottom of the screen, spawn it at the top.
            if (star.y > this.options.height) {
                var newStar = {
                    x: Math.random() * this.options.width,
                    y: 0,
                    size: Math.random() * 3 + 1,
                    velocity: (Math.random() * (this.options.maxVelocity - this.options.minVelocity)) + this.options.minVelocity
                };
                this.options.starList[i] = newStar;
            }
        }
    };
    StarField.prototype.start = function () {
        var _this = this;
        //	Create the stars.
        for (var i = 0; i < STAR_LIMIT; i++) {
            var newStar = {
                x: Math.random() * this.options.width,
                y: Math.random() * this.options.height,
                size: Math.random() * 3 + 1,
                velocity: (Math.random() * (this.options.maxVelocity - this.options.minVelocity)) + this.options.minVelocity
            };
            this.options.starList.push(newStar);
        }
        //	Start the timer.
        this.options.intervalId = setInterval(function () {
            _this.update();
            _this.draw();
        }, 1000 / this.options.fps);
    };
    StarField.prototype.draw = function () {
        //  Get the drawing context.
        var ctx = this.options.canvas.getContext("2d");
        // Draw the background.
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, this.options.width, this.options.height);
        //  Draw stars.
        ctx.fillStyle = '#ffffff';
        for (var i = 0; i < this.options.starList.length; i++) {
            var star = this.options.starList[i];
            ctx.fillRect(star.x, star.y, star.size, star.size);
        }
    };
    return StarField;
})();
module.exports = StarField;
//# sourceMappingURL=starfields.js.map