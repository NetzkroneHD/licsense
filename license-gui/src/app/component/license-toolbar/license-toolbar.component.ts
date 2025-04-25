import {Component, computed, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {MatTooltip} from '@angular/material/tooltip';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {LicenseEditService} from '../license-edit/license-edit.service';
import {UserLicenseFacade} from '../../state/user-license/user-license-facade.service';
import {UserLicenseState} from '../../state/user-license/user-license-state.service';
import {NotificationFacade} from '../../state/notification/notification-facade.service';
import {RouteFacade} from '../../state/route/route-facade.service';
import {LicenseDialogService} from '../license-dialog/license-dialog.service';

@Component({
    selector: 'license-toolbar',
    imports: [
        MatIconButton,
        MatIcon,
        TranslateModule,
        MatTooltip
    ],
    templateUrl: './license-toolbar.component.html',
    styleUrl: './license-toolbar.component.scss'
})
export class LicenseToolbarComponent {

    public readonly selectedLicense = input<LicenseDto | null>(null);
    public readonly disabled = input(false);
    public readonly editingDisabled = computed(() => this.disabled() || !this.selectedLicense());

    private readonly licenseEditService = inject(LicenseEditService);
    private readonly userLicenseFacade = inject(UserLicenseFacade);
    private readonly userLicenseState = inject(UserLicenseState);
    private readonly notificationFacade = inject(NotificationFacade);
    private readonly routeFacade = inject(RouteFacade);
    private readonly translateService = inject(TranslateService);
    private readonly dialogService = inject(LicenseDialogService);

    protected createLicense() {
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

    protected refresh() {
        if (this.userLicenseState.getLoadingAnyLicense()) {
            this.notificationFacade.setMessage({
                title: 'Loading...',
                message: 'The licenses are already loading.',
                type: 'INFO'
            }, true);
            return;
        }
        this.userLicenseFacade.loadLicensesFromCurrentPublisher();
    }

    protected openLogs() {
        this.routeFacade.navigateToLicenseLogs();
    }

    protected editLicense() {
        const license: LicenseDto | null = this.selectedLicense();
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
                    message: 'No changes have been made.',
                    type: 'INFO'
                }, true);
                return;
            }

            this.userLicenseFacade.updateLicense(license.licenseKey, licenseToEdit);
        });
    }

    protected deleteLicense() {
        const license: LicenseDto | null = this.selectedLicense();
        if (!license) return;

        this.dialogService.confirm(
            {
                title: this.translateService.instant('Confirm Delete'),
                message: this.translateService.instant('deleteLicense.text').replace('{{licenseKey}}', license.licenseKey),
                confirmCaption: this.translateService.instant('Delete'),
                cancelCaption: this.translateService.instant('Cancel'),
                discardWithEscape: true
            }
        ).subscribe(value => {
            if (!value) return;
            this.userLicenseFacade.deleteLicense(license.licenseKey);
        });
    }
}
