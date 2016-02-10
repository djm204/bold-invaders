class Star implements STARFIELD.Star {
    x: number;
    y: number;
    size: number;
    velocity: number;
    
    constructor(x: number, y: number, size: number, velocity: number){
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = velocity;
    }
}

export = Star;