package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.LicenseChecker;
import de.netzkronehd.license.checker.siganture.SignatureChecker;
import de.netzkronehd.licenseexample.LicensePlugin;
import org.springframework.http.HttpStatus;

public class HttpInfoChecker extends Checker {

    private final LicenseChecker licenseChecker;

    public HttpInfoChecker(LicensePlugin licensePlugin, String basePath, SignatureChecker signatureChecker) {
        super(licensePlugin, basePath, signatureChecker);
        licenseChecker = new LicenseChecker(basePath, null, signatureChecker);
    }

    @Override
    public void checkLicense(String key) {
        licenseChecker.checkLicenseWithHttpInfo(key).subscribe(responseEntity -> {
            if (responseEntity.getStatusCode() != HttpStatus.OK) {
                invalid();
                return;
            }

            if (responseEntity.getBody() == null) {
                invalid();
                return;
            }

            if (!signatureChecker.isValidSignature(responseEntity.getBody())) {
                invalid();
                return;
            }

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                if (responseEntity.getBody() != null && responseEntity.getBody().getValid()) {
                    valid();
                } else {
                    invalid();
                }
            }
        }, throwable -> {
            licensePlugin.getLogger().info("Could not check license! "+throwable);
        });
    }
}
