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
                message: 'state.license.create-license.success',
                type: 'INFO'
            }, true)
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('state.license.create-license.error.title'),
                message: this.translateService.instant('state.license.create-license.error.message', {reason: reason}),
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
                message: 'state.license.update-license.success',
                type: 'SUCCESS'
            }, true)
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('state.license.update-license.error.title'),
                message: this.translateService.instant('state.license.update-license.error.message', {reason: reason}),
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
                message: 'state.license.delete-license.success',
                type: 'SUCCESS'
            }, true)
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('state.license.delete-license.error.title'),
                message: this.translateService.instant('state.license.delete-license.error.message', {reason: reason}),
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
                message: 'state.license.load-logs.success',
                type: 'SUCCESS'
            }, true)
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('state.license.load-logs.error.title'),
                message: this.translateService.instant('state.license.load-logs.error.message', {reason: reason}),
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
                message: 'state.license.delete-logs.success',
                type: 'SUCCESS'
            }, true);
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('state.license.delete-logs.error.title'),
                message: this.translateService.instant('state.license.delete-logs.error.message', {reason: reason}),
                type: 'ERROR'
            });
        }).finally(() => {
            this.licenseState.setLoadingLogs(false);
        });
    }

    public loadLicensesFromCurrentPublisher() {
        if (!this.licenseState.getSelectedPublisher()) {
            return;
        }

        this.loadLicenses(this.licenseState.getSelectedPublisher());
    }

    public loadLicenses(publisher: string) {
        this.licenseState.setLoadingLicenses(true);
        this.publisherApiService.getLicensesFromPublisher(publisher).then(licenses => {
            this.licenseState.setUserLicenses(licenses);
            this.notificationFacade.setMessage({
                title: undefined,
                message: this.translateService.instant('state.license.load-licenses.success'),
                type: 'SUCCESS'
            });
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('state.license.load-licenses.error.title'),
                message: this.translateService.instant('state.license.load-licenses.error.message', {reason: reason}),
                type: 'ERROR'
            });
        }).finally(() => {
            this.licenseState.setLoadingLicenses(false);
        });
    }

    public setSelectedPublisher(publisher: string) {
        this.licenseState.setSelectedPublisher(publisher);
        this.loadLicenses(publisher);
    }

    public setLicenses(licenses: LicenseDto[]) {
        this.licenseState.setUserLicenses(licenses);
    }

    public setLicenseLogs(licenseLogs: LicenseLogDto[]) {
        this.licenseState.setUserLicenseLogs(licenseLogs);
    }

}



