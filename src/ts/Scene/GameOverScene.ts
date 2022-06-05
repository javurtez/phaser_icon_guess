import { Font, Texture } from "../Managers/AssetManager";
import { EventManager } from "../Managers/EventManager";
import { CLOUD, SaveManager } from "../Managers/SaveManager";
import { TBCloud } from "../Trebert/TBCloud";
import { TBUtils } from "../Trebert/TBUtils";
import BaseBitmapText from "../UI/BaseBitmapText";
import BaseImage from "../UI/BaseImage";
import BaseSlot from "../UI/BaseSlot";
import BaseScene from "./BaseScene";
import GameScene from "./GameScene";
const maxTimer = 20000;

export default class GameOverScene extends BaseScene {
    /**
     * Unique name of the scene.
     */
    public static Name = "GameOverScene";
    scoreText: BaseBitmapText;
    newText: any;

    protected initGraphics(): void {
        this.scoreText = new BaseBitmapText(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY - 70, { font: Font.kenney_pixel })
        this.scoreText.setOrigin(0.45, .5);
        this.scoreText.setText(TBCloud.getValue("score"));
        this.scoreText.setFontSize(300);

        if (TBCloud.getValue("score") > TBCloud.getValue(CLOUD.HIGH_SCORE)) {
            TBCloud.setValue(CLOUD.HIGH_SCORE, TBCloud.getValue("score"));

            this.newText = new BaseBitmapText(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY - 140, { font: Font.kenney_pixel })
            this.newText.setOrigin(0.5);
            this.newText.setText("NEW!");
            this.newText.setFontSize(34);
            this.newText.setTint(0xCC0000);
        }

        SaveManager.saveData();

        let playButton = new BaseSlot(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY + 150, { texture: Texture.retry });
        playButton.setOrigin(0.5).setScale(4);
        playButton.pointerUp = () => {
            this.scene.start(GameScene.Name);
            this.scene.stop();
        }

        this.tweens.add({
            targets: this.scoreText,
            scale: { from: 0, to: 1 },
            duration: 200
        })
    }
    protected initListeners(): void {
        super.initListeners();
    }
}
