import {ErrorStateMatcher} from '@angular/material/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {LicenseInput} from './license-input.interface';

export class LicenseInputErrorMatcher implements ErrorStateMatcher {

    constructor(licenseInput: LicenseInput, formControl: FormControl) {
        this._licenseInput = licenseInput;
        this._formControl = formControl;
    }

    private _licenseInput!: LicenseInput;

    get licenseInput(): LicenseInput {
        return this._licenseInput;
    }

    set licenseInput(value: LicenseInput) {
        this._licenseInput = value;
    }

    private _formControl!: FormControl;

    get formControl(): FormControl {
        return this._formControl;
    }

    set formControl(value: FormControl) {
        this._formControl = value;
    }

    isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
        this.formControl.updateValueAndValidity();
        if (!this._formControl.valid) {
            return true;
        }
        if (!this._licenseInput) {
            return false;
        }
        return this._licenseInput.error.hasError;
    }

}
