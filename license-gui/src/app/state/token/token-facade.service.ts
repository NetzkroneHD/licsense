import {inject, Injectable} from '@angular/core';
import {TokenState} from './token-state.service';
import {environment} from '../../../environments/environment';
import {Configuration} from '@license/license-api-client-typescript-fetch';

@Injectable({
    providedIn: 'root'
})
export class TokenFacade {

    private readonly tokenState: TokenState = inject(TokenState);

    constructor() {
    }


    public setAccessToken(token: string) {
        environment.apiConfig.config = new Configuration({
            ...environment.apiConfig.config,
            basePath: environment.apiConfig.basePath,
            accessToken: token
        });
        this.tokenState.setAccessToken(token)
    }

    public isAdmin(): boolean {
        return this.tokenState.getRoles().includes('ROLE_ADMIN');
    }

    public isUser(): boolean {
        return this.tokenState.getRoles().includes('ROLE_USER');
    }


}
