import { TBCloud } from "../Trebert/TBCloud";
import { CLOUD } from "./SaveManager";

export default class AudioManager {
    private static audioManagerSingleton: AudioManager;

    private sceneSoundManager: Phaser.Sound.BaseSoundManager;
    private allBackgroundAudio: Phaser.Sound.BaseSound[] = [];

    private isMute: boolean;
    private volume: number;

    public static init(scene: Phaser.Scene): void {
        if (!AudioManager.audioManagerSingleton) {
            this.audioManagerSingleton = new AudioManager();

            this.audioManagerSingleton.isMute = TBCloud.getValue(CLOUD.IS_MUTED);

            this.audioManagerSingleton.setMute(this.audioManagerSingleton.isMute);

            this.audioManagerSingleton.sceneSoundManager = scene.sound;
        } else {
            throw new Error('You can only initialize one manager instance');
        }
    }

    static get Instance() {
        if (!AudioManager.audioManagerSingleton) {
            throw new Error('initialize Instantiator First!');
        }

        return AudioManager.audioManagerSingleton;
    }

    set Volume(volume: number) {
        this.volume = volume;
    }
    get Volume() {
        return this.volume;
    }
    get IsMuted() {
        return this.isMute;
    }

    public setVolume(vol: number): void {
        this.volume = vol;
        this.sceneSoundManager.volume = vol;
    }
    public setMute(isMute: boolean): void {
        this.isMute = isMute;

        if (this.isMute) {
            for (var i = 0; i < this.allBackgroundAudio.length; i++) {
                this.allBackgroundAudio[i].pause();
            }
        }
        else {
            for (var i = 0; i < this.allBackgroundAudio.length; i++) {
                this.allBackgroundAudio[i].resume();
            }
        }
    }
    public playSFXOneShot(key: any, volumeSfx: number = -1): void {
        if (this.isMute) return;
        this.sceneSoundManager.play(key.path, {
            volume: volumeSfx == -1 ? this.volume : volumeSfx
        });
    }
    public playSFX(key: any, volumeSfx: number = -1): void {
        let sfx: Phaser.Sound.BaseSound = this.sceneSoundManager.get(key.path);

        if (!sfx) {
            sfx = this.sceneSoundManager.add(key.path, {
                mute: this.isMute,
                volume: volumeSfx == - 1 ? this.volume : volumeSfx,
                loop: false
            });
        }
        if (!this.isMute) {
            sfx.play();
        }
    }
    public pauseBGM(key: any): void {
        let bgm: Phaser.Sound.BaseSound = this.sceneSoundManager.get(key.path);

        if (!bgm) return;

        bgm.pause();
    }
    public playBGM(key: any, replayIfSame: boolean = false): void {
        let bgm: Phaser.Sound.BaseSound = this.sceneSoundManager.get(key.path);

        if (replayIfSame) {
            bgm.pause();
        }

        if (!bgm) {
            bgm = this.sceneSoundManager.add(key.path, {
                loop: true,
                volume: this.volume
            });
            this.allBackgroundAudio.push(bgm);
            bgm.play();
        }

        if (this.isMute) {
            bgm.pause();
        }
        else {
            if (replayIfSame) {
                bgm.play();
            }
        }
    }
}
