import {AfterViewInit, Component, effect, inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {
  MatCell,
  MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {UserLicenseStore} from '../../state/user-license/user-license-store.service';
import {UserLicenseStoreFacade} from '../../state/user-license/user-license-store-facade.service';
import {TranslateModule} from '@ngx-translate/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'license-license-log',
  standalone: true,
  imports: [
    MatRowDef,
    MatRow,
    MatHeaderRowDef,
    MatHeaderRow,
    MatCell,
    MatCellDef,
    TranslateModule,
    MatSortHeader,
    MatHeaderCellDef,
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
    MatLabel
  ],
  templateUrl: './license-log.component.html',
  styleUrl: './license-log.component.scss'
})
export class LicenseLogComponent implements AfterViewInit {

  protected loading = false;
  protected displayedColumns = ['id', 'license', 'ip', 'dateTime', 'listBehaviorResult'];
  protected dataSource;
  protected filterValue: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected readonly userLicenseStore = inject(UserLicenseStore);
  private readonly userLicenseStoreFacade = inject(UserLicenseStoreFacade);

  constructor() {

    this.dataSource = new MatTableDataSource(this.userLicenseStore.getUserLicenseLogs());

    effect(() => {
      this.loading = this.userLicenseStore.getLoadingLogs();
    });

    effect(() => {
      this.dataSource.data = this.userLicenseStore.getUserLicenseLogs();
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  clearFilter() {
    this.filterValue = '';
    this.applyFilter();
  }

  refresh() {
    const currentLicense = this.userLicenseStore.getCurrentLicense();
    if(!currentLicense) return;
    this.userLicenseStoreFacade.loadLogs(currentLicense);
  }

  deleteHistory() {
    const currentLicense = this.userLicenseStore.getCurrentLicense();
    if(!currentLicense) return;
    this.userLicenseStoreFacade.deleteLogs(currentLicense);
  }
}
