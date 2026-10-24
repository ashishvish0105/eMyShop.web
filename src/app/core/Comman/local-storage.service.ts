import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  private isBrowserEnvironment(): boolean {
    return typeof localStorage !== 'undefined';
  }

  getLocalStorage(keyName: string) {
    if (!this.isBrowserEnvironment()) {
      return null;
    }
    return JSON.parse(localStorage.getItem(keyName) || "");
  }

  setLocalStorage(keyName: string, value: any) {
    if (!this.isBrowserEnvironment()) {
      return;
    }
    localStorage.setItem(keyName, value);
  }

  setObjLocalStorage(keyName: string, Object: any) {
    if (!this.isBrowserEnvironment()) {
      return;
    }
    localStorage.setItem(keyName, JSON.stringify(Object));
  }

  getObjLocalStorage(keyName: string) {
    if (!this.isBrowserEnvironment()) {
      return null;
    }
    try {
      if (localStorage.getItem(keyName)) {
        return JSON.parse(localStorage.getItem(keyName) || "");
      }
    } catch (error: any) {
      console.log(error.message);
    }
    return null;
  }

  removeItemLocalStorage(keyName: string) {
    if (!this.isBrowserEnvironment()) {
      return;
    }
    localStorage.removeItem(keyName);
  }

  clearLocalStorage() {
    if (!this.isBrowserEnvironment()) {
      return;
    }
    localStorage.clear();
  }

}
