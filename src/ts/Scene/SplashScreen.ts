import BaseScene from "./BaseScene";
import MenuScene from "./MenuScene";

export default class SplashScreen extends BaseScene {
    /**
     * Unique name of the scene.
     */
    public static Name = "SplashScreen";

    public init(): void {
        super.init();
    }
    public create(): void {
        super.create();
        
        this.scene.start(MenuScene.Name);
    }

    protected rescale(): void {

    }
    protected destroy(): void {

    }
}
