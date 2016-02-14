export = StarField;

const STAR_LIMIT = 100;

class StarField {
    constructor(public options: StarField.Options) {}

    initialize(div: HTMLElement) {
        var containerDiv = div;
        
        this.options.starList = [];

        this.options.width = window.innerWidth;
        this.options.height = window.innerHeight;

        window.addEventListener('resize', (event) => {
            //resize
            this.options.width = window.innerWidth;
            this.options.height = window.innerHeight;
            this.options.canvas.width = this.options.width;
            this.options.canvas.height = this.options.height;
            
            //redraw
            this.draw();
        });
        
        //create the canvas
        var newCanvas = document.createElement('canvas');
        div.appendChild(newCanvas);
        this.options.canvas = newCanvas;
        this.options.canvas.width = this.options.width;
        this.options.canvas.height = this.options.height;
    }

    update(): void {
        var dt = 1 / this.options.fps;
        for (var i = 0; i < STAR_LIMIT; i++) {
            var star: StarField.Star = this.options.starList[i];
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
    }

    start(): void {
        
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
        this.options.intervalId = setInterval(() => {
            this.update();
            this.draw();
        }, 1000 / this.options.fps);
    }



    draw(): void {
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
        
        
    }


}