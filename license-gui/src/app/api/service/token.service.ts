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
    private decodedJwt: Record<string, any> = {};

    constructor() {
    }

    public setAccessToken(token: string) {
        environment.apiConfig.config = new Configuration({
            ...environment.apiConfig.config,
            basePath: environment.apiConfig.basePath,
            accessToken: token
        });
        this.decodedJwt = jwtDecode(token);
    }

    public getSub(): string {
        console.log('getRoles', this.getRoles())
        return this.oAuthService.getIdentityClaims()['sub'];
    }

    public getRoles(): string[] {
        if (this.decodedJwt['realm_access'] && this.decodedJwt['realm_access']['roles']) {
            return this.decodedJwt['realm_access']['roles'];
        }
        return [];
    }

    public isAdmin(): boolean {
        return this.getRoles().includes('ROLE_ADMIN');
    }


}
