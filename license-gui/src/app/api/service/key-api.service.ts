import {inject, Injectable} from '@angular/core';
import {KeyApi, LicenseKeyDto} from '@license/license-api-client-typescript-fetch';

@Injectable({
    providedIn: 'root'
})
export class KeyApiService {

    private readonly keyApi: KeyApi = inject(KeyApi);

    constructor() {
    }

    public generateKey(keySize: number = 2028): Promise<LicenseKeyDto> {
        return this.keyApi.generateKey({generateKeyRequestDto: {keySize: keySize}});
    }

    public getKey(owner: string): Promise<LicenseKeyDto> {
        return this.keyApi.getKey({owner: owner});
    }


}
