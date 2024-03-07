import {inject, Injectable} from '@angular/core';
import {initialState, UserSettingsState, UserSettingsStore} from './user-settings-store.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserSettingsStoreFacade {

  private readonly userSettingsState: UserSettingsStore = inject(UserSettingsStore);
  private readonly translateService: TranslateService = inject(TranslateService);

  constructor() {

    this.translateService.store.onLangChange.subscribe(value => {
      console.log("onLangChange in Facade")
      this.userSettingsState.changeLanguage(value.lang);
    });

    let userSettingsJson = localStorage.getItem(environment.userSettingsKey);
    if (!userSettingsJson) {
      localStorage.setItem(environment.userSettingsKey, JSON.stringify(this.userSettingsState.state$()));
      userSettingsJson = JSON.stringify(this.userSettingsState.state$())
    }

    const parsed = JSON.parse(userSettingsJson);
    if (JSON.stringify(Object.keys(parsed)) !== JSON.stringify(Object.keys(initialState))) {
      localStorage.setItem(environment.userSettingsKey, JSON.stringify(this.userSettingsState.state$()));
      return;
    }

    const userSettings = parsed as UserSettingsState;
    this.changeLanguage(userSettings.language);

  }

  public authFailed() {
    this.userSettingsState.setAuthFailed(true);
  }

  public changeLanguage(language: string) {
    this.translateService.use(language);
  }

}



