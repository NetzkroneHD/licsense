import {Component, effect, input, OnInit, output, signal} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatOption
} from '@angular/material/autocomplete';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';

@Component({
    selector: 'license-autocomplete',
    imports: [
        MatFormField,
        MatAutocompleteTrigger,
        ReactiveFormsModule,
        MatAutocomplete,
        MatOption,
        MatLabel,
        MatInput
    ],
    templateUrl: './license-autocomplete.component.html',
    styleUrl: './license-autocomplete.component.scss'
})
export class LicenseAutocompleteComponent implements OnInit {

    public readonly formControl = input.required<FormControl<string | null>>();
    public readonly label = input.required<string>();
    public readonly placeholder = input.required<string>();
    public readonly options = input.required<string[]>();
    public readonly filteredOptions = signal<string[]>([]);

    public readonly optionSelected = output<MatAutocompleteSelectedEvent>();

    constructor() {
        effect(() => {
            const options = this.options();
            this.filteredOptions.set(options);
        });
    }

    public ngOnInit() {
        this.formControl().valueChanges.subscribe(value => {
           this.filteredOptions.set(this.filter(value || ''));
        });
    }

    private filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options().filter(option => option.toLowerCase().includes(filterValue));
    }

    protected onOptionSelected(event: MatAutocompleteSelectedEvent) {
        this.optionSelected.emit(event);
    }
}
