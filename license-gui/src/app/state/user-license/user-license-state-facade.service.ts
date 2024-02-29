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

  public setError(error: UserLicenseError) {
    this.licenseState.setError(error);
  }

  public loadLogs(license: string) {
    this.licenseState.setLoadingLogs(true);
    this.licenseApiService.getLicenseLogs(license).then(licenseLogs => {
      this.licenseState.setUserLicenseLogs(licenseLogs);
    }).catch(reason => {
      this.licenseState.setError({
        title: this.translateService.instant("Error while loading logs."),
        message: this.translateService.instant("Error: {{error}}").replace("{{error}}", reason)
      });
    }).finally(() => {
      this.licenseState.setLoadingLogs(false);
    })
  }

  public loadLicensesCurrentPublisher() {
    this.loadLicenses(this.publisherApiService.getCurrentPublisher());
  }

  public loadLicenses(publisher: string) {
    this.licenseState.setLoadingLicenses(true);
    this.publisherApiService.getLicensesFromPublisher(publisher).then(licenses => {
      this.licenseState.setUserLicenses(licenses);
    }).catch(reason => {
      this.licenseState.setError({
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



