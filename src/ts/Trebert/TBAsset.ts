import { Audio, Font, Texture } from "../Managers/AssetManager";

export class TBAsset {
    static loadAssets(scene: Phaser.Scene, isInitial: boolean, isStartLoad: boolean = false, completeFunc: Function = undefined, progressFunc: Function = undefined) {
        scene.load.path = "assets/";

        for (var tAsset in Texture) {
            let asset = Texture[tAsset]; //get actual data
            if (this.canLoadAsset(isInitial, asset)) {
                if (asset.frame == undefined) {
                    scene.load.image(asset.path, asset.path)
                }
                else {
                    let json = asset.path;
                    json = json.slice(0, -4) + ".json";
                    scene.load.atlas(asset.path, asset.path, json);
                }
            }
        }
        for (var tAsset in Audio) {
            let asset = Audio[tAsset]; //get actual data
            if (this.canLoadAsset(isInitial, asset)) {
                scene.load.audio(asset.path, [asset.path + ".mp3", asset.path + ".ogg"])
            }
        }
        for (var tAsset in Font) {
            let asset = Font[tAsset]; //get actual data
            if (this.canLoadAsset(isInitial, asset)) {
                scene.load.bitmapFont(asset.path, asset.path + ".png", asset.path + ".fnt")
            }
        }

        if (isStartLoad) {
            scene.load.start();
        }
        if (progressFunc != undefined) {
            scene.load.on("progress", progressFunc, scene);
        }
        if (completeFunc != undefined) {
            scene.load.on("complete", completeFunc, scene);
        }
    }

    static canLoadAsset(isInitial: boolean, asset: any) {
        return (isInitial == true && asset.path.includes("Initial")) || (isInitial == false && asset.path.includes("Gameplay"));
    }
}
