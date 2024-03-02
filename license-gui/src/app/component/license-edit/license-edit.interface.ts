import {LicenseDto, ListModeDto} from '@license/license-api-client-typescript-fetch';

export type EditType = 'create' | 'edit';

export interface LicenseEdit {

  licenseKey: string,
  publisher: string,
  notes: string,
  valid: boolean,
  validUntil: Date,
  listMode: ListModeDto,
  ipAddresses: string[],
  editType: EditType,
  licenseReference?: LicenseDto,

  dialog: {
    title: string,
    confirmCaption: string,
    cancelCaption: string
  }
}

export interface LicenseEditAction {
  licenseEdit: LicenseEdit,
  confirmAction: boolean,
  changes: boolean
}
