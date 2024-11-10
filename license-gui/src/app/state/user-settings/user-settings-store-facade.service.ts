import {inject, Injectable} from '@angular/core';
import {UserSettingsStore} from './user-settings-store.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsStoreFacade {

  private readonly userSettingsState: UserSettingsStore = inject(UserSettingsStore);
  private readonly translateService: TranslateService = inject(TranslateService);

  constructor() {
    this.translateService.onDefaultLangChange.subscribe(value => {
      this.userSettingsState.setLanguage(value.lang);
    });
    this.translateService.onLangChange.subscribe(value => {
      this.userSettingsState.setLanguage(value.lang);
    });

    let userLanguage = localStorage.getItem(environment.userSettingsKey);
    if(userLanguage) {
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
