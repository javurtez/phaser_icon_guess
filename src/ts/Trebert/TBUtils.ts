export class TBUtils {
    constructor() {

    }

    static get config() {
        return TBConfig;
    }
}
var TBConfig = {
    game: Phaser.Game, //this is set by index.js
    world: null, //SceneBoot tends to set this
};
