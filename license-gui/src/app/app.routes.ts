import {Routes} from '@angular/router';
import {HomeComponent} from './view/home/home.component';
import {AuthFailedComponent} from './view/auth-failed/auth-failed.component';
import {LicenseLogComponent} from './view/license-log/license-log.component';
import {SignatureComponent} from './view/signature/signature.component';
import {
    canEnterAdminRoutes,
    canEnterAuthFailed,
    canEnterRoutes
} from './state/user-settings/user-settings-state.service';
import {AdminComponent} from './view/admin/admin.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent, canActivate: [canEnterRoutes]},
    {path: 'auth-failed', component: AuthFailedComponent, canActivate: [canEnterAuthFailed]},
    {path: 'license-logs', component: LicenseLogComponent, canActivate: [canEnterRoutes]},
    {path: 'signature', component: SignatureComponent, canActivate: [canEnterRoutes]},
    {path: 'admin', component: AdminComponent, canActivate: [canEnterAdminRoutes]},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
