import {OAuthService} from 'angular-oauth2-oidc';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {UserLicenseFacade} from '../state/user-license/user-license-facade.service';
import {RouteFacade} from '../state/route/route-facade.service';
import {UserSettingsFacade} from '../state/user-settings/user-settings-facade.service';
import {TokenService} from '../api/service/token.service';
import {NotificationFacade} from '../state/notification/notification-facade.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private readonly oAuthService: OAuthService,
                private readonly userLicenseFacade: UserLicenseFacade,
                private readonly routeFacade: RouteFacade,
                private readonly userSettingsFacade: UserSettingsFacade,
                private readonly tokenService: TokenService,
                private readonly notificationFacade: NotificationFacade) {

    }

    public login() {
        this.oAuthService.configure(environment.authConfig);
        this.oAuthService.loadDiscoveryDocumentAndLogin().then(() => {
            this.onUserLoggedIn();
            this.userLicenseFacade.loadLicensesFromCurrentPublisher();
        }).catch(() => {
            this.authFailed()
        });

        this.oAuthService.setupAutomaticSilentRefresh();
        this.oAuthService.events.subscribe(event => {
            if (event.type !== 'token_refreshed') {
                return;
            }
            this.tokenService.setAccessToken(this.oAuthService.getAccessToken());
        });

        if (this.oAuthService.getIdentityClaims()) {
            this.tokenService.setAccessToken(this.oAuthService.getAccessToken());
            this.userLicenseFacade.loadLicensesFromCurrentPublisher();
        }
    }

    logout() {
        this.oAuthService.logOut();
    }

    private authFailed() {
        this.userSettingsFacade.authFailed();
        this.notificationFacade.setMessage({
            title: 'Authentication failed',
            message: undefined,
            type: 'ERROR'
        }, true);

        this.routeFacade.setCurrentRoute('auth-failed').then();
    }

    private onUserLoggedIn() {
        const identityClaims = this.oAuthService.getIdentityClaims();
        if (!identityClaims) {
            console.log("Login failed. No Claim available.");
            return;
        }

        const username = this.oAuthService.getIdentityClaims()['preferred_username'];
        const jwt = JSON.parse(atob(this.oAuthService.getAccessToken().split('.')[1]));
        console.log("username", username);
        console.log("jwt", jwt);
        console.log("roles", jwt['realm_access']['roles'])
    }
}

