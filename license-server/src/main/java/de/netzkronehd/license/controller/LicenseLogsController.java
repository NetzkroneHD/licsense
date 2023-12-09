package de.netzkronehd.license.controller;


import de.netzkronehd.license.api.server.springboot.api.LicenseApi;
import de.netzkronehd.license.api.server.springboot.api.LogsApi;
import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.mapper.LicenseMapper;
import de.netzkronehd.license.service.LicenseLogService;
import de.netzkronehd.license.service.LicenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class LicenseLogsController implements LogsApi {

    private final LicenseMapper mapper;
    private final LicenseLogService service;

    private NativeWebRequest nativeWebRequest;

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.of(nativeWebRequest);
    }


    @Override
    public ResponseEntity<String> getLicenseLogs(String license) {
        try {
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }

    }
}
