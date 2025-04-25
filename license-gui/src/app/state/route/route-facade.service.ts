import {inject, Injectable} from '@angular/core';
import {Route, RouteState, toRoute} from './route-state.service';
import {NavigationEnd, Router} from '@angular/router';
import {UserLicenseFacade} from '../user-license/user-license-facade.service';
import {UserLicenseState} from '../user-license/user-license-state.service';


@Injectable({
    providedIn: 'root'
})
export class RouteFacade {

    private readonly routeState = inject(RouteState);
    private readonly router = inject(Router);
    private readonly userLicenseFacade = inject(UserLicenseFacade);
    private readonly userLicenseState = inject(UserLicenseState);

    constructor() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.routeState.setCurrentRoute(toRoute(event.url));
            }
        });
    }

    public setCurrentRoute(route: Route) {
        return this.router.navigate([route]);
    }

    public navigateToLicenseLogs() {
        this.setCurrentRoute('license-logs').then(() => this.userLicenseFacade.loadLogs(this.userLicenseState.getCurrentLicense()));
    }


}



