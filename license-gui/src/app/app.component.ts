import {Component, effect, inject, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {environment} from '../environments/environment';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
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
import {uiItems} from '../environments/ui-items';
import {UserSettingsStore} from './state/user-settings/user-settings-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbar,
    RouterOutlet,
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

  @ViewChild('sidenav') sidenav!: LicenseSidenavComponent;

  private readonly userSettingsFacade = inject(UserSettingsStoreFacade);
  private readonly userSettingsStore = inject(UserSettingsStore);
  private readonly routeStoreService = inject(RouteStoreFacade);
  private readonly routeStore = inject(RouteStore);
  private readonly translateService = inject(TranslateService);
  private readonly loginService = inject(LoginService);

  constructor() {

    effect(() => {
      const route = this.routeStore.getCurrentRoute();
      this.clearToggle();
      uiItems.sidenavItems.filter(item => item.id === route).forEach(item => {
        item.selected = true;
      });
    });

    effect(() => {
      this.userSettingsStore.getUserLanguage();
      uiItems.sidenavItems.forEach(item => {
        item.description = this.translateService.instant('sidenavItems.' + item.id);
      });
      uiItems.homeContextMenuItems.forEach(item => {
        item.title = this.translateService.instant('home.contextMenuItems.' + item.id);
      });
      uiItems.logoutDropdownMenu.forEach(item => {
        if (!item.title) return;
        item.title = this.translateService.instant(item.id);
      })
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
    uiItems.sidenavItems.forEach(value => value.selected = false);
  }

  protected readonly uiItems = uiItems;
}
