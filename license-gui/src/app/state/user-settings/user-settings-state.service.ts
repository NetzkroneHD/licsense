import {effect, inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {Theme} from '../../service/theme.service';
import {TokenFacade} from '../token/token-facade.service';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsState {

    private readonly language = signal<string>('en');
    private readonly authFailed = signal<boolean>(false);
    private readonly selectedLicense = signal<undefined | LicenseDto>(undefined);
    private readonly theme = signal<Theme>('light-theme');

    public readonly getUserLanguage = this.language.asReadonly();
    public readonly getAuthFailed = this.authFailed.asReadonly();
    public readonly getSelectedLicense = this.selectedLicense.asReadonly();
    public readonly getTheme = this.theme.asReadonly();

    constructor() {

        effect(() => {
            const lang = this.language();
            if (lang !== '') return;
            localStorage.setItem(environment.userSettingsKey, JSON.stringify(lang));
        });

        effect(() => {
            const theme = this.theme();
            localStorage.setItem(`${environment.userSettingsKey}-theme`, theme);
        });
    }

    public setLanguage(language: string) {
        this.language.set(language);
    }

    public setAuthFailed(authFailed: boolean) {
        this.authFailed.set(authFailed);
    }

    public setTheme(theme: Theme) {
        this.theme.set(theme);
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

export const canEnterAdminRoutes: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    tokenFacade = inject(TokenFacade)
) => {
    return tokenFacade.isAdmin();
}
