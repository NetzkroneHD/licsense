import {patchState, signalState} from '@ngrx/signals';
import {computed, Injectable} from '@angular/core';

export type ToasterMessage = {
  title: string | undefined,
  message: string | undefined
}

export interface ToasterState {
  info: ToasterMessage,
  success: ToasterMessage,
  warn: ToasterMessage,
  error: ToasterMessage,
}

export const initialState: ToasterState = {
  info: {title: undefined, message: undefined},
  success: {title: undefined, message: undefined},
  warn: {title: undefined, message: undefined},
  error: {title: undefined, message: undefined},
}

@Injectable({
  providedIn: 'root'
})
export class NotificationStore {

  state$ = signalState<ToasterState>(initialState);

  selectInfo$ = computed(() => this.state$.info());
  selectSuccess$ = computed(() => this.state$.success());
  selectWarn$ = computed(() => this.state$.warn());
  selectError$ = computed(() => this.state$.error());

  constructor() {

  }

  public setInfo(info: ToasterMessage) {
    patchState(this.state$, (state) => ({
      ...state,
      info: info
    }));
  }

  public setSuccess(success: ToasterMessage) {
    patchState(this.state$, (state) => ({
      ...state,
      success: success
    }));
  }

  public setWarn(warn: ToasterMessage) {
    patchState(this.state$, (state) => ({
      ...state,
      warn: warn
    }));
  }

  public setError(error: ToasterMessage) {
    patchState(this.state$, (state) => ({
      ...state,
      error: error
    }));
  }

}
