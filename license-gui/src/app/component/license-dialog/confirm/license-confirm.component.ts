import {ChangeDetectionStrategy, Component, HostListener, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {A11yModule} from '@angular/cdk/a11y';
import {LicenseConfirmDialogData} from './license-confirm.interface';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';

@Component({
  selector: 'license-dialog-confirm',
  standalone: true,
    imports: [MatDialogModule, MatButtonModule, A11yModule, CdkDrag, CdkDragHandle],
  templateUrl: './license-confirm.component.html',
  styleUrls: ['./license-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LicenseConfirmComponent {

  title = '';
  message = '';
  cancelCaption = '';
  confirmCaption = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: LicenseConfirmDialogData,
    public readonly dialogRef: MatDialogRef<LicenseConfirmDialogData>
  ) {
    this.title = data.title;
    this.message = data.message;
    this.cancelCaption = data.cancelCaption;
    this.confirmCaption = data.confirmCaption;
  }

  @HostListener('window:keyup.escape')
  keyEventEscape(): void {
    if (this.data.discardWithEscape === true) {
      this.dialogRef.close(false);
    }
  }

}
