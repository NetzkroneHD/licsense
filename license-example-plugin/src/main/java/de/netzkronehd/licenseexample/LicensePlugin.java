package de.netzkronehd.licenseexample;

import de.netzkronehd.license.checker.siganture.SignatureChecker;
import de.netzkronehd.licenseexample.checker.ScheduledChecker;
import org.bukkit.plugin.java.JavaPlugin;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

public final class LicensePlugin extends JavaPlugin {

    @Override
    public void onEnable() {

        final String key = getConfig().getString("license-key");
        final ScheduledChecker scheduledChecker;
        try {
            scheduledChecker = new ScheduledChecker(this, "http://localhost:8080/license/api/v1", new SignatureChecker());
        } catch (URISyntaxException | IOException | NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }
        scheduledChecker.startChecking(key);


    }

    @Override
    public void onDisable() {

    }
}
