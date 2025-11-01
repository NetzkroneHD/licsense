import {Component, input, output} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatSelect, MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatOption} from '@angular/material/autocomplete';
import {SelectOption} from './select-option.interface';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'license-select',
    imports: [
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIcon
    ],
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss'
})
export class SelectComponent<T> {

    public readonly value = input.required<T>();
    public readonly label = input.required<string>();
    public readonly disabled = input<boolean>();
    public readonly options = input.required<SelectOption<T>[]>();

    public readonly onSelectionChange = output<T>();
    public readonly onValueChange = output<T>();


    protected selectionChange(event: MatSelectChange<T>) {
        this.onSelectionChange.emit(event.value);
    }

    protected valueChange(event: T) {
        this.onValueChange.emit(event);
    }
}
