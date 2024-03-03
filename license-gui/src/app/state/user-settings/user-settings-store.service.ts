import {patchState, signalState} from '@ngrx/signals';
import {computed, Injectable} from '@angular/core';

export interface UserSettingsState {
  language: string;
}

export const initialState: UserSettingsState = {
  language: 'en',
}

@Injectable({
  providedIn: 'root'
})
export class UserSettingsStore {

  state = signalState<UserSettingsState>(initialState);

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
