import { Font, Texture } from "../Managers/AssetManager";
import { EventManager } from "../Managers/EventManager";
import { TBUtils } from "../Trebert/TBUtils";
import BaseBitmapText from "../UI/BaseBitmapText";
import BaseImage from "../UI/BaseImage";
import BaseScene from "./BaseScene";
import GameOverScene from "./GameOverScene";
import GameScene from "./GameScene";
const maxTimer = 20000;

export default class GameUI extends BaseScene {
    /**
     * Unique name of the scene.
     */
    public static Name = "GameUI";

    scoreText: BaseBitmapText;
    timerImage: BaseImage;
    timerPercentImage: BaseImage;
    timer: number;
    timeDeduction: number = 100;

    protected initProperty(): void {
        this.timer = maxTimer;
        this.timeDeduction = 100;
    }
    protected initGraphics(): void {
        this.scoreText = new BaseBitmapText(this, TBUtils.config.world.centerX, 60, { font: Font.kenney_pixel })
        this.scoreText.setOrigin(0.5);
        this.scoreText.setText("0");
        this.scoreText.setFontSize(64);

        this.timerImage = new BaseImage(this, TBUtils.config.world.centerX, 25, { texture: Texture.slider_empty }).setOrigin(.5).setScale(.19);
        this.timerPercentImage = new BaseImage(this, this.timerImage.x, this.timerImage.y, { texture: Texture.slider_empty }).setOrigin(.5).setScale(.19).setTint(0x38761d);
        this.timerPercentImage.setCrop(0, 0, this.timerPercentImage.width, this.timerPercentImage.height);
        this.timerPercentImage.angle = 180;
    }
    protected initListeners(): void {
        super.initListeners();

        EventManager.SCORE_UPDATE.addListener((value: any) => {
            if (value as number) {
                this.scoreText.setText(value.toString());
                this.timer += 2000;
                this.timer = Phaser.Math.Clamp(this.timer, 0, maxTimer);

                if (value % 5 == 0) {
                    this.timeDeduction += 20;
                    this.timeDeduction = Phaser.Math.Clamp(this.timeDeduction, 100, 300);
                }
            }
            else {
                this.timer -= 1000;
                this.timer = Phaser.Math.Clamp(this.timer, 0, maxTimer);
            }
        }, this);
        EventManager.START.addListener(() => {
            this.timerPercentImage.setVisible(true);
            this.timerImage.setVisible(true);

            this.time.addEvent({
                delay: 100,
                repeat: -1,
                callback: () => {
                    this.timer -= this.timeDeduction;
                    this.timer = Phaser.Math.Clamp(this.timer, 0, maxTimer);

                    let percent = this.timer / maxTimer;
                    var width = this.timerPercentImage.width * (1 - percent) + 1;
                    this.timerPercentImage.setCrop(width, 0, this.timerPercentImage.width, this.timerPercentImage.height);

                    if (this.timer <= 0) {
                        this.scene.stop(GameScene.Name);
                        this.scene.start(GameOverScene.Name);
                    }
                }
            })
        }, this);
    }
}
