import {OAuthService} from 'angular-oauth2-oidc';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {UserLicenseStoreFacade} from '../state/user-license/user-license-store-facade.service';
import {RouteStoreFacade} from '../state/route/route.service';
import {UserSettingsStoreFacade} from '../state/user-settings/user-settings-store-facade.service';
import {TokenService} from '../api/service/token.service';
import {NotificationStoreService} from '../state/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly oAuthService: OAuthService,
              private readonly userLicenseStoreFacade: UserLicenseStoreFacade,
              private readonly routeStoreFacade: RouteStoreFacade,
              private readonly userSettingsStoreFacade: UserSettingsStoreFacade,
              private readonly tokenService: TokenService,
              private readonly notificationFacade: NotificationStoreService) {

  }

  public login() {
    this.oAuthService.configure(environment.authConfig);
    this.oAuthService.loadDiscoveryDocumentAndLogin().then(() => {
      this.onUserLoggedIn();
      this.userLicenseStoreFacade.loadLicensesFromCurrentPublisher();
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
      this.userLicenseStoreFacade.loadLicensesFromCurrentPublisher();
    }
  }

  private authFailed() {
    this.userSettingsStoreFacade.authFailed();
    this.notificationFacade.setError({title: 'Authentication failed', message: undefined}, true);

    this.routeStoreFacade.setCurrentRoute('auth-failed').then();
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

  logout() {
    this.oAuthService.logOut();
  }
}

