var PlayState = (function () {
    function PlayState(game) {
        this.game = game;
    }
    PlayState.prototype.enter = function () {
        //instantiate le ship
        this.game.playStateOptions.ship = { x: this.game.stateOptions.width / 2, y: this.game.stateOptions.gameBounds.bottom, width: 20, height: 16 };
        //create level multipliers
        var levelMultiplier = this.game.stateOptions.level * this.game.boldOptions.levelDifficultyMultiplier;
        var shipSpeed = this.game.boldOptions.shipSpeed;
        this.game.enemyOptions.invaderInitialVelocity = 25 + (levelMultiplier * 25);
        this.game.enemyOptions.bombRate = 0.05 + (levelMultiplier * 0.05);
        this.game.enemyOptions.bombMinVelocity = 50 + (levelMultiplier * 50);
        this.game.enemyOptions.bombMaxVelocity = 60 + (levelMultiplier * 60);
        //invader creation
        this.game.enemyOptions.invaderRanks = 5;
        this.game.enemyOptions.invaderFiles = 10;
        var invaders = [];
        for (var rank = 0; rank < this.game.enemyOptions.invaderRanks; rank++) {
            for (var file = 0; file < this.game.enemyOptions.invaderFiles; file++) {
                var invader = { x: (this.game.stateOptions.width / 2) + ((this.game.enemyOptions.invaderFiles / 2 - file) * 200 / this.game.enemyOptions.invaderFiles),
                    y: (this.game.stateOptions.gameBounds.top + rank * 20), rank: rank, file: file, type: 'Invader', width: 18, height: 14 };
                invaders.push(invader);
            }
        }
        this.game.playStateOptions.invaders = invaders;
        this.game.playStateOptions.invaderCurrentVelocity = this.game.enemyOptions.invaderInitialVelocity;
        var invaderVelocity = { x: this.game.enemyOptions.invaderInitialVelocity, y: 0 };
        var invaderNextVelocity = null;
    };
    PlayState.prototype.update = function () {
        if (this.game.stateOptions.pressedKeys[37]) {
            this.game.playStateOptions.ship.x -= this.game.boldOptions.shipSpeed * 1000 / this.game.boldOptions.fps;
        }
        if (this.game.stateOptions.pressedKeys[39]) {
            this.game.playStateOptions.ship.x += this.game.boldOptions.shipSpeed * 1000 / this.game.boldOptions.fps;
        }
        if (this.game.stateOptions.pressedKeys[32]) {
            //this.fireRocket();
            console.log("fire rocket");
        }
        //  Keep the ship in bounds.
        if (this.game.playStateOptions.ship.x < this.game.stateOptions.gameBounds.left) {
            this.game.playStateOptions.ship.x = this.game.stateOptions.gameBounds.left;
        }
        if (this.game.playStateOptions.ship.x > this.game.stateOptions.gameBounds.right) {
            this.game.playStateOptions.ship.x = this.game.stateOptions.gameBounds.right;
        }
    };
    return PlayState;
})();
//# sourceMappingURL=play-state.js.map