import { Audio } from "../Managers/AssetManager";
import AudioManager from "../Managers/AudioManager";

export default class BaseSlot extends Phaser.GameObjects.Image {

    pointerDown: Function;
    pointerUp: Function;
    pointerOver: Function;
    pointerOut: Function;

    buttonScale: any = { x: 1, y: 1 };

    constructor(scene: Phaser.Scene, x: number, y: number, config: any) {
        super(scene, x, y, config.texture.path, config.texture.frame);

        let durationTween = config.duration == undefined ? 50 : config.duration;;

        this.setInteractive();
        this.on("pointerdown", () => {
            if (this.pointerDown) {
                this.pointerDown();
                this.setTint(0xFFFFFF);
            }
        }, this);
        this.on("pointerup", () => {
            if (this.pointerUp) {
                this.pointerUp();
            }
            AudioManager.Instance.playSFX(Audio.click, config.volume);
        }, this);
        this.on("pointerover", () => {
            if (this.pointerOver) {
                this.pointerOver();
            }
            this.scene.tweens.add({
                targets: this,
                scaleX: this.buttonScale.x * 1.1,
                scaleY: this.buttonScale.y * 1.1,
                duration: durationTween
            });
            this.setTint(0xB1B4B8);
        }, this);
        this.on("pointerout", () => {
            if (this.pointerOut) {
                this.pointerOut();
            }
            this.scene.tweens.add({
                targets: this,
                scaleX: this.buttonScale.x,
                scaleY: this.buttonScale.y,
                duration: durationTween
            });
            this.setTint(0xFFFFFF);
        }, this);

        scene.add.existing(this);
    }

    public setScale(x: number, y?: number): this {
        this.buttonScale.x = x;
        this.buttonScale.y = y == undefined ? x : y;
        return super.setScale(x, y);
    }

    public Open(): void {
        this.setActive(true);
        this.setVisible(true);
    }
    public Close(): void {
        this.setActive(false);
        this.setVisible(false);
    }
}
