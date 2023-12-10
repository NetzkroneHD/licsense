package de.netzkronehd.license.service;

import de.netzkronehd.license.config.LicenseConfig;
import de.netzkronehd.license.model.LicenseLogModel;
import de.netzkronehd.license.model.LicenseModel;
import de.netzkronehd.license.repository.LicenseRepository;
import de.netzkronehd.license.utils.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Objects;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class LicenseService {

    private final LicenseConfig config;
    private final LicenseRepository licenseRepository;
    private final LicenseLogService logService;

    public LicenseModel getLicense(String license) {
        Objects.requireNonNull(license);
        if(license.trim().isEmpty()) throw new IllegalStateException("License can not be empty.");

        return this.licenseRepository.findById(license).orElseThrow();
    }

    public LicenseModel checkLicense(String ip, String licenseKey) {
        final LicenseModel license = getLicense(licenseKey);
        final LicenseLogModel licenseLog = new LicenseLogModel();
        licenseLog.setIp(ip);
        licenseLog.setLicense(licenseKey);
        licenseLog.setDateTime(OffsetDateTime.now());
        logService.createLog(licenseLog);
        if (!license.getValidUntil().isAfter(OffsetDateTime.now())) {
            license.setValid(false);
            this.licenseRepository.save(license);
            log.info("License '{}' is not valid anymore.", license);
        }

        log.info("Checked license '{}' by '{}'.", licenseKey, ip);
        return license;
    }

    public String getNewLicenseKey() {
        String licenseKey = Utils.getRandomString(config.getGenerationMultiplier());
        while (this.licenseRepository.existsById(licenseKey)) {
            licenseKey = Utils.getRandomString(config.getGenerationMultiplier());
        }
        return licenseKey;
    }

    public LicenseModel createLicense(LicenseModel license) {
        final LicenseModel created = new LicenseModel();
        final String licenseKey = getNewLicenseKey();

        created.setLicense(licenseKey);
        created.setNotes(license.getNotes());
        created.setPublisher(license.getPublisher());
        created.setValid(true);
        licenseRepository.save(created);
        log.info("Created the license '{}'.", created.getLicense());
        return created;
    }

    public LicenseModel updateLicense(String license, LicenseModel update) {
        final LicenseModel licenseToUpdate = getLicense(license);

        log.info("Updating license '{}' from '{}' to '{}'.", license, licenseToUpdate, update);
        licenseToUpdate.setNotes(update.getNotes());
        licenseToUpdate.setValid(update.isValid());
        licenseToUpdate.setValidUntil(update.getValidUntil());
        licenseToUpdate.setPublisher(update.getPublisher());

        licenseRepository.save(licenseToUpdate);
        log.info("Updated license '{}'.", license);
        return licenseToUpdate;
    }

    public void deleteLicense(String license) {
        this.licenseRepository.deleteById(license);
        log.info("Deleted license '{}'.", license);
    }


}
