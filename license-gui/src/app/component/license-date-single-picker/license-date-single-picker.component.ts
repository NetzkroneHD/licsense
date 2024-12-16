import {Component, Input} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {LicenseDateSinglePicker} from './license-date-picker.interface';

@Component({
    selector: 'license-date-single-picker',
    imports: [
        MatFormField,
        MatInput,
        MatDatepickerInput,
        ReactiveFormsModule,
        MatDatepickerToggle,
        MatDatepicker,
        MatHint,
        MatLabel,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule
    ],
    templateUrl: './license-date-single-picker.component.html',
    styleUrl: './license-date-single-picker.component.scss'
})
export class LicenseDateSinglePickerComponent {

  @Input({required: true}) datePicker!: LicenseDateSinglePicker;
  @Input({required: true}) dateFormControl!: FormControl<Date | null>;

  constructor() {

  }


}
