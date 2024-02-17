import {inject, Injectable} from '@angular/core';
import {ApiResponse, LicenseDto, PublisherApi} from '@license/license-api-client-typescript-fetch';

@Injectable({
  providedIn: 'root'
})
export class PublisherApiService {

  private readonly publisherApi: PublisherApi = inject(PublisherApi);

  constructor() {
  }

  public getLicensesFromPublisher(publisher: string): Promise<LicenseDto[]> {
    return this.publisherApi.getLicensesFromPublisher({publisher: publisher});
  }

  public getLicensesFromPublisherRaw(publisher: string): Promise<ApiResponse<Array<LicenseDto>>> {
    return this.publisherApi.getLicensesFromPublisherRaw({publisher: publisher});
  }

}
