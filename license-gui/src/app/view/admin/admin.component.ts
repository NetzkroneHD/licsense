import {Component, computed, inject} from '@angular/core';
import {PublisherFacade} from '../../state/publiser/publisher-facade.service';
import {PublisherState} from '../../state/publiser/publisher-state.service';
import {
    LicenseAutocompleteComponent
} from '../../component/license-autocomplete/license-autocomplete.component';
import {FormControl} from '@angular/forms';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatIconButton} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {TokenState} from '../../state/token/token-state.service';
import {UserLicenseFacade} from '../../state/user-license/user-license-facade.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {NotificationFacade} from '../../state/notification/notification-facade.service';

@Component({
    selector: 'license-admin',
    imports: [
        LicenseAutocompleteComponent,
        MatProgressBar,
        MatIcon,
        MatIconButton,
        TranslateModule,
        MatTooltip
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent {

    protected readonly publisherFacade = inject(PublisherFacade);
    protected readonly publisherState = inject(PublisherState);
    protected readonly userLicenseFacade = inject(UserLicenseFacade);
    protected readonly tokenState = inject(TokenState);
    protected readonly notificationFacade = inject(NotificationFacade);
    protected readonly formControl;

    protected readonly options = computed<string[]>(() => {
        return this.publisherState.getPublishers();
    });

    constructor() {
        this.publisherFacade.loadPublishers();
        this.formControl = new FormControl<string>(this.tokenState.getSub());
    }

    protected refresh() {
        this.publisherFacade.loadPublishers();
    }

    protected reset() {
        this.formControl.setValue(this.tokenState.getSub());
        this.userLicenseFacade.loadLicenses(this.tokenState.getSub());
        this.notificationFacade.setMessage({
                title: undefined,
                message: `Selected own publisher`,
                type: 'INFO'
            });
    }

    protected onOptionSelected(event: MatAutocompleteSelectedEvent) {
        if (event.option.value) {
            this.notificationFacade.setMessage({
                title: undefined,
                message: `Selected publisher: ${event.option.value}`,
                type: 'INFO'
            });
            this.userLicenseFacade.loadLicenses(event.option.value);
        }
    }
}
