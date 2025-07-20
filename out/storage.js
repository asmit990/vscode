"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
class Storage {
    constructor(context) {
        this.context = context;
    }
    get(key, defaultValue = null) {
        try {
            const value = this.context.globalState.get(key);
            return value ?? defaultValue;
        }
        catch (err) {
            console.error(`Storage.get error for key '${key}':`, err);
            return defaultValue;
        }
    }
    set(key, value) {
        try {
            return this.context.globalState.update(key, value);
        }
        catch (err) {
            console.error(`Storage.set error for key '${key}':`, err);
            return Promise.reject(err);
        }
    }
    remove(key) {
        try {
            return this.context.globalState.update(key, undefined);
        }
        catch (err) {
            console.error(`Storage.remove error for key '${key}':`, err);
            return Promise.reject(err);
        }
    }
    pushToArray(key, item) {
        try {
            const current = this.get(key, []) || [];
            current.push(item);
            return this.set(key, current);
        }
        catch (err) {
            console.error(`Storage.pushToArray error for key '${key}':`, err);
            return Promise.reject(err);
        }
    }
    clearAll() {
        try {
            return Promise.resolve();
        }
        catch (err) {
            console.error('Storage.clearAll error:', err);
            return Promise.reject(err);
        }
    }
}
exports.Storage = Storage;
//# sourceMappingURL=storage.js.map