import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LicenseDatePicker} from './license-date-picker.interface';

@Component({
  selector: 'license-date-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './license-date-picker.component.html',
  styleUrl: './license-date-picker.component.scss'
})
export class LicenseDatePickerComponent {

  private readonly _dateRange = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null)
  });

  @Output() public readonly applyButtonClick$ = new EventEmitter<MouseEvent>();
  @Output() public readonly cancelButtonClick$ = new EventEmitter<MouseEvent>();

  @Input({required: true}) datePicker!: LicenseDatePicker;

  constructor() {
  }


  @Output() get dateRange(): FormGroup<{
    endDate: FormControl<Date | null>;
    startDate: FormControl<Date | null>
  }> {
    return this._dateRange;
  }
}
