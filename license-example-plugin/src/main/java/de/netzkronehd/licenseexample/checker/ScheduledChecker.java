package de.netzkronehd.licenseexample.checker;

import de.netzkronehd.license.checker.LicenseChecker;
import de.netzkronehd.license.checker.siganture.SignatureChecker;
import de.netzkronehd.licenseexample.LicensePlugin;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;

public class ScheduledChecker extends Checker {

    private final LicenseChecker licenseChecker;
    private final Timer timer;

    public ScheduledChecker(LicensePlugin licensePlugin, String basePath, SignatureChecker signatureChecker) {
        super(licensePlugin, basePath, signatureChecker);
        this.licenseChecker = new LicenseChecker(basePath, null, signatureChecker);
        this.timer = new Timer();
    }

    public void startChecking(String key) {
        licensePlugin.getLogger().info("Started checking...");
        this.timer.schedule(new TimerTask() {
            @Override
            public void run() {
                licensePlugin.getLogger().info("Checking license...");
                checkLicense(key);
            }
        }, 0, TimeUnit.HOURS.toMillis(8));
    }

    @Override
    public void checkLicense(String key) {

        this.licenseChecker.checkLicense(key).subscribe(licenseDto -> {
            if (!licenseChecker.getSignatureChecker().isValidSignature(licenseDto)) {
                invalid();
                return;
            }
            if (!licenseDto.getValid()) {
                invalid();
                return;
            }
            valid();
        }, throwable -> invalid());
    }
}
