package de.netzkronehd.license.controller;

import de.netzkronehd.license.api.server.springboot.api.PublisherApi;
import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.mapper.LicenseMapper;
import de.netzkronehd.license.model.OAuth2Model;
import de.netzkronehd.license.security.OAuth2TokenSecurity;
import de.netzkronehd.license.service.LicenseCheckService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.ResponseEntity.*;

@RestController
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
@CrossOrigin
public class PublisherController implements PublisherApi {

    private final OAuth2TokenSecurity tokenSecurity;
    private final LicenseCheckService licenseCheckService;
    private final LicenseMapper licenseMapper;

    @Override
    public ResponseEntity<List<String>> getPublishers() {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return status(UNAUTHORIZED).build();
        if(!model.isAdmin()) return status(FORBIDDEN).build();
        return ok(licenseCheckService.getPublishers());
    }

    @Override
    public ResponseEntity<List<LicenseDto>> getLicensesFromPublisher(String publisher) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return status(UNAUTHORIZED).build();
        if(!model.hasAccess()) return status(FORBIDDEN).build();

        try {
            return ok(licenseMapper.map(licenseCheckService.getLicenses(model, publisher)));
        } catch (IllegalStateException | NullPointerException ex) {
            return badRequest().build();
        }
    }
}
