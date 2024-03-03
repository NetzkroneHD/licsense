import {AfterViewInit, Component, Inject} from '@angular/core';
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
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {environment} from '../../../environments/environment';
import {LicenseDateSinglePickerComponent} from '../license-date-single-picker/license-date-single-picker.component';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {ListModeDto} from '@license/license-api-client-typescript-fetch';
import {
  MatChipEditedEvent,
  MatChipGrid,
  MatChipInput,
  MatChipInputEvent,
  MatChipRemove,
  MatChipRow
} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

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
    LicenseDateSinglePickerComponent,
    CdkDrag,
    CdkDragHandle,
    MatRadioGroup,
    MatRadioButton,
    MatChipGrid,
    MatChipRow,
    MatChipInput,
    MatChipRemove
  ],
  templateUrl: './license-edit.component.html',
  styleUrl: './license-edit.component.scss'
})
export class LicenseEditComponent implements AfterViewInit {

  public readonly licenseEdit: LicenseEdit;
  protected readonly separatorKeysCodes = [ENTER, COMMA] as const;
  protected changes = false;

  protected readonly dateFormControl: FormControl<Date | null> = new FormControl<Date | null>(null);
  protected readonly formControlGroup = new FormGroup({date: this.dateFormControl});

  constructor(@Inject(MAT_DIALOG_DATA) data: LicenseEdit) {
    this.licenseEdit = data;
    this.dateFormControl.addValidators(Validators.required);
    this.dateFormControl.setValue(this.licenseEdit.validUntil);
    this.dateFormControl.valueChanges.subscribe(value => {
      if (value) {
        this.licenseEdit.validUntil = value;
      }
    })
  }

  ngAfterViewInit() {
  }


  protected readonly String = String;
  protected readonly environment = environment;
  protected readonly ListModeDto = ListModeDto;

  protected addIp(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.licenseEdit.ipAddresses.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  protected removeIp(ip: string) {
    const index = this.licenseEdit.ipAddresses.indexOf(ip);

    if (index >= 0) {
      this.licenseEdit.ipAddresses.splice(index, 1);
    }

  }

  protected editIp(ip: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.removeIp(ip);
      return;
    }

    // Edit existing fruit
    const index = this.licenseEdit.ipAddresses.indexOf(ip);
    if (index >= 0) {
      this.licenseEdit.ipAddresses[index] = value;
    }

  }
}
