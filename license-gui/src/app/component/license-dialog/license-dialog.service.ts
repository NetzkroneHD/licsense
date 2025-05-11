import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

import {LicenseConfirmComponent} from './confirm/license-confirm.component';
import {LicenseConfirmDialogData} from './confirm/license-confirm.interface';
import {LicenseInfoComponent} from './info/license-info.component';
import {LicenseInfoDialogData} from './info/license-info.interface';

@Injectable({providedIn: 'root'})
export class LicenseDialogService {

    constructor(private dialog: MatDialog) {
    }

    public confirm(data: LicenseConfirmDialogData): Observable<boolean> {
        return this.dialog
            .open(LicenseConfirmComponent, {
                width: data.width,
                disableClose: true,
                data: data,
                delayFocusTrap: false,
            })
            .afterClosed();
    }

    public info(data: LicenseInfoDialogData): Observable<boolean> {
        return this.dialog
            .open(LicenseInfoComponent, {
                width: data.width,
                disableClose: true,
                data: data,
                delayFocusTrap: false,
            })
            .afterClosed();
    }

}
