import {Component, computed, effect, inject, signal} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {TranslateModule} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MonitoringState} from '../../state/monitoring/monitoring-state.service';
import {MonitoringFacade} from '../../state/monitoring/monitoring-facade.service';
import {UserLicenseState} from '../../state/user-license/user-license-state.service';
import {
    ListBehaviorResultDto
} from '@license/license-api-client-typescript-fetch/src/models/ListBehaviorResultDto';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {IpMonitoringEntry} from '../../state/monitoring/model/monitoring-data.interface';
import {MatPaginator} from '@angular/material/paginator';
import {LicenseDatePickerComponent} from '../../component/license-date-picker/license-date-picker.component';

@Component({
    selector: 'license-monitoring',
    imports: [
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatSuffix,
        TranslateModule,
        MatTooltip,
        MatProgressBar,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        MatHeaderCellDef,
        MatPaginator,
        LicenseDatePickerComponent,
    ],
    templateUrl: './monitoring.component.html',
    styleUrl: './monitoring.component.scss'
})
export class MonitoringComponent {

    private readonly monitoringState = inject(MonitoringState);
    private readonly monitoringFacade = inject(MonitoringFacade);
    private readonly userLicenseState = inject(UserLicenseState);

    protected readonly filterValue = signal('');
    protected readonly loading = computed(() => this.monitoringState.getLoading());

    protected readonly displayedColumns = ['ip', 'count', 'lastLog', 'firstLog'];
    protected readonly dataSource: MatTableDataSource<IpMonitoringEntry>;

    constructor() {

        this.dataSource = new MatTableDataSource<IpMonitoringEntry>([]);

        effect(() => {
            const analyzedData = this.monitoringState.getAnalyzedData();
            if(!analyzedData) return;
            this.dataSource.data = analyzedData.ipMonitoring;
        })

    }

    protected refresh() {
        const license = this.userLicenseState.getCurrentLicense();
        if (!license) return;
        const date = new Date();
        date.setMonth(1);
        this.monitoringFacade.analyzeLicenseLogs(license, date, new Date(), ListBehaviorResultDto.Allow);

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
}
