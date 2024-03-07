import {patchState, signalState} from '@ngrx/signals';
import {computed, effect, inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';

export interface UserSettingsState {
  language: string,
  authFailed: boolean
}

export const initialState: UserSettingsState = {
  language: 'en',
  authFailed: false
}


@Injectable({
  providedIn: 'root'
})
export class UserSettingsStore {

  state$ = signalState<UserSettingsState>(initialState);

  selectUserLanguage$ = computed(() => this.state$.language());
  selectAuthFailed$ = computed(() => this.state$.authFailed());

  constructor() {

    effect(() => {
      const state = this.state$();
      localStorage.setItem(environment.userSettingsKey, JSON.stringify(state));
    });
  }

  public changeLanguage(language: string) {
    patchState(this.state$, (state) => ({
      ...state,
      language: language
    }));
  }

  public setAuthFailed(authFailed: boolean) {
    patchState(this.state$, (state) => ({
      ...state,
      authFailed: authFailed
    }));
  }

}


export const canEnterAuthFailed: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  settingsStore = inject(UserSettingsStore)
) => {
  return settingsStore.selectAuthFailed$();
}

export const canEnterRoutes: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  settingsStore = inject(UserSettingsStore)
) => {
  return !settingsStore.selectAuthFailed$();
}
