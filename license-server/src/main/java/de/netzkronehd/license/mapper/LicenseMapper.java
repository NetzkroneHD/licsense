package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.LicenseCheckResultDto;
import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.model.LicenseCheckResult;
import de.netzkronehd.license.model.LicenseModel;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class LicenseMapper {

    private final ListModeMapper listModeMapper;

    public LicenseModel map(LicenseDto dto) {
        return new LicenseModel(dto.getLicenseKey(), dto.getPublisher(), dto.getNotes(), dto.getValid(), dto.getValidUntil(), listModeMapper.map(dto.getListMode()), dto.getIpAddresses());
    }


    public LicenseDto map(LicenseModel license) {
        return new LicenseDto()
                .licenseKey(license.getLicense())
                .notes(license.getNotes())
                .publisher(license.getPublisher())
                .valid(license.isValid())
                .validUntil(license.getValidUntil())
                .listMode(listModeMapper.map(license.getListMode()))
                .ipAddresses(license.getIpAddresses())
                ;
    }

    public LicenseCheckResultDto map(LicenseCheckResult result) {
        return new LicenseCheckResultDto(result.getLicenseKey(), result.getPublisher(), result.getNotes(), result.isValid(), result.getValidUntil());
    }

    public LicenseCheckResult map(LicenseCheckResultDto dto) {
        return new LicenseCheckResult(dto.getLicenseKey(), dto.getPublisher(), dto.getNotes(), dto.getValid(), dto.getValidUntil());
    }

    public List<LicenseDto> map(List<LicenseModel> licenses) {
        final List<LicenseDto> dtos = new ArrayList<>();
        licenses.forEach(licenseModel -> dtos.add(map(licenseModel)));
        return dtos;
    }
}
