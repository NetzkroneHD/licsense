import {Routes} from '@angular/router';
import {HomeComponent} from './view/home/home.component';
import {LicenseDatePickerComponent} from './component/license-date-picker/license-date-picker.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'date', component: LicenseDatePickerComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];
