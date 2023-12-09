package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.api.server.springboot.models.LicenseLogDto;
import de.netzkronehd.license.model.License;
import de.netzkronehd.license.model.LicenseLog;
import org.springframework.stereotype.Component;

@Component
public class LicenseMapper {

    public License map(LicenseDto dto) {
        return new License(dto.getLicenseKey(), dto.getPublisher(), dto.getNotes(), dto.getValid());
    }

    public LicenseDto map(License license) {
        return new LicenseDto()
                .licenseKey(license.getLicense())
                .notes(license.getNotes())
                .publisher(license.getPublisher())
                .valid(license.isValid());
    }

    public LicenseLog map(LicenseLogDto dto) {
        return new LicenseLog(dto.getId(), dto.getLicense(), dto.getIp(), dto.getDateTime());
    }

    public LicenseLogDto map(LicenseLog log) {
        return new LicenseLogDto()
                .license(log.getLicense())
                .id(log.getId())
                .ip(log.getIp())
                .dateTime(log.getDateTime());
    }


}
