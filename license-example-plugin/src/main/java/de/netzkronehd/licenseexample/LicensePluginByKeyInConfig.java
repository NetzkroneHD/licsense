package de.netzkronehd.licenseexample;

import de.netzkronehd.license.checker.siganture.SignatureChecker;
import de.netzkronehd.licenseexample.checker.Checker;
import org.bukkit.plugin.java.JavaPlugin;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

public final class LicensePluginByKeyInConfig extends JavaPlugin {

    @Override
    public void onEnable() {

        saveDefaultConfig();

        final String publicLicenseKey = getConfig().getString("license.public-key");

        final Checker checker;
        try {
            checker = new Checker(this, new SignatureChecker(publicLicenseKey), "http://localhost:8080/license/api/v1");
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }

        final String key = getConfig().getString("license.key");
        checker.checkAsync(key);
        checker.checkSync(key);

    }

    @Override
    public void onDisable() {

    }

}
