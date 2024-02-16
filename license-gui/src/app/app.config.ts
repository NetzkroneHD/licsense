import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {provideOAuthClient} from 'angular-oauth2-oidc';
import {LicenseApi, LicenseCheckApi} from '@license/license-api-client-typescript-fetch';
import {environment} from '../environments/environment.prod';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: LicenseApi,
      useValue: new LicenseApi(environment.apiConfig.licenseApi)
    },
    {
      provide: LicenseCheckApi,
      useValue: new LicenseCheckApi(environment.apiConfig.licenseCheckApi),
    }
  ]
};
