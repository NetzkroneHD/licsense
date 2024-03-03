import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {TokenService} from './api/service/token.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent
} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {LicenseDropdownMenuComponent} from './component/license-dropdown-menu/license-dropdown-menu.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {LicenseDropdownMenuItem} from './component/license-dropdown-menu/license-dropdown-menu-item.interface';
import {UserSettingsStateFacade} from './state/user-settings/user-settings-state-facade.service';
import {UserLicenseStoreFacade} from './state/user-license/user-license-store-facade.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbar,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    RouterOutlet,
    MatDrawerContainer,
    MatButton,
    MatDrawer,
    MatIconButton,
    MatIcon,
    LicenseDropdownMenuComponent,
    MatMenuTrigger,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  protected readonly title = environment.title;

  protected readonly dropdownMenu: LicenseDropdownMenuItem[] = [
    {
      id: 'en',
      title: 'EN',
      disabled: false
    },
    {
      id: 'de',
      title: 'DE',
      disabled: false
    }
  ]

  protected expanded = true;

  @ViewChild('expanded') expandedDrawer!: MatDrawer;

  constructor(private readonly oAuthService: OAuthService,
              private readonly tokenService: TokenService,
              private readonly router: Router,
              private readonly userSettingsFacade: UserSettingsStateFacade,
              private readonly userLicenseStateFacade: UserLicenseStoreFacade) {

  }

  ngOnInit() {
    this.oAuthService.configure(environment.authConfig);
    this.oAuthService.loadDiscoveryDocumentAndLogin().then(() => {
      this.onUserLoggedIn();
      this.userLicenseStateFacade.loadLicensesFromCurrentPublisher();
    }, () => {
      this.router.navigate(['auth-failed']).then();
    });

    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.events.subscribe(event => {
      if (event.type !== 'token_refreshed') {
        return;
      }
      this.tokenService.setAccessToken(this.oAuthService.getAccessToken());
    });

    if(this.oAuthService.getIdentityClaims()) {
      this.tokenService.setAccessToken(this.oAuthService.getAccessToken());
      this.userLicenseStateFacade.loadLicensesFromCurrentPublisher();
    }

  }

  protected onUserLoggedIn() {
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

  protected onChangeLanguage(item: LicenseDropdownMenuItem) {
    this.userSettingsFacade.changeLanguage(item.id);
  }

  protected onLogoutClicked(item: LicenseDropdownMenuItem) {
    if (item.id !== 'logout') return;
    this.oAuthService.logOut();
  }

  toggleSidenav() {
    this.expandedDrawer.toggle();
  }

}
