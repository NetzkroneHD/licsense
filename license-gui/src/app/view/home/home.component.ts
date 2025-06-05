import {AfterViewInit, Component, computed, effect, inject, signal, ViewChild} from '@angular/core';
import {UserLicenseFacade} from '../../state/user-license/user-license-facade.service';
import {UserLicenseState} from '../../state/user-license/user-license-state.service';
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
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {TranslateModule} from '@ngx-translate/core';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {RouteFacade} from '../../state/route/route-facade.service';
import {LicenseToolbarComponent} from '../../component/license-toolbar/license-toolbar.component';
import {Clipboard} from '@angular/cdk/clipboard';
import {NotificationFacade} from '../../state/notification/notification-facade.service';
import {
    LicenseContextMenuComponent
} from '../../component/license-context-menu/license-context-menu.component';
import {LicenseFacade} from '../../state/license/license-facade.service';

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
        LicenseToolbarComponent,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        MatButton,
        LicenseContextMenuComponent,
        MatSuffix
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(LicenseContextMenuComponent) contextMenu!: LicenseContextMenuComponent;

    protected displayedColumns = ['licenseKey', 'publisher', 'notes', 'valid', 'validUntil', 'listMode', 'ipAddresses'];
    protected readonly loading = computed<boolean>(() => this.userLicenseState.getLoadingAnyLicense());
    protected readonly filterValue = signal<string>('');
    protected readonly selectedLicense = signal<{ previous: LicenseDto | null; current: LicenseDto | null }>({
        previous: null,
        current: null
    });
    protected showTestToaster = false;
    private readonly userLicenseFacade = inject(UserLicenseFacade);
    private readonly userLicenseState = inject(UserLicenseState);
    private readonly routeFacade = inject(RouteFacade);
    private readonly notificationFacade = inject(NotificationFacade);
    private readonly clipboard = inject(Clipboard);
    private readonly licenseFacade = inject(LicenseFacade);
    protected dataSource;

    constructor() {
        this.dataSource = new MatTableDataSource(this.userLicenseState.getUserLicenses());
        effect(() => {
            this.dataSource.data = this.userLicenseState.getUserLicenses();
        });
    }

    public ngAfterViewInit() {
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

    protected getShortedString(text: unknown): string {
        const str = String(text);
        if (str.length <= 40) return str;
        const firstPart = str.substring(0, 19);
        const middlePart = ".".repeat(3);
        const lastPart = str.substring((str.length - 20), str.length)
        return firstPart + middlePart + lastPart;
    }

    protected onContextMenu(row: LicenseDto, event: MouseEvent) {
        event.preventDefault();
        const selectedLicense = this.selectedLicense();
        this.selectedLicense.set({previous: selectedLicense.current, current: row});
        this.userLicenseFacade.setCurrentSelectedLicense(row);
        this.contextMenu.openMenu({x: event.x, y: event.y});
    }

    protected onRowClick(row: LicenseDto) {
        const selectedLicense = this.selectedLicense();
        if (selectedLicense.current === row) {
            this.selectedLicense.set({previous: selectedLicense.current, current: null});
        } else {
            this.selectedLicense.set({previous: selectedLicense.current, current: row});
            this.userLicenseFacade.setCurrentSelectedLicense(row);
        }
    }

    protected onRowDoubleClick(row: LicenseDto) {
        this.selectedLicense.update(value => {
            return {previous: value.current, current: row}
        });
        this.userLicenseFacade.setCurrentSelectedLicense(row);
        this.routeFacade.navigateToLicenseLogs();
    }

    protected copyToClipboard(license: LicenseDto) {
        if (!this.clipboard.copy(license.licenseKey)) return;
        this.notificationFacade.setMessage({
            title: undefined,
            message: 'view.home.copy-to-clipboard',
            type: 'INFO'
        }, true);
    }

    protected onUpdateFilter(e: Event) {
        this.filterValue.set((e.target as HTMLInputElement).value);
        this.applyFilter();
    }

    protected testToastr() {
        this.notificationFacade.setMessage({
            title: 'Test1',
            message: 'Test message1',
            type: 'SUCCESS'
        });
        setTimeout(() => {
            this.notificationFacade.setMessage({
                title: 'Test2',
                message: 'Test message2',
                type: 'INFO'
            });
        }, 400);
        setTimeout(() => {
            this.notificationFacade.setMessage({
                title: 'Test3',
                message: 'Test message3',
                type: 'WARN'
            });
        }, 600);
        setTimeout(() => {
            this.notificationFacade.setMessage({
                title: 'Test4',
                message: 'Test message4',
                type: 'ERROR'
            });
        }, 800);
    }

    protected onMenuClick(itemId: string) {
        switch (itemId) {
            case 'open-logs': {
                this.licenseFacade.openLogs();
                break;
            }
            case 'edit-license': {
                this.licenseFacade.editLicense();
                break;
            }
            case 'delete-license': {
                this.licenseFacade.deleteLicense();
                break;
            }
            case 'copy-license': {
                const selectedLicense = this.userLicenseState.getCurrentLicense();
                if(!selectedLicense) break;
                this.copyToClipboard(selectedLicense);
                break;
            }
            default:
                console.error("Unknown menu item clicked:", itemId);
                break;
        }
    }
}
