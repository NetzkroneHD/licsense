import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {LicenseEditComponent} from './license-edit.component';
import {LicenseEdit, LicenseEditAction} from './license-edit.interface';
import {PublisherApiService} from '../../api/service/publisher-api.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LicenseEditService {

  constructor(private readonly dialog: MatDialog,
              private readonly publisherApiService: PublisherApiService,
              private readonly translateService: TranslateService) {

  }

  public edit(license: LicenseDto) {

  }

  public create(): Observable<LicenseEditAction> {
    const licenseEdit: LicenseEdit = {
      licenseKey: '',
      publisher: this.publisherApiService.getCurrentPublisher(),
      notes: '',
      valid: true,
      validUntil: new Date(),
      listMode: 'BLACKLIST',
      ipAddresses: [],
      editType: 'create',
      dialog: {
        title: this.translateService.instant('Create a license.'),
        confirmCaption: this.translateService.instant('Create'),
        cancelCaption: this.translateService.instant('Cancel')
      }
    }

    return this.dialog
      .open(LicenseEditComponent, {
        disableClose: true,
        width: '45%',
        data: licenseEdit,
        delayFocusTrap: false,
      })
      .afterClosed();

  }

}
