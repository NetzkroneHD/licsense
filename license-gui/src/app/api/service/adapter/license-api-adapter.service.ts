import {inject, Injectable} from '@angular/core';
import {
  ApiResponse,
  CreateLicenseRequest, DeleteLicenseRequest, GetLicenseLogsRequest, GetLicenseRequest,
  InitOverrideFunction,
  LicenseApi,
  LicenseDto, UpdateLicenseRequest
} from '@license/license-api-client-typescript-fetch';
import type {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicenseApiAdapter extends LicenseApi{

  private readonly licenseApi: LicenseApi = inject(LicenseApi);

  constructor() {
    super(environment.apiConfig);
  }

  public override createLicenseRaw(requestParameters: CreateLicenseRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<LicenseDto>> {
    return this.licenseApi.createLicenseRaw(requestParameters, initOverrides);
  }

  public override createLicense(requestParameters: CreateLicenseRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<LicenseDto> {
    return this.licenseApi.createLicense(requestParameters, initOverrides);
  }

  public override deleteLicenseRaw(requestParameters: DeleteLicenseRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<void>> {
    return this.licenseApi.deleteLicenseRaw(requestParameters, initOverrides);
  }

  public override deleteLicense(requestParameters: DeleteLicenseRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<void> {
    return this.licenseApi.deleteLicense(requestParameters, initOverrides);
  }

  public override getLicenseRaw(requestParameters: GetLicenseRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<LicenseDto>> {
    return this.licenseApi.getLicenseRaw(requestParameters, initOverrides);
  }

  public override getLicense(requestParameters: GetLicenseRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<LicenseDto> {
    return this.licenseApi.getLicense(requestParameters, initOverrides);
  }

  public override getLicenseLogsRaw(requestParameters: GetLicenseLogsRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<Array<LicenseLogDto>>> {
    return this.licenseApi.getLicenseLogsRaw(requestParameters, initOverrides);
  }

  public override getLicenseLogs(requestParameters: GetLicenseLogsRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<Array<LicenseLogDto>> {
    return this.licenseApi.getLicenseLogs(requestParameters, initOverrides);
  }

  public override updateLicenseRaw(requestParameters: UpdateLicenseRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<LicenseDto>> {
    return this.licenseApi.updateLicenseRaw(requestParameters, initOverrides);
  }

  public override updateLicense(requestParameters: UpdateLicenseRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<LicenseDto> {
    return this.licenseApi.updateLicense(requestParameters, initOverrides);
  }
}
