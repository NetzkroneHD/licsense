import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {provideOAuthClient} from 'angular-oauth2-oidc';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LicenseApi, LicenseCheckApi, PublisherApi} from '@license/license-api-client-typescript-fetch';
import {environment} from '../environments/environment';
import {provideToastr} from 'ngx-toastr';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideOAuthClient(),
    provideMomentDateAdapter(environment.momentDateAdapter),
    provideToastr({
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
      enableHtml: true,
      positionClass: 'toast-bottom-right',
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }).providers!,
    {
      provide: LicenseApi,
      useValue: new LicenseApi(environment.apiConfig)
    },
    {
      provide: LicenseCheckApi,
      useValue: new LicenseCheckApi(environment.apiConfig),
    },
    {
      provide: PublisherApi,
      useValue: new PublisherApi(environment.apiConfig)
    }
  ]
};
