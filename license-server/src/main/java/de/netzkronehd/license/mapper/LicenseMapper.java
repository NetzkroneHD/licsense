package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.LicenseCheckResultDto;
import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.model.LicenseCheckResult;
import de.netzkronehd.license.model.LicenseModel;
import org.mapstruct.Mapper;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING, uses = ListModeMapper.class)
public interface LicenseMapper {


    LicenseModel map(LicenseDto dto);
    LicenseDto map(LicenseModel license);

    LicenseCheckResultDto map(LicenseCheckResult result);
    LicenseCheckResult map(LicenseCheckResultDto dto);

    List<LicenseDto> map(List<LicenseModel> licenses);
}
