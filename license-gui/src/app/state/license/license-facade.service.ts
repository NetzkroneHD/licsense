import {inject, Injectable} from '@angular/core';
import {UserLicenseState} from '../user-license/user-license-state.service';
import {UserLicenseFacade} from '../user-license/user-license-facade.service';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {LicenseEditService} from '../../component/license-edit/license-edit.service';
import {NotificationFacade} from '../notification/notification-facade.service';
import {RouteFacade} from '../route/route-facade.service';
import {TranslateService} from '@ngx-translate/core';
import {LicenseDialogService} from '../../component/license-dialog/license-dialog.service';

@Injectable({
    providedIn: 'root'
})
export class LicenseFacade {

    private readonly userLicenseState = inject(UserLicenseState);
    private readonly userLicenseFacade = inject(UserLicenseFacade);
    private readonly licenseEditService = inject(LicenseEditService);
    private readonly notificationFacade = inject(NotificationFacade);
    private readonly routeFacade = inject(RouteFacade);
    private readonly translateService = inject(TranslateService);
    private readonly dialogService = inject(LicenseDialogService);

    constructor() {
    }

    public createLicense() {
        this.licenseEditService.create().subscribe(createAction => {
            if (!createAction.confirmAction) return;
            const licenseToCreate: LicenseDto = {
                licenseKey: '',
                publisher: '',
                notes: createAction.licenseEdit.notes,
                valid: createAction.licenseEdit.valid,
                validUntil: createAction.licenseEdit.validUntil,
                listMode: createAction.licenseEdit.listMode,
                ipAddresses: createAction.licenseEdit.ipAddresses
            };
            this.userLicenseFacade.createLicense(licenseToCreate);
        });
    }

    public refresh() {
        if (this.userLicenseState.getLoadingAnyLicense()) {
            this.notificationFacade.setMessage({
                title: 'component.toolbar.already-loading.title',
                message: 'component.toolbar.already-loading.text',
                type: 'INFO'
            }, true);
            return;
        }
        this.userLicenseFacade.loadLicensesFromCurrentPublisher();
    }

    public editLicense() {
        const license: LicenseDto | null = this.userLicenseState.getCurrentLicense();
        if (!license) return;
        this.licenseEditService.edit(license).subscribe(editAction => {
            if (!editAction.confirmAction) return;
            const licenseToEdit: LicenseDto = {
                licenseKey: editAction.licenseEdit.licenseKey,
                publisher: editAction.licenseEdit.publisher,
                notes: editAction.licenseEdit.notes,
                valid: editAction.licenseEdit.valid,
                validUntil: editAction.licenseEdit.validUntil,
                listMode: editAction.licenseEdit.listMode,
                ipAddresses: editAction.licenseEdit.ipAddresses
            };

            if (JSON.stringify(license) === JSON.stringify(licenseToEdit)) {
                this.notificationFacade.setMessage({
                    title: undefined,
                    message: 'component.toolbar.license-not-changed',
                    type: 'INFO'
                }, true);
                return;
            }

            this.userLicenseFacade.updateLicense(license.licenseKey, licenseToEdit);
        });

    }

    public openLogs() {
        this.routeFacade.navigateToLicenseLogs();
    }

    public openMonitoring() {
        this.routeFacade.navigateToMonitoring();
    }

    public deleteLicense() {
        const license: LicenseDto | null = this.userLicenseState.getCurrentLicense();
        if (!license) return;

        this.dialogService.confirm(
            {
                title: this.translateService.instant('component.toolbar.delete-license.title'),
                message: this.translateService.instant('component.toolbar.delete-license.message', {licenseKey: license.licenseKey}),
                confirmCaption: this.translateService.instant('component.toolbar.delete-license.confirm'),
                cancelCaption: this.translateService.instant('component.toolbar.delete-license.cancel'),
                discardWithEscape: true
            }
        ).subscribe(value => {
            if (!value) return;
            this.userLicenseFacade.deleteLicense(license.licenseKey);
        });
    }

}
