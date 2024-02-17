
export interface LicenseContextMenuItem {
  id: string,
  title?: string;
  icon?: string;
  disabled: boolean;
  entries?: LicenseContextMenuItem[];
}
