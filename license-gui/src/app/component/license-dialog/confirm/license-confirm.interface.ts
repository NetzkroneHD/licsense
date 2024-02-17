import {LicenseDialog} from '../license-dialog.interface';

export interface LicenseConfirmDialogData extends LicenseDialog {
  title: string;
  message: string;
  confirmCaption: string;
  cancelCaption: string;
  discardWithEscape?: boolean;
}
