package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.LicenseLogDto;
import de.netzkronehd.license.model.LicenseLogModel;
import org.mapstruct.Mapper;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING, uses = ListBehaviorResultMapper.class)
public interface LicenseLogMapper {

    LicenseLogDto map(LicenseLogModel log);
    List<LicenseLogDto> map(List<LicenseLogModel> licenseLogs);

}
