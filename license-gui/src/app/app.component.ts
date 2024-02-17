import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {TokenService} from './api/service/token.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent
} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbar,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    RouterOutlet,
    MatDrawerContainer,
    MatButton,
    MatDrawer,
    MatIconButton,
    MatIcon

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = environment.title;

  constructor(private readonly oAuthService: OAuthService,
              private readonly tokenService: TokenService) {

  }

  ngOnInit() {
    this.oAuthService.configure(environment.authConfig);
    this.oAuthService.loadDiscoveryDocumentAndLogin().then(() => {
      this.onUserLoggedIn();
    });
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.events.subscribe(event => {
      if (event.type !== 'token_refreshed') {
        return;
      }
      this.tokenService.setAccessToken(this.oAuthService.getAccessToken());

    });
  }

  onUserLoggedIn() {
    const identityClaims = this.oAuthService.getIdentityClaims();
    console.log("user logged in ", identityClaims);
    if (!identityClaims) {
      console.log("Login failed. No Claim available.")
      return;
    }

    const username = this.oAuthService.getIdentityClaims()['preferred_username'];
    const jwt = JSON.parse(atob(this.oAuthService.getAccessToken().split('.')[1]));
    console.log("username", username);
    console.log("jwt", jwt);
    console.log("roles", jwt['realm_access']['roles'])
  }

}
