import {ThemeColor} from '../color.type';

export interface LicenseDatePicker {

    label: string;
    hint?: string;

    startDate: {
        placeholder: string;
    };
    endDate: {
        placeholder: string;
    }
    applyButton: {
        text: string;
        color: ThemeColor;
    };
    cancelButton: {
        text: string;
        color: ThemeColor;
    };

}
