import {inject, Injectable} from '@angular/core';
import {UserLicenseState} from './user-license.state';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';


@Injectable({
  providedIn: 'root'
})
export class UserLicenseStateFacade {

  private readonly licenseState = inject(UserLicenseState);

  public setLicenses(licenses: LicenseDto[]) {

  }

  public setLicenseLogs(licenseLogs: LicenseLogDto[]) {
    this.licenseState.setUserLicenseLogsReducer(licenseLogs);
  }


}



