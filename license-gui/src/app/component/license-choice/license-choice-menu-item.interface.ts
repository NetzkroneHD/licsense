import {ThemeColor} from '../color.type';

export interface LicenseChoiceMenuItem {
    id: string;
    value: any;
    activated: boolean;
    color?: ThemeColor;
}
