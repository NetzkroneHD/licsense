package de.netzkronehd.license.service;

import de.netzkronehd.license.exception.PermissionException;
import de.netzkronehd.license.model.LicenseLogModel;
import de.netzkronehd.license.model.LicenseModel;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class LicenseCheckService {

    private final LicenseService licenseService;
    private final LicenseLogService logService;

    public LicenseModel createLicense(LicenseModel license, String publisher) {
        checkPublisher(publisher);
        license.setPublisher(publisher);
        return this.licenseService.createLicense(license);
    }

    public LicenseModel checkLicense(String ip, String licenseKey) {
        final LicenseModel license = licenseService.getLicense(licenseKey);
        final LicenseLogModel licenseLog = new LicenseLogModel();
        licenseLog.setIp(ip);
        licenseLog.setLicense(licenseKey);
        licenseLog.setDateTime(OffsetDateTime.now());

        logService.createLog(licenseLog);
        if (license.isValid() && license.getValidUntil() != null && !license.getValidUntil().isAfter(OffsetDateTime.now())) {
            license.setValid(false);
            log.info("License '{}' is not valid anymore.", license);
            this.licenseService.save(license);
        }
        log.info("Checked license '{}' by '{}'.", licenseKey, ip);
        return license;
    }

    public LicenseModel updateLicense(String license, String publisher, LicenseModel update) {
        checkPublisher(publisher);

        final LicenseModel licenseToUpdate = this.licenseService.getLicense(license);
        checkIfPublisherIsEqual(publisher, licenseToUpdate);
        update.setPublisher(publisher);
        update.setLicense(license);

        return this.licenseService.updateLicense(license, update);
    }

    public List<LicenseLogModel> getLogs(String license, String publisher) {
        checkPublisher(publisher);

        final LicenseModel licenseModel = this.licenseService.getLicense(license);
        checkIfPublisherIsEqual(publisher, licenseModel);

        return this.logService.getLogs(license);
    }

    public void deleteLicense(String license, String publisher) {
        checkPublisher(publisher);

        final LicenseModel licenseModel = this.licenseService.getLicense(license);
        checkIfPublisherIsEqual(publisher, licenseModel);

        this.logService.deleteLog(license);
        this.licenseService.deleteLicense(license);
    }

    private void checkPublisher(String publisher) {
        if(!StringUtils.hasText(publisher)) throw new IllegalStateException("Publisher can not be an empty string '"+publisher+"'");
    }

    private void checkIfPublisherIsEqual(String publisher, LicenseModel licenseModel) {
        if (publisher != null && !licenseModel.getPublisher().equals(publisher)) throw new PermissionException();
    }

}
