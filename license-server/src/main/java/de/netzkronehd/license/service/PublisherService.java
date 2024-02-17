package de.netzkronehd.license.service;

import de.netzkronehd.license.model.LicenseModel;
import de.netzkronehd.license.repository.LicenseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class PublisherService {

    private final LicenseRepository licenseRepository;

    public List<LicenseModel> getLicenses(String publisher) {
        Objects.requireNonNull(publisher);
        if(publisher.trim().isEmpty()) throw new IllegalStateException("Publisher can not be empty.");
        return licenseRepository.findAllByPublisher(publisher);
    }

}
