package de.netzkronehd.license.service;

import de.netzkronehd.license.config.LicenseConfig;
import de.netzkronehd.license.exception.ListModeException;
import de.netzkronehd.license.exception.NoKeyModelException;
import de.netzkronehd.license.exception.PermissionException;
import de.netzkronehd.license.listmode.behavior.ListBehaviorResult;
import de.netzkronehd.license.model.*;
import de.netzkronehd.license.utils.Utils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.security.GeneralSecurityException;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class LicenseCheckService {

    private final LicenseService licenseService;
    private final LicenseLogService logService;
    private final PublisherService publisherService;
    private final LicenseConfig licenseConfig;
    private final KeyService keyService;
    private final KeyGeneratorService keyGeneratorService;

    public LicenseModel createLicense(LicenseModel license, String publisher) {
        checkPublisher(publisher);
        license.setPublisher(publisher);
        return this.licenseService.createLicense(license);
    }

    public LicenseModel getLicense(OAuth2Model model, String licenseKey) throws PermissionException {
        final LicenseModel license = licenseService.getLicense(licenseKey);
        checkIfIsAdminOrPublisherIsEqualOr(model, license);
        return license;
    }

    public List<LicenseModel> getLicenses(OAuth2Model model, String publisher) throws PermissionException {
        checkIfIsAdminOrPublisherIsEqualOr(model, publisher);
        return publisherService.getLicenses(publisher);
    }

    public List<String> getPublishers() {
        return publisherService.getPublishers();
    }

    public LicenseCheckResult checkLicense(String ip, String licenseKey) throws ListModeException, GeneralSecurityException, NoKeyModelException {
        final LicenseModel license = licenseService.getLicense(licenseKey);
        final LicenseLogModel licenseLog = new LicenseLogModel();
        licenseLog.setIp(ip);
        licenseLog.setLicense(license.getLicense());
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
        return new LicenseCheckResult(licenseKey, license.getPublisher(), license.getNotes(), license.isValid(), license.getValidUntil(), generateSignature(license.getPublisher()));
    }

    private String generateSignature(String owner) throws GeneralSecurityException, NoKeyModelException {
        final LicenseKeyModel licenseKeyModel = keyGeneratorService.getLicenseKeyModel(owner);
        return keyService.encrypt(Utils.getRandomString(licenseConfig.getSignatureLength()), keyService.loadPrivateKey(licenseKeyModel.getPrivateKey()));
    }

    public LicenseModel updateLicense(String license, OAuth2Model updater, LicenseModel update) throws PermissionException {
        final LicenseModel licenseToUpdate = this.licenseService.getLicense(license);
        checkIfIsAdminOrPublisherIsEqualOr(updater, licenseToUpdate);
        update.setPublisher(licenseToUpdate.getPublisher());
        update.setLicense(license);

        return this.licenseService.updateLicense(license, update);
    }

    public List<LicenseLogModel> getLogs(String license, OAuth2Model publisher) throws PermissionException {
        final LicenseModel licenseModel = this.licenseService.getLicense(license);
        checkIfIsAdminOrPublisherIsEqualOr(publisher, licenseModel);

        return this.logService.getLogs(license);
    }

    public void deleteLicense(String license, OAuth2Model deleter) throws PermissionException {
        final LicenseModel licenseModel = this.licenseService.getLicense(license);
        checkIfIsAdminOrPublisherIsEqualOr(deleter, licenseModel);
        this.licenseService.deleteLicense(license);

        this.logService.deleteLogs(license);
    }

    public void deleteLogs(String license, OAuth2Model deleter) throws PermissionException {

        final LicenseModel licenseModel = this.licenseService.getLicense(license);
        checkIfIsAdminOrPublisherIsEqualOr(deleter, licenseModel);

        this.logService.deleteLogs(license);
    }

    private void checkPublisher(String publisher) {
        if (!StringUtils.hasText(publisher))
            throw new IllegalStateException("Publisher can not be an empty string '" + publisher + "'");
    }

    private void checkIfIsAdminOrPublisherIsEqualOr(OAuth2Model publisher, LicenseModel licenseModel) throws PermissionException {
        if (publisher.isAdmin()) return;
        if (!licenseModel.getPublisher().equals(publisher.getSub())) throw new PermissionException();
    }

    private void checkIfIsAdminOrPublisherIsEqualOr(OAuth2Model model, String publisher) throws PermissionException {
        if (model.isAdmin()) return;
        if(!Objects.equals(model.getSub(), publisher)) throw new PermissionException();
    }
}
