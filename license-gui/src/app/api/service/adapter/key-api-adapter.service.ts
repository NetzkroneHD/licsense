import {Injectable} from '@angular/core';
import {
    ApiResponse,
    DeleteKeyRequest,
    GenerateKeyRequest,
    GetKeyRequest,
    InitOverrideFunction,
    KeyApi,
    LicenseKeyDto
} from '@license/license-api-client-typescript-fetch';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class KeyApiAdapter extends KeyApi {

    private readonly keyApi: KeyApi = new KeyApi(environment.apiConfig);

    constructor() {
        super(environment.apiConfig);
    }

    public override deleteKeyRaw(requestParameters: DeleteKeyRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<void>> {
        return this.keyApi.deleteKeyRaw(requestParameters, initOverrides);
    }

    public override deleteKey(requestParameters: DeleteKeyRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<void> {
        return this.keyApi.deleteKey(requestParameters, initOverrides);
    }

    public override generateKeyRaw(requestParameters: GenerateKeyRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<LicenseKeyDto>> {
        return this.keyApi.generateKeyRaw(requestParameters, initOverrides);
    }

    public override generateKey(requestParameters?: GenerateKeyRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<LicenseKeyDto> {
        return this.keyApi.generateKey(requestParameters, initOverrides);
    }

    public override getKeyRaw(requestParameters: GetKeyRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<LicenseKeyDto>> {
        return this.keyApi.getKeyRaw(requestParameters, initOverrides);
    }

    public override getKey(requestParameters: GetKeyRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<LicenseKeyDto> {
        return this.keyApi.getKey(requestParameters, initOverrides);
    }
}
