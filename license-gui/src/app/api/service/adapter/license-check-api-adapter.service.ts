import {Injectable} from '@angular/core';
import {
    ApiResponse,
    CheckLicenseRequest,
    InitOverrideFunction,
    LicenseCheckApi
} from '@license/license-api-client-typescript-fetch';
import type {LicenseCheckResultDto} from '@license/license-api-client-typescript-fetch/src/models';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LicenseCheckApiAdapter extends LicenseCheckApi {

    private readonly licenseCheckApi: LicenseCheckApi = new LicenseCheckApi(environment.apiConfig);

    constructor() {
        super(environment.apiConfig)
    }

    public override checkLicenseRaw(requestParameters: CheckLicenseRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<LicenseCheckResultDto>> {
        return this.licenseCheckApi.checkLicenseRaw(requestParameters, initOverrides);
    }

    public override checkLicense(requestParameters: CheckLicenseRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<LicenseCheckResultDto> {
        return this.licenseCheckApi.checkLicense(requestParameters, initOverrides);
    }
}
