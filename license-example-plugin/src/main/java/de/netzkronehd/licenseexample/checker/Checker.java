package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.licenseexample.LicensePlugin;
import org.bukkit.Bukkit;

public abstract class Checker {

    protected final LicensePlugin licensePlugin;
    protected final String basePath;

    public Checker(LicensePlugin licensePlugin, String basePath) {
        this.licensePlugin = licensePlugin;
        this.basePath = basePath;
    }

    public abstract void checkLicense(String key);

    public void valid() {
        licensePlugin.getLogger().info("Valid license!");
    }

    public void invalid() {
        licensePlugin.getLogger().severe("Invalid license!");
        Bukkit.shutdown();
    }

}
