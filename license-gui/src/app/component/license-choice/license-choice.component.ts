import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {LicenseChoice} from './license-choice.interface';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';

@Component({
    selector: 'license-choice',
    standalone: true,
    imports: [
        MatFormField,
        MatSelect,
        MatOption,
        MatHint,
        MatLabel
    ],
    templateUrl: './license-choice.component.html',
    styleUrl: './license-choice.component.scss'
})
export class LicenseChoiceComponent {

    @Input({required: true}) choice!: LicenseChoice;

    @Output() selectionChange$: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();

    constructor() {
    }

}
