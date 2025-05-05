import {computed, inject, Injectable, signal} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {jwtDecode} from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class TokenState {


    private readonly oAuthService: OAuthService = inject(OAuthService);

    private readonly accessToken = signal<string | undefined>(undefined);
    private readonly decodedToken = signal<Record<string, any>>({});
    private readonly roles = signal<string[]>([]);

    public readonly getAccessToken = this.accessToken.asReadonly();
    public readonly getDecodedToken = this.decodedToken.asReadonly();
    public readonly getRoles = this.roles.asReadonly();
    public readonly getIsAdmin = computed(() => this.roles().includes('ROLE_ADMIN'));
    public readonly getIsUser = computed(() => this.roles().includes('ROLE_USER'));

    constructor() {
    }

    public setAccessToken(accessToken: string) {
        this.accessToken.set(accessToken);
        const decodedToken: Record<string, any> = jwtDecode(accessToken);
        this.decodedToken.set(decodedToken);

        if (decodedToken['realm_access'] && decodedToken['realm_access']['roles']) {
            this.roles.set(decodedToken['realm_access']['roles']);
        } else this.roles.set([]);
    }

    public getSub(): string {
        return this.oAuthService.getIdentityClaims()['sub'];
    }

}
