import {Component, input} from '@angular/core';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
    selector: 'license-table',
    imports: [
        MatProgressBar,
        MatPaginator,
        MatTable,
        MatSort
    ],
    templateUrl: './license-table.component.html',
    styleUrl: './license-table.component.scss'
})
export class LicenseTableComponent {

    public readonly loading = input<boolean>(false);

}
