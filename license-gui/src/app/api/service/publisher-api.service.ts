import {inject, Injectable} from '@angular/core';
import {ApiResponse, LicenseDto, PublisherApi} from '@license/license-api-client-typescript-fetch';
import {OAuthService} from 'angular-oauth2-oidc';
import {PublisherApiAdapter} from './adapter/publisher-api-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherApiService {

  private readonly publisherApi: PublisherApi = inject(PublisherApiAdapter);
  private readonly oAuthService: OAuthService = inject(OAuthService);

  constructor() {
  }

  public getCurrentPublisher(): string {
    return this.oAuthService.getIdentityClaims()['sub'];
  }

  public getLicensesFromPublisher(publisher: string): Promise<LicenseDto[]> {
    return this.publisherApi.getLicensesFromPublisher({publisher: publisher});
  }

  public getLicensesFromPublisherRaw(publisher: string): Promise<ApiResponse<Array<LicenseDto>>> {
    return this.publisherApi.getLicensesFromPublisherRaw({publisher: publisher});
  }

}
