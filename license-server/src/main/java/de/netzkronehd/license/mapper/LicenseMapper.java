package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.LicenseCheckResultDto;
import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.api.server.springboot.models.LicenseLogDto;
import de.netzkronehd.license.model.LicenseCheckResult;
import de.netzkronehd.license.model.LicenseLogModel;
import de.netzkronehd.license.model.LicenseModel;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class LicenseMapper {

    private final ListBehaviorResultMapper listBehaviorResultMapper;
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

    public LicenseLogModel map(LicenseLogDto dto) {
        return new LicenseLogModel(dto.getId(), dto.getLicense(), dto.getIp(), dto.getDateTime(), listBehaviorResultMapper.map(dto.getListBehaviorResult()));
    }

    public LicenseLogDto map(LicenseLogModel log) {
        return new LicenseLogDto()
                .license(log.getLicense())
                .id(log.getId())
                .ip(log.getIp())
                .dateTime(log.getDateTime())
                .listBehaviorResult(listBehaviorResultMapper.map(log.getListBehaviorResult()));
    }

    public List<LicenseLogDto> map(List<LicenseLogModel> licenseLogs) {
        final List<LicenseLogDto> dtos = new ArrayList<>(licenseLogs.size());
        licenseLogs.forEach(licenseLog -> dtos.add(map(licenseLog)));
        return dtos;
    }


}
