import {Component, effect, inject, OnInit, signal, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {environment} from '../environments/environment';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
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
import {RouteState, toRoute} from './state/route/route-state.service';
import {LoginService} from './service/login.service';
import {uiItems} from '../environments/ui-items';
import {UserSettingsState} from './state/user-settings/user-settings-state.service';
import {Theme} from './service/theme.service';
import {TokenState} from './state/token/token-state.service';

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
    protected readonly uiItems = uiItems;

    protected readonly tokenState = inject(TokenState);
    private readonly userSettingsFacade = inject(UserSettingsFacade);
    private readonly userSettingsState = inject(UserSettingsState);
    private readonly routeFacade = inject(RouteFacade);
    private readonly routeState = inject(RouteState);
    private readonly translateService = inject(TranslateService);
    private readonly loginService = inject(LoginService);

    protected readonly themeIcon = signal<string>('light_mode');
    protected readonly sidenavItems = signal<LicenseSidenavItem[]>(uiItems.sidenavItems);

    constructor() {

        effect(() => {
            const route = this.routeState.getCurrentRoute();
            this.clearToggle();
            this.sidenavItems().filter(item => item.id === route).forEach(item => {
                item.selected = true;
            });
        });

        effect(() => {
            if(!this.userSettingsState.getUserLanguage()) return;
            this.sidenavItems.update(sidenavItems => {
                return sidenavItems.map(item => {
                    const translatedItem: LicenseSidenavItem = {
                        ...item,
                        description: this.translateService.instant('sidenavItems.' + item.id),
                    }
                    return translatedItem;
                });
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
        this.routeFacade.setCurrentRoute(toRoute(item.id));
    }

    private clearToggle() {
        this.sidenavItems.update(value => {
            return value.map(item => {
                item.selected = false;
                return item;
            });
        })
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
