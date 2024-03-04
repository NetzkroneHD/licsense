import {Routes} from '@angular/router';
import {HomeComponent} from './view/home/home.component';
import {AuthFailedComponent} from './view/auth-failed/auth-failed.component';
import {LicenseLogComponent} from './view/license-log/license-log.component';
import {SignatureComponent} from './view/signature/signature.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'auth-failed', component: AuthFailedComponent},
  {path: 'license-logs', component: LicenseLogComponent},
  {path: 'signature', component: SignatureComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
