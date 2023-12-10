package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.api.server.springboot.models.LicenseLogDto;
import de.netzkronehd.license.model.LicenseLogModel;
import de.netzkronehd.license.model.LicenseModel;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LicenseMapper {

    public LicenseModel map(LicenseDto dto) {
        return new LicenseModel(dto.getLicenseKey(), dto.getPublisher(), dto.getNotes(), dto.getValid(), dto.getValidUntil());
    }

    public LicenseDto map(LicenseModel license) {
        return new LicenseDto()
                .licenseKey(license.getLicense())
                .notes(license.getNotes())
                .publisher(license.getPublisher())
                .valid(license.isValid())
                .validUntil(license.getValidUntil());
    }

    public LicenseLogModel map(LicenseLogDto dto) {
        return new LicenseLogModel(dto.getId(), dto.getLicense(), dto.getIp(), dto.getDateTime());
    }

    public LicenseLogDto map(LicenseLogModel log) {
        return new LicenseLogDto()
                .license(log.getLicense())
                .id(log.getId())
                .ip(log.getIp())
                .dateTime(log.getDateTime());
    }

    public List<LicenseLogDto> map(List<LicenseLogModel> licenseLogs) {
        final List<LicenseLogDto> dtos = new ArrayList<>(licenseLogs.size());
        licenseLogs.forEach(licenseLog -> dtos.add(map(licenseLog)));
        return dtos;
    }


}
