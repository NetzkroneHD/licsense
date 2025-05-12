import {OAuthService} from 'angular-oauth2-oidc';
import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {UserLicenseFacade} from '../state/user-license/user-license-facade.service';
import {RouteFacade} from '../state/route/route-facade.service';
import {UserSettingsFacade} from '../state/user-settings/user-settings-facade.service';
import {NotificationFacade} from '../state/notification/notification-facade.service';
import {TokenFacade} from '../state/token/token-facade.service';
import {TokenState} from '../state/token/token-state.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private readonly oAuthService: OAuthService = inject(OAuthService);
    private readonly userLicenseFacade: UserLicenseFacade = inject(UserLicenseFacade);
    private readonly routeFacade: RouteFacade = inject(RouteFacade);
    private readonly userSettingsFacade: UserSettingsFacade = inject(UserSettingsFacade);
    private readonly notificationFacade: NotificationFacade = inject(NotificationFacade);
    private readonly tokenFacade: TokenFacade = inject(TokenFacade);
    private readonly tokenState: TokenState = inject(TokenState);

    public login() {
        this.oAuthService.configure(environment.authConfig);
        this.oAuthService.loadDiscoveryDocumentAndLogin().then(() => {
            this.onUserLoggedIn();
            this.userLicenseFacade.setSelectedPublisher(this.tokenState.getSub());
            this.userLicenseFacade.loadLicensesFromCurrentPublisher();
        }).catch(() => {
            this.authFailed()
        });

        this.oAuthService.setupAutomaticSilentRefresh();
        this.oAuthService.events.subscribe(event => {
            if (event.type !== 'token_refreshed') {
                return;
            }
            this.tokenFacade.setAccessToken(this.oAuthService.getAccessToken());
        });

        if (this.oAuthService.getIdentityClaims()) {
            this.tokenFacade.setAccessToken(this.oAuthService.getAccessToken())
            this.userLicenseFacade.setSelectedPublisher(this.tokenState.getSub());
            this.userLicenseFacade.loadLicensesFromCurrentPublisher();
        }
    }

    public logout() {
        this.oAuthService.logOut();
    }

    private authFailed() {
        this.userSettingsFacade.authFailed();
        this.notificationFacade.setMessage({
            title: 'service.login.error',
            message: undefined,
            type: 'ERROR'
        }, true);

        this.routeFacade.setCurrentRoute('auth-failed').then();
    }

    private onUserLoggedIn() {
        const identityClaims = this.oAuthService.getIdentityClaims();
        if (!identityClaims) {
            console.error("Login failed. No Claim available.");
            return;
        }
    }
}

