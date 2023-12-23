package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.LicenseChecker;
import de.netzkronehd.licenseexample.LicensePlugin;

public class BlockingChecker extends Checker {

    public BlockingChecker(LicensePlugin licensePlugin, String basePath) {
        super(licensePlugin, basePath);
    }

    @Override
    public void checkLicense(String key) {
        final boolean valid = LicenseChecker.isLicenseValidWithBlocking(basePath, key);
        if (valid) {
            valid();
        } else {
            invalid();
        }
    }
}
