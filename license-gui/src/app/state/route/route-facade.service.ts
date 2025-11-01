import {inject, Injectable} from '@angular/core';
import {Route, RouteState, toRoute} from './route-state.service';
import {NavigationEnd, Router} from '@angular/router';
import {UserLicenseFacade} from '../user-license/user-license-facade.service';
import {UserLicenseState} from '../user-license/user-license-state.service';
import {MonitoringFacade} from '../monitoring/monitoring-facade.service';


@Injectable({
    providedIn: 'root'
})
export class RouteFacade {

    private readonly routeState = inject(RouteState);
    private readonly router = inject(Router);
    private readonly userLicenseFacade = inject(UserLicenseFacade);
    private readonly userLicenseState = inject(UserLicenseState);
    private readonly monitoringFacade = inject(MonitoringFacade);

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
        this.setCurrentRoute('license-logs').then(() => {
            const currentLicense = this.userLicenseState.getCurrentLicense();
            if(!currentLicense) return;
            this.userLicenseFacade.loadLogs(currentLicense.licenseKey);
        });
    }

    public navigateToMonitoring() {
        this.setCurrentRoute('monitoring').then(() => {
            const currentLicense = this.userLicenseState.getCurrentLicense();
            if(!currentLicense) return;
            this.monitoringFacade.analyzeLicenseLogs(currentLicense, this.lastMonth(), new Date());
        });
    }


    private lastMonth(): Date {
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        return lastMonthDate;
    }

}



