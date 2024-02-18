import {Routes} from '@angular/router';
import {HomeComponent} from './view/home/home.component';
import {AuthFailedComponent} from './view/auth-failed/auth-failed.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'auth-failed', component: AuthFailedComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
