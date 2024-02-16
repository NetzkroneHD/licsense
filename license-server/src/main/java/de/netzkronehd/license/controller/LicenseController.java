package de.netzkronehd.license.controller;

import de.netzkronehd.license.api.server.springboot.api.LicenseApi;
import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.exception.PermissionException;
import de.netzkronehd.license.mapper.LicenseMapper;
import de.netzkronehd.license.model.OAuth2Model;
import de.netzkronehd.license.security.OAuth2TokenSecurity;
import de.netzkronehd.license.service.LicenseCheckService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class LicenseController implements LicenseApi {

    private final LicenseMapper licenseMapper;
    private final LicenseCheckService licenseCheckService;
    private final OAuth2TokenSecurity tokenSecurity;

    private HttpServletRequest request;

    @Override
    public ResponseEntity<LicenseDto> createLicense(@Valid LicenseDto licenseDto) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        try {
            licenseDto.setPublisher(model.getSub());
            return ResponseEntity.ok(licenseMapper.map(licenseCheckService.createLicense(licenseMapper.map(licenseDto), model.getSub())));
        } catch (Exception ex) {
            log.info("Error while creating license '{}': {}", licenseDto, ex.toString());
            return ResponseEntity.badRequest().build();
        }
    }

    @Override
    public ResponseEntity<Void> deleteLicense(String license) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        try {
            licenseCheckService.deleteLicense(license, model.getSub());
            return ResponseEntity.ok().build();
        } catch (PermissionException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().build();
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<LicenseDto> updateLicense(String license, @Valid LicenseDto licenseDto) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        try {
            return ResponseEntity.ok(licenseMapper.map(licenseCheckService.updateLicense(license, model.getSub(), licenseMapper.map(licenseDto))));
        } catch (PermissionException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().build();
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<LicenseDto> getLicense(String license) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        log.info("'{}' tried to get license without authentication.", request.getRemoteAddr());
        if (model == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        try {
            return ResponseEntity.ok(this.licenseMapper.map(this.licenseCheckService.getLicense(model, license)));
        } catch (PermissionException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        }
    }

}
