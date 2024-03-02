import {ChangeDetectionStrategy, Component, HostListener, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import {LicenseInfoDialogData} from './license-info.interface';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';

@Component({
  selector: 'license-dialog-info',
  standalone: true,
    imports: [MatIconModule, MatDialogModule, MatButtonModule, A11yModule, CdkDrag, CdkDragHandle],
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LicenseInfoComponent {

  title = '';
  message = '';
  confirmCaption = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: LicenseInfoDialogData,
              public readonly dialogRef: MatDialogRef<LicenseInfoDialogData>
  ) {
    this.title = data.title;
    this.message = data.message;
    this.confirmCaption = data.confirmCaption;
  }

  @HostListener('window:keyup.escape')
  keyEventEscape(): void {
    if (this.data.discardWithEscape === true) {
      this.dialogRef.close(false);
    }
  }

}
