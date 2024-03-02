import {AfterViewInit, Component, effect, ViewChild} from '@angular/core';
import {LicenseContextMenuItem} from '../../component/license-context-menu/license-context-menu-item.interface';
import {LicenseChoiceMenu} from '../../component/license-choice/license-choice-menu.interface';
import {LicenseContextMenuComponent} from '../../component/license-context-menu/license-context-menu.component';
import {environment} from '../../../environments/environment';
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
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {LicenseDialogService} from '../../component/license-dialog/license-dialog.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LicenseEditService} from '../../component/license-edit/license-edit.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatProgressBar} from '@angular/material/progress-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'license-home',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    TranslateModule,
    MatIconButton,
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
  protected selectedLicense: {previous: LicenseDto | null; current: LicenseDto | null} = { previous: null, current: null};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('contextMenu') contextMenu!: LicenseContextMenuComponent;

  constructor(private readonly userLicenseStateFacade: UserLicenseStateFacade,
              private readonly userLicenseState: UserLicenseState,
              private readonly toasterService: ToastrService,
              private readonly dialogService: LicenseDialogService,
              private readonly translateService: TranslateService,
              private readonly licenseEditService: LicenseEditService,
              private readonly router: Router) {

    this.dataSource = new MatTableDataSource(this.userLicenseState.selectUserLicenses$());

    effect(() => {
      this.dataSource.data = this.userLicenseState.selectUserLicenses$();
    });

    effect(() => {
      this.loading = this.userLicenseState.isLoadingAnyLicense$();
    });

    effect(() => {
      const userLicenseError = this.userLicenseState.selectError$();
      if (userLicenseError.title && userLicenseError.message) {
        this.toasterService.error(userLicenseError.message, userLicenseError.title);
      }
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

  protected refresh() {
    if (this.userLicenseState.isLoadingAnyLicense$()) {

      this.toasterService.info(this.translateService.instant('The licenses are already loading.'), this.translateService.instant('Loading...'));
      return;
    }
    this.userLicenseStateFacade.loadLicensesFromCurrentPublisher();
  }

  protected readonly environment = environment;

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
      this.router.navigate(['license-logs']).then(() => {
        this.userLicenseStateFacade.loadLogs(licenseKey);
      });
    } else if (item.id === 'edit') {
      if (!this.selectedLicense.previous) return;
      this.editLicense(this.selectedLicense.previous);

    } else if (item.id === 'delete') {
      this.dialogService.confirm(
        {
          title: 'Confirm Delete',
          message: 'Are you sure to delete the license ' + this.selectedLicense.previous.licenseKey + '?',
          confirmCaption: 'Delete',
          cancelCaption: 'Cancel',
          discardWithEscape: true
        }
      ).subscribe(value => {
        console.log("delete", value)

      })
    }

  }

  protected createLicense() {
    this.licenseEditService.create().subscribe(editAction => {
      console.log("createAction", editAction);
    });
  }

  protected editLicense(license: LicenseDto) {
    this.licenseEditService.edit(license).subscribe(editAction => {
      console.log("editAction", editAction);
    })
  }


  contextMenuClosed() {
    this.selectedLicense = {previous: this.selectedLicense.current, current: null};
  }
}
