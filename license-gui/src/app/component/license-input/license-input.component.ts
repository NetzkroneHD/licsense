import {Component, EventEmitter, input, OnInit, Output} from '@angular/core';
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {LicenseInput} from './license-input.interface';
import {FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'license-input',
    imports: [
        MatFormField,
        MatInput,
        MatHint,
        MatIconButton,
        MatIcon,
        ReactiveFormsModule,
        MatLabel,
        MatError,
        MatSuffix
    ],
    templateUrl: './license-input.component.html',
    styleUrl: './license-input.component.scss'
})
export class LicenseInputComponent implements OnInit {

    public readonly input = input.required<LicenseInput>()

    @Output() onClearButtonClick: EventEmitter<LicenseInput> = new EventEmitter<LicenseInput>();
    @Output() onValueChange$: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(private formBuilder: FormBuilder) {

    }

    private _formControl!: FormControl<string | null>;

    get formControl(): FormControl<string | null> {
        return this._formControl;
    }

    ngOnInit() {
        this._formControl = this.formBuilder.control(this.input().input, this.input().validators);
        this._formControl.markAllAsTouched();
    }

    protected onClearClick() {
        this._formControl.reset();
        this.onClearButtonClick.emit(this.input());
    }

    protected onValueChange(event: Event) {
        this.onValueChange$.emit(event);
    }
}
