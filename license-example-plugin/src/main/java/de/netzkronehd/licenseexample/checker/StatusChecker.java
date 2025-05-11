package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.LicenseChecker;
import de.netzkronehd.license.checker.siganture.SignatureChecker;
import de.netzkronehd.licenseexample.LicensePluginByKeyFile;

public class StatusChecker extends Checker {

    public StatusChecker(LicensePluginByKeyFile licensePlugin, String basePath, SignatureChecker signatureChecker) {
        super(licensePlugin, basePath, signatureChecker);
    }

    @Override
    public void checkLicense(String key) {
        LicenseChecker.isLicenseValid(basePath, key, signatureChecker, result -> {
            if (result.status().isValid()) {
                valid();
            } else {
                invalid();
            }
        });
    }
}
