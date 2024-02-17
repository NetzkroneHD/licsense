package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.LicenseLogDto;
import de.netzkronehd.license.model.LicenseLogModel;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class LicenseLogMapper {

    private final ListBehaviorResultMapper listBehaviorResultMapper;

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
