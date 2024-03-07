import {Component, effect, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {environment} from '../environments/environment';
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
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LicenseDropdownMenuComponent} from './component/license-dropdown-menu/license-dropdown-menu.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {LicenseDropdownMenuItem} from './component/license-dropdown-menu/license-dropdown-menu-item.interface';
import {UserSettingsStoreFacade} from './state/user-settings/user-settings-store-facade.service';
import {LicenseSidenavComponent} from './component/license-sidenav/license-sidenav.component';
import {LicenseSidenavItem} from './component/license-sidenav/license-sidenav-item.interface';
import {RouteStoreFacade} from './state/route/route.service';
import {RouteStore, toRoute} from './state/route/route-store.service';
import {LoginService} from './service/login.service';

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
    {id: 'en', title: 'EN', disabled: false},
    {id: 'de', title: 'DE', disabled: false},
    {id: 'es', title: 'ES', disabled: false}
  ]

  @ViewChild('sidenav') sidenav!: LicenseSidenavComponent;

  protected sidenavItems: LicenseSidenavItem[] = [
    {
      id: 'home',
      icon: {name: 'home', size: 32},
      description: 'Home',
      selected: true,
      activity: {count: 0},
      disabled: {reason: '', state: false},
      group: 'first',
      hasCustomOrder: false
    },
    {
      id: 'license-logs',
      icon: {name: 'description', size: 32},
      description: 'Logs',
      selected: false,
      activity: {count: 0},
      disabled: {reason: '', state: false},
      group: 'first',
      hasCustomOrder: false
    },
    {
      id: 'signature',
      icon: {name: 'key', size: 32},
      description: 'Signature',
      selected: false,
      activity: {count: 0},
      disabled: {reason: '', state: false},
      group: 'first',
      hasCustomOrder: false
    },
    {
      id: 'settings',
      icon: {name: 'account_circle', size: 32},
      description: 'Account Settings',
      selected: false,
      activity: {count: 0},
      disabled: {reason: '', state: false},
      group: 'last',
      hasCustomOrder: false
    },
  ];

  constructor(private readonly userSettingsFacade: UserSettingsStoreFacade,
              private readonly routeStoreService: RouteStoreFacade,
              private readonly routeStore: RouteStore,
              private readonly translateService: TranslateService,
              private readonly loginService: LoginService) {

    effect(() => {
      const route = this.routeStore.selectCurrentRoute$();
      this.clearToggle();
      this.sidenavItems.filter(item => item.id === route).forEach(item => {
        item.selected = true;
      });
    });

    this.translateService.store.onLangChange.subscribe(() => {
      this.sidenavItems.forEach(item => {
        item.description = this.translateService.instant('sidenavItems.' + item.id);
      });
    });

  }

  ngOnInit() {
    this.loginService.login();
  }

  protected onChangeLanguage(item: LicenseDropdownMenuItem) {
    this.userSettingsFacade.changeLanguage(item.id);
  }

  protected onLogoutClicked(item: LicenseDropdownMenuItem) {
    if (item.id !== 'logout') return;
    this.loginService.logout();
  }

  protected toggleSidenav() {
    this.sidenav.toggle();
  }

  protected sidenavItemClick(item: LicenseSidenavItem) {
    if (item.id === 'settings') {
      window.open(environment.accountSettingsUrl);
      return;
    }
    this.clearToggle();
    item.selected = true;
    this.routeStoreService.setCurrentRoute(toRoute(item.id));
  }

  private clearToggle() {
    this.sidenavItems.forEach(value => value.selected = false);
  }
}
