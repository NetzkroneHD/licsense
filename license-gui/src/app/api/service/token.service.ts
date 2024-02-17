import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Configuration} from '@license/license-api-client-typescript-fetch';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  public setAccessToken(token: string) {
    environment.apiConfig.config = new Configuration({
      ...environment.apiConfig,
      accessToken: token
    });
  }

}
