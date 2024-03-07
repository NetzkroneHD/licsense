import {Component} from '@angular/core';
import {LoginService} from '../../service/login.service';
import {MatButton} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'license-auth-failed',
  standalone: true,
  imports: [
    MatButton,
    TranslateModule
  ],
  templateUrl: './auth-failed.component.html',
  styleUrl: './auth-failed.component.scss'
})
export class AuthFailedComponent {

  constructor(private readonly loginService: LoginService) {

  }

  protected retry() {
    this.loginService.login();
  }

}
