var pauseState = require('./pause-state');
var GameOverState = require('./game-over');
var PAUSE_PREVENTER = 1;
var GameState = (function () {
    function GameState(game, levelIntroState) {
        this.game = game;
        this.levelIntroState = levelIntroState;
        this.dt = 1000 / this.game.boldOptions.fps;
        this.ctx = this.game.stateOptions.gameCanvas.getContext("2d");
    }
    GameState.prototype.enter = function () {
        this.game.gameStateOptions.firstEntry = false;
        //instantiate le ship
        this.game.gameStateOptions.ship = { x: this.game.stateOptions.width / 2, y: this.game.stateOptions.height - 100, width: 20, height: 16 };
        //create level multipliers
        var levelMultiplier = this.game.stateOptions.level * this.game.boldOptions.levelDifficultyMultiplier;
        var shipSpeed = this.game.boldOptions.shipSpeed;
        this.game.enemyOptions.invaderInitialVelocity += (levelMultiplier * this.game.enemyOptions.invaderInitialVelocity);
        this.game.enemyOptions.bombRate += (levelMultiplier * this.game.enemyOptions.bombRate);
        this.game.enemyOptions.bombMinVelocity += (levelMultiplier * this.game.enemyOptions.bombMinVelocity);
        this.game.enemyOptions.bombMaxVelocity += (levelMultiplier * this.game.enemyOptions.bombMinVelocity);
        //invader creation
        this.game.enemyOptions.invaderRanks = 5;
        this.game.enemyOptions.invaderFiles = 10;
        var invaders = [];
        for (var rank = 0; rank < this.game.enemyOptions.invaderRanks; rank++) {
            for (var file = 0; file < this.game.enemyOptions.invaderFiles; file++) {
                var invader = {
                    x: (this.game.stateOptions.width / 2) + ((this.game.enemyOptions.invaderFiles / 2 - file) * 200 / this.game.enemyOptions.invaderFiles),
                    y: (this.game.stateOptions.gameBounds.top + rank * 20),
                    rank: rank,
                    file: file,
                    type: 'Invader',
                    width: 18,
                    height: 14
                };
                invaders.push(invader);
            }
        }
        this.game.gameStateOptions.invaders = invaders;
        this.game.gameStateOptions.invaderCurrentVelocity = this.game.enemyOptions.invaderInitialVelocity;
        this.invaderVelocity = { x: this.game.enemyOptions.invaderInitialVelocity, y: 0 };
        var invaderNextVelocity = null;
    };
    GameState.prototype.update = function () {
        /*var ctx = this.game.stateOptions.gameCanvas.getContext("2d");*/
        if (this.game.stateOptions.pressedKeys[37]) {
            this.game.gameStateOptions.ship.x -= this.game.boldOptions.shipSpeed / 100;
        }
        if (this.game.stateOptions.pressedKeys[39]) {
            this.game.gameStateOptions.ship.x += this.game.boldOptions.shipSpeed / 100;
        }
        if (this.game.stateOptions.pressedKeys[32]) {
            this.fireRocket();
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
        //  Check for victory
        if (this.game.gameStateOptions.invaders.length === 0) {
            this.game.stateOptions.score += this.game.stateOptions.level * 50;
            this.game.stateOptions.level += 1;
            this.game.stateOptions.countDown = 3;
            this.game.stateOptions.countDownMessage = 3;
            this.game.pushState(this.levelIntroState);
            return;
        }
        //  Check for failure
        if (this.game.stateOptions.lives <= 0) {
            this.game.moveToState(new GameOverState(this.levelIntroState, this.game, this.dt, this.ctx));
            console.log("Game Over.");
        }
        this.draw();
    };
    GameState.prototype.draw = function () {
        //  Clear the background.
        var ctx = this.game.stateOptions.gameCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeRect(this.game.stateOptions.gameBounds.left - 13, this.game.stateOptions.gameBounds.top - 20, this.game.stateOptions.gameBounds.right - 120, this.game.stateOptions.gameBounds.bottom - 30);
        //  Draw ship.
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.game.gameStateOptions.ship.x - (this.game.gameStateOptions.ship.width / 2), this.game.gameStateOptions.ship.y - (this.game.gameStateOptions.ship.height / 2), this.game.gameStateOptions.ship.width, this.game.gameStateOptions.ship.height);
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
            bomb.y += .5;
            ctx.fillRect(bomb.x, bomb.y, 4, 4);
        }
        //  Draw rockets.
        ctx.fillStyle = '#ff0000';
        for (var i = 0; i < this.game.gameStateOptions.rockets.length; i++) {
            var rocket = this.game.gameStateOptions.rockets[i];
            rocket.y -= 2;
            ctx.fillRect(rocket.x, rocket.y, 1, 4);
        }
        //check if we are in debug mode
        if (this.game.boldOptions.debugMode) {
            ctx.strokeStyle = '#ff0000';
            ctx.strokeRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
            ctx.strokeRect(this.game.stateOptions.gameBounds.left, this.game.stateOptions.gameBounds.top, this.game.stateOptions.gameBounds.right - this.game.stateOptions.gameBounds.left, this.game.stateOptions.gameBounds.bottom - this.game.stateOptions.gameBounds.top);
        }
        //draw score and lives and level
        //  Draw info.
        var textYpos = this.game.stateOptions.gameBounds.bottom + ((this.game.stateOptions.height - this.game.stateOptions.gameBounds.bottom) / 2 + 20);
        ctx.font = "14px Arial";
        ctx.fillStyle = '#ffffff';
        var info = "Lives: " + this.game.stateOptions.lives;
        ctx.textAlign = "left";
        ctx.fillText(info, this.game.stateOptions.gameBounds.left, textYpos);
        info = "Score: " + this.game.stateOptions.score + ", Level: " + this.game.stateOptions.level;
        ctx.textAlign = "right";
        ctx.fillText(info, this.game.stateOptions.gameBounds.right, textYpos);
        //draw links to github, and props
    };
    GameState.prototype.keyDown = function (game, keyCode) {
        if (this.game.stateOptions.pressedKeys[27]) {
            //  Push the pause state.
            this.pauseGame();
        }
        if (this.game.stateOptions.pressedKeys[90]) {
            //  Push the pause state.
            this.game.stateOptions.lives = 0;
        }
        if (this.game.stateOptions.pressedKeys[81]) {
            //  Push the pause state.
            this.game.gameStateOptions.invaders = [];
        }
    };
    GameState.prototype.moveInvaders = function () {
        //Move the invaders
        var hitLeft = false, hitRight = false, hitBottom = false;
        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
            var invader = this.game.gameStateOptions.invaders[i];
            var newx = invader.x + this.invaderVelocity.x * .025;
            var newy = invader.y + this.invaderVelocity.y * .025;
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
            this.game.gameStateOptions.invaderCurrentDropDistance += this.invaderVelocity.y * .025;
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
    GameState.prototype.checkForInvaderKills = function () {
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
    };
    GameState.prototype.dropBombsOnEm = function () {
        //  Find all of the front rank invaders.
        var frontRankInvaders = [];
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
            var invader = frontRankInvaders[i];
            if (!invader)
                continue;
            var chance = this.game.enemyOptions.bombRate * .015;
            if (chance > Math.random()) {
                //  Fire!
                this.game.gameStateOptions.bombs.push(this.currentBomb = {
                    x: invader.x,
                    y: invader.y + invader.height / 2,
                    velocity: this.game.enemyOptions.bombMinVelocity + Math.random() * (this.game.enemyOptions.bombMaxVelocity - this.game.enemyOptions.bombMinVelocity)
                });
            }
        }
    };
    GameState.prototype.hitShipCheck = function () {
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
            }
        }
    };
    GameState.prototype.hitShip = function (bomb) {
        if (bomb.x >= (this.game.gameStateOptions.ship.x - this.game.gameStateOptions.ship.width / 2) &&
            bomb.x <= (this.game.gameStateOptions.ship.x + this.game.gameStateOptions.ship.width / 2) &&
            bomb.y >= (this.game.gameStateOptions.ship.y - this.game.gameStateOptions.ship.height / 2) &&
            bomb.y <= (this.game.gameStateOptions.ship.y + this.game.gameStateOptions.ship.height / 2)) {
            return true;
        }
        return false;
    };
    GameState.prototype.fireRocket = function () {
        //  If we have no last rocket time, or the last rocket time 
        //  is older than the max rocket rate, we can fire.
        if (this.game.gameStateOptions.lastRocketTime === null || ((new Date()).valueOf() - this.game.gameStateOptions.lastRocketTime) > (1000 / this.game.playerOptions.rocketMaxFireRate)) {
            //  Add a rocket.
            this.game.gameStateOptions.rockets.push(this.currentRocket = {
                x: this.game.gameStateOptions.ship.x + 12,
                y: this.game.gameStateOptions.ship.y - 12,
                velocity: this.game.playerOptions.rocketVelocity
            });
            this.game.gameStateOptions.lastRocketTime = (new Date()).valueOf();
        }
    };
    GameState.prototype.pauseGame = function () {
        var ctx = this.game.stateOptions.gameCanvas.getContext("2d");
        if (this.game.stateOptions.lastPauseTime === null || ((new Date()).valueOf() - this.game.gameStateOptions.lastRocketTime) > (1000 / PAUSE_PREVENTER)) {
            this.game.stateOptions.lastPauseTime = (new Date()).valueOf();
            this.game.pushState(new pauseState(this, this.game, 1000 / this.game.boldOptions.fps, ctx));
        }
    };
    return GameState;
})();
module.exports = GameState;
//# sourceMappingURL=game-state.js.map