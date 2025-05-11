import {Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {environment} from '../environments/environment';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {
    LicenseDropdownMenuComponent
} from './component/license-dropdown-menu/license-dropdown-menu.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {
    LicenseDropdownMenuItem
} from './component/license-dropdown-menu/license-dropdown-menu-item.interface';
import {UserSettingsFacade} from './state/user-settings/user-settings-facade.service';
import {LicenseSidenavComponent} from './component/license-sidenav/license-sidenav.component';
import {LicenseSidenavItem} from './component/license-sidenav/license-sidenav-item.interface';
import {RouteFacade} from './state/route/route-facade.service';
import {toRoute} from './state/route/route-state.service';
import {LoginService} from './service/login.service';
import {UserSettingsState} from './state/user-settings/user-settings-state.service';
import {Theme} from './service/theme.service';
import {ItemsFacade} from './state/items/items-facade.service';

@Component({
    selector: 'app-root',
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

    @ViewChild('sidenav') sidenav!: LicenseSidenavComponent;
    protected readonly title = environment.title;

    protected readonly itemsFacade = inject(ItemsFacade);
    private readonly userSettingsFacade = inject(UserSettingsFacade);
    private readonly userSettingsState = inject(UserSettingsState);
    private readonly routeFacade = inject(RouteFacade);
    private readonly loginService = inject(LoginService);

    protected readonly themeIcon = signal<string>('light_mode');

    constructor() {

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
        this.routeFacade.setCurrentRoute(toRoute(item.id));
    }

    public onChangeTheme() {
        const currentTheme: Theme = this.userSettingsState.getTheme();
        if (currentTheme === 'light-theme') {
            this.userSettingsFacade.setTheme('dark-theme');
            this.themeIcon.set('dark_mode');
        } else {
            this.userSettingsFacade.setTheme('light-theme');
            this.themeIcon.set('light_mode');
        }
    }
}
