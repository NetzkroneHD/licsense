package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.ListBehaviorResultDto;
import de.netzkronehd.license.listmode.behavior.ListBehaviorResult;
import org.mapstruct.Mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface ListBehaviorResultMapper {

    ListBehaviorResult map(ListBehaviorResultDto dto);
    ListBehaviorResultDto map(ListBehaviorResult mode);

}
