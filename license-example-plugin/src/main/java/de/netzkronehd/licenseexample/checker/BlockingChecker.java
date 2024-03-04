package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.LicenseCheckedStatus;
import de.netzkronehd.license.checker.LicenseChecker;
import de.netzkronehd.license.checker.siganture.SignatureChecker;
import de.netzkronehd.licenseexample.LicensePlugin;

public class BlockingChecker extends Checker {

    public BlockingChecker(LicensePlugin licensePlugin, String basePath, SignatureChecker signatureChecker) {
        super(licensePlugin, basePath, signatureChecker);
    }

    @Override
    public void checkLicense(String key) {
        final LicenseCheckedStatus valid = LicenseChecker.isLicenseValid(basePath, key, signatureChecker);
        if (valid.isValid()) {
            valid();
        } else {
            invalid();
        }
    }
}
