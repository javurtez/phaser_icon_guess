import { Audio, Texture } from "../Managers/AssetManager";
import AudioManager from "../Managers/AudioManager";
import { CLOUD, SaveManager } from "../Managers/SaveManager";
import { TBAsset } from "../Trebert/TBAsset";
import { TBCloud } from "../Trebert/TBCloud";
import { TBUtils } from "../Trebert/TBUtils";
import BaseImage from "../UI/BaseImage";
import BaseSlot from "../UI/BaseSlot";
import BaseScene from "./BaseScene";
import GameScene from "./GameScene";

export default class MenuScene extends BaseScene {
    /**
     * Unique name of the scene.
     */
    public static Name = "MainMenu";

    public init(): void {
        super.init();
    }
    public create(): void {
        super.create();

        SaveManager.loadData();
        AudioManager.Instance.playBGM(Audio.bgm)
    }

    protected initGraphics(): void {
        let panel = new BaseImage(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY - 90, { texture: Texture.start_panel });
        panel.setScale(2.5);

        let playButton = new BaseSlot(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY + 150, { texture: Texture.start });
        playButton.setOrigin(0.5).setScale(4);
        playButton.pointerUp = () => {
            TBCloud.setValue(CLOUD.BOOL_FIRST_PLAY, false);
            TBAsset.loadAssets(this, false, true, () => {
                this.scene.start(GameScene.Name)
            });
        }
    }

    protected rescale(): void {

    }
    protected destroy(): void {

    }
}
