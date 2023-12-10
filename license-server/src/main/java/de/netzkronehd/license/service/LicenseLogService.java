package de.netzkronehd.license.service;

import de.netzkronehd.license.model.LicenseLogModel;
import de.netzkronehd.license.repository.LicenseLogRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class LicenseLogService {

    private final LicenseLogRepository licenseLogRepository;

    public void createLog(LicenseLogModel licenseLog) {
        Objects.requireNonNull(licenseLog);
        Objects.requireNonNull(licenseLog.getLicense());
        Objects.requireNonNull(licenseLog.getIp());
        Objects.requireNonNull(licenseLog.getDateTime());

        final LicenseLogModel createdLog = new LicenseLogModel();
        createdLog.setLicense(licenseLog.getLicense());
        createdLog.setIp(licenseLog.getIp());
        createdLog.setDateTime(licenseLog.getDateTime());

        this.licenseLogRepository.save(createdLog);
        log.info("Created license log '{}'.", createdLog);
    }

    public LicenseLogModel getLog(int id) {
        checkIdIsGreaterThanZero(id);
        return this.licenseLogRepository.findById(id).orElseThrow();
    }

    public List<LicenseLogModel> getLogs(String license) {
        return this.licenseLogRepository.findAllByLicense(license);
    }

    public void deleteLog(int id) {
        checkIdIsGreaterThanZero(id);
        log.info("Deleted log '{}'", id);
    }

    public void deleteLog(String license) {
        this.licenseLogRepository.deleteAllByLicense(license);
        log.info("Deleted all logs from the license '{}'.", license);
    }

    private void checkIdIsGreaterThanZero(int id) {
        if(id < 0) throw new IllegalStateException("Id can not be smaller than 0. ("+id+" < 0)");
    }


}
