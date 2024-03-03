import {Component, effect, OnInit, ViewChild} from '@angular/core';
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
import {LicenseSidenavComponent} from './component/license-sidenav/license-sidenav.component';
import {LicenseSidenavItem} from './component/license-sidenav/license-sidenav-item.interface';
import {RouteStoreService} from './state/route/route.service';
import {RouteStore, toRoute} from './state/route/route-store.service';

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
    TranslateModule,
    LicenseSidenavComponent
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

  @ViewChild('sidenav') sidenav!: LicenseSidenavComponent;

  protected sidenavItems: LicenseSidenavItem[] = [
    {id: 'home', icon: {name: 'home', size: 32}, description: 'Home', selected: true, activity: {count: 0}, disabled: {reason: '', state: false}, group: 'first', hasCustomOrder: false},
    {id: 'license-logs', icon: {name: 'description', size: 32}, description: 'Logs', selected: false, activity: {count: 0}, disabled: {reason: '', state: false}, group: 'first', hasCustomOrder: false},
  ];

  constructor(private readonly oAuthService: OAuthService,
              private readonly tokenService: TokenService,
              private readonly userSettingsFacade: UserSettingsStateFacade,
              private readonly userLicenseStateFacade: UserLicenseStoreFacade,
              private readonly routeStoreService: RouteStoreService,
              private readonly routeStore: RouteStore,
              private readonly router: Router) {

    effect(() => {
      const route = this.routeStore.selectCurrentRoute$();
      this.clearToggle();
      const item = this.sidenavItems.find(value => value.id === route);
      if(!item) return;
      item.selected = true;
    });
  }

  ngOnInit() {
    this.oAuthService.configure(environment.authConfig);
    this.oAuthService.loadDiscoveryDocumentAndLogin().then(() => {
      this.onUserLoggedIn();
      this.userLicenseStateFacade.loadLicensesFromCurrentPublisher();
    }, () => {
      this.routeStoreService.setCurrentRoute('auth-failed');
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

  protected toggleSidenav() {
    this.sidenav.toggle();
  }

  protected sidenavItemClick(item: LicenseSidenavItem) {
    this.clearToggle();
    item.selected = true;
    this.routeStoreService.setCurrentRoute(toRoute(item.id));
  }

  private clearToggle() {
    this.sidenavItems.forEach(value => value.selected = false);
  }
}
