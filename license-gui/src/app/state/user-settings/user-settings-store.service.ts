import {effect, inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsStore {

  private readonly language = signal<string>('');
  private readonly authFailed = signal<boolean>(false);

  public readonly getUserLanguage = this.language.asReadonly();
  public readonly getAuthFailed = this.authFailed.asReadonly();

  constructor() {

    effect(() => {
      const lang = this.language();
      if(lang !== '') return;
      localStorage.setItem(environment.userSettingsKey, JSON.stringify(lang));
    });
  }

  public setLanguage(language: string) {
    this.language.set(language);
  }

  public setAuthFailed(authFailed: boolean) {
    this.authFailed.set(authFailed);
  }

}


export const canEnterAuthFailed: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  settingsStore = inject(UserSettingsStore)
) => {
  return settingsStore.getAuthFailed();
}

export const canEnterRoutes: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  settingsStore = inject(UserSettingsStore)
) => {
  return !settingsStore.getAuthFailed();
}
