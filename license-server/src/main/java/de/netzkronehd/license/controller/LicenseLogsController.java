package de.netzkronehd.license.controller;


import de.netzkronehd.license.api.server.springboot.api.LogsApi;
import de.netzkronehd.license.api.server.springboot.models.LicenseLogDto;
import de.netzkronehd.license.mapper.LicenseMapper;
import de.netzkronehd.license.service.LicenseLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class LicenseLogsController implements LogsApi {

    private final LicenseMapper licenseMapper;
    private final LicenseLogService logService;

    @Override
    public ResponseEntity<List<LicenseLogDto>> getLicenseLogs(String license) {
        try {
            return ResponseEntity.ok(licenseMapper.map(logService.getLogs(license)));
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
