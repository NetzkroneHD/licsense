import {inject, Injectable} from '@angular/core';
import {UserSettingsState} from './user-settings.state';
import {TranslateService} from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class UserSettingsStateFacade {

  private readonly userSettingsState: UserSettingsState = inject(UserSettingsState);
  private readonly translateService: TranslateService = inject(TranslateService);

  public changeLanguage(language: string) {
    this.translateService.use(language).subscribe(value => {
      this.userSettingsState.changeLanguage(language);
    })
  }

}



