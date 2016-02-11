declare namespace StarField {

    export interface Options {
        fps: number;
        canvas: HTMLCanvasElement;
        width: number
        height: number
        minVelocity: number;
        maxVelocity: number;
        starList: Array<Star>;
        intervalId: any;
    }

    export interface Star {
        x: number;
        y: number;
        size: number;
        velocity: number;
    }
}

declare namespace BoldInvaders {
    function init(options: Options): void;

    export interface Options {
        gameWidth: number,
        gameHeight: number,
        fps: number,
        lives: number,
        width: number,
        height: number,
        leftGameBounds: number,
        topGameBounds: number,
        rightGameBounds: number,
        bottomGameBounds: number,
        stateStack: Array<any>,
        pressedKeys: Array<number>,
        gameCanvas: HTMLCanvasElement
    }

}