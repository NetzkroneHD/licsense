import {inject, Injectable} from '@angular/core';
import {UserSettingsState} from './user-settings-state.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsFacade {

    private readonly userSettingsState: UserSettingsState = inject(UserSettingsState);
    private readonly translateService: TranslateService = inject(TranslateService);

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
    }

    public authFailed() {
        this.userSettingsState.setAuthFailed(true);
    }

    public changeLanguage(language: string) {
        this.translateService.use(language);
    }

}
