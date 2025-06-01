import {inject, Injectable} from '@angular/core';
import {UserSettingsState} from './user-settings-state.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {Theme, ThemeService} from '../../service/theme.service';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsFacade {

    private readonly userSettingsState: UserSettingsState = inject(UserSettingsState);
    private readonly translateService: TranslateService = inject(TranslateService);
    private readonly themeService: ThemeService = inject(ThemeService);

    constructor() {
        this.translateService.onDefaultLangChange.subscribe(value => {
            this.userSettingsState.setLanguage(value.lang);
        });
        this.translateService.onLangChange.subscribe(value => {
            this.userSettingsState.setLanguage(value.lang);
        });

        const userLanguage = localStorage.getItem(environment.userSettingsKey);
        if (userLanguage) {
            this.changeLanguage(userLanguage);
        }

        const theme = localStorage.getItem(`${environment.userSettingsKey}-theme`);
        if (theme && (theme === 'light-theme' || theme === 'dark-theme')) {
            this.setTheme(theme)
        }
    }

    public authFailed() {
        this.userSettingsState.setAuthFailed(true);
    }

    public changeLanguage(language: string) {
        this.translateService.use(language);
    }

    public setTheme(theme: Theme) {
        this.themeService.changeTheme(theme);
        this.userSettingsState.setTheme(theme);
    }

}
