export class TBCloud {
    static _values = new Map();

    static getValue(id: string) {
        return this._values.get(id);
    }
    static setValue(id: string, value: any) {
        this._values.set(id, value);
    }
    static modifyValue(id: string, value: any) {
        let tValue = value + this.getValue(id);

        this._values.set(id, tValue);
    }
}
