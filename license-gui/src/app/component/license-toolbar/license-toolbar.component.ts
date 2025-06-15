import {Component, computed, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {MatTooltip} from '@angular/material/tooltip';
import {LicenseFacade} from '../../state/license/license-facade.service';
import {UserLicenseState} from '../../state/user-license/user-license-state.service';

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

    public readonly disabled = input(false);
    public readonly editingDisabled = computed(() => this.disabled() || !this.userLicenseState.getCurrentLicense());

    private readonly licenseFacade = inject(LicenseFacade);
    private readonly userLicenseState = inject(UserLicenseState);

    protected createLicense() {
        this.licenseFacade.createLicense();
    }

    protected refresh() {
        this.licenseFacade.refresh();
    }

    protected openLogs() {
        this.licenseFacade.openLogs();
    }

    protected openMonitoring() {
        this.licenseFacade.openMonitoring();
    }

    protected editLicense() {
        this.licenseFacade.editLicense();
    }

    protected deleteLicense() {
        this.licenseFacade.deleteLicense();
    }
}
