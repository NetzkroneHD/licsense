import {patchState, signalState} from '@ngrx/signals';
import {computed, Injectable} from '@angular/core';

export type Route = 'home' | 'license-logs' | 'auth-failed';

export interface RouteState {
  currentRoute: Route,
}

export function toRoute(path: string): Route {
  const cleanedPath = path.replace(/^\//, '');
  switch (cleanedPath) {
        case 'home':
        case 'license-logs':
        case 'auth-failed':
            return cleanedPath as Route;
        default:
            return 'home';
    }
}

export const initialState: RouteState = {
  currentRoute: 'home'
}

@Injectable({
  providedIn: 'root'
})
export class RouteStore {

  state$ = signalState<RouteState>(initialState);

  selectCurrentRoute$ = computed(() => this.state$.currentRoute());

  constructor() {

  }

  public setCurrentRoute(route: Route) {
    patchState(this.state$, (state) => ({
      ...state,
      currentRoute: route
    }));
  }

}
