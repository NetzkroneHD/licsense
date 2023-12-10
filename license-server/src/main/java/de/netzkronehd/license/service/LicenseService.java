package de.netzkronehd.license.service;

import de.netzkronehd.license.config.LicenseConfig;
import de.netzkronehd.license.model.LicenseModel;
import de.netzkronehd.license.repository.LicenseRepository;
import de.netzkronehd.license.utils.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        created.setValidUntil(license.getValidUntil());

        licenseRepository.save(created);
        log.info("Created the license '{}'.", created);
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

    public void save(LicenseModel license) {
        this.licenseRepository.save(license);
        log.info("Saved license '{}'.", license);
    }

    public void deleteLicense(String license) {
        this.licenseRepository.deleteById(license);
        log.info("Deleted license '{}'.", license);
    }

}
