package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.LicenseChecker;
import de.netzkronehd.licenseexample.LicensePlugin;
import org.bukkit.Bukkit;

public class SubscribeChecker extends Checker {

    public SubscribeChecker(LicensePlugin licensePlugin, String basePath) {
        super(licensePlugin, basePath);
    }

    public void checkLicense(String key) {
        LicenseChecker.getLicense(basePath, key).subscribe(licenseDto -> {
            if (licenseDto.getValid()) {
                valid();
            } else {
                invalid();
            }
        }, throwable -> {
            licensePlugin.getLogger().info("Error while getting license.");
            Bukkit.shutdown();
        });
    }

}
