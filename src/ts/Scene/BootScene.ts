import { TBUtils } from "../Trebert/TBUtils";
import BaseScene from "./BaseScene";
import Preloader from "./Preloader";

export default class BootScene extends BaseScene {
    /**
     * Unique name of the scene.
     */
    public static Name = "BootScene";

    public preload(): void {
    }
    public create(): void {
        super.create();
        
        TBUtils.config.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };

        this.nextScene();
    }

    nextScene(): void {
        this.scene.start(Preloader.Name);
    }
}
