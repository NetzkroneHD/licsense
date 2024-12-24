import {inject, Injectable} from '@angular/core';
import {KeyApi, LicenseKeyDto} from '@license/license-api-client-typescript-fetch';
import {KeyApiAdapter} from './adapter/key-api-adapter.service';

@Injectable({
    providedIn: 'root'
})
export class KeyApiService {

    private readonly keyApi: KeyApi = inject(KeyApiAdapter);

    constructor() {
    }

    public generateKey(): Promise<LicenseKeyDto> {
        return this.keyApi.generateKey();
    }

    public getKey(owner: string): Promise<LicenseKeyDto> {
        return this.keyApi.getKey({owner: owner});
    }


}
