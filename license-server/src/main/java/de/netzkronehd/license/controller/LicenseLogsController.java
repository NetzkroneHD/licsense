package de.netzkronehd.license.controller;


import de.netzkronehd.license.api.server.springboot.api.LogsApi;
import de.netzkronehd.license.api.server.springboot.models.LicenseLogDto;
import de.netzkronehd.license.exception.PermissionException;
import de.netzkronehd.license.mapper.LicenseLogMapper;
import de.netzkronehd.license.model.OAuth2Model;
import de.netzkronehd.license.security.OAuth2TokenSecurity;
import de.netzkronehd.license.service.LicenseCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@CrossOrigin
public class LicenseLogsController implements LogsApi {

    private final LicenseLogMapper licenseLogMapper;
    private final LicenseCheckService checkService;
    private final OAuth2TokenSecurity tokenSecurity;

    @Override
    public ResponseEntity<List<LicenseLogDto>> getLicenseLogs(String license) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (!model.isAdmin()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        try {
            return ResponseEntity.ok(licenseLogMapper.map(checkService.getLogs(license, model.getSub())).reversed());
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        } catch (PermissionException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @Override
    public ResponseEntity<Void> deleteLicenseLogs(String license) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (!model.isAdmin()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        try {
            this.checkService.deleteLogs(license, model.getSub());
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        } catch (PermissionException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
