package de.netzkronehd.license.controller;

import de.netzkronehd.license.api.server.springboot.api.LicenseApi;
import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.mapper.LicenseMapper;
import de.netzkronehd.license.model.OAuth2Model;
import de.netzkronehd.license.security.OAuth2TokenSecurity;
import de.netzkronehd.license.service.LicenseCheckService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.ResponseEntity.*;

@RestController
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
@CrossOrigin
public class LicenseController implements LicenseApi {

    private final LicenseMapper licenseMapper;
    private final LicenseCheckService licenseCheckService;
    private final OAuth2TokenSecurity tokenSecurity;

    @Override
    public ResponseEntity<LicenseDto> createLicense(@Valid LicenseDto licenseDto) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return status(UNAUTHORIZED).build();
        if (!model.hasAccess()) return status(FORBIDDEN).build();

        try {
            return ok(licenseMapper.map(licenseCheckService.createLicense(licenseMapper.map(licenseDto), model.getSub())));
        } catch (Exception ex) {
            log.error("Error while creating license '{}'", licenseDto, ex);
            return badRequest().build();
        }
    }

    @Override
    public ResponseEntity<Void> deleteLicense(String license) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return status(UNAUTHORIZED).build();
        if (!model.hasAccess()) return status(FORBIDDEN).build();

        try {
            licenseCheckService.deleteLicense(license, model);
            return ok().build();
        } catch (IllegalStateException ex) {
            return badRequest().build();
        }
    }

    @Override
    public ResponseEntity<LicenseDto> updateLicense(String license, @Valid LicenseDto licenseDto) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return status(UNAUTHORIZED).build();
        if (!model.hasAccess()) return status(FORBIDDEN).build();

        try {
            return ok(licenseMapper.map(licenseCheckService.updateLicense(license, model, licenseMapper.map(licenseDto))));
        } catch (IllegalStateException ex) {
            return badRequest().build();
        }
    }

    @Override
    public ResponseEntity<LicenseDto> getLicense(String license) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return status(UNAUTHORIZED).build();

        return ok(this.licenseMapper.map(this.licenseCheckService.getLicense(model, license)));
    }

}
