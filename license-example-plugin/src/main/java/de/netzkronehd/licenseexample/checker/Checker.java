package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.LicenseChecker;
import de.netzkronehd.license.checker.siganture.SignatureChecker;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

public class Checker {

    private final JavaPlugin plugin;
    private final LicenseChecker licenseChecker;

    public Checker(JavaPlugin plugin, SignatureChecker signatureChecker, String basePath) {
        this.plugin = plugin;
        this.licenseChecker = new LicenseChecker(basePath, signatureChecker);
    }

    @Deprecated
    public void checkSync(String key) {
        if (licenseChecker.isLicenseValid(key).isValid()) {
            valid();
        } else {
            invalid();
        }
    }

    public void checkAsync(String key) {
        licenseChecker.isLicenseValid(key, result -> {
            if (result.status().isValid()) {
                valid();
            } else {
                invalid();
            }
        });
    }

    private void valid() {
        plugin.getLogger().info("Valid license!");
    }

    private void invalid() {
        plugin.getLogger().severe("Invalid license!");
        Bukkit.shutdown();
    }

}
