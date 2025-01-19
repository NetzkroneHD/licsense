import {Injectable} from '@angular/core';
import {
    ApiResponse,
    GetLicensesFromPublisherRequest,
    InitOverrideFunction,
    LicenseDto,
    PublisherApi
} from '@license/license-api-client-typescript-fetch';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PublisherApiAdapter extends PublisherApi {

    private readonly publisherApi: PublisherApi = new PublisherApi(environment.apiConfig);

    constructor() {
        super(environment.apiConfig);
    }

    public override getLicensesFromPublisherRaw(requestParameters: GetLicensesFromPublisherRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<Array<LicenseDto>>> {
        return this.publisherApi.getLicensesFromPublisherRaw(requestParameters, initOverrides);
    }

    public override getLicensesFromPublisher(requestParameters: GetLicensesFromPublisherRequest, initOverrides?: RequestInit | InitOverrideFunction): Promise<Array<LicenseDto>> {
        return this.publisherApi.getLicensesFromPublisher(requestParameters, initOverrides);
    }
}
