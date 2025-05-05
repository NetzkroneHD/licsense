import {computed, Injectable, signal} from '@angular/core';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';

@Injectable({
    providedIn: 'root'
})
export class UserLicenseState {

    private readonly loadingLogs = signal(0);
    private readonly loadingLicenses = signal(0);
    private readonly loadingCreate = signal(false);
    private readonly loadingUpdate = signal(0);
    private readonly loadingDelete = signal(0);
    private readonly userLicenses = signal<LicenseDto[]>([]);
    private readonly userLicenseLogs = signal<LicenseLogDto[]>([]);
    private readonly currentSelectedLicense = signal<string>('');
    private readonly selectedPublisher = signal<string>('');

    public readonly getLoadingAnyLicense = computed(() => this.getLoadingLicenses() || this.getLoadingCreate() || this.getLoadingUpdate() || this.getLoadingDelete());
    public readonly getLoadingLogs = computed(() => this.loadingLogs() !== 0);
    public readonly getLoadingLicenses = computed(() => this.loadingLicenses() !== 0);
    public readonly getLoadingCreate = this.loadingCreate.asReadonly();
    public readonly getLoadingUpdate = computed(() => this.loadingUpdate() !== 0);
    public readonly getLoadingDelete = computed(() => this.loadingDelete() !== 0);
    public readonly getUserLicenses = this.userLicenses.asReadonly();
    public readonly getUserLicenseLogs = this.userLicenseLogs.asReadonly();
    public readonly getCurrentLicense = this.currentSelectedLicense.asReadonly();
    public readonly getSelectedPublisher = this.selectedPublisher.asReadonly();

    public setCurrentLicense(license: string) {
        this.currentSelectedLicense.set(license);
    }

    public setLoadingCreate(loading: boolean) {
        this.loadingCreate.set(loading);
    }

    public setLoadingLicenseDelete(loading: boolean) {
        if (loading) {
            this.loadingDelete.update(value => value + 1);
        } else {
            this.loadingDelete.update(value => value - 1);
        }
    }

    public setLoadingLicenseUpdate(loading: boolean) {
        if (loading) {
            this.loadingUpdate.update(value => value + 1);
        } else {
            this.loadingUpdate.update(value => value - 1);
        }
    }

    public setLoadingLicenses(loading: boolean) {
        if (loading) {
            this.loadingLicenses.update(value => value + 1);
        } else {
            this.loadingLicenses.update(value => value - 1);
        }
    }

    public setLoadingLogs(loading: boolean) {
        if (loading) {
            this.loadingLogs.update(value => value + 1);
        } else {
            this.loadingLogs.update(value => value - 1);
        }
    }

    public setUserLicenses(licenses: LicenseDto[]) {
        this.userLicenses.set(licenses);
    }

    public setUserLicenseLogs(licenseLogs: LicenseLogDto[]) {
        this.userLicenseLogs.set(licenseLogs);
    }

    public createLicense(license: LicenseDto) {
        this.userLicenses.update(value => value.concat([license]));
    }

    public updateLicense(licenseKey: string, license: LicenseDto) {
        this.userLicenses.update(value => {
            return value.map(licenseEntry => {
                if (licenseEntry.licenseKey === licenseKey) {
                    return license;
                }
                return licenseEntry;
            });
        });
    }

    public deleteLicense(licenseKey: string) {
        this.userLicenses.update(value => {
            return value.filter(licenseEntry => licenseEntry.licenseKey !== licenseKey);
        });
    }

    public setSelectedPublisher(publisher: string) {
        this.selectedPublisher.set(publisher);
    }
}
