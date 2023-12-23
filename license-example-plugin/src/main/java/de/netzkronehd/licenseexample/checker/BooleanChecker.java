package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.LicenseChecker;
import de.netzkronehd.licenseexample.LicensePlugin;

public class BooleanChecker extends Checker {

    public BooleanChecker(LicensePlugin licensePlugin, String basePath) {
        super(licensePlugin, basePath);
    }

    @Override
    public void checkLicense(String key) {
        LicenseChecker.isLicenseValid(basePath, key, valid -> {
            if (valid) {
                valid();
            } else {
                invalid();
            }
        });
    }
}
