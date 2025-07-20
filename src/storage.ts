import * as vscode from 'vscode';

export class Storage {
  constructor(private context: vscode.ExtensionContext) {}

  get<T = any>(key: string, defaultValue: T | null = null): T | null {
    try {
      const value = this.context.globalState.get<T>(key);
      return value ?? defaultValue;
    } catch (err) {
      console.error(`Storage.get error for key '${key}':`, err);
      return defaultValue;
    }
  }
 
  set<T = any>(key: string, value: T): Thenable<void> {
    try {
      return this.context.globalState.update(key, value);
    } catch (err) {
      console.error(`Storage.set error for key '${key}':`, err);
      return Promise.reject(err);
    }
  }

  remove(key: string): Thenable<void> {
    try {
      return this.context.globalState.update(key, undefined);
    } catch (err) {
      console.error(`Storage.remove error for key '${key}':`, err);
      return Promise.reject(err);
    }
  }

  pushToArray<T = any>(key: string, item: T): Thenable<void> {
    try {
      const current = this.get<T[]>(key, []) || [];
      current.push(item);
      return this.set(key, current);
    } catch (err) {
      console.error(`Storage.pushToArray error for key '${key}':`, err);
      return Promise.reject(err);
    }
  }

  clearAll(): Thenable<void> {
   
    try {
      return Promise.resolve();
    } catch (err) {
      console.error('Storage.clearAll error:', err);
      return Promise.reject(err);
    }
  }
}




