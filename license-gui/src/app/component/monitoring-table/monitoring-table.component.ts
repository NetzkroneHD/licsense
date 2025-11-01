import {AfterViewInit, Component, effect, input, ViewChild} from '@angular/core';
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
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {TranslateModule} from '@ngx-translate/core';
import {IpMonitoringEntry} from '../../state/monitoring/model/monitoring-data.interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
    selector: 'license-monitoring-table',
    imports: [
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
        TranslateModule,
        MatHeaderCellDef,
        MatPaginator,
        MatProgressBar
    ],
    templateUrl: './monitoring-table.component.html',
    styleUrl: './monitoring-table.component.scss'
})
export class MonitoringTableComponent implements AfterViewInit {

    @ViewChild(MatPaginator)
    protected paginator!: MatPaginator;
    @ViewChild(MatSort)
    protected sort!: MatSort;

    public readonly loading = input.required<boolean>();
    public readonly data = input.required<IpMonitoringEntry[]>();

    protected readonly displayedColumns = ['ip', 'count', 'lastLog', 'firstLog'];
    protected readonly dataSource: MatTableDataSource<IpMonitoringEntry>;

    constructor() {
        this.dataSource = new MatTableDataSource<IpMonitoringEntry>([]);
        effect(() => {
            const analyzedData = this.data();
            if (!analyzedData) return;
            this.dataSource.data = analyzedData;
        });
    }

    public ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

}
