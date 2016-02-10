class StarField implements STARFIELD.Options {
    fps: number;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    minVelocity: number;
    maxVelocity: number;
    stars: number;
    intervalId: number;

    constructor(numFps: number,
        canvasElem: HTMLCanvasElement,
        numWidth: number,
        numHeight: number,
        numMinVelocity: number,
        numMaxVelocity: number,
        numStars: number,
        numIntervalId: number) {
        
        this.fps = numFps;
        this.canvas = canvasElem;
        this.width = numWidth;
        this.height = numHeight;
        this.minVelocity = numMinVelocity;
        this.maxVelocity = numMaxVelocity;
        this.stars = numStars;
        this.intervalId = numIntervalId;

    }
    
    initialize(div) {
        var containerDiv = div;
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        window.addEventListener('resize', function resize(event){
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
    
    start() {
        
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
    }
    
    draw() {
        
    }
    
    update() {
        
    }
    
    ownThisShit() {
        console.log("You Are Going to OWN this shit.");
    }


}


export = StarField;