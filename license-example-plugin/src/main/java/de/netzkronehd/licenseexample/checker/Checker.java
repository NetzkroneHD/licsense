package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.siganture.SignatureChecker;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

public abstract class Checker {

    protected final JavaPlugin licensePlugin;
    protected final String basePath;
    protected final SignatureChecker signatureChecker;

    public Checker(JavaPlugin licensePlugin, String basePath, SignatureChecker signatureChecker) {
        this.licensePlugin = licensePlugin;
        this.basePath = basePath;
        this.signatureChecker = signatureChecker;
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
