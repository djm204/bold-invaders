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
        rocketMaxFireRate: number,
        score: number,
        timesPlayed: number        
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
        intervalId: any,
        level: number,
        stateStack: Array<any>,
        pressedKeys: Array<boolean>,
        gameCanvas: HTMLCanvasElement,
        sounds: Array<Sounds>,
        lastPauseTime: number,
        countDown: number,
        countDownMessage: number
    }


    export interface Sounds {
        audioContext: AudioContext,
        sounds: Array<any>,
        mute: boolean
    }



    export interface GameStateOptions {
        ship: Ship,
        invaders: Array<Invader>,
        rockets: Array<Rocket>,
        bombs: Array<Bomb>,
        invaderCurrentVelocity: number,
        invaderCurrentDropDistance: number,
        invadersAreDropping: boolean,
        lastRocketTime: number,
        firstEntry: boolean
        

    }

    export interface Ship {
        x: number,
        y: number,
        width: number,
        height: number
    }
    
    export interface Rocket{
        x: number,
        y: number,
        velocity: number
    }
    
    export interface Bomb {
        x: number,
        y: number,
        velocity: number
    }
    
    export interface Invader{
        x: number,
        y: number,
        rank: number,
        file: number,
        type: any,
        width: number,
        height: number
    }
    
    interface PlayState {
        firstEntry: boolean;
        enter: () => any;
        update: () => any;
        draw: () => any;
        
    }

    interface OverState {
        leave: () => any;
        draw: () => any;
        
    }

    interface IntroState {
        
        update: () => any;
        draw: () => any;
        
    }
    
    
    interface WelcomeState {
        draw: () => any;
    }
    
    interface PauseState {
        draw: () => any;
        leave: () => any;
        
        
    }
    
    

type GameState = PlayState | OverState | IntroState | WelcomeState | PauseState;


}