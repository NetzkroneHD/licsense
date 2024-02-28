import {patchState, signalState} from '@ngrx/signals';
import {computed, Injectable} from '@angular/core';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';

export interface UserLicense {
  licenses: LicenseDto[],
  licenseLogs: LicenseLogDto[],
}

export const initialState: UserLicense = {
  licenses: [],
  licenseLogs: []
}

@Injectable({
  providedIn: 'root'
})
export class UserLicenseState {

  state = signalState<UserLicense>(initialState);

  selectUserLicenses$ = computed(() => this.state.licenses());
  selectUserLicenseLogs$ = computed(() => this.state.licenseLogs());

  constructor() {

  }

  public setUserLicensesReducer(licenses: LicenseDto[]) {
    patchState(this.state, (state) => ({
      ...state,
      licenses: licenses
    }));
  }

  public setUserLicenseLogsReducer(licenseLogs: LicenseLogDto[]) {
    patchState(this.state, (state) => ({
      ...state,
      licenseLogs: licenseLogs
    }));
  }

}
