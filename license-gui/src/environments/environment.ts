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
    issuer: 'http://localhost/auth/realms/license',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin + '/loggedOut',
    clientId: 'license-client',
    responseType: 'code',
    scope: 'openid',
    requireHttps: false,
    showDebugInformation: true,
}

export const apiConfig: Configuration = new Configuration({
    basePath: "http://localhost:4200/license/api/v1".replace(/\/+$/, ""),
});

export const environment = {
    title: 'License Client - Dev (' + pkg.version + ')',
    production: false,
    authConfig: authCodeFlowConfig,
    apiConfig: apiConfig,
    momentDateAdapter: momentDateAdapter,
    accountSettingsUrl: new URL(authCodeFlowConfig.issuer + '/account'),
    userSettingsKey: 'license.userSettings'
};
