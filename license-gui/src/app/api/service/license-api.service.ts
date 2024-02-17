import {inject, Injectable} from '@angular/core';
import {ApiResponse, LicenseApi, LicenseDto} from '@license/license-api-client-typescript-fetch';
import type {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';

@Injectable({
  providedIn: 'root'
})
export class LicenseApiService {

  private readonly licenseApi: LicenseApi = inject(LicenseApi);

  constructor() {

  }

  public createLicense(license: LicenseDto): Promise<LicenseDto> {
    return this.licenseApi.createLicense({licenseDto: license})
  }

  public getLicense(license: string): Promise<LicenseDto> {
    return this.licenseApi.getLicense({license: license});
  }

  public updateLicense(license: string, licenseDto: LicenseDto): Promise<LicenseDto> {
    return this.licenseApi.updateLicense({license: license, licenseDto: licenseDto})
  }

  public deleteLicense(license: string): Promise<void> {
    return this.licenseApi.deleteLicense({license: license});
  }

  public getLicenseLogs(license: string): Promise<Array<LicenseLogDto>> {
    return this.licenseApi.getLicenseLogs({license: license});
  }

  // Raw
  public createLicenseRaw(license: LicenseDto): Promise<ApiResponse<LicenseDto>> {
    return this.licenseApi.createLicenseRaw({licenseDto: license})
  }

  public getLicenseRaw(license: string): Promise<ApiResponse<LicenseDto>> {
    return this.licenseApi.getLicenseRaw({license: license});
  }

  public updateLicenseRaw(license: string, licenseDto: LicenseDto): Promise<ApiResponse<LicenseDto>> {
    return this.licenseApi.updateLicenseRaw({license: license, licenseDto: licenseDto})
  }

  public deleteLicenseRaw(license: string): Promise<ApiResponse<void>> {
    return this.licenseApi.deleteLicenseRaw({license: license});
  }

  public getLicenseLogsRaw(license: string): Promise<ApiResponse<Array<LicenseLogDto>>> {
    return this.licenseApi.getLicenseLogsRaw({license: license});
  }

}
