package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.LicenseKeyDto;
import de.netzkronehd.license.model.LicenseKeyModel;
import org.mapstruct.Mapper;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface LicenseKeyMapper {

    LicenseKeyDto map(LicenseKeyModel model);
    List<LicenseKeyDto> map(List<LicenseKeyModel> models);

}
