import AudioManager from "../Managers/AudioManager";
import { TBAsset } from "../Trebert/TBAsset";
import BaseScene from "./BaseScene";
import MenuScene from "./MenuScene";

export default class Preloader extends BaseScene {
	/**
	 * Unique name of the scene.
	 */
	public static Name = "Preloader";

	public preload(): void {
		TBAsset.loadAssets(this, true, false, this.nextScene);
	}

	private nextScene() {
		AudioManager.init(this);
		AudioManager.Instance.setVolume(.5);

		this.scene.start(MenuScene.Name);
	}

    protected rescale(): void {

    }
    protected destroy(): void {

    }
}
