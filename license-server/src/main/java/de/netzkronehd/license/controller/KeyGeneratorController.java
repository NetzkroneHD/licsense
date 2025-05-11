package de.netzkronehd.license.controller;

import de.netzkronehd.license.api.server.springboot.api.KeyApi;
import de.netzkronehd.license.api.server.springboot.models.GenerateKeyRequestDto;
import de.netzkronehd.license.api.server.springboot.models.LicenseKeyDto;
import de.netzkronehd.license.exception.NoKeyModelException;
import de.netzkronehd.license.mapper.LicenseKeyMapper;
import de.netzkronehd.license.model.OAuth2Model;
import de.netzkronehd.license.security.OAuth2TokenSecurity;
import de.netzkronehd.license.service.KeyGeneratorService;
import de.netzkronehd.license.service.RateLimitService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;
import java.util.Objects;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.ResponseEntity.*;

@RestController
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
@CrossOrigin
public class KeyGeneratorController implements KeyApi {

    private final LicenseKeyMapper licenseKeyMapper;
    private final KeyGeneratorService keyGeneratorService;
    private final OAuth2TokenSecurity tokenSecurity;
    private final RateLimitService rateLimitService;

    private HttpServletRequest request;

    @Override
    public ResponseEntity<LicenseKeyDto> generateKey(GenerateKeyRequestDto generateKeyRequestDto) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return status(UNAUTHORIZED).build();
        if (!model.hasAccess()) return status(FORBIDDEN).build();

        try {
            if (!model.isAdmin()) {
                rateLimitService.checkRateLimit(request.getRemoteAddr(), "KeyGeneratorController#generateKey", 1);
            }
            return ok(licenseKeyMapper.map(keyGeneratorService.generatePrivateKey(model.getSub(), generateKeyRequestDto.getKeySize())));
        } catch (NoSuchAlgorithmException e) {
            log.error("Error while generating key", e);
            return internalServerError().build();
        }
    }

    @Override
    public ResponseEntity<LicenseKeyDto> generatePublisherKey(String owner, @Valid GenerateKeyRequestDto generateKeyRequestDto) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return status(UNAUTHORIZED).build();
        if (!canAccess(owner, model)) {
            log.info("{} tried to generate key for publisher {}", model.getSub(), owner);
            return status(FORBIDDEN).build();
        }

        try {
            if (!model.isAdmin()) {
                rateLimitService.checkRateLimit(request.getRemoteAddr(), "KeyGeneratorController#generatePublisherKey", 1);
            }
            return ok(licenseKeyMapper.map(keyGeneratorService.generatePrivateKey(owner, generateKeyRequestDto.getKeySize())));
        } catch (NoSuchAlgorithmException e) {
            log.error("Error while generating key", e);
            return internalServerError().build();
        }
    }

    @Override
    public ResponseEntity<LicenseKeyDto> getKey(String owner) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return status(UNAUTHORIZED).build();
        if (!canAccess(owner, model)) {
            log.info("{} tried to access key of {}", model.getSub(), owner);
            return status(FORBIDDEN).build();
        }


        try {
            return ok(licenseKeyMapper.map(keyGeneratorService.getLicenseKeyModel(owner)));
        } catch (NoKeyModelException e) {
            return notFound().build();
        }
    }

    @Override
    public ResponseEntity<Void> deleteKey(String owner) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return status(UNAUTHORIZED).build();
        if (!canAccess(owner, model)) {
            log.info("{} tried to delete key of {}", model.getSub(), owner);
            return status(FORBIDDEN).build();
        }

        try {
            keyGeneratorService.deleteKey(owner);
            return ok().build();
        } catch (NoKeyModelException e) {
            return notFound().build();
        }
    }

    private boolean canAccess(String owner, OAuth2Model model) {
        if(!model.hasAccess()) return false;
        return (model.isAdmin() || Objects.equals(model.getSub(), owner));
    }
}
