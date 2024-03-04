package de.netzkronehd.license.checker;

public enum LicenseCheckedStatus {

    VALID,
    INVALID,
    INVALID_SIGNATURE,
    ERROR;

    public boolean isValid() {
        return this == VALID;
    }

    public boolean isInvalid() {
        return this == INVALID || this == INVALID_SIGNATURE || this == ERROR;
    }

    public static LicenseCheckedStatus ofValidity(boolean valid) {
        return valid ? VALID:INVALID;
    }

}
