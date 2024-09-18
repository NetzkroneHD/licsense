import {patchState, signalState} from '@ngrx/signals';
import {computed, Injectable, signal} from '@angular/core';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';

export interface UserLicenseState {
  licenses: LicenseDto[],
  licenseLogs: LicenseLogDto[],
  currentSelectedLicense: string | null
}

export const initialState: UserLicenseState = {
  licenses: [],
  licenseLogs: [],
  currentSelectedLicense: null
}

@Injectable({
  providedIn: 'root'
})
export class UserLicenseStore {

  private readonly loadingLogs$ = signal(0);
  private readonly loadingLicenses$ = signal(0);
  private readonly loadingCreate$ = signal(false);
  private readonly loadingUpdate$ = signal(0);
  private readonly loadingDelete$ = signal(0);

  public readonly state$ = signalState<UserLicenseState>(initialState);
  public readonly selectUserLicenses$ = computed(() => this.state$.licenses());
  public readonly selectUserLicenseLogs$ = computed(() => this.state$.licenseLogs());
  public readonly selectCurrentLicense$ = computed(() => this.state$.currentSelectedLicense());

  public readonly isLoadingLogs$ = computed(() => this.loadingLogs$() !== 0);
  public readonly isLoadingLicenses$ = computed(() => this.loadingLicenses$() !== 0);
  public readonly isLoadingCreate$ = computed(() => this.loadingCreate$());
  public readonly isLoadingUpdate = computed(() => this.loadingUpdate$() !== 0);
  public readonly isLoadingDelete$ = computed(() => this.loadingDelete$() !== 0);

  public readonly isLoadingAnyLicense$ = computed(() => this.isLoadingLicenses$() || this.isLoadingCreate$() || this.isLoadingUpdate() || this.isLoadingDelete$());

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
      this.loadingDelete$.update(value => value + 1);
    } else {
      this.loadingDelete$.update(value => value - 1);
    }
  }

  public setLoadingLicenseUpdate(loading: boolean) {
    if (loading) {
      this.loadingUpdate$.update(value => value + 1);
    } else {
      this.loadingUpdate$.update(value => value - 1);
    }
  }

  public setLoadingLicenses(loading: boolean) {
    if (loading) {
      this.loadingLicenses$.update(value => value + 1);
    } else {
      this.loadingLicenses$.update(value => value - 1);
    }
  }

  public setLoadingLogs(loading: boolean) {
    if (loading) {
      this.loadingLogs$.update(value => value + 1);
    } else {
      this.loadingLogs$.update(value => value - 1);
    }
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
