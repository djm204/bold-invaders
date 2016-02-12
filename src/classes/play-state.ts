import boldInvaders = require('./bold-invaders');
class PlayState {

    constructor(public game: boldInvaders,
       public playerOptions: BoldInvaders.Player,
       public enemyOptions: BoldInvaders.Enemy,
       public playStateOptions: BoldInvaders.PlayState) {

    }

    enter() {
        
        //instantiate le ship
        this.playStateOptions.ship = { x: this.game.stateOptions.width / 2, y: this.game.stateOptions.gameBounds.bottom, width: 20, height: 16 };
        
        //create level multipliers
        var levelMultiplier: number = this.game.stateOptions.level * this.game.boldOptions.levelDifficultyMultiplier;
        var shipSpeed: number = this.game.boldOptions.shipSpeed;
        this.enemyOptions.invaderInitialVelocity = 25 + (levelMultiplier * 25);
        this.enemyOptions.bombRate = 0.05 + (levelMultiplier * 0.05);
        this.enemyOptions.bombMinVelocity = 50 + (levelMultiplier * 50);
        this.enemyOptions.bombMaxVelocity = 60 + (levelMultiplier * 60);
        
        //invader creation
        this.enemyOptions.invaderRanks = 5;
        this.enemyOptions.invaderFiles = 10;
        var invaders: Array<BoldInvaders.Invader> = [];
        for (var rank = 0; rank < this.enemyOptions.invaderRanks; rank++) {
            
            for (var file = 0; file < this.enemyOptions.invaderFiles; file++) {
                
                var invader: BoldInvaders.Invader = {x: (this.game.stateOptions.width / 2) + ((this.enemyOptions.invaderFiles / 2 - file) * 200 / this.enemyOptions.invaderFiles),
                    y: (this.game.stateOptions.gameBounds.top + rank * 20), rank: rank, file: file, type: 'Invader', width: 18, height: 14 };
                    
                invaders.push(invader);
            }
        }
        
        this.playStateOptions.invaders = invaders;
        this.playStateOptions.invaderCurrentVelocity = this.enemyOptions.invaderInitialVelocity;
        var invaderVelocity = {x: this.enemyOptions.invaderInitialVelocity, y:0};
        var invaderNextVelocity = null;
        

    }
    
    update(){
        if(this.game.stateOptions.pressedKeys[37]) {
        this.playStateOptions.ship.x -= this.game.boldOptions.shipSpeed * 1000 / this.game.boldOptions.fps;
    }
    if(this.game.stateOptions.pressedKeys[39]) {
        this.playStateOptions.ship.x += this.game.boldOptions.shipSpeed * 1000 / this.game.boldOptions.fps;
    }
    if(this.game.stateOptions.pressedKeys[32]) {
        //this.fireRocket();
        console.log("fire rocket");
    }
 
    //  Keep the ship in bounds.
    if(this.playStateOptions.ship.x < this.game.stateOptions.gameBounds.left) {
        this.playStateOptions.ship.x = this.game.stateOptions.gameBounds.left;
    }
    if(this.playStateOptions.ship.x > this.game.stateOptions.gameBounds.right) {
        this.playStateOptions.ship.x = this.game.stateOptions.gameBounds.right;
    }
    }


}