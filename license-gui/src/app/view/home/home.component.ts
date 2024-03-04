import {AfterViewInit, Component, effect, ViewChild} from '@angular/core';
import {LicenseContextMenuItem} from '../../component/license-context-menu/license-context-menu-item.interface';
import {LicenseContextMenuComponent} from '../../component/license-context-menu/license-context-menu.component';
import {environment} from '../../../environments/environment';
import {UserLicenseStoreFacade} from '../../state/user-license/user-license-store-facade.service';
import {UserLicenseStore} from '../../state/user-license/user-license-store.service';
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
import {LicenseDialogService} from '../../component/license-dialog/license-dialog.service';
import {TranslateModule} from '@ngx-translate/core';
import {LicenseEditService} from '../../component/license-edit/license-edit.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NotificationStoreService} from '../../state/toaster/notification.service';
import {RouteStoreService} from '../../state/route/route.service';

@Component({
  selector: 'license-home',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    TranslateModule,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatTooltip,
    MatProgressBar,
    MatPaginator,
    MatTable,
    MatSort,
    LicenseContextMenuComponent,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatLabel
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  contextMenuItems: LicenseContextMenuItem[] = [
    {id: 'open', title: 'Open logs', icon: 'open_in_new', disabled: false},
    {id: 'edit', title: 'Edit', icon: 'edit', disabled: false,},
    {id: 'delete', title: 'Delete', icon: 'delete', disabled: false,}
  ];

  protected loading = false;
  protected displayedColumns = ['licenseKey', 'publisher', 'notes', 'valid', 'validUntil', 'listMode', 'ipAddresses'];
  protected dataSource;
  protected filterValue: any;
  protected selectedLicense: { previous: LicenseDto | null; current: LicenseDto | null } = {
    previous: null,
    current: null
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('contextMenu') contextMenu!: LicenseContextMenuComponent;

  constructor(private readonly userLicenseStateFacade: UserLicenseStoreFacade,
              private readonly userLicenseState: UserLicenseStore,
              private readonly dialogService: LicenseDialogService,
              private readonly licenseEditService: LicenseEditService,
              private readonly notificationService: NotificationStoreService,
              private readonly routeStoreService: RouteStoreService) {

    this.dataSource = new MatTableDataSource(this.userLicenseState.selectUserLicenses$());

    effect(() => {
      this.dataSource.data = this.userLicenseState.selectUserLicenses$();
    });

    effect(() => {
      this.loading = this.userLicenseState.isLoadingAnyLicense$();
    });
    console.log("length", "192.168.2.2,192.168.2.10".length)

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

  protected refresh() {
    if (this.userLicenseState.isLoadingAnyLicense$()) {
      this.notificationService.setInfo({title: 'Loading...', message: 'The licenses are already loading.'}, true);
      return;
    }
    this.userLicenseStateFacade.loadLicensesFromCurrentPublisher();
  }

  protected getShortedString(str: string): string {
    // 	192.168.2.2,192.168.2.10

    return "";
  }

  protected openContextMenu(event: MouseEvent, license: LicenseDto) {
    event.preventDefault();
    this.selectedLicense = {current: license, previous: this.selectedLicense.previous};
    this.contextMenu.open({x: event.x, y: event.y});
  }

  protected contextItemClick(item: LicenseContextMenuItem) {
    if (!this.selectedLicense.previous) return;
    if (item.id === 'open') {
      const licenseKey = this.selectedLicense.previous.licenseKey;
      this.userLicenseStateFacade.setCurrentSelectedLicense(this.selectedLicense.previous.licenseKey);
      this.routeStoreService.setCurrentRoute('license-logs').then(() => this.userLicenseStateFacade.loadLogs(licenseKey));

    } else if (item.id === 'edit') {
      if (!this.selectedLicense.previous) return;
      this.editLicense(this.selectedLicense.previous);

    } else if (item.id === 'delete') {
      const licenseKey: string = this.selectedLicense.previous.licenseKey;
      this.dialogService.confirm(
        {
          title: 'Confirm Delete',
          message: 'Are you sure to delete the license ' + licenseKey + '?',
          confirmCaption: 'Delete',
          cancelCaption: 'Cancel',
          discardWithEscape: true
        }
      ).subscribe(value => {
        if (!value) return;
        this.userLicenseStateFacade.deleteLicense(licenseKey);
      })
    }

  }

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
      this.userLicenseStateFacade.createLicense(licenseToCreate);
    });
  }

  protected editLicense(license: LicenseDto) {
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
        this.notificationService.setInfo({title: undefined, message: 'No changes have been made.'}, true);
        return;
      }

      this.userLicenseStateFacade.updateLicense(license.licenseKey, licenseToEdit);
    });
  }

  contextMenuClosed() {
    this.selectedLicense = {previous: this.selectedLicense.current, current: null};
  }

  protected readonly environment = environment;
}
