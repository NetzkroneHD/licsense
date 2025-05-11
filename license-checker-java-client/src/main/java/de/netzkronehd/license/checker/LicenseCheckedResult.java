package de.netzkronehd.license.checker;

public record LicenseCheckedResult(LicenseCheckedStatus status, Throwable exception)  {

    public static LicenseCheckedResult of(LicenseCheckedStatus status) {
        return new LicenseCheckedResult(status, null);
    }

    public static LicenseCheckedResult ofError(Throwable exception) {
        return new LicenseCheckedResult(LicenseCheckedStatus.ERROR, exception);
    }

}
