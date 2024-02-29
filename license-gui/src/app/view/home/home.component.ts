import {Component, effect, ViewChild} from '@angular/core';
import {LicenseContextMenuItem} from '../../component/license-context-menu/license-context-menu-item.interface';
import {LicenseChoiceMenu} from '../../component/license-choice/license-choice-menu.interface';
import {LicenseChoiceMenuComponent} from '../../component/license-choice/license-choice.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {LicenseContextMenuComponent} from '../../component/license-context-menu/license-context-menu.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {LicenseDatePickerComponent} from '../../component/license-date-picker/license-date-picker.component';
import {environment} from '../../../environments/environment';
import {TranslateModule} from '@ngx-translate/core';
import {UserLicenseStateFacade} from '../../state/user-license/user-license-state-facade.service';
import {UserLicenseState} from '../../state/user-license/user-license.state';
import {ToastrService} from 'ngx-toastr';
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
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatPaginator} from '@angular/material/paginator';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {LicenseDialogService} from '../../component/license-dialog/license-dialog.service';

@Component({
  selector: 'license-home',
  standalone: true,
  imports: [
    LicenseChoiceMenuComponent,
    MatMenuTrigger,
    LicenseContextMenuComponent,
    MatButton,
    LicenseDatePickerComponent,
    TranslateModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPaginator,
    MatProgressBar,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatSuffix,
    MatTable,
    ReactiveFormsModule,
    FormsModule,
    MatHeaderCellDef
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  contextMenuItems: LicenseContextMenuItem[] = [
    { id: 'open', title: 'Open logs', icon: 'open_in_new', disabled: false },
    { id: 'edit', title: 'Edit', icon: 'edit', disabled: false, },
    { id: 'delete', title: 'Delete', icon: 'delete', disabled: false, }
  ];

  choiceMenu: LicenseChoiceMenu = {
    items: [
      {id: '1', value: 'Onion', activated: false},
      {id: '2', value: 'Sausage', activated: false},
      {id: '3', value: 'Tomato', activated: false}
    ]
  };

  protected loading = false;
  protected displayedColumns = ['licenseKey', 'publisher', 'notes', 'valid', 'validUntil', 'listMode', 'ipAddresses'];
  protected dataSource;
  protected filterValue: any;
  protected selectedLicense!: LicenseDto;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('contextMenu') contextMenu!: LicenseContextMenuComponent;

  constructor(private readonly userLicenseStateFacade: UserLicenseStateFacade,
              private readonly userLicenseState: UserLicenseState,
              private readonly toasterService: ToastrService,
              private readonly dialogService: LicenseDialogService) {

    this.dataSource = new MatTableDataSource(this.userLicenseState.selectUserLicenses$());

    this.userLicenseStateFacade.loadLicensesFromCurrentPublisher();

    effect(() => {
      this.dataSource.data = this.userLicenseState.selectUserLicenses$();
    });

    effect(() => {
      this.loading = this.userLicenseState.isLoadingLicenses$();
    });

    effect(() => {
      const userLicenseError = this.userLicenseState.selectError$();
      if (userLicenseError.title && userLicenseError.message) {
        this.toasterService.error(userLicenseError.message, userLicenseError.title);
      }
    });


  }

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  clearFilter() {
    this.filterValue = '';
    this.applyFilter();
  }

  refresh() {
    this.userLicenseStateFacade.loadLicensesFromCurrentPublisher();
  }

  protected readonly environment = environment;

  protected openContextMenu(event: MouseEvent, license: LicenseDto) {
    event.preventDefault();
    this.selectedLicense = license;
    this.contextMenu.open({x: event.x, y: event.y});
  }

  contextItemClick(item: LicenseContextMenuItem) {
    if (!this.selectedLicense) return;
    if (item.id === 'open') {

    } else if (item.id === 'edit') {

    } else if (item.id === 'delete') {
      this.dialogService.confirm(
        {title: 'Confirm Delete', message: 'Are you sure to delete the license '+this.selectedLicense.licenseKey+'?', confirmCaption: 'Delete', cancelCaption: 'Cancel', discardWithEscape: true}
      ).subscribe(value => {
        console.log("delete", value)
      })
    }

  }
}
