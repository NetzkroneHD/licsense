import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiResponse, Configuration, LicenseCheckApi} from '@license/license-api-client-typescript-fetch';
import type {LicenseCheckResultDto} from '@license/license-api-client-typescript-fetch/src/models';

@Injectable({
  providedIn: 'root'
})
export class LicenseCheckApiService {

  private readonly licenseCheckApi: LicenseCheckApi = inject(LicenseCheckApi);

  constructor() {
  }

  public checkLicense(license: string): Promise<LicenseCheckResultDto> {
    return this.licenseCheckApi.checkLicense({license: license})
  }

  public checkLicenseRaw(license: string): Promise<ApiResponse<LicenseCheckResultDto>> {
    return this.licenseCheckApi.checkLicenseRaw({license: license})
  }

  public setAccessToken(token: string) {
    environment.apiConfig.config = new Configuration({
      ...environment.apiConfig,
      accessToken: token
    });
  }

}
