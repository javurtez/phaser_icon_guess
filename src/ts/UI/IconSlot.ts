import { Texture } from "../Managers/AssetManager";
import { EventManager } from "../Managers/EventManager";
import GameScene from "../Scene/GameScene";
import { TBCloud } from "../Trebert/TBCloud";
import BaseImage from "./BaseImage";
import BaseSlot from "./BaseSlot";

export default class IconSlot extends BaseSlot {

    constructor(scene: Phaser.Scene, x: number, y: number, config: any) {
        super(scene, x, y, config);

        let iconPanel = new BaseImage(scene, x, y, { texture: Texture.panel });
        iconPanel.setOrigin(0.5);
        iconPanel.setScale(1.5);
        iconPanel.setDepth(-1);

        this.pointerUp = () => {
            let name = config.iconName;

            if (name == TBCloud.getValue("current_icon")) {
                TBCloud.modifyValue("score", 1);

                EventManager.SCORE_UPDATE.emit(TBCloud.getValue("score"));

                (this.scene as GameScene).getIcon();
            }
            else {
                EventManager.SCORE_UPDATE.emit();
            }
        }
    }
}
