import {AfterViewInit, Component, computed, effect, inject, signal, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableDataSource
} from '@angular/material/table';
import {UserLicenseState} from '../../state/user-license/user-license-state.service';
import {UserLicenseFacade} from '../../state/user-license/user-license-facade.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatProgressBar} from '@angular/material/progress-bar';
import {LicenseDialogService} from '../../component/license-dialog/license-dialog.service';

@Component({
    selector: 'license-license-log',
    imports: [
        MatRow,
        MatHeaderRow,
        MatCell,
        TranslateModule,
        MatSortHeader,
        MatHeaderCell,
        MatColumnDef,
        MatFormField,
        MatInput,
        FormsModule,
        MatIcon,
        MatIconButton,
        MatTooltip,
        MatProgressBar,
        MatPaginator,
        MatTable,
        MatSort,
        MatLabel,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        MatSuffix
    ],
    templateUrl: './license-log.component.html',
    styleUrl: './license-log.component.scss'
})
export class LicenseLogComponent implements AfterViewInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    protected loading = computed(() => this.userLicenseState.getLoadingLogs());
    protected displayedColumns = ['id', 'license', 'ip', 'dateTime', 'listBehaviorResult'];
    protected dataSource;
    protected filterValue = signal('');
    protected readonly userLicenseState = inject(UserLicenseState);
    private readonly userLicenseFacade = inject(UserLicenseFacade);
    private readonly dialogService = inject(LicenseDialogService);
    private readonly translateService = inject(TranslateService);

    constructor() {

        this.dataSource = new MatTableDataSource(this.userLicenseState.getUserLicenseLogs());

        effect(() => {
            this.dataSource.data = this.userLicenseState.getUserLicenseLogs();
        });

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    protected applyFilter() {
        this.dataSource.filter = this.filterValue().trim().toLowerCase();
    }

    protected clearFilter() {
        this.filterValue.set('');
        this.applyFilter();
    }

    protected refresh() {
        const currentLicense = this.userLicenseState.getCurrentLicense();
        if (!currentLicense) return;
        this.userLicenseFacade.loadLogs(currentLicense.licenseKey);
    }

    protected deleteHistory() {
        const currentLicense = this.userLicenseState.getCurrentLicense();
        if (!currentLicense) return;
        this.dialogService.confirm({
            title: this.translateService.instant('view.license-log.delete-logs.title'),
            message: this.translateService.instant('view.license-log.delete-logs.message', {licenseKey: currentLicense}),
            confirmCaption: this.translateService.instant('view.license-log.delete-logs.confirm'),
            cancelCaption: this.translateService.instant('view.license-log.delete-logs.cancel'),
            discardWithEscape: true
        }).subscribe(value => {
            if (!value) return;
            this.userLicenseFacade.deleteLogs(currentLicense.licenseKey);
        });

    }

    protected onUpdateFilter(e: Event) {
        this.filterValue.set((e.target as HTMLInputElement).value);
        this.applyFilter();
    }
}
