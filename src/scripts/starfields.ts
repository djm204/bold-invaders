import Star = require('./star');

class StarField implements STARFIELD.Options {
    fps: number;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    minVelocity: number;
    maxVelocity: number;
    stars: number;
    intervalId: any;

    constructor(numFps: number,
        canvasElem: HTMLCanvasElement,
        width: number,
        height: number,
        minVelocity: number,
        maxVelocity: number,
        stars: number,
        intervalId: any) {

        this.fps = numFps;
        this.canvas = canvasElem;
        this.width = width;
        this.height = height;
        this.minVelocity = minVelocity;
        this.maxVelocity = maxVelocity;
        this.stars = stars;
        this.intervalId = intervalId;

    }

    initialize(div) {
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
    }
    
    update(starList): void{
        var dt = 1 / this.fps;
        for (var i = 0; i < starList.length; i++) {
            var star = starList[i];
            star.y += dt * star.velocity;
            //  If the star has moved from the bottom of the screen, spawn it at the top.
            if (star.y > this.height) {
                this.stars[i] = new Star(Math.random() * this.width, 0, Math.random() * 3 + 1,
                    (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
            }
        }
    }

    start(): void{
        
        //	Create the stars.
        var starList = new Array(this.stars);
        for (var i = 0; i < this.stars; i++) {
            starList[i] = new Star(Math.random() * this.width, Math.random() * this.height, Math.random() * 3 + 1,
                (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
        }
          
        //	Start the timer.
        this.intervalId = setInterval(() => {
            this.update(starList);
            this.draw(starList);
        }, 1000 / this.fps);
    }

    

    draw(starList): void {
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
    }



    ownThisShit() {
        console.log("You Are Going to OWN this shit.");
    }


}


export = StarField;