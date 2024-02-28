import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';

export const updateLicenseLogs = createActionGroup({
  source: "[UserLicense.updateLicenseLogs] update the cached license logs",
  events: {
    "do": props<{licenseLogs: LicenseLogDto[]}>(),
    "success": emptyProps()
  }
});
