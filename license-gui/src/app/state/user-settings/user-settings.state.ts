import {patchState, signalState} from '@ngrx/signals';
import {computed, Injectable} from '@angular/core';

export interface UserSettings {
  language: string;
}

export const initialState: UserSettings = {
  language: 'en',
}

@Injectable({
  providedIn: 'root'
})
export class UserSettingsState {

  state = signalState<UserSettings>(initialState);

  selectUserLanguage$ = computed(() => this.state.language());

  constructor() {

  }

  public changeLanguage(language: string) {
    patchState(this.state, (state) => ({
      ...state,
      language: language
    }));
  }

}
