declare namespace StarField {

    export interface Options {
        fps: number,
        canvas: HTMLCanvasElement,
        width: number
        height: number
        minVelocity: number,
        maxVelocity: number,
        starList: Array<Star>,
        intervalId: any,
    }

    export interface Star {
        x: number,
        y: number,
        size: number,
        velocity: number,
    }
}

declare namespace BoldInvaders {

    export interface GameOptions {

        gameWidth: number,
        gameHeight: number,
        fps: number,
        shipSpeed: number,
        debugMode: boolean,
        levelDifficultyMultiplier: number
    }

    export interface Player {
        rocketVelocity: number,
        rocketMaxFireRate: number
    }

    export interface Enemy {
        bombRate: number,
        bombMinVelocity: number,
        bombMaxVelocity: number,
        invaderInitialVelocity: number,
        invaderAcceleration: number,
        invaderDropDistance: number,
        invaderRanks: number,
        invaderFiles: number,
        pointsPerInvader: number
    }

    export interface StateOptions {

        lives: number,
        width: number,
        height: number,
        gameBounds: { left: number, top: number, right: number, bottom: number },
        intervalId: number,
        score: number,
        level: number,

        //  The state stack.
        stateStack: Array<any>,

        //  Input/output
        pressedKeys: Array<boolean>,
        gameCanvas: HTMLCanvasElement,

        //  All sounds.
        sounds: Array<Sounds>
    }


    export interface Sounds {
        audioContext: AudioContext,
        sounds: Array<any>,
        mute: boolean
    }

    export interface GameState {
        updateProc: Function,
        drawProc: Function,
        keyDown: Function,
        keyUp: Function,
        enter: Function,
        leave: Function
    }


}