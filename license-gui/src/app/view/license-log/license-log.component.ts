import {AfterViewInit, Component, effect, Input, ViewChild} from '@angular/core';
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
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {MatButton, MatIconButton} from '@angular/material/button';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {LicenseApiService} from '../../api/service/license-api.service';
import {LicenseInputComponent} from '../../component/license-input/license-input.component';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

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

  @Input() initialLicenseLoad: string | undefined | null;

  protected loading = false;
  protected displayedColumns = ['id', 'license', 'ip', 'dateTime', 'listBehaviorResult'];
  protected dataSource;
  protected filterValue: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(protected readonly userLicenseState: UserLicenseState,
              private readonly licenseApiService: LicenseApiService,
              private readonly toasterService: ToastrService,
              private readonly translateService: TranslateService) {



    const logs: LicenseLogDto[] = [];

    this.dataSource = new MatTableDataSource(logs);

    effect(() => {
      if(this.dataSource.data == this.userLicenseState.selectUserLicenseLogs$()) return;
      this.dataSource.data = this.userLicenseState.selectUserLicenseLogs$();
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadLicenseLogs(license: string) {
    this.loading = true;

    this.licenseApiService.getLicenseLogsRaw(license)
      .then(async apiResponse => {
        if (apiResponse.raw.status === 200) {
          this.dataSource.data = await apiResponse.value();
        } else {
          this.toasterService.error(this.translateService.instant("Error: {{error}}").replace("{{error}}", apiResponse.raw.statusText), this.translateService.instant("Error while getting logs."));
        }
      }).catch(reason => {
        this.toasterService.error(this.translateService.instant("Error: {{error}}").replace("{{error}}", reason), this.translateService.instant("Error while getting logs."));
    }).finally(() => {
      this.loading = false;
    });
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    console.log("fitlerValue", this.filterValue)
  }

  clearFilter() {
    this.filterValue = '';
    this.applyFilter();
  }
}
