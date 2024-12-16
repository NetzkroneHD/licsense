import {ValidatorFn} from '@angular/forms';

export interface LicenseInput {

    prefix: string | null,
    label: string,
    placeholder: string,

    input: string,
    inputType: string,

    hint?: {
        align: 'start' | 'end',
        text: string
    },
    maxLength?: number,
    clearButtonLabel: string,

    validators: ValidatorFn[],

    error: {
        hasError: boolean,
        text: string
    },

}
