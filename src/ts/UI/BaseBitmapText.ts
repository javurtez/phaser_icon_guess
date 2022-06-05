export default class BaseBitmapText extends Phaser.GameObjects.BitmapText {
    constructor(scene: Phaser.Scene, x: number, y: number, config: any) {
        super(scene, x, y, config.font.path, config.text, config.size, config.align);

        scene.add.existing(this);
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
