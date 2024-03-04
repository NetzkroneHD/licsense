package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.LicenseChecker;
import de.netzkronehd.license.checker.siganture.SignatureChecker;
import de.netzkronehd.licenseexample.LicensePlugin;

public class StatusChecker extends Checker {

    public StatusChecker(LicensePlugin licensePlugin, String basePath, SignatureChecker signatureChecker) {
        super(licensePlugin, basePath, signatureChecker);
    }

    @Override
    public void checkLicense(String key) {
        LicenseChecker.isLicenseValid(basePath, key, signatureChecker, status -> {
            if (status.isValid()) {
                valid();
            } else {
                invalid();
            }
        });
    }
}
