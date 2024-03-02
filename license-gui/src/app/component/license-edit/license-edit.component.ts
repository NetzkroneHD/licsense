import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {CdkTrapFocus} from '@angular/cdk/a11y';
import {LicenseEdit} from './license-edit.interface';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {environment} from '../../../environments/environment';
import {LicenseDateSinglePickerComponent} from '../license-date-single-picker/license-date-single-picker.component';

@Component({
  selector: 'license-edit',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    CdkTrapFocus,
    MatDialogClose,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    MatHint,
    MatSlideToggle,
    LicenseDateSinglePickerComponent
  ],
  templateUrl: './license-edit.component.html',
  styleUrl: './license-edit.component.scss'
})
export class LicenseEditComponent implements AfterViewInit {

  public readonly licenseEdit: LicenseEdit;

  protected changes = false;

  @ViewChild('validUntil') datePicker!: LicenseDateSinglePickerComponent;

  constructor(@Inject(MAT_DIALOG_DATA) data: LicenseEdit) {
    this.licenseEdit = data;
  }

  ngAfterViewInit() {

  }


  protected readonly String = String;
  protected readonly environment = environment;
}
