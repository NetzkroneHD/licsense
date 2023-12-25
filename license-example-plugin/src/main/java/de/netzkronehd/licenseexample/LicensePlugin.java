package de.netzkronehd.licenseexample;

import org.bukkit.plugin.java.JavaPlugin;

public final class LicensePlugin extends JavaPlugin {

    @Override
    public void onEnable() {

        final String key = getConfig().getString("license-key");



    }

    @Override
    public void onDisable() {

    }
}
