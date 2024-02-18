import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';

import * as UserSettingsActions from './user-settings.action';
import {UserSettingsState} from './user-settings.state';
import {catchError, map, of, switchMap} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

export const changeLanguage$ = createEffect(
  (
    actions$ = inject(Actions),
    userSettingsState = inject(UserSettingsState),
    translateService = inject(TranslateService)
  ) => {
    return actions$.pipe(
      ofType(UserSettingsActions.changeLanguage.do),
      switchMap(action => translateService.use(action.language).pipe(
        map(value => {
          //TODO
          userSettingsState.changeLanguage(action.language);
          return UserSettingsActions.changeLanguage.success({message: 'Success'})
        }),
        catchError(error => of(UserSettingsActions.changeLanguage.error({error: error})))
      ))
    );
  }, {functional: true, dispatch: true}
);
