export default class BaseScene extends Phaser.Scene {

    public init(): void {
        this.initProperty();
        this.initListeners();
    }

    public preload(): void {

    }

    public create(): void {
        this.initGraphics();
    }

    protected initProperty(): void {

    }
    protected initGraphics(): void {

    }
    protected initListeners(): void {
        this.events.once('shutdown', this.destroy, this);
        this.scale.on("resize", this.rescale, this);
    }

    protected rescale(): void {

    }
    protected destroy(): void {

    }
}
