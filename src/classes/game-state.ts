import boldInvaders = require('./bold-invaders');
export = GameState;
class GameState {
    constructor(public game: boldInvaders) {

    }
    
    invaderVelocity: {x: number, y: number};
    invaderNextVelocity: {x: number, y: number};
    currentBomb: BoldInvaders.Bomb;
    currentRocket: BoldInvaders.Rocket;  
    dt: number = 1000 / this.game.boldOptions.fps;
    
    

    enter() {
        
        //instantiate le ship
        this.game.gameStateOptions.ship = { x: this.game.stateOptions.width / 2, y: this.game.stateOptions.height, width: 20, height: 16 };
        
        //create level multipliers
        var levelMultiplier: number = this.game.stateOptions.level * this.game.boldOptions.levelDifficultyMultiplier;
        var shipSpeed: number = this.game.boldOptions.shipSpeed;
        this.game.enemyOptions.invaderInitialVelocity = 25 + (levelMultiplier * 25);
        this.game.enemyOptions.bombRate = 0.05 + (levelMultiplier * 0.05);
        this.game.enemyOptions.bombMinVelocity = 50 + (levelMultiplier * 50);
        this.game.enemyOptions.bombMaxVelocity = 60 + (levelMultiplier * 60);
        
        //invader creation
        this.game.enemyOptions.invaderRanks = 5;
        this.game.enemyOptions.invaderFiles = 10;
        var invaders: Array<BoldInvaders.Invader> = [];
        for (var rank = 0; rank < this.game.enemyOptions.invaderRanks; rank++) {
            
            for (var file = 0; file < this.game.enemyOptions.invaderFiles; file++) {
                
                var invader: BoldInvaders.Invader = {x: (this.game.stateOptions.width / 2) + ((this.game.enemyOptions.invaderFiles / 2 - file) * 200 / this.game.enemyOptions.invaderFiles),
                    y: (this.game.stateOptions.gameBounds.top + rank * 20), rank: rank, file: file, type: 'Invader', width: 18, height: 14 };
                    
                invaders.push(invader);
            }
        }
        
        this.game.gameStateOptions.invaders = invaders;
        this.game.gameStateOptions.invaderCurrentVelocity = this.game.enemyOptions.invaderInitialVelocity;
        this.invaderVelocity = {x: this.game.enemyOptions.invaderInitialVelocity, y:0};
        var invaderNextVelocity = null;
        this.draw();

    }
    
    update(){
        if(this.game.stateOptions.pressedKeys[37]) {
            this.game.gameStateOptions.ship.x -= this.game.boldOptions.shipSpeed / this.dt;
        }
        if (this.game.stateOptions.pressedKeys[39]) {
            this.game.gameStateOptions.ship.x += this.game.boldOptions.shipSpeed / this.dt;
        }
        if (this.game.stateOptions.pressedKeys[32]) {
            this.fireRocket();
            console.log("fire rocket");
        }
 
        //  Keep the ship in bounds.
        if (this.game.gameStateOptions.ship.x < this.game.stateOptions.gameBounds.left) {
            this.game.gameStateOptions.ship.x = this.game.stateOptions.gameBounds.left;
        }
        if (this.game.gameStateOptions.ship.x > this.game.stateOptions.gameBounds.right) {
            this.game.gameStateOptions.ship.x = this.game.stateOptions.gameBounds.right;
        }
        
        
        this.moveInvaders();
        this.checkForInvaderKills();
        this.dropBombsOnEm();
        this.hitShipCheck();
        
        //  Check for failure
        if (this.game.stateOptions.lives <= 0) {
            //this.game.moveToState(new GameOverState());
            console.log("Game Over.");
        }
 
        //  Check for victory
        if (this.game.gameStateOptions.invaders.length === 0) {
            this.game.stateOptions.score += this.game.stateOptions.level * 50;
            this.game.stateOptions.level += 1;
            //this.game.moveToState(new LevelIntroState(game.level));
            console.log("Next Level");
        } 
        
        this.draw();
    }
    
    draw(): void {
        //  Clear the background.
        var ctx = this.game.stateOptions.gameCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);

