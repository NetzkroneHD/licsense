package de.netzkronehd.license.service;

import de.netzkronehd.license.config.LicenseConfig;
import de.netzkronehd.license.model.License;
import de.netzkronehd.license.model.LicenseLog;
import de.netzkronehd.license.repository.LicenseRepository;
import de.netzkronehd.license.utils.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class LicenseService {

    private final LicenseConfig config;
    private final LicenseRepository licenseRepository;
    private final LicenseLogService logService;

    public License getLicense(String license) {
        return this.licenseRepository.findById(license).orElseThrow();
    }

    public License checkLicense(String ip, String licenseKey) {
        final License license = getLicense(licenseKey);
        final LicenseLog licenseLog = new LicenseLog();
        licenseLog.setIp(ip);
        licenseLog.setLicense(licenseKey);
        licenseLog.setDateTime(OffsetDateTime.now());
        logService.createLog(licenseLog);
        log.info("Checking license '{}' by '{}'.", licenseKey, ip);
        return license;
    }

    public License createLicense(License license) {
        final License created = new License();
        created.setLicense(Utils.getRandomString(config.getGenerationMultiplier()));
        created.setNotes(license.getNotes());
        created.setPublisher(license.getPublisher());
        created.setValid(true);
        licenseRepository.save(created);
        log.info("Created the license '{}'.", created.getLicense());
        return created;
    }

    public License updateLicense(String key, License update) {
        final License license = getLicense(key);
        log.info("Updating license '{}' from '{}' to '{}'.", key, license, update);
        license.setPublisher(update.getPublisher());
        license.setNotes(update.getNotes());
        license.setValid(update.isValid());
        licenseRepository.save(license);
        log.info("Updated license '{}'.", key);
        return license;
    }

    public void deleteLicense(String key) {
        if (!this.licenseRepository.existsById(key)) throw new NoSuchElementException();
        this.licenseRepository.deleteById(key);
        log.info("Deleted license '{}'.", key);
    }

}
