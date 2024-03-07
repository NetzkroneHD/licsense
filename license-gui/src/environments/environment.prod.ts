import * as pkg from '../../package.json';
import {Configuration} from '@license/license-api-client-typescript-fetch';
import {AuthConfig} from 'angular-oauth2-oidc';
import {MatDateFormats} from '@angular/material/core';
import {HTTPHeaders} from '@license/license-api-client-typescript-fetch/src/runtime';

const momentDateAdapter: MatDateFormats = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM-YYYY',
  }
}

const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8082/realms/license',
  requireHttps: false,
  redirectUri: window.location.origin,
  clientId: 'license-client',
  responseType: 'code',
  scope: 'openid',
  showDebugInformation: true,
}


const headers: HTTPHeaders = {
  'Access-Control-Allow-Origin': '*',
}

export const apiConfig: Configuration = new Configuration({
  basePath: "http://localhost:8080/api/v1".replace(/\/+$/, ""),
  headers: headers
});

export const environment = {
  title: 'License Client (' + pkg.version + ')',
  production: true,
  authConfig: authCodeFlowConfig,
  apiConfig: apiConfig,
  momentDateAdapter: momentDateAdapter,
  accountSettingsUrl: new URL('http://localhost:8082/realms/license/account'),
  userSettingsKey: 'license.userSettings'
};
