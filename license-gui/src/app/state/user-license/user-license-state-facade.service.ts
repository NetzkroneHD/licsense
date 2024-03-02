import {effect, inject, Injectable} from '@angular/core';
import {UserLicenseError, UserLicenseState, UserLicenseSuccess} from './user-license.state';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {PublisherApiService} from '../../api/service/publisher-api.service';
import {TranslateService} from '@ngx-translate/core';
import {LicenseApiService} from '../../api/service/license-api.service';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UserLicenseStateFacade {

  private readonly licenseState = inject(UserLicenseState);
  private readonly licenseApiService = inject(LicenseApiService);
  private readonly publisherApiService = inject(PublisherApiService);
  private readonly translateService = inject(TranslateService);
  private readonly toasterService = inject(ToastrService);


  constructor() {
    effect(() => {
      const userLicenseSuccess: UserLicenseSuccess = this.licenseState.selectSuccess$();
      let show = false;
      if (userLicenseSuccess.title) {
        show = true;
      } else if (userLicenseSuccess.message) {
        show = true;
      }
      if (show) {
        this.toasterService.success(userLicenseSuccess.message, userLicenseSuccess.title);
      }

    });

    effect(() => {
      const userLicenseError: UserLicenseError = this.licenseState.selectError$();

      let show = false;
      if (userLicenseError.title) {
        show = true;
      } else if (userLicenseError.message) {
        show = true;
      }
      if (show) {
        this.toasterService.error(userLicenseError.message, userLicenseError.title);
      }

    });

  }

  public setSuccess(success: UserLicenseSuccess) {
    this.licenseState.setSuccess(success);
  }

  public setError(error: UserLicenseError) {
    this.licenseState.setError(error);
  }

  public setCurrentSelectedLicense(license: string) {
    this.licenseState.setCurrentLicense(license);
  }

  public createLicense(license: LicenseDto) {
    this.licenseState.setLoadingCreate(true);
    this.licenseApiService.createLicense(license).then(createdLicense => {
      this.licenseState.createLicense(createdLicense);
      this.setSuccess({
        title: undefined,
        message: this.translateService.instant('Successfully created a license.')
      })
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
      this.setSuccess({
        title: undefined,
        message: this.translateService.instant('Successfully updated a license.')
      })
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
      this.setSuccess({
        title: undefined,
        message: this.translateService.instant('Successfully deleted a license.')
      })
    }).catch(reason => {
      this.setError({
        title: this.translateService.instant("Error while deleting license."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingLicenseDelete(false);
    })
  }

  public loadLogs(license: string) {
    this.licenseState.setLoadingLogs(true);
    this.licenseApiService.getLicenseLogs(license).then(licenseLogs => {
      this.licenseState.setUserLicenseLogs(licenseLogs);
      this.setSuccess({
        title: undefined,
        message: this.translateService.instant('Successfully loaded logs.')
      })
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
      this.setSuccess({
        title: undefined,
        message: this.translateService.instant("Successfully loaded licenses.")
      });
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



