package de.netzkronehd.license.controller;

import de.netzkronehd.license.api.server.springboot.api.PublisherApi;
import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.exception.PermissionException;
import de.netzkronehd.license.mapper.LicenseMapper;
import de.netzkronehd.license.model.OAuth2Model;
import de.netzkronehd.license.security.OAuth2TokenSecurity;
import de.netzkronehd.license.service.LicenseCheckService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
@CrossOrigin
public class PublisherController implements PublisherApi {

    private final OAuth2TokenSecurity tokenSecurity;
    private final LicenseCheckService licenseCheckService;
    private final LicenseMapper licenseMapper;

    @Override
    public ResponseEntity<List<LicenseDto>> getLicensesFromPublisher(String publisher) {
        final OAuth2Model model = tokenSecurity.getModel(SecurityContextHolder.getContext().getAuthentication());
        if (model == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        try {

            try {
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

            return ResponseEntity.ok(licenseMapper.map(licenseCheckService.getLicenses(model, publisher)));
        } catch (PermissionException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (IllegalStateException | NullPointerException ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
