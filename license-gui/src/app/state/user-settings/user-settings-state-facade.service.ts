import {inject, Injectable} from '@angular/core';
import {UserSettingsState} from './user-settings.state';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import * as UserSettingsActions from './user-settings.action';


@Injectable({
  providedIn: 'root'
})
export class UserSettingsStateFacade {

  private readonly userSettingsState: UserSettingsState = inject(UserSettingsState);

  private readonly translateService: TranslateService = inject(TranslateService);

  private readonly store: Store = inject(Store);

  public changeLanguage(language: string) {
    this.store.dispatch(UserSettingsActions.changeLanguage.do({language: language}));
  }

}



