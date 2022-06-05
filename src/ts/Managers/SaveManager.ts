import { TBCloud } from "../Trebert/TBCloud";

export const CLOUD = Object.freeze({
    BOOL_FIRST_PLAY: 'BOOL_FIRST_PLAY',
    IS_MUTED: 'IS_MUTED',

    HIGH_SCORE: 'HIGH_SCORE',
});

export class SaveManager {
    static SAVE_DATA_PATH = 'Trebert_ICON_GUESS';
    static BUILD_VERSION = "0.0.1";

    static initData() {
        console.log("Initializing Data...");
        TBCloud.setValue(CLOUD.BOOL_FIRST_PLAY, true);
        TBCloud.setValue(CLOUD.IS_MUTED, false);
        TBCloud.setValue(CLOUD.HIGH_SCORE, 0);
    }

    static saveData() {
        console.log("Saving Data...");
        var data = {
            first_play: TBCloud.getValue(CLOUD.BOOL_FIRST_PLAY),
            is_mute: TBCloud.getValue(CLOUD.IS_MUTED),
            high_score: TBCloud.getValue(CLOUD.HIGH_SCORE)
        }

        localStorage.setItem(SaveManager.SAVE_DATA_PATH, JSON.stringify(data));
    }

    static loadData() {
        this.initData();

        console.log("Loading Data...");
        var data = JSON.parse(localStorage.getItem(SaveManager.SAVE_DATA_PATH));
        if (data == null) {
            console.log("No data found. Initializing... ");
            this.initData();
            this.saveData();
            data = JSON.parse(localStorage.getItem(SaveManager.SAVE_DATA_PATH));
        } else {
            console.log("Loaded Data: " + JSON.stringify(data));
        }

        TBCloud.setValue(CLOUD.BOOL_FIRST_PLAY, data.first_play);
        TBCloud.setValue(CLOUD.IS_MUTED, data.is_mute);
        TBCloud.setValue(CLOUD.HIGH_SCORE, data.high_score);
    }

    static resetData() {
        this.initData();
        this.saveData();
    }
}
