package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.ListModeDto;
import de.netzkronehd.license.listmode.ListMode;
import org.springframework.stereotype.Component;

@Component
public class ListModeMapper {

    public ListMode map(ListModeDto dto) {
        return ListMode.valueOf(dto.name());
    }

    public ListModeDto map(ListMode mode) {
        return ListModeDto.valueOf(mode.name());
    }

}
