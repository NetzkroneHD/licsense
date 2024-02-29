import {patchState, signalState} from '@ngrx/signals';
import {computed, Injectable, signal} from '@angular/core';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';

export type UserLicenseError = {
  title: string | null,
  message: string | null
}

export interface UserLicense {
  licenses: LicenseDto[],
  licenseLogs: LicenseLogDto[],
  error: UserLicenseError
}

export const initialState: UserLicense = {
  licenses: [],
  licenseLogs: [],
  error: {title: null, message: null}
}

@Injectable({
  providedIn: 'root'
})
export class UserLicenseState {

  private loadingLogs$ = signal(0);
  private loadingLicenses$ = signal(0);

  state$ = signalState<UserLicense>(initialState);
  selectUserLicenses$ = computed(() => this.state$.licenses());
  selectUserLicenseLogs$ = computed(() => this.state$.licenseLogs());
  selectError$ = computed(() => this.state$.error());
  isLoadingLogs$ = computed(() => this.loadingLogs$() !== 0);
  isLoadingLicenses$ = computed(() => this.loadingLicenses$() !== 0);

  constructor() {

  }


  public setLoadingLicenses(loading: boolean) {
    if (loading) {
      this.loadingLicenses$.update(value => value+1);
    } else {
      this.loadingLicenses$.update(value => value-1);
    }
  }

  public setLoadingLogs(loading: boolean) {
    if (loading) {
      this.loadingLogs$.update(value => value+1);
    } else {
      this.loadingLogs$.update(value => value-1);
    }
  }

  public setError(error: UserLicenseError) {
    patchState(this.state$, (state) => ({
      ...state,
      error: error
    }))
  }

  public setUserLicenses(licenses: LicenseDto[]) {
    patchState(this.state$, (state) => ({
      ...state,
      licenses: licenses
    }));
  }

  public setUserLicenseLogs(licenseLogs: LicenseLogDto[]) {
    patchState(this.state$, (state) => ({
      ...state,
      licenseLogs: licenseLogs
    }));

  }

}
