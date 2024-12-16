package de.netzkronehd.license.controller;

import de.netzkronehd.license.api.server.springboot.api.KeyApi;
import de.netzkronehd.license.api.server.springboot.models.LicenseKeyDto;
import de.netzkronehd.license.exception.NoKeyModelException;
import de.netzkronehd.license.mapper.LicenseKeyMapper;
import de.netzkronehd.license.model.OAuth2Model;
import de.netzkronehd.license.security.OAuth2TokenSecurity;
import de.netzkronehd.license.service.KeyGeneratorService;
import de.netzkronehd.license.service.KeyService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
@CrossOrigin
public class KeyController implements KeyApi {

    private final KeyService keyService;
    private final LicenseKeyMapper licenseKeyMapper;
    private final KeyGeneratorService keyGeneratorService;
    private final OAuth2TokenSecurity tokenSecurity;

    @Override
    public ResponseEntity<Void> generateKey(@Valid Integer keySize) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (!model.isAdmin()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        try {
            keyGeneratorService.generatePrivateKey(model.getSub(), keySize);
            return ResponseEntity.ok().build();
        } catch (NoSuchAlgorithmException e) {
            log.error("Error while generating key", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @Override
    public ResponseEntity<LicenseKeyDto> getKey(String owner) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (!model.isAdmin()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        try {
            return ResponseEntity.ok(licenseKeyMapper.map(keyService.getLicenseKeyModel(owner)));
        } catch (NoKeyModelException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<List<LicenseKeyDto>> getKeys() {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (!model.isAdmin()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.ok(licenseKeyMapper.map(keyService.getLicenseKeyModels()));
    }
}
