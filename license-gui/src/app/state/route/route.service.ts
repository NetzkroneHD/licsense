import {inject, Injectable} from '@angular/core';
import {Route, RouteStore, toRoute} from './route-store.service';
import {NavigationEnd, Router} from '@angular/router';
import {UserLicenseStoreFacade} from '../user-license/user-license-store-facade.service';
import {UserLicenseStore} from '../user-license/user-license-store.service';


@Injectable({
    providedIn: 'root'
})
export class RouteStoreFacade {

    private readonly routeStore = inject(RouteStore);
    private readonly router = inject(Router);
    private readonly userLicenseStoreFacade = inject(UserLicenseStoreFacade);
    private readonly userLicenseStore = inject(UserLicenseStore);

    constructor() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.routeStore.setCurrentRoute(toRoute(event.url));
            }
        });
    }

    public setCurrentRoute(route: Route) {
        return this.router.navigate([route]);
    }

    public navigateToLicenseLogs() {
        this.setCurrentRoute('license-logs').then(() => this.userLicenseStoreFacade.loadLogs(this.userLicenseStore.getCurrentLicense()));
    }


}



