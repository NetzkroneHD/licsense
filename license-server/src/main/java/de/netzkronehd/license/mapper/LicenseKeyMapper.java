package de.netzkronehd.license.mapper;

import de.netzkronehd.license.api.server.springboot.models.LicenseKeyDto;
import de.netzkronehd.license.model.LicenseKeyModel;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class LicenseKeyMapper {

    public LicenseKeyDto map(LicenseKeyModel model) {
        return new LicenseKeyDto()
                .owner(model.getOwner())
                .publicKey(model.getPublicKey());
    }

    public List<LicenseKeyDto> map(List<LicenseKeyModel> models) {
        final List<LicenseKeyDto> dtos = new ArrayList<>(models.size());
        models.forEach(model -> dtos.add(map(model)));
        return dtos;
    }

}
