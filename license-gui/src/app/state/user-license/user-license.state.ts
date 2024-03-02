import {patchState, signalState} from '@ngrx/signals';
import {computed, Injectable, signal} from '@angular/core';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';

export type UserLicenseError = {
  title: string | undefined,
  message: string | undefined
}

export type UserLicenseSuccess = {
  title: string | undefined,
  message: string | undefined
}

export interface UserLicense {
  licenses: LicenseDto[],
  licenseLogs: LicenseLogDto[],
  currentSelectedLicense: string | null,
  error: UserLicenseError,
  success: UserLicenseSuccess
}

export const initialState: UserLicense = {
  licenses: [],
  licenseLogs: [],
  currentSelectedLicense: null,
  error: {title: undefined, message: undefined},
  success: {title: undefined, message: undefined},
}

@Injectable({
  providedIn: 'root'
})
export class UserLicenseState {

  private loadingLogs$ = signal(0);
  private loadingLicenses$ = signal(0);
  private loadingCreate$ = signal(false);
  private loadingUpdate$ = signal(0);
  private loadingDelete$ = signal(0);

  state$ = signalState<UserLicense>(initialState);
  selectUserLicenses$ = computed(() => this.state$.licenses());
  selectUserLicenseLogs$ = computed(() => this.state$.licenseLogs());
  selectError$ = computed(() => this.state$.error());
  selectSuccess$ = computed(() => this.state$.success());
  selectCurrentLicense$ = computed(() => this.state$.currentSelectedLicense());

  isLoadingLogs$ = computed(() => this.loadingLogs$() !== 0);
  isLoadingLicenses$ = computed(() => this.loadingLicenses$() !== 0);
  isLoadingCreate$ = computed(() => this.loadingCreate$());
  isLoadingUpdate = computed(() => this.loadingUpdate$() !== 0);
  isLoadingDelete$ = computed(() => this.loadingDelete$() !== 0);

  isLoadingAnyLicense$ = computed(() => this.isLoadingLicenses$() || this.isLoadingCreate$() || this.isLoadingUpdate() || this.isLoadingDelete$());

  constructor() {

  }

  public setSuccess(success: UserLicenseSuccess) {
    patchState(this.state$, (state) => ({
      ...state,
      success: success
    }));
  }

  public setCurrentLicense(license: string) {
    patchState(this.state$, (state) => ({
      ...state,
      currentSelectedLicense: license
    }));
  }

  public setLoadingCreate(loading: boolean) {
    this.loadingCreate$.set(loading);
  }

  public setLoadingLicenseDelete(loading: boolean) {
    if (loading) {
      this.loadingDelete$.update(value => value+1);
    } else {
      this.loadingDelete$.update(value => value-1);
    }
  }

  public setLoadingLicenseUpdate(loading: boolean) {
    if (loading) {
      this.loadingUpdate$.update(value => value+1);
    } else {
      this.loadingUpdate$.update(value => value-1);
    }
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

  public createLicense(license: LicenseDto) {
    patchState(this.state$, (state) => ({
      ...state,
      licenses: state.licenses.concat([license])
    }));
  }

  public updateLicense(licenseKey: string, license: LicenseDto) {
    patchState(this.state$, (state) => ({
      ...state,
      licenses: state.licenses.map(value => {
        if (value.licenseKey === licenseKey) {
          return license;
        }
        return value;
      })
    }))
  }

  public deleteLicense(licenseKey: string) {
    patchState(this.state$, (state) => ({
      ...state,
      licenses: state.licenses.filter(value => value.licenseKey !== licenseKey)
    }))
  }
}
