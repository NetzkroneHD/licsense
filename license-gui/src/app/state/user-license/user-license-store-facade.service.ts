import {inject, Injectable} from '@angular/core';
import {UserLicenseStore} from './user-license-store.service';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {PublisherApiService} from '../../api/service/publisher-api.service';
import {TranslateService} from '@ngx-translate/core';
import {LicenseApiService} from '../../api/service/license-api.service';
import {NotificationStoreService} from '../toaster/notification.service';


@Injectable({
  providedIn: 'root'
})
export class UserLicenseStoreFacade {

  private readonly licenseState = inject(UserLicenseStore);
  private readonly licenseApiService = inject(LicenseApiService);
  private readonly publisherApiService = inject(PublisherApiService);
  private readonly translateService = inject(TranslateService);
  private readonly notificationStoreService = inject(NotificationStoreService);


  constructor() {

  }

  public setCurrentSelectedLicense(license: string) {
    this.licenseState.setCurrentLicense(license);
  }

  public createLicense(license: LicenseDto) {
    this.licenseState.setLoadingCreate(true);
    this.licenseApiService.createLicense(license).then(createdLicense => {
      this.licenseState.createLicense(createdLicense);
      this.notificationStoreService.setSuccess({
        title: undefined,
        message: this.translateService.instant('Successfully created a license.')
      })
    }).catch(reason => {
      this.notificationStoreService.setError({
        title: this.translateService.instant("Error while creating license."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingCreate(false);
      this.notificationStoreService.setSuccess({title: undefined, message: undefined});
      this.notificationStoreService.setError({title: undefined, message: undefined});
    })
  }

  public updateLicense(licenseKey: string, license: LicenseDto) {
    this.licenseState.setLoadingLicenseUpdate(true);
    this.licenseApiService.updateLicense(licenseKey, license).then(updatedLicense => {
      this.licenseState.updateLicense(licenseKey, updatedLicense);
      this.notificationStoreService.setSuccess({
        title: undefined,
        message: this.translateService.instant('Successfully updated a license.')
      })
    }).catch(reason => {
      this.notificationStoreService.setError({
        title: this.translateService.instant("Error while updating license."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingLicenseUpdate(false);
      this.notificationStoreService.setSuccess({title: undefined, message: undefined});
      this.notificationStoreService.setError({title: undefined, message: undefined});
    })
  }

  public deleteLicense(licenseKey: string) {
    this.licenseState.setLoadingLicenseDelete(true);
    this.licenseApiService.deleteLicense(licenseKey).then(() => {
      this.licenseState.deleteLicense(licenseKey);
      this.notificationStoreService.setSuccess({
        title: undefined,
        message: this.translateService.instant('Successfully deleted a license.')
      })
    }).catch(reason => {
      this.notificationStoreService.setError({
        title: this.translateService.instant("Error while deleting license."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingLicenseDelete(false);
      this.notificationStoreService.setSuccess({title: undefined, message: undefined});
      this.notificationStoreService.setError({title: undefined, message: undefined});
    })
  }

  public loadLogs(license: string) {
    this.licenseState.setLoadingLogs(true);
    this.setLicenseLogs([]);
    this.licenseApiService.getLicenseLogs(license).then(licenseLogs => {
      this.licenseState.setUserLicenseLogs(licenseLogs);
      this.notificationStoreService.setSuccess({
        title: undefined,
        message: this.translateService.instant('Successfully loaded logs.')
      })
    }).catch(reason => {
      this.notificationStoreService.setError({
        title: this.translateService.instant("Error while loading logs."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingLogs(false);
      this.notificationStoreService.setSuccess({title: undefined, message: undefined});
      this.notificationStoreService.setError({title: undefined, message: undefined});
    })
  }

  public loadLicensesFromCurrentPublisher() {
    this.loadLicenses(this.publisherApiService.getCurrentPublisher());
  }

  public loadLicenses(publisher: string) {
    this.licenseState.setLoadingLicenses(true);
    this.publisherApiService.getLicensesFromPublisher(publisher).then(licenses => {
      this.licenseState.setUserLicenses(licenses);
      this.notificationStoreService.setSuccess({
        title: undefined,
        message: this.translateService.instant("Successfully loaded licenses.")
      });
    }).catch(reason => {
      this.notificationStoreService.setError({
        title: this.translateService.instant("Error while loading licenses."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingLicenses(false);
      this.notificationStoreService.setSuccess({title: undefined, message: undefined});
      this.notificationStoreService.setError({title: undefined, message: undefined});
    });
  }

  public setLicenses(licenses: LicenseDto[]) {
    this.licenseState.setUserLicenses(licenses);
  }

  public setLicenseLogs(licenseLogs: LicenseLogDto[]) {
    this.licenseState.setUserLicenseLogs(licenseLogs);
  }


}



