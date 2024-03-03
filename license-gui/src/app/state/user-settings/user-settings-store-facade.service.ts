import {inject, Injectable} from '@angular/core';
import {UserSettingsStore} from './user-settings-store.service';
import {TranslateService} from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class UserSettingsStoreFacade {

  private readonly userSettingsState: UserSettingsStore = inject(UserSettingsStore);
  private readonly translateService: TranslateService = inject(TranslateService);

  public changeLanguage(language: string) {
    this.translateService.use(language).subscribe(value => {
      console.log("changeLanguage", value)
      this.userSettingsState.changeLanguage(language);
    })
  }

}