        //  Draw ship.
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.game.gameStateOptions.ship.x - (
            this.game.gameStateOptions.ship.width / 2),
            this.game.gameStateOptions.ship.y - (this.game.gameStateOptions.ship.height / 2),
            this.game.gameStateOptions.ship.width,
            this.game.gameStateOptions.ship.height
        );

        //  Draw invaders.
        ctx.fillStyle = '#006600';
        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
            var invader = this.game.gameStateOptions.invaders[i];
            ctx.fillRect(invader.x - invader.width / 2, invader.y - invader.height / 2, invader.width, invader.height);
        }

        //  Draw bombs.
        ctx.fillStyle = '#ff5555';
        for (var i = 0; i < this.game.gameStateOptions.bombs.length; i++) {
            var bomb = this.game.gameStateOptions.bombs[i];
            ctx.fillRect(bomb.x - 2, bomb.y - 2, 4, 4);
        }

        //  Draw rockets.
        ctx.fillStyle = '#ff0000';
        for (var i = 0; i < this.game.gameStateOptions.rockets.length; i++) {
            var rocket = this.game.gameStateOptions.rockets[i];
            ctx.fillRect(rocket.x, rocket.y - 2, 1, 4);
        }
    }
    
    moveInvaders(): void {
        //Move the invaders
        var hitLeft, hitRight, hitBottom = false;
        
        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
            var invader = this.game.gameStateOptions.invaders[i];
            var newx = invader.x + this.invaderVelocity.x * this.dt;
            var newy = invader.y + this.invaderVelocity.y * this.dt;
            if (hitLeft === false && newx < this.game.stateOptions.gameBounds.left) {
                hitLeft = true;
            }
            else if (hitRight === false && newx > this.game.stateOptions.gameBounds.right) {
                hitRight = true;
            }
            else if (hitBottom === false && newy > this.game.stateOptions.gameBounds.bottom) {
                hitBottom = true;
            }

            if (!hitLeft && !hitRight && !hitBottom) {
                invader.x = newx;
                invader.y = newy;
            }
        }
 
        //  Update invader velocities.
        if (this.game.gameStateOptions.invadersAreDropping) {
            this.game.gameStateOptions.invaderCurrentDropDistance += this.invaderVelocity.y * this.dt;
            if (this.game.gameStateOptions.invaderCurrentDropDistance >= this.game.enemyOptions.invaderDropDistance) {
                this.game.gameStateOptions.invadersAreDropping = false;
                this.invaderVelocity = this.invaderNextVelocity;
                this.game.gameStateOptions.invaderCurrentDropDistance = 0;
            }
        }
        //  If we've hit the left, move down then right.
        if (hitLeft) {
            this.game.gameStateOptions.invaderCurrentVelocity += this.game.enemyOptions.invaderAcceleration;
            this.invaderVelocity = { x: 0, y: this.game.gameStateOptions.invaderCurrentVelocity };
            this.game.gameStateOptions.invadersAreDropping = true;
            this.invaderNextVelocity = { x: this.game.gameStateOptions.invaderCurrentVelocity, y: 0 };
        }
        //  If we've hit the right, move down then left.
        if (hitRight) {
            this.game.gameStateOptions.invaderCurrentVelocity += this.game.enemyOptions.invaderAcceleration;
            this.invaderVelocity = { x: 0, y: this.game.gameStateOptions.invaderCurrentVelocity };
            this.game.gameStateOptions.invadersAreDropping = true;
            this.invaderNextVelocity = { x: -this.game.gameStateOptions.invaderCurrentVelocity, y: 0 };
        }
        //  If we've hit the bottom, it's game over.
        if (hitBottom) {
            this.game.stateOptions.lives = 0;
        }
    }
    
    checkForInvaderKills(): void {
        //  Check for rocket/invader collisions.
        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
            var invader = this.game.gameStateOptions.invaders[i];
            var bang = false;

            for (var j = 0; j < this.game.gameStateOptions.rockets.length; j++) {
                var rocket = this.game.gameStateOptions.rockets[j];

                if (rocket.x >= (invader.x - invader.width / 2) && rocket.x <= (invader.x + invader.width / 2) &&
                    rocket.y >= (invader.y - invader.height / 2) && rocket.y <= (invader.y + invader.height / 2)) {
                
                    //  Remove the rocket, set 'bang' so we don't process
                    //  this rocket again.
                    this.game.gameStateOptions.rockets.splice(j--, 1);
                    bang = true;
                    this.game.stateOptions.score += this.game.enemyOptions.pointsPerInvader;
                    break;
                }
            }
            if (bang) {
                this.game.gameStateOptions.invaders.splice(i--, 1);
            }
        }
    }
    
    dropBombsOnEm(): void {
        //  Find all of the front rank invaders.
        var frontRankInvaders: Array<BoldInvaders.Invader> = [];
        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
            var invader = this.game.gameStateOptions.invaders[i];
            //  If we have no invader for game file, or the invader
            //  for game file is futher behind, set the front
            //  rank invader to game one.
            if (!frontRankInvaders[invader.file] || frontRankInvaders[invader.file].rank < invader.rank) {
                frontRankInvaders[invader.file] = invader;
            }
        }
    
        //  Give each front rank invader a chance to drop a bomb.
        for (var i = 0; i < this.game.enemyOptions.invaderFiles; i++) {
            var invader: BoldInvaders.Invader = frontRankInvaders[i];
            if (!invader) continue;
            var chance = this.game.enemyOptions.bombRate * this.dt;
            if (chance > Math.random()) {
                //  Fire!
                this.game.gameStateOptions.bombs.push(this.currentBomb = {
                    x: invader.x, 
                    y: invader.y + invader.height / 2,
                    velocity: this.game.enemyOptions.bombMinVelocity + Math.random() * (this.game.enemyOptions.bombMaxVelocity - this.game.enemyOptions.bombMinVelocity)
                });
            }
        } 
    }
    
    hitShipCheck(): void {
        //  Check for bomb/ship collisions.
        for (var i = 0; i < this.game.gameStateOptions.bombs.length; i++) {
            var bomb = this.game.gameStateOptions.bombs[i];
            if (this.hitShip(bomb)) {
                this.game.gameStateOptions.bombs.splice(i--, 1);
                this.game.stateOptions.lives--;
            }

        }
        
        //  Check for invader/ship collisions.
        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
            var invader = this.game.gameStateOptions.invaders[i];
            if ((invader.x + invader.width / 2) > (this.game.gameStateOptions.ship.x - this.game.gameStateOptions.ship.width / 2) &&
                (invader.x - invader.width / 2) < (this.game.gameStateOptions.ship.x + this.game.gameStateOptions.ship.width / 2) &&
                (invader.y + invader.height / 2) > (this.game.gameStateOptions.ship.y - this.game.gameStateOptions.ship.height / 2) &&
                (invader.y - invader.height / 2) < (this.game.gameStateOptions.ship.y + this.game.gameStateOptions.ship.height / 2)) {
                //  Dead by collision!
                this.game.stateOptions.lives = 0;
                console.log("Play Death Sound Here");
                //game.sounds.playSound('explosion');
            }
        }
    }
    
    hitShip(bomb: BoldInvaders.Bomb): boolean {
        if (bomb.x >= (this.game.gameStateOptions.ship.x - this.game.gameStateOptions.ship.width / 2) &&
            bomb.x <= (this.game.gameStateOptions.ship.x + this.game.gameStateOptions.ship.width / 2) &&
            bomb.y >= (this.game.gameStateOptions.ship.y - this.game.gameStateOptions.ship.height / 2) &&
            bomb.y <= (this.game.gameStateOptions.ship.y + this.game.gameStateOptions.ship.height / 2)) {
            return true;
        }
        return false;
    }
    
    fireRocket(): void {
        //  If we have no last rocket time, or the last rocket time 
        //  is older than the max rocket rate, we can fire.
        if (this.game.gameStateOptions.lastRocketTime === null || ((new Date()).valueOf() - this.game.gameStateOptions.lastRocketTime) > (1000 / this.game.playerOptions.rocketMaxFireRate)) {   
            //  Add a rocket.
            this.game.gameStateOptions.rockets.push( this.currentRocket = {
                x: this.game.gameStateOptions.ship.x + 12, 
                y: this.game.gameStateOptions.ship.y - 12, 
                velocity: this.game.playerOptions.rocketVelocity
            });
            this.game.gameStateOptions.lastRocketTime = (new Date()).valueOf();
        }
    }

    
}