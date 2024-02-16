import {ListMode} from './list-mode.enum';

export interface LicenseModel {

  license: string;
  publisher: string;
  notes: string;
  valid: boolean;
  validUntil: Date;
  listMode: ListMode;
  ipAddresses: string[];

}
