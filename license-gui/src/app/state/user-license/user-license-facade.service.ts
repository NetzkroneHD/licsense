import {inject, Injectable} from '@angular/core';
import {UserLicenseState} from './user-license-state.service';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {PublisherApiService} from '../../api/service/publisher-api.service';
import {TranslateService} from '@ngx-translate/core';
import {LicenseApiService} from '../../api/service/license-api.service';
import {NotificationFacade} from '../notification/notification-facade.service';


@Injectable({
    providedIn: 'root'
})
export class UserLicenseFacade {

    private readonly licenseState = inject(UserLicenseState);
    private readonly licenseApiService = inject(LicenseApiService);
    private readonly publisherApiService = inject(PublisherApiService);
    private readonly translateService = inject(TranslateService);
    private readonly notificationFacade = inject(NotificationFacade);


    constructor() {

    }

    public setCurrentSelectedLicense(license: string) {
        this.licenseState.setCurrentLicense(license);
    }

    public createLicense(license: LicenseDto) {
        this.licenseState.setLoadingCreate(true);
        this.licenseApiService.createLicense(license).then(createdLicense => {
            this.licenseState.createLicense(createdLicense);
            this.notificationFacade.setMessage({
                title: undefined,
                message: 'Successfully created a license.',
                type: 'INFO'
            }, true)
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('Error while creating license.'),
                message: this.translateService.instant('Error: {{error}}').replace('{{error}}', reason),
                type: 'ERROR'
            });
        }).finally(() => {
            this.licenseState.setLoadingCreate(false);
        });
    }

    public updateLicense(licenseKey: string, license: LicenseDto) {
        this.licenseState.setLoadingLicenseUpdate(true);
        this.licenseApiService.updateLicense(licenseKey, license).then(updatedLicense => {
            this.licenseState.updateLicense(licenseKey, updatedLicense);
            this.notificationFacade.setMessage({
                title: undefined,
                message: 'Successfully updated a license.',
                type: 'SUCCESS'
            }, true)
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('Error while updating license.'),
                message: this.translateService.instant('Error: {{error}}').replace('{{error}}', reason),
                type: 'ERROR'
            });
        }).finally(() => {
            this.licenseState.setLoadingLicenseUpdate(false);
        })
    }

    public deleteLicense(licenseKey: string) {
        this.licenseState.setLoadingLicenseDelete(true);
        this.licenseApiService.deleteLicense(licenseKey).then(() => {
            this.licenseState.deleteLicense(licenseKey);
            this.notificationFacade.setMessage({
                title: undefined,
                message: 'Successfully deleted a license.',
                type: 'SUCCESS'
            }, true)
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('Error while deleting license.'),
                message: this.translateService.instant('Error: {{error}}').replace('{{error}}', reason),
                type: 'ERROR'
            });
        }).finally(() => {
            this.licenseState.setLoadingLicenseDelete(false);
        })
    }

    public loadLogs(license: string) {
        this.licenseState.setLoadingLogs(true);
        this.licenseApiService.getLicenseLogs(license).then(licenseLogs => {
            this.licenseState.setUserLicenseLogs(licenseLogs);
            this.notificationFacade.setMessage({
                title: undefined,
                message: 'Successfully loaded logs.',
                type: 'SUCCESS'
            }, true)
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('Error while loading logs.'),
                message: this.translateService.instant('Error: {{error}}').replace('{{error}}', reason),
                type: 'ERROR'
            });
        }).finally(() => {
            this.licenseState.setLoadingLogs(false);
        })
    }

    public deleteLogs(license: string) {
        this.licenseState.setLoadingLogs(true);
        this.licenseApiService.deleteLicenseLogs(license).then(() => {
            this.licenseState.setUserLicenseLogs([]);
            this.notificationFacade.setMessage({
                title: undefined,
                message: 'Successfully deleted logs.',
                type: 'SUCCESS'
            }, true);
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('Error while deleting logs.'),
                message: this.translateService.instant('Error: {{error}}').replace('{{error}}', reason),
                type: 'ERROR'
            });
        }).finally(() => {
            this.licenseState.setLoadingLogs(false);
        });
    }

    public loadLicensesFromCurrentPublisher() {
        this.loadLicenses(this.publisherApiService.getCurrentPublisher());
    }

    public loadLicenses(publisher: string) {
        this.licenseState.setLoadingLicenses(true);
        this.publisherApiService.getLicensesFromPublisher(publisher).then(licenses => {
            this.licenseState.setUserLicenses(licenses);
            this.notificationFacade.setMessage({
                title: undefined,
                message: this.translateService.instant('Successfully loaded licenses.'),
                type: 'SUCCESS'
            });
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('Error while loading licenses.'),
                message: this.translateService.instant('Error: {{error}}').replace('{{error}}', reason),
                type: 'ERROR'
            });
        }).finally(() => {
            this.licenseState.setLoadingLicenses(false);
        });
    }

    public setLicenses(licenses: LicenseDto[]) {
        this.licenseState.setUserLicenses(licenses);
    }

    public setLicenseLogs(licenseLogs: LicenseLogDto[]) {
        this.licenseState.setUserLicenseLogs(licenseLogs);
    }

}



