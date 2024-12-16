export interface LicenseDropdownMenuItem {
    id: string,
    title?: string;
    icon?: string;
    disabled: boolean;
    entries?: LicenseDropdownMenuItem[];
}
