package de.netzkronehd.license.service;

import de.netzkronehd.license.exception.PermissionException;
import de.netzkronehd.license.model.LicenseLogModel;
import de.netzkronehd.license.model.LicenseModel;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class LicenseCheckService {

    private final LicenseService licenseService;
    private final LicenseLogService logService;

    public LicenseModel createLicense(LicenseModel license, String publisher) {
        Objects.requireNonNull(publisher);
        if(publisher.trim().isBlank()) throw new IllegalStateException("Publisher can not be an empty string '"+publisher+"'");
        return this.licenseService.createLicense(license);
    }

    public LicenseModel checkLicense(String ip, String licenseKey) {
        final LicenseModel license = licenseService.getLicense(licenseKey);
        final LicenseLogModel licenseLog = new LicenseLogModel();
        licenseLog.setIp(ip);
        licenseLog.setLicense(licenseKey);
        licenseLog.setDateTime(OffsetDateTime.now());
        logService.createLog(licenseLog);
        if (!license.getValidUntil().isAfter(OffsetDateTime.now())) {
            license.setValid(false);

            log.info("License '{}' is not valid anymore.", license);
        }

        log.info("Checked license '{}' by '{}'.", licenseKey, ip);
        return license;
    }

    public LicenseModel updateLicense(String license, String publisher, LicenseModel update) {
        final LicenseModel licenseToUpdate = this.licenseService.getLicense(license);
        checkIfPublisherIsEqual(publisher, licenseToUpdate);

        log.info("Updating license '{}' from '{}' to '{}'.", license, licenseToUpdate, update);
        licenseToUpdate.setNotes(update.getNotes());
        licenseToUpdate.setValid(update.isValid());
        licenseToUpdate.setValidUntil(update.getValidUntil());

        this.licenseService.updateLicense(license, licenseToUpdate);
        log.info("Updated license '{}'.", license);
        return licenseToUpdate;
    }

    public void deleteLicense(String license, String publisher) {
        final LicenseModel licenseModel = this.licenseService.getLicense(license);
        checkIfPublisherIsEqual(publisher, licenseModel);
        this.licenseService.deleteLicense(license);
        log.info("Deleted license '{}'.", license);
    }

    public List<LicenseLogModel> getLogs(String license) {
        return null;
    }

    private void checkIfPublisherIsEqual(String publisher, LicenseModel licenseModel) {
        if (publisher != null && !licenseModel.getPublisher().equals(publisher)) throw new PermissionException();
    }


}
