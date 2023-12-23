package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.LicenseChecker;
import de.netzkronehd.licenseexample.LicensePlugin;
import org.springframework.http.HttpStatus;

public class HttpInfoChecker extends Checker {

    private final LicenseChecker licenseChecker;

    public HttpInfoChecker(LicensePlugin licensePlugin, String basePath) {
        super(licensePlugin, basePath);
        licenseChecker = new LicenseChecker(basePath, null);
    }

    @Override
    public void checkLicense(String key) {
        licenseChecker.getLicenseWithHttpInfo(key).subscribe(responseEntity -> {
            if (responseEntity.getStatusCode() == HttpStatus.NOT_FOUND) {
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
