package de.netzkronehd.license.controller;

import de.netzkronehd.license.api.server.springboot.api.CheckApi;
import de.netzkronehd.license.api.server.springboot.models.LicenseCheckResultDto;
import de.netzkronehd.license.exception.ListModeException;
import de.netzkronehd.license.mapper.LicenseMapper;
import de.netzkronehd.license.service.LicenseCheckService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
@CrossOrigin
public class CheckController implements CheckApi {

    private final LicenseMapper licenseMapper;
    private final LicenseCheckService licenseCheckService;

    private HttpServletRequest request;

    @Override
    public ResponseEntity<LicenseCheckResultDto> checkLicense(String license) {
        try {
            return ResponseEntity.ok(licenseMapper.map(licenseCheckService.checkLicense(request.getRemoteAddr(), license)));
        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        } catch (ListModeException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
