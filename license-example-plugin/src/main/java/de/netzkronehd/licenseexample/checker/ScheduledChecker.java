package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.LicenseChecker;
import de.netzkronehd.licenseexample.LicensePlugin;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;

public class ScheduledChecker extends Checker {

    private final LicenseChecker licenseChecker;
    private final Timer timer;

    public ScheduledChecker(LicensePlugin licensePlugin, String basePath) {
        super(licensePlugin, basePath);
        this.licenseChecker = new LicenseChecker(basePath, null);
        this.timer = new Timer();
    }

    public void startChecking(String key) {
        this.timer.schedule(new TimerTask() {
            @Override
            public void run() {
                checkLicense(key);
            }
        },0, TimeUnit.HOURS.toMillis(8));
    }

    @Override
    public void checkLicense(String key) {

    }
}
