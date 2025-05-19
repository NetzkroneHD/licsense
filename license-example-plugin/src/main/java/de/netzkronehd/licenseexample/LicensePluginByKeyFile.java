package de.netzkronehd.licenseexample;

import de.netzkronehd.license.checker.siganture.SignatureChecker;
import de.netzkronehd.licenseexample.checker.Checker;
import org.bukkit.plugin.java.JavaPlugin;

import java.io.File;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

public final class LicensePluginByKeyFile extends JavaPlugin {

    @Override
    public void onEnable() {

        final File publicKeyFile = new File(getDataFolder().getAbsolutePath(), "license-key-public.der");

        final Checker checker;
        try {
            checker = new Checker(this, new SignatureChecker(publicKeyFile), "http://localhost:8080/license/api/v1");
        } catch (IOException | NoSuchAlgorithmException | InvalidKeySpecException e) {
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
