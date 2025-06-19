import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MonitoringState} from '../../state/monitoring/monitoring-state.service';
import {MonitoringFacade} from '../../state/monitoring/monitoring-facade.service';
import {UserLicenseState} from '../../state/user-license/user-license-state.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {LicenseDatePickerComponent} from '../../component/license-date-picker/license-date-picker.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MonitoringTableComponent} from '../../component/monitoring-table/monitoring-table.component';
import {SelectComponent} from '../../component/license-select/select.component';
import {
    ListBehaviorResultDto
} from '@license/license-api-client-typescript-fetch/src/models/ListBehaviorResultDto';

@Component({
    selector: 'license-monitoring',
    imports: [
        MatIcon,
        MatIconButton,
        TranslateModule,
        MatTooltip,
        LicenseDatePickerComponent,
        ReactiveFormsModule,
        MonitoringTableComponent,
        SelectComponent,
    ],
    templateUrl: './monitoring.component.html',
    styleUrl: './monitoring.component.scss'
})
export class MonitoringComponent {

    private readonly monitoringState = inject(MonitoringState);
    private readonly monitoringFacade = inject(MonitoringFacade);
    private readonly userLicenseState = inject(UserLicenseState);

    @ViewChild(MatPaginator)
    protected paginator!: MatPaginator;
    @ViewChild(MatSort)
    protected sort!: MatSort;

    protected readonly filterValue = signal('');
    protected readonly loading = computed(() => this.monitoringState.getLoading());
    protected readonly selectedData = computed(() => {
        const behavior = this.monitoringState.getSelectedBehaviorResult();
        const data = this.monitoringState.getAnalyzedData();
        if(!data) return [];
        if(behavior === 'ALLOW') {
            return data.allowed;
        } else {
            return data.disallow;
        }
    });


    protected formGroup = new FormGroup({
        licenseKey: new FormControl<string | null>(null),
        startDate: new FormControl<Date | null>(null),
        endDate: new FormControl<Date | null>(null),
    });

    constructor() {

    }

    protected search() {
        const license = this.userLicenseState.getCurrentLicense();
        if (!license) return;
        const date = new Date();
        date.setMonth(1);
        this.monitoringFacade.analyzeLicenseLogs(license, date, new Date());

    }

    protected onUpdateFilter(e: Event) {
        this.filterValue.set((e.target as HTMLInputElement).value);
        this.applyFilter();
    }

    protected applyFilter() {

    }

    protected clearFilter() {
        this.filterValue.set('');
        this.applyFilter();
    }

    protected readonly ListBehaviorResultDto = ListBehaviorResultDto;

    protected valueChange(value: string) {
        if(value === 'ALLOW') {
            this.monitoringState.setSelectedBehavior(ListBehaviorResultDto.Allow);
        } else {
            this.monitoringState.setSelectedBehavior(ListBehaviorResultDto.Disallow);
        }
    }
}
