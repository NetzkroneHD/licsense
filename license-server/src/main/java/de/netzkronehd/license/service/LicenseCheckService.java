package de.netzkronehd.license.service;

import de.netzkronehd.license.exception.ListModeException;
import de.netzkronehd.license.exception.PermissionException;
import de.netzkronehd.license.listmode.behavior.ListBehaviorResult;
import de.netzkronehd.license.model.LicenseCheckResult;
import de.netzkronehd.license.model.LicenseLogModel;
import de.netzkronehd.license.model.LicenseModel;
import de.netzkronehd.license.model.OAuth2Model;
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
    private final PublisherService publisherService;

    public LicenseModel createLicense(LicenseModel license, String publisher) {
        checkPublisher(publisher);
        license.setPublisher(publisher);
        return this.licenseService.createLicense(license);
    }

    public LicenseModel getLicense(OAuth2Model model, String licenseKey) throws PermissionException {
        final LicenseModel license = licenseService.getLicense(licenseKey);
        if(!license.getPublisher().equals(model.getSub())) {
            throw new PermissionException();
        }
        return license;
    }

    public List<LicenseModel> getLicenses(OAuth2Model model, String publisher) throws PermissionException {
        if(!model.getSub().equalsIgnoreCase(publisher)) {
            throw new PermissionException();
        }
        return publisherService.getLicenses(publisher);
    }

    public LicenseCheckResult checkLicense(String ip, String licenseKey) throws ListModeException {
        final LicenseModel license = licenseService.getLicense(licenseKey);
        final LicenseLogModel licenseLog = new LicenseLogModel();
        licenseLog.setIp(ip);
        licenseLog.setLicense(licenseKey);
        licenseLog.setDateTime(OffsetDateTime.now());

        if (license.getListMode().checkState(license.getIpAddresses(), ip) == ListBehaviorResult.DISALLOW) {
            licenseLog.setListBehaviorResult(ListBehaviorResult.DISALLOW);
            logService.createLog(licenseLog);
            throw new ListModeException(license.getListMode(), ip);
        }
        licenseLog.setListBehaviorResult(ListBehaviorResult.ALLOW);

        logService.createLog(licenseLog);
        if (license.isValid() && license.getValidUntil() != null && !license.getValidUntil().isAfter(OffsetDateTime.now())) {
            license.setValid(false);
            log.info("License '{}' is not valid anymore.", license);
            this.licenseService.save(license);
        }
        log.info("Checked license '{}' by '{}'.", licenseKey, ip);
        return new LicenseCheckResult(licenseKey, license.getPublisher(), license.getNotes(), license.isValid(), license.getValidUntil());
    }

    public LicenseModel updateLicense(String license, String publisher, LicenseModel update) throws PermissionException {
        checkPublisher(publisher);

        final LicenseModel licenseToUpdate = this.licenseService.getLicense(license);
        checkIfPublisherIsEqual(publisher, licenseToUpdate);
        update.setPublisher(publisher);
        update.setLicense(license);

        return this.licenseService.updateLicense(license, update);
    }

    public List<LicenseLogModel> getLogs(String license, String publisher) throws PermissionException {
        checkPublisher(publisher);

        final LicenseModel licenseModel = this.licenseService.getLicense(license);
        checkIfPublisherIsEqual(publisher, licenseModel);

        return this.logService.getLogs(license);
    }

    public void deleteLicense(String license, String publisher) throws PermissionException {
        checkPublisher(publisher);

        final LicenseModel licenseModel = this.licenseService.getLicense(license);
        checkIfPublisherIsEqual(publisher, licenseModel);

        this.licenseService.deleteLicense(license);
        log.info("Deleted license '{}' by '{}'.", licenseModel, publisher);
    }

    private void checkPublisher(String publisher) {
        if(!StringUtils.hasText(publisher)) throw new IllegalStateException("Publisher can not be an empty string '"+publisher+"'");
    }

    private void checkIfPublisherIsEqual(String publisher, LicenseModel licenseModel) throws PermissionException {
        if (publisher != null && !licenseModel.getPublisher().equals(publisher)) throw new PermissionException();
    }

}
