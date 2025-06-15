import {Component, input, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {LicenseDatePicker} from './license-date-picker.interface';

@Component({
    selector: 'license-date-picker',
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule],
    templateUrl: './license-date-picker.component.html',
    styleUrl: './license-date-picker.component.scss'
})
export class LicenseDatePickerComponent {

    public readonly datePicker = input.required<LicenseDatePicker>();
    public readonly startDateControl = input.required<FormControl<Date | null>>();
    public readonly endDateControl = input.required<FormControl<Date | null>>();

    public readonly onApplyButtonClick = output<MouseEvent>();
    public readonly onCancelButtonClick = output<MouseEvent>();
}
