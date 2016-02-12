var PlayState = (function () {
    function PlayState(game, playerOptions, enemyOptions, playStateOptions) {
    }
    PlayState.prototype.enter = function (game, playerOptions, enemyOptions, playStateOptions) {
        //instantiate le ship
        playStateOptions.ship = { x: game.stateOptions.width / 2, y: game.stateOptions.gameBounds.bottom, width: 20, height: 16 };
        //create level multipliers
        var levelMultiplier = game.stateOptions.level * game.boldOptions.levelDifficultyMultiplier;
        var shipSpeed = game.boldOptions.shipSpeed;
        enemyOptions.invaderInitialVelocity = 25 + (levelMultiplier * 25);
        enemyOptions.bombRate = 0.05 + (levelMultiplier * 0.05);
        enemyOptions.bombMinVelocity = 50 + (levelMultiplier * 50);
        enemyOptions.bombMaxVelocity = 60 + (levelMultiplier * 60);
        //invader creation
        enemyOptions.invaderRanks = 5;
        enemyOptions.invaderFiles = 10;
        var invaders = [];
        for (var rank = 0; rank < enemyOptions.invaderRanks; rank++) {
            for (var file = 0; file < enemyOptions.invaderFiles; file++) {
                var invader = { x: (game.stateOptions.width / 2) + ((enemyOptions.invaderFiles / 2 - file) * 200 / enemyOptions.invaderFiles),
                    y: (game.stateOptions.gameBounds.top + rank * 20), rank: rank, file: file, type: 'Invader', width: 18, height: 14 };
                invaders.push(invader);
            }
        }
    };
    return PlayState;
})();
//# sourceMappingURL=play-state.js.map