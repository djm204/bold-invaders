import boldInvaders = require('./bold-invaders');
export = PauseState;
class PauseState {

    constructor(public game: boldInvaders, public dt: number, public ctx: CanvasRenderingContext2D) { }

    keyDown(keyCode: number) {
        if (keyCode == 27) {
            //  Pop the pause state.
            this.game.popState();
        }
    };

    draw(){
        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);

        this.ctx.font="14px Arial";
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textBaseline="middle";
        this.ctx.textAlign="center";
        this.ctx.fillText("Paused", this.game.stateOptions.width / 2, this.game.stateOptions.height/2);
    }
}