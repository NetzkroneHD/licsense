package de.netzkronehd.licenseexample;

import de.netzkronehd.licenseexample.checker.ScheduledChecker;
import org.bukkit.plugin.java.JavaPlugin;

public final class LicensePlugin extends JavaPlugin {

    @Override
    public void onEnable() {

        final String key = getConfig().getString("license-key");
        final ScheduledChecker scheduledChecker = new ScheduledChecker(this, "http://localhost:8080");
        scheduledChecker.startChecking(key);


    }

    @Override
    public void onDisable() {

    }
}
