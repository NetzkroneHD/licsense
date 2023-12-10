package de.netzkronehd.license.service;

import de.netzkronehd.license.model.LicenseLogModel;
import de.netzkronehd.license.repository.LicenseLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class LicenseLogService {

    private final LicenseLogRepository licenseLogRepository;

    public void createLog(LicenseLogModel licenseLog) {
        final LicenseLogModel createdLog = new LicenseLogModel();
        createdLog.setLicense(licenseLog.getLicense());
        createdLog.setIp(licenseLog.getIp());
        createdLog.setDateTime(licenseLog.getDateTime());
        this.licenseLogRepository.save(createdLog);
        log.info("Created license log '{}'.", createdLog);
    }

    public LicenseLogModel getLog(int id) {
        return this.licenseLogRepository.findById(id).orElseThrow();
    }

    public List<LicenseLogModel> getLogs(String license) {
        return this.licenseLogRepository.findAllByLicense(license);
    }



}
