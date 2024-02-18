import {createActionGroup, props} from '@ngrx/store';

export const changeLanguage = createActionGroup({
  source: "[UserSettings.changeLanguage] change the language",
  events: {
    "do": props<{ language: string }>(),
    "success": props<{ message: string }>(),
    "error": props<{ error: string }>()
  }
})
