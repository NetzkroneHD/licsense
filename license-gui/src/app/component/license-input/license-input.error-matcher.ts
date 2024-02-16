import {ErrorStateMatcher} from '@angular/material/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {LicenseInput} from './license-input.interface';

export class LicenseInputErrorMatcher implements ErrorStateMatcher {

  private _licenseInput!: LicenseInput;
  private _formControl!: FormControl;

  constructor(licenseInput: LicenseInput, formControl: FormControl) {
    this._licenseInput = licenseInput;
    this._formControl = formControl;
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

  get formControl(): FormControl {
    return this._formControl;
  }

  set formControl(value: FormControl) {
    this._formControl = value;
  }

  set licenseInput(value: LicenseInput) {
    this._licenseInput = value;
  }

  get licenseInput(): LicenseInput {
    return this._licenseInput;
  }

}
