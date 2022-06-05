import { EventManager } from "./EventManager";
import JSONManager from "./JSONManager";

export default class LocalizationManager {
    private static managerSingleton: LocalizationManager;

    private currentLanguage: string;

    public static Init(): void {
        if (!this.managerSingleton) {
            this.managerSingleton = new LocalizationManager();
            this.managerSingleton.currentLanguage = "en";
        } else {
            throw new Error('You can only initialize one manager instance');
        }
    }

    static get Instance() {
        if (!LocalizationManager.managerSingleton) {
            throw new Error('initialize Instantiator First!');
        }

        return LocalizationManager.managerSingleton;
    }

    public setLanguage(lang: string) {
        this.currentLanguage = lang;

        EventManager.CHANGE_LANGUAGE.emit(this.currentLanguage);
    }

    public getLocalized() {
        return JSONManager.Instance.getJSON("local_" + this.currentLanguage);
    }
    public getLocalizedWord(name: string): string {
        return JSONManager.Instance.getJSON("local_" + this.currentLanguage)[name];
    }
}
