package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.ListBehaviorResultDto;
import de.netzkronehd.license.listmode.behavior.ListBehaviorResult;
import org.springframework.stereotype.Component;

@Component
public class ListBehaviorResultMapper {

    public ListBehaviorResult map(ListBehaviorResultDto dto) {
        return ListBehaviorResult.valueOf(dto.name());
    }

    public ListBehaviorResultDto map(ListBehaviorResult mode) {
        return ListBehaviorResultDto.valueOf(mode.name());
    }

}
