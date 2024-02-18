import * as pkg from '../../package.json';
import {Configuration} from '@license/license-api-client-typescript-fetch';
import {AuthConfig} from 'angular-oauth2-oidc';
import {MatDateFormats} from '@angular/material/core';

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
  dummyClientSecret: '7CHdYlPpft8Pnqfg3t90tnmJNqIIM3hi',
  responseType: 'code',
  scope: 'openid',
  showDebugInformation: true,
}

export const apiConfig: Configuration = new Configuration({
  basePath: "http://localhost:8080/api/v1".replace(/\/+$/, ""),
});

export const environment = {
  title: 'License Client - Dev (' + pkg.version + ')',
  production: false,
  authConfig: authCodeFlowConfig,
  apiConfig: apiConfig,
  momentDateAdapter: momentDateAdapter
}
