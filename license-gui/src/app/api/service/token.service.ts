import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Configuration} from '@license/license-api-client-typescript-fetch';
import {jwtDecode} from 'jwt-decode';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private readonly oAuthService: OAuthService = inject(OAuthService);

    constructor() {
    }

    public setAccessToken(token: string) {
        environment.apiConfig.config = new Configuration({
            ...environment.apiConfig.config,
            basePath: environment.apiConfig.basePath,
            accessToken: token
        });
    }

    public getSub(): string {
        return this.oAuthService.getIdentityClaims()['sub'];
    }


    public getRoles(): string[] {
        const accessToken = this.oAuthService.getAccessToken();
        if(!accessToken) return [];

        const decodedToken: Record<string, any> = jwtDecode(accessToken);
        if (decodedToken['realm_access'] && decodedToken['realm_access']['roles']) {
            return decodedToken['realm_access']['roles'];
        }
        return [];
    }

    public isAdmin(): boolean {
        const roles = this.oAuthService.getCustomTokenResponseProperty('realm_access')['roles'];
        if (roles === undefined) {
            return false;
        }
        return roles.includes('ROLE_ADMIN');
    }


}
