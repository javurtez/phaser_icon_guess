export default class BaseImage extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene, x: number, y: number, config: any) {
        super(scene, x, y, config.texture.path, config.texture.frame);

        scene.add.existing(this);
    }

    public setImage(texture) {
        this.setTexture(texture.path, texture.frame);
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
