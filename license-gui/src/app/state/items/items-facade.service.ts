import {effect, inject, Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserSettingsState} from '../user-settings/user-settings-state.service';
import {LicenseSidenavItem} from '../../component/license-sidenav/license-sidenav-item.interface';
import {
    LicenseDropdownMenuItem
} from '../../component/license-dropdown-menu/license-dropdown-menu-item.interface';
import {RouteState} from '../route/route-state.service';
import {TokenState} from '../token/token-state.service';


@Injectable({
    providedIn: 'root'
})
export class ItemsFacade {

    private readonly translateService = inject(TranslateService);
    private readonly userSettingsState = inject(UserSettingsState);
    private readonly tokenState = inject(TokenState);
    private readonly routeState = inject(RouteState);

    private readonly sidenavItems = signal<LicenseSidenavItem[]>(defaultSidenavItems);
    private readonly changeLanguageDropdownMenu = signal<LicenseDropdownMenuItem[]>(defaultChangeLanguageDropdownMenu);
    private readonly logoutDropdownMenu = signal<LicenseDropdownMenuItem[]>(defaultLogoutDropdownMenu);

    public readonly getSidenavItems = this.sidenavItems.asReadonly();
    public readonly getChangeLanguageDropdownMenu = this.changeLanguageDropdownMenu.asReadonly();
    public readonly getLogoutDropdownMenu = this.logoutDropdownMenu.asReadonly();

    constructor() {
        effect(() => {
            const lang = this.userSettingsState.getLanguage();
            if (!lang) return;
            this.translateSidenavItems();
            this.translateChangeLanguageDropdownMenu();
            this.translateLogoutDropdownMenu();
        });

        effect(() => {
            const route = this.routeState.getCurrentRoute();
            this.selectSidenavItem(route);
        });

        effect(() => {
            const isAdmin = this.tokenState.getIsAdmin();
            const lang = this.userSettingsState.getLanguage();
            if (!lang) return;
            this.sidenavItems.update(items => {
                return items.map(item => {
                    if(item.id === 'admin') {
                        return {
                            ...item,
                            disabled: {
                                reason: this.translateService.instant('state.items.only-for-admins'),
                                state: !isAdmin
                            }
                        }
                    }
                    return item;
                });
            });
        });

    }

    public selectSidenavItem(id: string) {
        this.sidenavItems.update((items => {
            return items.map(item => {
                const sidenavItem: LicenseSidenavItem = {
                    ...item,
                    selected: (item.id === id)
                };
                return sidenavItem;
            });
        }));
    }

    public translateSidenavItems() {
        this.sidenavItems.update((items => {
            return items.map(item => {
                const translatedItem: LicenseSidenavItem = {
                    ...item,
                    description: this.translateService.instant('sidenavItems.' + item.id),
                }
                return translatedItem;
            })
        }));
    }

    public translateChangeLanguageDropdownMenu() {
        this.changeLanguageDropdownMenu.update(items => {
            return items.map(item => {
                if (!item.title) return item;
                const translatedItem: LicenseDropdownMenuItem = {
                    ...item,
                    title: this.translateService.instant('state.items.change-language.'+item.id),
                }
                return translatedItem;
            })
        });
    }

    public translateLogoutDropdownMenu() {
        this.logoutDropdownMenu.update(items => {
            return items.map(item => {
                if (!item.title) return item;
                const translatedItem: LicenseDropdownMenuItem = {
                    ...item,
                    title: this.translateService.instant(this.translateService.instant('state.items.logout.'+item.id)),
                }
                return translatedItem;
            });
        });
    }

}

const defaultSidenavItems: LicenseSidenavItem[] = [
    {
        id: 'home',
        icon: {name: 'home', size: 32},
        description: 'Home',
        selected: true,
        activity: undefined,
        disabled: {reason: '', state: false},
        group: 'first',
        hasCustomOrder: false
    },
    {
        id: 'license-logs',
        icon: {name: 'description', size: 32},
        description: 'Logs',
        selected: false,
        activity: undefined,
        disabled: {reason: '', state: false},
        group: 'first',
        hasCustomOrder: false
    },
    {
        id: 'monitoring',
        icon: {name: 'query_stats', size: 32},
        description: 'Monitoring',
        selected: false,
        activity: undefined,
        disabled: {reason: '', state: false},
        group: 'first',
        hasCustomOrder: false
    },
    {
        id: 'signature',
        icon: {name: 'key', size: 32},
        description: 'Signature',
        selected: false,
        activity: undefined,
        disabled: {reason: '', state: false},
        group: 'first',
        hasCustomOrder: false
    },
    {
        id: 'admin',
        icon: {name: 'admin_panel_settings', size: 32},
        description: 'Admin',
        selected: false,
        activity: undefined,
        disabled: {reason: '', state: false},
        group: 'last',
        hasCustomOrder: false
    },
    {
        id: 'settings',
        icon: {name: 'account_circle', size: 32},
        description: 'Account Settings',
        selected: false,
        activity: undefined,
        disabled: {reason: '', state: false},
        group: 'last',
        hasCustomOrder: false
    }];

const defaultChangeLanguageDropdownMenu: LicenseDropdownMenuItem[] = [
    {id: 'en', title: 'EN', disabled: false},
    {id: 'de', title: 'DE', disabled: false},
    {id: 'es', title: 'ES', disabled: false}
];

const defaultLogoutDropdownMenu: LicenseDropdownMenuItem[] = [
    {id: 'logout', title: 'Logout', disabled: false}
];


