import { StorageService } from "../storage/storage.service";

export class GlobalApp {

    constructor() {}
    
    public localStorageItem(id: string): string {
        return localStorage.getItem(id);
    }
}