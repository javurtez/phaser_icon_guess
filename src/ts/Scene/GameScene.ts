import { Texture } from "../Managers/AssetManager";
import { EventManager } from "../Managers/EventManager";
import { TBCloud } from "../Trebert/TBCloud";
import { TBUtils } from "../Trebert/TBUtils";
import BaseImage from "../UI/BaseImage";
import IconSlot from "../UI/IconSlot";
import BaseScene from "./BaseScene";
import GameUI from "./GameUI";

export default class GameScene extends BaseScene {
    /**
     * Unique name of the scene.
     */
    public static Name = "MainGame";

    guessIcons: IconSlot[];
    iconBaseName: string;
    guess: BaseImage;
    guessActiveTween: Phaser.Tweens.Tween;

    public init(): void {
        super.init();
    }
    public create(): void {
        this.scene.launch(GameUI.Name);

        super.create();
    }

    protected initProperty(): void {
        this.guessIcons = [];
        this.iconBaseName = "GuttyKreum_JapanCollection_Icons_0";
        TBCloud.setValue("score", 0);
    }
    protected initGraphics(): void {
        let spacing = 54;
        let startX = TBUtils.config.world.centerX - spacing;
        let startY = TBUtils.config.world.centerY + 20;
        let indexY = 0;
        let indexX = 0;
        for (let i = 0; i < 9; i++, indexX++) {
            if (i % 3 == 0) {
                indexY++;
                indexX = 0
            }

            let icon = new IconSlot(this, startX + (indexX * spacing), startY + (indexY * spacing), { texture: Texture[this.iconBaseName + i], iconName: this.iconBaseName + i });
            icon.setScale(.8).setOrigin(.5);
            this.guessIcons.push(icon);
        }

        let panel = new BaseImage(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY - 90, { texture: Texture.panel });
        panel.setScale(4);

        this.guess = new BaseImage(this, panel.x, panel.y, { texture: Texture.GuttyKreum_JapanCollection_Icons_00 });
        this.guess.setScale(1.2);

        this.getIcon();

        this.time.delayedCall(10, () => {
            EventManager.START.emit();
        })
    }

    public getIcon(): void {
        let random = Phaser.Math.Between(0, 8);
        TBCloud.setValue("current_icon", this.iconBaseName + random);

        this.guess.setImage(Texture[this.iconBaseName + random]);
        //for reset
        this.guess.setScale(1.2);
        this.guess.clearAlpha();
        this.guess.clearTint();
        this.guess.isCropped = false;

        this.guessActiveTween?.stop();
        let randomEffects = Phaser.Math.Between(0, 7);
        switch (randomEffects) {
            case 0:
                this.guessActiveTween = this.tweens.add({
                    targets: this.guess,
                    scale: { from: .1, to: 1.2 },
                    duration: 5000
                })
                break;
            case 1:
                this.guessActiveTween = this.tweens.add({
                    targets: this.guess,
                    alpha: { from: 0, to: 1 },
                    duration: 7500
                })
                break;
            case 2:
                this.guessActiveTween = this.tweens.addCounter({
                    from: 0,
                    to: 255,
                    duration: 5000,
                    onUpdate: function (tween) {
                        const value = Math.floor(tween.getValue());

                        this.guess.setTint(Phaser.Display.Color.GetColor(value, value, value));
                    },
                    callbackScope: this
                });
                break;
            case 3:
            case 4:
                this.guess.setAlpha(0);
                this.time.delayedCall(10, () => {
                    this.guess.clearAlpha();
                })
                this.guessActiveTween = this.tweens.addCounter({
                    from: randomEffects == 3 ? this.guess.width : 0,
                    to: randomEffects == 3 ? 0 : this.guess.width,
                    duration: 5000,
                    onUpdate: function (tween) {
                        const value = Math.floor(tween.getValue());

                        this.guess.setCrop(randomEffects == 3 ? value : 0, 0, randomEffects == 3 ? this.guess.width : value, this.guess.height);
                    },
                    callbackScope: this
                });
                break;
            case 5:
            case 6:
                this.guess.setAlpha(0);
                this.time.delayedCall(10, () => {
                    this.guess.clearAlpha();
                })
                this.guessActiveTween = this.tweens.addCounter({
                    from: randomEffects == 5 ? this.guess.height : 0,
                    to: randomEffects == 5 ? 0 : this.guess.height,
                    duration: 5000,
                    onUpdate: function (tween) {
                        const value = Math.floor(tween.getValue());

                        this.guess.setCrop(0, randomEffects == 5 ? value : 0, this.guess.width, randomEffects == 5 ? this.guess.height : value);
                    },
                    callbackScope: this
                });
                break;
            case 7:
                break;
        }
    }

    protected rescale(): void {

    }
    protected destroy(): void {
        EventManager.ON_BLUR.clear();
        EventManager.ON_FOCUS.clear();

        EventManager.ON_PAUSE.clear();
        EventManager.ON_UNPAUSE.clear();

        EventManager.CHANGE_LANGUAGE.clear();
        EventManager.SCORE_UPDATE.clear();
        EventManager.START.clear();
    }
}
