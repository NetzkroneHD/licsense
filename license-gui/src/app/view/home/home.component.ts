import {AfterViewInit, Component, effect, inject, ViewChild} from '@angular/core';
import {UserLicenseStoreFacade} from '../../state/user-license/user-license-store-facade.service';
import {UserLicenseStore} from '../../state/user-license/user-license-store.service';
import {
    MatCell,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatRow,
    MatTable,
    MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {TranslateModule} from '@ngx-translate/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {RouteStoreFacade} from '../../state/route/route.service';
import {LicenseToolbarComponent} from '../../component/license-toolbar/license-toolbar.component';
import {Clipboard} from '@angular/cdk/clipboard';
import {NotificationStoreService} from '../../state/notification/notification.service';

@Component({
    selector: 'license-home',
    imports: [
        MatFormField,
        MatInput,
        FormsModule,
        TranslateModule,
        MatIconButton,
        MatIconModule,
        MatIcon,
        MatProgressBar,
        MatPaginator,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCell,
        MatSortHeader,
        MatCell,
        MatHeaderRow,
        MatRow,
        MatLabel,
        LicenseToolbarComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    protected loading = false;
    protected displayedColumns = ['licenseKey', 'publisher', 'notes', 'valid', 'validUntil', 'listMode', 'ipAddresses'];
    protected dataSource;
    protected filterValue: any;
    protected selectedLicense: { previous: LicenseDto | null; current: LicenseDto | null } = {
        previous: null,
        current: null
    };
    protected readonly String = String;
    private readonly userLicenseStoreFacade = inject(UserLicenseStoreFacade);
    private readonly userLicenseStore = inject(UserLicenseStore);
    private readonly routeStoreService = inject(RouteStoreFacade);
    private readonly notificationService = inject(NotificationStoreService);
    private readonly clipboard = inject(Clipboard);

    constructor() {

        this.dataSource = new MatTableDataSource(this.userLicenseStore.getUserLicenses());

        effect(() => {
            this.dataSource.data = this.userLicenseStore.getUserLicenses();
        });

        effect(() => {
            this.loading = this.userLicenseStore.getLoadingAnyLicense();
        });

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    protected applyFilter() {
        this.dataSource.filter = this.filterValue.trim().toLowerCase();
    }

    protected clearFilter() {
        this.filterValue = '';
        this.applyFilter();
    }

    protected getShortedString(str: string): string {
        if (str.length <= 40) return str;
        const firstPart = str.substring(0, 19);
        const middlePart = ".".repeat(3);
        const lastPart = str.substring((str.length - 20), str.length)
        return firstPart + middlePart + lastPart;
    }

    protected onRowClick(row: LicenseDto) {
        if (this.selectedLicense.current === row) {
            this.selectedLicense = {previous: this.selectedLicense.current, current: null};
        } else {
            this.selectedLicense = {previous: this.selectedLicense.current, current: row};
            this.userLicenseStoreFacade.setCurrentSelectedLicense(row.licenseKey);
        }
    }

    protected onRowDoubleClick(row: LicenseDto) {
        this.selectedLicense = {previous: this.selectedLicense.current, current: row};
        this.userLicenseStoreFacade.setCurrentSelectedLicense(row.licenseKey);
        this.routeStoreService.navigateToLicenseLogs();
    }

    protected copyToClipboard(event: MouseEvent, license: LicenseDto) {
        event.preventDefault();
        if (!this.clipboard.copy(license.licenseKey)) return;
        this.notificationService.setMessage({
            title: undefined,
            message: 'Copied license key to clipboard.',
            type: 'INFO'
        }, true);
    }
}
