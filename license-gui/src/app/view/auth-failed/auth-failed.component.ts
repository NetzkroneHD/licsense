import {Component, inject} from '@angular/core';
import {LoginService} from '../../service/login.service';
import {MatButton} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';

@Component({
    selector: 'license-auth-failed',
    imports: [
        MatButton,
        TranslateModule
    ],
    templateUrl: './auth-failed.component.html',
    styleUrl: './auth-failed.component.scss'
})
export class AuthFailedComponent {

  private readonly loginService = inject(LoginService);

  protected retry() {
    this.loginService.login();
  }

}
