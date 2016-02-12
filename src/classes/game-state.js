var GameState = (function () {
    function GameState(game) {
        this.game = game;
    }
    GameState.prototype.enter = function () {
        //instantiate le ship
        this.game.gameStateOptions.ship = { x: this.game.stateOptions.width / 2, y: this.game.stateOptions.gameBounds.bottom, width: 20, height: 16 };
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
        this.game.gameStateOptions.invaders = invaders;
        this.game.gameStateOptions.invaderCurrentVelocity = this.game.enemyOptions.invaderInitialVelocity;
        this.invaderVelocity = { x: this.game.enemyOptions.invaderInitialVelocity, y: 0 };
        var invaderNextVelocity = null;
    };
    GameState.prototype.update = function () {
        if (this.game.stateOptions.pressedKeys[37]) {
            this.game.gameStateOptions.ship.x -= this.game.boldOptions.shipSpeed * 1000 / this.game.boldOptions.fps;
        }
        if (this.game.stateOptions.pressedKeys[39]) {
            this.game.gameStateOptions.ship.x += this.game.boldOptions.shipSpeed * 1000 / this.game.boldOptions.fps;
        }
        if (this.game.stateOptions.pressedKeys[32]) {
            //this.fireRocket();
            console.log("fire rocket");
        }
        //  Keep the ship in bounds.
        if (this.game.gameStateOptions.ship.x < this.game.stateOptions.gameBounds.left) {
            this.game.gameStateOptions.ship.x = this.game.stateOptions.gameBounds.left;
        }
        if (this.game.gameStateOptions.ship.x > this.game.stateOptions.gameBounds.right) {
            this.game.gameStateOptions.ship.x = this.game.stateOptions.gameBounds.right;
        }
        //Move the invaders
        var hitLeft, hitRight, hitBottom = false;
        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
            var invader = this.game.gameStateOptions.invaders[i];
            var newx = invader.x + this.invaderVelocity.x * 1000 / this.game.boldOptions.fps;
            var newy = invader.y + this.invaderVelocity.y * 1000 / this.game.boldOptions.fps;
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
            this.game.gameStateOptions.invaderCurrentDropDistance += this.invaderVelocity.y * 1000 / this.game.boldOptions.fps;
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
    };
    return GameState;
})();
//# sourceMappingURL=game-state.js.map