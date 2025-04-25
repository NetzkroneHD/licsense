import {effect, inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsState {

    private readonly language = signal<string>('en');
    private readonly authFailed = signal<boolean>(false);
    private readonly selectedLicense = signal<undefined | LicenseDto>(undefined);

    public readonly getUserLanguage = this.language.asReadonly();
    public readonly getAuthFailed = this.authFailed.asReadonly();
    public readonly getSelectedLicense = this.selectedLicense.asReadonly();

    constructor() {

        effect(() => {
            const lang = this.language();
            if (lang !== '') return;
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
    settingsStore = inject(UserSettingsState)
) => {
    return settingsStore.getAuthFailed();
}

export const canEnterRoutes: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    settingsStore = inject(UserSettingsState)
) => {
    return !settingsStore.getAuthFailed();
}
