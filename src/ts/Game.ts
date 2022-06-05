import 'phaser';

import MenuScene from './Scene/MenuScene';
import Preloader from './Scene/Preloader';
import GameScene from './Scene/GameScene';
import SplashScreen from './Scene/SplashScreen';
import BootScene from './Scene/BootScene';
import Constants from './Constants';
import GameUI from './Scene/GameUI';
import GameOverScene from './Scene/GameOverScene';

const GameConfig: Phaser.Types.Core.GameConfig = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 256,
        height: 512,
        parent: 'content',
    },
    backgroundColor: Constants.BackgroundHex,
    type: Phaser.AUTO,
    input: {
        keyboard: true
    },
    render: {
        pixelArt: true
    },
    title: 'Icon Guess',
    version: '0.0.1',
};


export default class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);

        this.scene.add(BootScene.Name, BootScene);
        this.scene.add(Preloader.Name, Preloader);
        this.scene.add(SplashScreen.Name, SplashScreen);
        this.scene.add(MenuScene.Name, MenuScene);
        this.scene.add(GameScene.Name, GameScene);
        this.scene.add(GameUI.Name, GameUI);
        this.scene.add(GameOverScene.Name, GameOverScene);

        this.scene.start(BootScene.Name);
    }
}

var game = new Game(GameConfig);
