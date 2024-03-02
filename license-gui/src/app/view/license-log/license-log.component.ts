import {AfterViewInit, Component, effect, ViewChild} from '@angular/core';
import {LicenseTableComponent} from '../../component/license-table/license-table.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatProgressBar} from '@angular/material/progress-bar';
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
import {UserLicenseState} from '../../state/user-license/user-license.state';
import {MatButton, MatIconButton} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';
import {LicenseInputComponent} from '../../component/license-input/license-input.component';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {UserLicenseStateFacade} from '../../state/user-license/user-license-state-facade.service';

@Component({
  selector: 'license-license-log',
  standalone: true,
  imports: [
    LicenseTableComponent,
    MatPaginator,
    MatProgressBar,
    MatSort,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatSortHeader,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    TranslateModule,
    LicenseInputComponent,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatSuffix,
    MatProgressSpinner
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

  constructor(protected readonly userLicenseState: UserLicenseState,
              private readonly userLicenseFacade: UserLicenseStateFacade) {

    this.dataSource = new MatTableDataSource(this.userLicenseState.selectUserLicenseLogs$());

    effect(() => {
      this.loading = this.userLicenseState.isLoadingLogs$();
    });

    effect(() => {
      this.dataSource.data = this.userLicenseState.selectUserLicenseLogs$();
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
    this.userLicenseFacade.loadLogs('r35139uui9wIpQT68U8bxp1tGryDR35Yv9dRtAItlNgHe91dLh');
  }
}
