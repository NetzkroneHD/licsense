import {ApplicationConfig, importProvidersFrom} from '@angular/core';
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
import {PublisherApiAdapter} from './api/service/adapter/publisher-api-adapter.service';
import {LicenseApiAdapter} from './api/service/adapter/license-api-adapter.service';
import {LicenseCheckApiAdapter} from './api/service/adapter/license-check-api-adapter.service';
import {TranslatedMatPaginatorIntl} from '../assets/i18n/translated-mat-paginator-intl.service';
import {MatPaginatorIntl} from '@angular/material/paginator';

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
    importProvidersFrom([
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
    ]),
    {provide: MatPaginatorIntl, useClass: TranslatedMatPaginatorIntl},
    {
      provide: LicenseApi,
      useValue: new LicenseApiAdapter()
    },
    {
      provide: LicenseCheckApi,
      useValue: new LicenseCheckApiAdapter(),
    },
    {
      provide: PublisherApi,
      useValue: new PublisherApiAdapter()
    }
  ]
};
