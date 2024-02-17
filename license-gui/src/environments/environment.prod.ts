import * as pkg from '../../package.json';
import {Configuration} from '@license/license-api-client-typescript-fetch';
import {AuthConfig} from 'angular-oauth2-oidc';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8082/realms/license',
  requireHttps: false,
  redirectUri: window.location.origin + '/home',
  clientId: 'license-client',
  responseType: 'code',
  scope: 'openid',
  showDebugInformation: true
}

export const apiConfig: Configuration = new Configuration({
  basePath: "http://localhost:8080/api/v1".replace(/\/+$/, ""),
});

export const environment = {
  title: 'License Client (' + pkg.version + ')',
  production: false,
  authConfig: authCodeFlowConfig,
  apiConfig: apiConfig,
}
