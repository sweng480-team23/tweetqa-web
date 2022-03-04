import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable()
export class LocalStorageService {

  constructor() { }

  public setItem(key: string, value: any): void {
    localStorage.setItem(`${environment.storagePrefix}${key}`, JSON.stringify(value));
  }

  public getItem(key: string): any {
    return JSON.parse(<string>localStorage.getItem(`${environment.storagePrefix}${key}`));
  }
}
