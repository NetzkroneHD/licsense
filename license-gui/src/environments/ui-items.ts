import {LicenseSidenavItem} from '../app/component/license-sidenav/license-sidenav-item.interface';
import {
    LicenseDropdownMenuItem
} from '../app/component/license-dropdown-menu/license-dropdown-menu-item.interface';

const sidenavItems: LicenseSidenavItem[] = [
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
    }, {
        id: 'admin',
        icon: {name: 'admin_panel_settings', size: 32},
        description: 'Admin',
        selected: false,
        activity: {count: 0},
        disabled: {reason: '', state: false},
        group: 'last',
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
    }];

const changeLanguageDropdownMenu: LicenseDropdownMenuItem[] = [
    {id: 'en', title: 'EN', disabled: false},
    {id: 'de', title: 'DE', disabled: false},
    {id: 'es', title: 'ES', disabled: false}
];

const logoutDropdownMenu: LicenseDropdownMenuItem[] = [
    {id: 'logout', title: 'Logout', disabled: false}
];


export const uiItems = {
    sidenavItems: sidenavItems,
    changeLanguageDropdownMenu: changeLanguageDropdownMenu,
    logoutDropdownMenu: logoutDropdownMenu
}
