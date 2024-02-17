import {LicenseDialog} from '../license-dialog.interface';

export interface LicenseInfoDialogData extends LicenseDialog {
  title: string;
  message: string;
  confirmCaption: string;
  discardWithEscape?: boolean;
}
