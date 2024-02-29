import {inject, Injectable} from '@angular/core';
import {UserLicenseError, UserLicenseState} from './user-license.state';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {PublisherApiService} from '../../api/service/publisher-api.service';
import {TranslateService} from '@ngx-translate/core';
import {LicenseApiService} from '../../api/service/license-api.service';


@Injectable({
  providedIn: 'root'
})
export class UserLicenseStateFacade {

  private readonly licenseState = inject(UserLicenseState);
  private readonly licenseApiService = inject(LicenseApiService);
  private readonly publisherApiService = inject(PublisherApiService);
  private readonly translateService = inject(TranslateService);

  public createLicense(license: LicenseDto) {
    this.licenseState.setLoadingCreate(true);
    this.licenseApiService.createLicense(license).then(createdLicense => {
      this.licenseState.createLicense(createdLicense);
    }).catch(reason => {
      this.setError({
        title: this.translateService.instant("Error while creating license."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingCreate(false);
    })
  }

  public updateLicense(licenseKey: string, license: LicenseDto) {
    this.licenseState.setLoadingLicenseUpdate(true);
    this.licenseApiService.updateLicense(licenseKey, license).then(updatedLicense => {
      this.licenseState.updateLicense(licenseKey, updatedLicense);
    }).catch(reason => {
      this.setError({
        title: this.translateService.instant("Error while updating license."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingLicenseUpdate(false);
    })
  }

  public deleteLicense(licenseKey: string) {
    this.licenseState.setLoadingLicenseDelete(true);
    this.licenseApiService.deleteLicense(licenseKey).then(value => {
      this.licenseState.deleteLicense(licenseKey);
    }).catch(reason => {
      this.setError({
        title: this.translateService.instant("Error while deleting license."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingLicenseDelete(false);
    })
  }

  public setError(error: UserLicenseError) {
    this.licenseState.setError(error);
  }

  public loadLogs(license: string) {
    this.licenseState.setLoadingLogs(true);
    this.licenseApiService.getLicenseLogs(license).then(licenseLogs => {
      this.licenseState.setUserLicenseLogs(licenseLogs);
    }).catch(reason => {
      this.setError({
        title: this.translateService.instant("Error while loading logs."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingLogs(false);
    })
  }

  public loadLicensesFromCurrentPublisher() {
    this.loadLicenses(this.publisherApiService.getCurrentPublisher());
  }

  public loadLicenses(publisher: string) {
    this.licenseState.setLoadingLicenses(true);
    this.publisherApiService.getLicensesFromPublisher(publisher).then(licenses => {
      this.licenseState.setUserLicenses(licenses);
    }).catch(reason => {
      this.setError({
        title: this.translateService.instant("Error while loading licenses."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingLicenses(false);
    });
  }

  public setLicenses(licenses: LicenseDto[]) {
    this.licenseState.setUserLicenses(licenses);
  }

  public setLicenseLogs(licenseLogs: LicenseLogDto[]) {
    this.licenseState.setUserLicenseLogs(licenseLogs);
  }


}



