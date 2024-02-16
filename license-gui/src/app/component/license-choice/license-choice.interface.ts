export interface LicenseChoice {

  prefix: string | null,
  label: string,
  placeholder: string,

  input: LicenseChoiceOption,
  inputType: string,

  options: LicenseChoiceOption[],

  hint?: {
    align: 'start' | 'end',
    text: string
  }
}

export interface LicenseChoiceOption {
  value: any,
  displayValue: string
}
