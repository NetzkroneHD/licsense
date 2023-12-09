package de.netzkronehd.license.controller;


import de.netzkronehd.license.api.server.springboot.api.LicenseApi;
import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.mapper.LicenseMapper;
import de.netzkronehd.license.service.LicenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class LicenseController implements LicenseApi {

    private final LicenseMapper mapper;
    private final LicenseService service;

    private NativeWebRequest nativeWebRequest;

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.of(nativeWebRequest);
    }


    @Override
    public ResponseEntity<LicenseDto> createLicense(@Valid LicenseDto licenseDto) {
        return LicenseApi.super.createLicense(licenseDto);
    }

    @Override
    public ResponseEntity<Void> deleteLicense(String license) {
        return LicenseApi.super.deleteLicense(license);
    }

    @Override
    public ResponseEntity<String> updateLicense(String license, @Valid String body) {
        return LicenseApi.super.updateLicense(license, body);
    }

    @Override
    public ResponseEntity<LicenseDto> getLicense(String license) {
        try {
            return ResponseEntity.ok(this.mapper.map(this.service.getLicense(license)));
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }
    }

}
