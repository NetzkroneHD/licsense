export interface LicenseCheckResult {

  licenseKey: string;
  publisher: string;
  notes: string;
  valid: boolean;
  validUntil: Date;

}
