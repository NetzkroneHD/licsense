package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.ListModeDto;
import de.netzkronehd.license.listmode.ListMode;
import org.mapstruct.Mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface ListModeMapper {

    ListMode map(ListModeDto dto);
    ListModeDto map(ListMode mode);

}
