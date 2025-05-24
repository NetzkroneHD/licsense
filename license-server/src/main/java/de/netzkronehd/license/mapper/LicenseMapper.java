package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.LicenseCheckResultDto;
import de.netzkronehd.license.api.server.springboot.models.LicenseDto;
import de.netzkronehd.license.model.LicenseCheckResult;
import de.netzkronehd.license.model.LicenseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING, uses = ListModeMapper.class)
public interface LicenseMapper {

    @Mapping(target = "license", source = "licenseKey")
    LicenseModel map(LicenseDto dto);
    @Mapping(target = "licenseKey", source = "license")
    LicenseDto map(LicenseModel license);

    LicenseCheckResultDto map(LicenseCheckResult result);
    LicenseCheckResult map(LicenseCheckResultDto dto);

    List<LicenseDto> map(List<LicenseModel> licenses);
}
